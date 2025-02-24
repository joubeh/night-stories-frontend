"use client";

import { useEffect, useRef } from "react";
import { usePlayerStore } from "@/store/playerStore";
import "aplayer/dist/APlayer.min.css";

export default function Player() {
  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const {
    currentTrack,
    playlist,
    setWhatIsPlaying,
    lastSentTime,
    setLastSentTime,
    sendPlayProgress,
  } = usePlayerStore();
  const audioContextRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
    }

    if (playerContainerRef.current && !playerRef.current) {
      import("aplayer").then(({ default: APlayer }) => {
        playerRef.current = new APlayer({
          container: playerContainerRef.current,
          audio: [],
          theme: "#299c95",
          autoplay: true,
          listFolded: true,
          volume: 1,
          loop: "all",
          preload: "auto",
          order: "list",
          mutex: true,
        });

        // Handle track end event
        playerRef.current.on("ended", () => {
          // Request audio focus when switching tracks
          if (audioContextRef.current?.state === "suspended") {
            audioContextRef.current.resume();
          }
        });

        // Handle play event
        playerRef.current.on("play", () => {
          // Request audio focus when playing
          if (audioContextRef.current?.state === "suspended") {
            audioContextRef.current.resume();
          }
        });

        playerRef.current.on("listswitch", (e) => {
          const currentTrack = playerRef.current.list.audios[e.index];
          setWhatIsPlaying(currentTrack);
          setLastSentTime(0);
        });

        playerRef.current.on("timeupdate", function () {
          sendPlayProgress(Math.floor(playerRef.current.audio.currentTime));
        });
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (playerRef.current && playlist.length > 0) {
      playerRef.current.list.clear();
      playerRef.current.list.add(playlist);
      if (currentTrack) {
        const trackIndex = playlist.findIndex(
          (track) => track.url === currentTrack.url
        );
        if (trackIndex !== -1) {
          playerRef.current.list.switch(trackIndex);
          playerRef.current.play();
        }
      }
    }
  }, [playlist, currentTrack]);

  return (
    <div
      className={`border-b-2 border-c3 text-gray-300 md:max-w-xl md:mx-auto ${
        playlist.length === 0 && "hidden"
      }`}
    >
      <div ref={playerContainerRef} className="m-0 bg-c1"></div>
    </div>
  );
}
