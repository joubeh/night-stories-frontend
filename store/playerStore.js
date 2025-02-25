import { create } from "zustand";
import api from "@/lib/api";

export const usePlayerStore = create((set, get) => ({
  currentTrack: null,
  playlist: [],
  whatIsPlaying: null,
  lastSentTime: 0,

  stopPlaying: () =>
    set({ playlist: [], currentTrack: null, whatIsPlaying: null }),
  setPlaylist: (tracks) => set({ playlist: tracks }),
  setCurrentTrack: (track) => set({ currentTrack: track }),
  setWhatIsPlaying: (track) => set({ whatIsPlaying: track }),
  setLastSentTime: (time) => set({ lastSentTime: time }),
  sendPlayProgress: (currentTime) => {
    const whatIsPlaying = get().whatIsPlaying;
    if (whatIsPlaying && currentTime - get().lastSentTime >= 10) {
      api(
        `/api/story/${whatIsPlaying.id}/play/progress?session=${whatIsPlaying.session}&until=${currentTime}`,
        {
          method: "POST",
        }
      );
      set({ lastSentTime: currentTime });
    }
  },
}));
