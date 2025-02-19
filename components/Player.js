"use client";

import { useEffect, useState, useRef } from "react";
import { usePlayerStore } from "@/store/playerStore";
import "aplayer/dist/APlayer.min.css";
import { FaCircleXmark } from "react-icons/fa6";

export default function Player() {
  const playerRef = useRef(null);
  const { tracks, trackIndex, isPlaying, setPlayerInstance, stopPlaying } =
    usePlayerStore();
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    setIsPlayerVisible(true);
    if (playerRef.current) {
      import("aplayer").then(({ default: APlayer }) => {
        const { playerInstance } = usePlayerStore.getState();

        // Destroy the existing player if it exists
        if (playerInstance) {
          playerInstance.destroy();
        }

        const player = new APlayer({
          container: playerRef.current,
          audio: tracks,
          listFolded: true,
        });

        // Set player instance in the store and attach event listeners
        setPlayerInstance(player);

        player.list.switch(trackIndex);
        player.play();
      });
    }
  }, [isPlaying, tracks, trackIndex, setPlayerInstance]);

  return (
    <div
      className={`border-b-2 border-c3 text-gray-300 md:max-w-xl md:mx-auto ${
        !isPlayerVisible && "hidden"
      }`}
    >
      <div className="p-1 pb-[1px]">
        <FaCircleXmark
          onClick={(e) => {
            stopPlaying();
            setIsPlayerVisible(false);
          }}
          className="text-red-600 text-xl bg-white rounded-full"
        />
      </div>
      <div ref={playerRef} className="m-0 bg-c1"></div>
    </div>
  );
}
