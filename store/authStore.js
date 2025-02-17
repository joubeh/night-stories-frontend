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
      localStorage.removeItem("auth_token");
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error("Logout failed", error);
    }
  },

  login: (user, token) => {
    localStorage.setItem("auth_token", token);
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
