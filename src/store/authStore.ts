import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,

  // Load user from localStorage (safe on client only)
  loadUser: () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("user");
      if (stored) {
        set({ user: JSON.parse(stored) });
      }
    }
  },

  setUser: (user) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user));
    }
    set({ user });
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    set({ user: null });
  },
}));
