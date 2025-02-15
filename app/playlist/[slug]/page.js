"use client";
import { useState, useEffect } from "react";
import StoryCard from "@/components/StoryCard";
import api from "@/lib/api";

export default function PlaylistPage({ params }) {
  const [playlist, setPlaylist] = useState(null);
  const [isIntroPlaying, setIsIntroPlaying] = useState(false);

  async function fetchPlaylist() {
    try {
      const res = await api(`/api/playlist/${(await params).slug}`, {
        method: "GET",
      });
      if (res.status === "ok") {
        setPlaylist(res.playlist);
      } else {
        fetchPlaylist();
      }
    } catch (e) {
      fetchPlaylist();
    }
  }

  useEffect(() => {
    fetchPlaylist();
  }, []);

  if (!playlist) return null;

  function playIntro() {
    setIsIntroPlaying(true);
  }

  return (
    <>
      <div className="relative md:pt-3">
        <div>
          {!isIntroPlaying && (
            <img
              className="md:max-w-[25rem] md:mx-auto md:rounded-lg"
              src={process.env.NEXT_PUBLIC_ASSETS_URL + playlist.image}
              alt={playlist.name}
            />
          )}
          {isIntroPlaying && playlist.intro_type === "video" && (
            <video
              className="md:max-w-[25rem] md:mx-auto md:rounded-lg"
              autoPlay
              loop
            >
              <source
                src={process.env.NEXT_PUBLIC_ASSETS_URL + playlist.intro_file}
              />
            </video>
          )}
          {isIntroPlaying && playlist.intro_type === "audio" && (
            <>
              <audio
                src={process.env.NEXT_PUBLIC_ASSETS_URL + playlist.intro_file}
                autoPlay
                className="hidden"
              ></audio>
              <img
                className="md:max-w-[25rem] md:mx-auto md:rounded-lg"
                src={playlist.image}
                alt={playlist.name}
              />
            </>
          )}
        </div>
        {!isIntroPlaying && playlist.intro_type !== "without_intro" ? (
          <div className="absolute bottom-1/2 right-0 w-full">
            <div
              onClick={(e) => playIntro()}
              className=" bg-gray-500 p-3 rounded-full text-white w-max mx-auto shadow-lg cursor-pointer"
              style={{ zIndex: "999999" }}
            >
              <svg
                className="w-8 h-8"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="absolute bottom-0 right-0 w-full">
          <div
            className="p-3 gap-1 md:max-w-[25rem] md:mx-auto bg-c2"
            style={{ backgroundColor: "rgba(0, 31, 51, 0.7)" }}
          >
            <div className="text-lg">{playlist.name}</div>
          </div>
        </div>
      </div>
      <div className="p-2 text-justify m-2 mb-0 md:max-w-xl md:mx-auto notSelectable">
        {playlist.intro_text}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-2 md:max-w-xl md:mx-auto">
        {playlist.stories.map((s) => {
          return <StoryCard key={s.id} data={s} />;
        })}
      </div>
      <div className="p-3 md:max-w-xl md:mx-auto">
        <div className="mt-3 text-center">
          &#169; کلیه حقوق برای{" "}
          <a href="https://nazariani.org" target="_blank" className="text-c3">
            «بنیاد نظریانی»
          </a>{" "}
          محفوظ است.
        </div>
      </div>
    </>
  );
}
