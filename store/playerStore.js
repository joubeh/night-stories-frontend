import { create } from "zustand";

export const usePlayerStore = create((set, get) => ({
  tracks: [],
  trackIndex: 0,
  isPlaying: false,

  stopPlaying: async () => {
    set({ isPlaying: false, tracks: [], trackIndex: 0 });
  },

  setTracks: async (tracks) => {
    set({ tracks });
  },

  playTrack: async (index) => {
    set({ trackIndex: index, isPlaying: true });
  },
}));
