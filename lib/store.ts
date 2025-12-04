import { create } from "zustand";
import { Camper } from "./api";

interface CamperStore {
  campers: Camper[];
  favorites: string[];

  page: number;
  limit: number;
  hasMore: boolean;
  loading: boolean;
  filters: Record<string, string>;

  setFilters: (filters: Record<string, string>) => void;
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
  filters: {},

  setFilters: (filters) => {
    set({
      filters,
      page: 1,
      campers: [],
      hasMore: true,
    });
    get().fetchCampers(true);
  },

  fetchCampers: async (reset = false) => {
    const { page, limit, filters } = get();
    set({ loading: true });

    const params = new URLSearchParams({
      page: reset ? "1" : String(page),
      limit: String(limit),
      ...filters,
    });

    const res = await fetch(
      `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers?${params}`
    );

    const data = await res.json();

    const items = data.items || data;

    set({
      campers: reset ? items : [...get().campers, ...items],
      page: reset ? 2 : page + 1,
      hasMore: items.length === limit,
      loading: false,
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
