"use client";

import { useCamperStore } from "@/lib/store";
import css from "./ Filters.module.css";
const camperTypes = [
  { value: "panel", label: "Panel Truck" },
  { value: "fullyIntegrated", label: "Fully Integrated" },
  { value: "alcove", label: "Alcove" },
];

const featuresList = [
  { key: "AC", label: "AC" },
  { key: "kitchen", label: "Kitchen" },
  { key: "bathroom", label: "Bathroom" },
  { key: "TV", label: "TV" },
  { key: "radio", label: "Radio" },
  { key: "refrigerator", label: "Refrigerator" },
  { key: "microwave", label: "Microwave" },
  { key: "gas", label: "Gas" },
  { key: "water", label: "Water" },
];

export default function Filters() {
  const { filters, setFilters, toggleFeature } = useCamperStore();

  return (
    <aside className={css.filtersWrapper}>
      {/* LOCATION */}
      <div className={css.filterBlock}>
        <label className={css.label}>Location</label>
        <input
          type="text"
          placeholder="Enter city"
          className={css.input}
          value={filters.location || ""}
          onChange={(e) => setFilters({ location: e.target.value })}
        />
      </div>

      {/* TYPE */}
      <div className={css.filterBlock}>
        <label className={css.label}>Vehicle Type</label>
        <div className={css.typeList}>
          {camperTypes.map((type) => (
            <button
              key={type.value}
              className={`${css.typeBtn} ${
                filters.type === type.value ? css.active : ""
              }`}
              onClick={() =>
                setFilters({
                  type: filters.type === type.value ? "" : type.value,
                })
              }
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <div className={css.filterBlock}>
        <label className={css.label}>Features</label>
        <div className={css.featuresList}>
          {featuresList.map((feature) => (
            <label key={feature.key} className={css.featureItem}>
              <input
                type="checkbox"
                checked={filters.features.includes(feature.key)}
                onChange={() => toggleFeature(feature.key)}
              />
              {feature.label}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
