import { create } from "zustand";

// type AlertState = {
//   message: string | null;
//   type: "ok" | "error" | null;
//   showAlert: (message: string, type: AlertState["type"]) => void;
//   hideAlert: () => void;
//   resetOnNavigation: () => void;
// };

export const useAlertStore = create((set) => ({
  message: null,
  type: null,
  showAlert: (message, type) => set({ message, type }),
  hideAlert: () => set({ message: null, type: null }),
  resetOnNavigation: () => set({ message: null, type: null }), // Clears the alert
}));
