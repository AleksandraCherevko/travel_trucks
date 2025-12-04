// "use client";

// import { getCampers } from "@/lib/api";
// import CamperList from "@/components/CamperList/CamperList";

// const Campers = async () => {
//   const response = await getCampers();
//   return (
//     <section>
//       {response?.items?.length > 0 && <CamperList campers={response.items} />}
//     </section>
//   );
// };

// export default Campers;

"use client";

import { useEffect } from "react";
import { useCamperStore } from "@/lib/store";
import CamperList from "@/components/CamperList/CamperList";
import Container from "@/components/Container/Container";
import css from "./page.module.css";

export default function CatalogPage() {
  const { campers, fetchCampers, hasMore, loading } = useCamperStore();

  useEffect(() => {
    fetchCampers(true);
  }, [fetchCampers]);

  return (
    <Container>
      <div className={css.catalogPage}>
        <div>
          <p>Filter</p>
        </div>
        <div className={css.catalogCardsWrapper}>
          <CamperList campers={campers} />

          {hasMore && (
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
