"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { FaCirclePlay } from "react-icons/fa6";
import "./roulette.css";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function RoulettePage() {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();
  const wheelRef = useRef(null);
  const [didSpin, setDidSpin] = useState(false);
  const [won, setWon] = useState(null);
  const [done, setDone] = useState(false);
  const [hasPrize, setHasPrize] = useState(false);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth");
    }
  }, [isAuthenticated, router]);

  async function fetchData() {
    try {
      const res = await api("/api/account/roulette", { method: "GET" });
      if (res.status === "ok") {
        setHasPrize(res.hasPrize);
        setStories(res.stories);
      } else {
        fetchData();
      }
    } catch (e) {
      fetchData();
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (stories.length === 0) return null;

  async function handleSpin() {
    if (didSpin) return;
    setDidSpin(true);
    const randomSeed = Math.random();
    const targetPoint = Math.ceil(randomSeed * 3600);
    const targetHalf = Math.ceil(
      Math.floor((targetPoint / 360 - Math.floor(targetPoint / 360)) * 100) /
        6.25
    );

    const blocksMap = [
      stories[0],
      stories[7],
      stories[7],
      stories[6],
      stories[6],
      stories[5],
      stories[5],
      stories[4],
      stories[4],
      stories[3],
      stories[3],
      stories[2],
      stories[2],
      stories[1],
      stories[1],
      stories[0],
    ];
    const stoppingBlock = blocksMap[targetHalf - 1];

    if (wheelRef.current) {
      wheelRef.current.style.transform = `rotate(${targetPoint}deg)`;
    }

    setWon(stoppingBlock);
    setTimeout(() => {
      setDone(true);
    }, 5000);

    try {
      const res = await api("/api/account/roulette/prize", {
        method: "POST",
        body: JSON.stringify({
          story_id: stoppingBlock.id,
        }),
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div className="p-5 md:max-w-xl md:mx-auto text-white">
        {hasPrize ? (
          <>
            <div className="flex items-center justify-center" dir="ltr">
              <div
                style={{
                  position: "relative",
                  width: 300,
                  height: 300,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  className="spinBtn text-xs"
                  onClick={(e) => {
                    handleSpin();
                  }}
                >
                  شروع
                </div>
                <div className="wheel" ref={wheelRef}>
                  {stories.map((s, idx) => (
                    <div
                      key={s.id}
                      className="number"
                      style={{
                        background: "#db7093",
                        transform: `rotate(calc(45deg * ${idx + 1}))`,
                      }}
                    >
                      <img
                        src={process.env.NEXT_PUBLIC_ASSETS_URL + s.image}
                        alt={s.name}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {won && done && (
              <div className="mt-8 text-sm">
                <div className="text-center">جایزه شما: {won.name}</div>
                <Link
                  href={`/story/${won.slug}`}
                  className="bg-c3 text-white text-xs flex items-center justify-center w-max mx-auto mt-2 rounded-lg py-1 px-3 gap-1"
                >
                  <FaCirclePlay />
                  <span>گوش دادن</span>
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="text-center">
            شما جایزه امروزتان را دریافت کردید. برای جایزه بعدی فردا دوباره به
            قسمت جایزه سربزنید.
          </div>
        )}
      </div>
    </>
  );
}
