// hooks/useAuth.ts
import { create } from "zustand";

interface AuthState {
  user: null | { email: string };
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  login: async (credentials) => {
    // Implement your login logic here
    // Make API call to /api/auth/login
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const user = await response.json();
    set({ user });
  },
  logout: () => set({ user: null }),
}));
