// store/dogsStore.ts
import { create } from "zustand";
import { api } from "@/lib/api";

// Core interfaces
interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

interface SearchFilters {
  breeds: string[];
  zipCodes: string[];
  ageMin?: number;
  ageMax?: number;
  sort: "breed:asc" | "breed:desc";
  size: number;
}

type DogsState = {
  // Data
  dogs: Dog[];
  favorites: Set<string>;
  breeds: string[];
  matchedDog: Dog | null;

  // UI State
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;

  // Search Filters
  filters: SearchFilters;

  // Actions
  fetchDogs: (page?: number) => Promise<void>;
  fetchBreeds: () => Promise<void>;
  toggleFavorite: (dogId: string) => void;
  updateFilters: (newFilters: Partial<SearchFilters>) => void;
  generateMatch: () => Promise<void>;
  resetFilters: () => void;
  clearMatch: () => void;
};

const DEFAULT_FILTERS: SearchFilters = {
  breeds: [],
  zipCodes: [],
  ageMin: undefined,
  ageMax: undefined,
  sort: "breed:asc",
  size: 20,
};

export const useDogsStore = create<DogsState>()((set, get) => ({
  // Initial State
  dogs: [],
  favorites: new Set(),
  breeds: [],
  matchedDog: null,
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
  error: null,
  filters: DEFAULT_FILTERS,

  // Actions
  fetchDogs: async (page = 1) => {
    set({ isLoading: true, error: null });
    try {
      const { filters } = get();
      const searchResult = await api.dogs.search({
        ...filters,
        from: (page - 1) * filters.size,
      });

      const dogs = await api.dogs.getById(searchResult.resultIds);
      set({
        dogs,
        currentPage: page,
        totalPages: Math.ceil(searchResult.total / filters.size),
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch dogs",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchBreeds: async () => {
    try {
      const breeds = await api.dogs.getBreeds();
      set({ breeds });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch breeds",
      });
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

  updateFilters: (newFilters: Partial<SearchFilters>) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
    get().fetchDogs(1); // Reset to first page when filters change
  },

  generateMatch: async () => {
    set({ isLoading: true, error: null });
    try {
      const favoriteIds = Array.from(get().favorites);
      if (favoriteIds.length === 0) {
        throw new Error("No favorites selected");
      }
      const { match } = await api.dogs.generateMatch(favoriteIds);
      const [matchedDog] = await api.dogs.getById([match]);
      set({ matchedDog });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to generate match",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  resetFilters: () => {
    set({ filters: DEFAULT_FILTERS });
    get().fetchDogs(1);
  },

  clearMatch: () => {
    set({ matchedDog: null });
  },
}));
