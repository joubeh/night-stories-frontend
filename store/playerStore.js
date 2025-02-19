import { create } from "zustand";

export const usePlayerStore = create((set, get) => ({
  tracks: [],
  trackIndex: 0,
  isPlaying: false,
  playerInstance: null,
  currentTrack: null,

  stopPlaying: () => {
    const player = get().playerInstance;
    if (player) {
      player.pause();
    }
    set({
      isPlaying: false,
      tracks: [],
      trackIndex: 0,
      playerInstance: null,
      currentTrack: null,
    });
  },

  setTracks: (tracks) => {
    set({ tracks });
  },

  playTrack: (index) => {
    const { playerInstance, tracks } = get();
    set({ trackIndex: index, isPlaying: true, currentTrack: tracks[index] });

    if (playerInstance) {
      playerInstance.list.switch(index);
      playerInstance.play();
    }
  },

  setPlayerInstance: (player) => {
    set({ playerInstance: player });

    // Listen for track changes inside APlayer
    player.on("listswitch", (event) => {
      const newIndex = event.index;
      const tracks = get().tracks;
      set({ trackIndex: newIndex, currentTrack: tracks[newIndex] });
    });

    player.on("play", () => {
      set({ isPlaying: true });
    });

    player.on("pause", () => {
      set({ isPlaying: false });
    });
  },
}));
