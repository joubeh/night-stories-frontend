"use client";

import { useEffect, useState, useRef } from "react";
import { usePlayerStore } from "@/store/playerStore";
import "aplayer/dist/APlayer.min.css";
import dynamic from "next/dynamic";
const APlayer = dynamic(() => import("aplayer"), { ssr: false });

export default function Player() {
  const playerRef = useRef(null);
  const { tracks, trackIndex, isPlaying } = usePlayerStore();

  useEffect(() => {
    if (!isPlaying) return;
    if (playerRef.current) {
      const player = new APlayer({
        container: playerRef.current,
        audio: tracks,
        listFolded: true,
      });
      if (player) {
        if (player.list) {
          player.list.switch(trackIndex);
        }
        player.play();
      }
    }
  }, [isPlaying]);

  return (
    <div className="border-b-2 border-c3 text-gray-300 md:max-w-xl md:mx-auto">
      <div ref={playerRef} className="m-0 bg-c1"></div>
    </div>
  );
}
