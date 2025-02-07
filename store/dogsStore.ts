// store/dogsStore.ts
import { create } from "zustand";

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

interface DogsState {
  dogs: Dog[];
  favorites: Set<string>;
  breeds: string[];
  currentPage: number;
  totalPages: number;
  sortOrder: "asc" | "desc";
  selectedBreeds: string[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchDogs: (page?: number) => Promise<void>;
  fetchBreeds: () => Promise<void>;
  toggleFavorite: (dogId: string) => void;
  setSortOrder: (order: "asc" | "desc") => void;
  setSelectedBreeds: (breeds: string[]) => void;
  generateMatch: () => Promise<string | null>;
}

export const useDogsStore = create<DogsState>((set, get) => ({
  dogs: [],
  favorites: new Set(),
  breeds: [],
  currentPage: 1,
  totalPages: 1,
  sortOrder: "asc",
  selectedBreeds: [],
  isLoading: false,
  error: null,

  fetchDogs: async (page = 1) => {
    set({ isLoading: true, error: null });
    try {
      const searchParams = new URLSearchParams({
        size: "20",
        from: ((page - 1) * 20).toString(),
        sort: `breed:${get().sortOrder}`,
      });

      if (get().selectedBreeds.length > 0) {
        get().selectedBreeds.forEach((breed) =>
          searchParams.append("breeds", breed)
        );
      }

      const response = await fetch(
        `https://frontend-take-home-service.fetch.com/dogs/search?${searchParams}`,
        { credentials: "include" }
      );

      if (!response.ok) throw new Error("Failed to fetch dogs");

      const searchResult = await response.json();

      // Fetch actual dog details
      const dogsResponse = await fetch(
        "https://frontend-take-home-service.fetch.com/dogs",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(searchResult.resultIds),
        }
      );

      if (!dogsResponse.ok) throw new Error("Failed to fetch dog details");

      const dogs = await dogsResponse.json();

      set({
        dogs,
        currentPage: page,
        totalPages: Math.ceil(searchResult.total / 20),
      });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchBreeds: async () => {
    try {
      const response = await fetch(
        "https://frontend-take-home-service.fetch.com/dogs/breeds",
        { credentials: "include" }
      );

      if (!response.ok) throw new Error("Failed to fetch breeds");

      const breeds = await response.json();
      set({ breeds });
    } catch (error) {
      set({ error: error.message });
    }
  },

  toggleFavorite: (dogId: string) => {
    set((state) => {
      const newFavorites = new Set(state.favorites);
      if (newFavorites.has(dogId)) {
        newFavorites.delete(dogId);
      } else {
        newFavorites.add(dogId);
      }
      return { favorites: newFavorites };
    });
  },

  setSortOrder: (order: "asc" | "desc") => {
    set({ sortOrder: order });
    get().fetchDogs(1);
  },

  setSelectedBreeds: (breeds: string[]) => {
    set({ selectedBreeds: breeds });
    get().fetchDogs(1);
  },

  generateMatch: async () => {
    try {
      const favoriteIds = Array.from(get().favorites);
      if (favoriteIds.length === 0) return null;

      const response = await fetch(
        "https://frontend-take-home-service.fetch.com/dogs/match",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(favoriteIds),
        }
      );

      if (!response.ok) throw new Error("Failed to generate match");

      const { match } = await response.json();
      return match;
    } catch (error) {
      set({ error: error.message });
      return null;
    }
  },
}));
