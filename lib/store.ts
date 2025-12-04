import { create } from "zustand";
import { Camper } from "./api";

interface CamperStore {
  campers: Camper[];
  favorites: string[];

  page: number;
  limit: number;
  hasMore: boolean;
  loading: boolean;

  filters: {
    location?: string;
    type?: string;
    features: string[];
  };

  setFilters: (filters: Partial<CamperStore["filters"]>) => void;
  toggleFeature: (feature: string) => void;
  fetchCampers: (reset?: boolean) => Promise<void>;

  setCampers: (campers: Camper[]) => void;
  toggleFavorite: (id: string) => void;
  loadFavorites: () => void;
}

export const useCamperStore = create<CamperStore>((set, get) => ({
  campers: [],
  favorites: [],

  page: 1,
  limit: 4,
  hasMore: true,
  loading: false,
  filters: {
    location: "",
    type: "",
    features: [],
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      page: 1,
      campers: [],
      hasMore: true,
    }));
    get().fetchCampers(true);
  },

  toggleFeature: (feature) => {
    const { features } = get().filters;
    const updated = features.includes(feature)
      ? features.filter((f) => f !== feature)
      : [...features, feature];

    set({
      filters: { ...get().filters, features: updated },
      page: 1,
      campers: [],
      hasMore: true,
    });

    get().fetchCampers(true);
  },

  // fetchCampers: async (reset = false) => {
  //   const { page, limit, filters } = get();
  //   set({ loading: true });

  //   const preparedFilters: Record<string, string> = {
  //     ...(filters.location ? { location: filters.location } : {}),
  //     ...(filters.type ? { type: filters.type } : {}),
  //     ...(filters.features.length
  //       ? { features: filters.features.join(",") }
  //       : {}),
  //   };

  //   const currentPage = reset ? 1 : page;

  //   try {
  //     const items = await getCampers(currentPage, limit, preparedFilters);
  //     set({
  //       campers: reset ? items : [...get().campers, ...items],
  //       page: reset ? 2 : page + 1,
  //       hasMore: items.length === limit,
  //       loading: false,
  //     });
  //   } catch (e) {
  //     set({ loading: false });
  //     throw e;
  //   }
  // },

  fetchCampers: async (reset = false) => {
    const { filters, campers, page, limit } = get();

    const params = new URLSearchParams();

    if (filters.type) params.append("form", filters.type);
    if (filters.location) params.append("location", filters.location);

    filters.features.forEach((feature) => {
      params.append(`amenities[${feature}]`, "true");
    });

    params.append("page", reset ? "1" : page.toString());
    params.append("limit", limit.toString());

    const res = await fetch(
      `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers?${params.toString()}`
    );

    const data = await res.json();

    // ⚠️ MockAPI повертає МАСИВ
    const newCampers = Array.isArray(data) ? data : data.items || [];

    set({
      campers: reset ? newCampers : [...campers, ...newCampers],
      page: reset ? 2 : page + 1,
      hasMore: newCampers.length === limit,
    });
  },

  setCampers: (campers) => set({ campers }),
  toggleFavorite: (id) => {
    let updatedFavorites: string[];
    if (get().favorites.includes(id)) {
      updatedFavorites = get().favorites.filter((fav) => fav !== id);
    } else {
      updatedFavorites = [...get().favorites, id];
    }
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    set({ favorites: updatedFavorites });
  },
  loadFavorites: () => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
    set({ favorites: saved });
  },
}));
