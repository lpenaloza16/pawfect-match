// store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "@/lib/api";

interface User {
  name: string;
  email: string;
}

type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;
  login: (name: string, email: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (name: string, email: string) => {
        try {
          await api.auth.login(name, email);
          set({ user: { name, email }, isAuthenticated: true });
        } catch (error) {
          console.error("Login error:", error);
          throw error;
        }
      },
      logout: async () => {
        try {
          await api.auth.logout();
          set({ user: null, isAuthenticated: false });
        } catch (error) {
          console.error("Logout error:", error);
          throw error;
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
