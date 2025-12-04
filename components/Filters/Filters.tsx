"use client";
import { useState } from "react";
import css from "./Filters.module.css";

type FiltersProps = {
  onChange: (filters: {
    location?: string;
    type?: string;
    features: string[];
  }) => void;
  onClearAll: () => void;
  filters: {
    location?: string;
    type?: string;
    features?: string[];
  };
};

export default function Filters({
  onChange,
  onClearAll,
  filters,
}: FiltersProps) {
  const [location, setLocation] = useState(filters.location || "");
  const [type, setType] = useState(filters.type || "");
  const [features, setFeatures] = useState<string[]>([]);

  const toggleFeature = (feature: string) => {
    setFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  const handleSearch = () => {
    onChange({ location, type, features });
  };

  const handleClearAll = () => {
    setLocation("");
    setType("");
    setFeatures([]);
    onClearAll();
  };

  return (
    <div className={css.filtersWrapper}>
      <div className={css.locationFilterWrapper}>
        <label className={css.locationFilterTitle}>Location</label>
        <div className={css.inputWrapper}>
          <svg
            className={css.inputFilterIcon}
            width={20}
            height={20}
            viewBox="0 0 24 24"
            style={{
              fill: location ? "var(--main-color)" : "var(--gray-color)",
            }}
          >
            <use href="/symbol-defs.svg#icon-map"></use>
          </svg>
          <input
            className={css.inputFilter}
            type="text"
            placeholder="City"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>

      <div className={css.vehicleEquipmentWrapper}>
        <p className={css.filterTitle}>Filters</p>
        <p className={css.filterAfterTitle}>Vehicle equipment</p>
        <div className={css.horizontalLine}></div>

        <div className={css.featuresWrapper}>
          {["Ac", "Automatic", "Kitchen", "Tv", "Bathroom"].map((feature) => {
            const isSelected = features.includes(feature);

            const featureIcons: { [key: string]: string } = {
              Ac: "icon-wind",
              Automatic: "icon-diagram",
              Kitchen: "icon-cup",
              Tv: "icon-tv",
              Bathroom: "icon-shower",
            };
            return (
              <label
                key={feature}
                className={`${css.featureItem} ${isSelected ? css.selected : ""}`}
              >
                <input
                  type="checkbox"
                  value={feature}
                  checked={isSelected}
                  onChange={() => toggleFeature(feature)}
                />
                <div className={css.featureIcon}>
                  <svg width={32} height={32}>
                    <use
                      href={`/symbol-defs.svg#${featureIcons[feature]}`}
                    ></use>
                  </svg>
                </div>
                <span className={css.featureLabel}>{feature}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className={css.vehicleTypeWrapper}>
        <p className={css.filterAfterTitle}>Vehicle type</p>
        <div className={css.horizontalLine}></div>

        <div className={css.featuresWrapper}>
          {["Van", "Fully integrated", "Alcov"].map((typeName) => {
            const isSelected = type === typeName;

            const typeIcons: { [key: string]: string } = {
              Van: "icon-grid-1",
              "Fully integrated": "icon-grid-1x2",
              Alcov: "icon-grid-3x3",
            };

            return (
              <label
                key={typeName}
                className={`${css.featureItem} ${isSelected ? css.selected : ""}`}
              >
                <input
                  type="radio"
                  name="vehicleType"
                  value={typeName}
                  checked={isSelected}
                  onChange={() => setType(typeName)}
                />

                <div className={css.featureIcon}>
                  <svg width={32} height={32}>
                    <use href={`/symbol-defs.svg#${typeIcons[typeName]}`}></use>
                  </svg>
                </div>

                <span className={css.featureLabel}>{typeName}</span>
              </label>
            );
          })}
        </div>
      </div>

      <button onClick={handleSearch} className={`${css.searchBtn} basicBtn`}>
        Search
      </button>
    </div>
  );
}
