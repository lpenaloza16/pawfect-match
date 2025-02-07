// store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  name: string;
  email: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (name: string, email: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (name: string, email: string) => {
        try {
          const response = await fetch(
            "https://frontend-take-home-service.fetch.com/auth/login",
            {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name, email }),
            }
          );

          if (!response.ok) throw new Error("Login failed");

          set({
            user: { name, email },
            isAuthenticated: true,
          });
        } catch (error) {
          console.error("Login error:", error);
          throw error;
        }
      },
      logout: async () => {
        try {
          await fetch(
            "https://frontend-take-home-service.fetch.com/auth/logout",
            {
              method: "POST",
              credentials: "include",
            }
          );
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
