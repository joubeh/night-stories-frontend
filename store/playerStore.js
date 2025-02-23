import { create } from "zustand";

export const usePlayerStore = create((set) => ({
  currentTrack: null,
  playlist: [],
  setPlaylist: (tracks) => set({ playlist: tracks }),
  setCurrentTrack: (track) => set({ currentTrack: track }),
}));
