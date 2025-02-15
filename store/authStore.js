import { create } from "zustand";
import api from "@/lib/api";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  code: null,
  phone: null,
  action: null,

  setCode: (code) => set({ code }),
  setPhone: (phone) => set({ phone }),
  setAction: (action) => set({ action }),

  logout: async () => {
    try {
      await api("/api/auth/logout", { method: "POST" });
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error("Logout failed", error);
    }
  },

  login: (user) => {
    set({ user: user, isAuthenticated: true });
  },

  checkAuth: async () => {
    try {
      const response = await api("/api/user", { method: "GET" });
      set({ user: response, isAuthenticated: true });
    } catch {
      set({ user: null, isAuthenticated: false });
    }
  },
}));
