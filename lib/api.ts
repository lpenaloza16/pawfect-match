// lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface SearchParams {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  from?: number;
  sort?: string;
}

export interface LocationSearchParams {
  city?: string;
  states?: string[];
  geoBoundingBox?: {
    top?: Coordinates;
    left?: Coordinates;
    bottom?: Coordinates;
    right?: Coordinates;
    bottom_left?: Coordinates;
    top_right?: Coordinates;
  };
  size?: number;
  from?: number;
}

export const api = {
  auth: {
    login: async (name: string, email: string) => {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      if (!response.ok) throw new Error("Login failed");
      return response;
    },

    logout: async () => {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Logout failed");
      return response;
    },
  },

  dogs: {
    search: async (params: SearchParams) => {
      const searchParams = new URLSearchParams();

      if (params.breeds?.length) {
        params.breeds.forEach((breed) => searchParams.append("breeds", breed));
      }
      if (params.zipCodes?.length) {
        params.zipCodes.forEach((zip) => searchParams.append("zipCodes", zip));
      }
      if (params.ageMin)
        searchParams.append("ageMin", params.ageMin.toString());
      if (params.ageMax)
        searchParams.append("ageMax", params.ageMax.toString());
      if (params.size) searchParams.append("size", params.size.toString());
      if (params.from) searchParams.append("from", params.from.toString());
      if (params.sort) searchParams.append("sort", params.sort);

      const response = await fetch(
        `${API_BASE_URL}/dogs/search?${searchParams}`,
        { credentials: "include" }
      );
      if (!response.ok) throw new Error("Failed to fetch dogs");
      return response.json();
    },

    getById: async (dogIds: string[]) => {
      const response = await fetch(`${API_BASE_URL}/dogs`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dogIds),
      });
      if (!response.ok) throw new Error("Failed to fetch dog details");
      return response.json();
    },

    getBreeds: async () => {
      const response = await fetch(`${API_BASE_URL}/dogs/breeds`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch breeds");
      return response.json();
    },

    generateMatch: async (favoriteIds: string[]) => {
      const response = await fetch(`${API_BASE_URL}/dogs/match`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(favoriteIds),
      });
      if (!response.ok) throw new Error("Failed to generate match");
      return response.json();
    },
  },

  locations: {
    search: async (params: LocationSearchParams) => {
      const response = await fetch(`${API_BASE_URL}/locations/search`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });
      if (!response.ok) throw new Error("Failed to search locations");
      return response.json();
    },

    getByZipCodes: async (zipCodes: string[]) => {
      const response = await fetch(`${API_BASE_URL}/locations`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(zipCodes),
      });
      if (!response.ok) throw new Error("Failed to fetch locations");
      return response.json();
    },
  },
};
