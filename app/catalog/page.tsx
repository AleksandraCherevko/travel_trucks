// // "use client";

// // import { getCampers } from "@/lib/api";
// // import CamperList from "@/components/CamperList/CamperList";

// // const Campers = async () => {
// //   const response = await getCampers();
// //   return (
// //     <section>
// //       {response?.items?.length > 0 && <CamperList campers={response.items} />}
// //     </section>
// //   );
// // };

// // export default Campers;

// "use client";

// import { useEffect } from "react";
// import { useCamperStore } from "@/lib/store";
// import CamperList from "@/components/CamperList/CamperList";
// import Container from "@/components/Container/Container";
// import css from "./page.module.css";
// import Filters from "@/components/Filters/Filters";

// type FiltersType = {
//   location?: string;
//   type?: string;
//   features: string[];
// };
// export default function CatalogPage() {
//   const {
//     campers,
//     fetchCampers,
//     hasMore,
//     loading,
//     filters,
//     setFilters,
//     loadFavorites,
//   } = useCamperStore();

//   useEffect(() => {
//     loadFavorites();
//     fetchCampers(true);
//   }, []);

//   const handleFiltersChange = (updatedFilters: FiltersType) => {
//     setFilters(updatedFilters);
//   };

//   return (
//     <Container>
//       <div className={css.catalogPage}>
//         <div>
//           <Filters
//             filters={filters}
//             onChange={handleFiltersChange}
//             onClearAll={() => setFilters({})}
//           />
//         </div>
//         <div className={css.catalogCardsWrapper}>
//           <CamperList campers={campers} />

//           {hasMore && (
//             <button
//               className={css.loadMoreBtn}
//               onClick={() => fetchCampers()}
//               disabled={loading}
//             >
//               {loading ? "Loading..." : "Load More"}
//             </button>
//           )}
//         </div>
//       </div>
//     </Container>
//   );
// }

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

  // Загружаем избранные и первичные данные при монтировании
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
            <p>No campers found with these filters.</p>
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
