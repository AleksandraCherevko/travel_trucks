"use client";

import { useEffect } from "react";
import { useCamperStore } from "@/lib/store";
import CamperList from "@/components/CamperList/CamperList";
import Container from "@/components/Container/Container";
import css from "./page.module.css";
import Filters from "@/components/Filters/Filters";

type FiltersType = {
  location?: string;
  type?: string;
  features: string[];
};

export default function CatalogPage() {
  const {
    campers,
    fetchCampers,
    hasMore,
    loading,
    filters,
    setFilters,
    loadFavorites,
  } = useCamperStore();

  useEffect(() => {
    loadFavorites();
    fetchCampers(true);
  }, [loadFavorites, fetchCampers]);

  const handleFiltersChange = (updatedFilters: FiltersType) => {
    setFilters(updatedFilters);
  };

  const handleClearAll = () => {
    setFilters({ location: "", type: "", features: [] });
  };

  return (
    <Container>
      <div className={css.catalogPage}>
        <div>
          <Filters
            filters={filters}
            onChange={handleFiltersChange}
            onClearAll={handleClearAll}
          />
        </div>
        <div className={css.catalogCardsWrapper}>
          {campers.length === 0 && !loading ? (
            <div className={css.noCampersFoundWrapper}>
              <div className={css.noCampersFoundCard}>
                <p className={css.noCampersFoundMessage}>
                  No campers found with these filters!
                </p>
              </div>
            </div>
          ) : (
            <CamperList campers={campers} />
          )}

          {hasMore && campers.length > 0 && (
            <button
              className={css.loadMoreBtn}
              onClick={() => fetchCampers()}
              disabled={loading}
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          )}
        </div>
      </div>
    </Container>
  );
}
