import { create } from "zustand";
import { Camper } from "./api";

interface CamperStore {
  campers: Camper[];
  favorites: string[];
  setCampers: (campers: Camper[]) => void;
  toggleFavorite: (id: string) => void;
  loadFavorites: () => void;
}

export const useCamperStore = create<CamperStore>((set, get) => ({
  campers: [],
  favorites: [],
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
