"use client";
import Link from "next/link";
import { FaPlay } from "react-icons/fa6";

function StoryCard({ data }) {
  return (
    <Link href={`/story/${data.slug}`}>
      <div className="relative">
        <img
          src={process.env.NEXT_PUBLIC_ASSETS_URL + data.image}
          alt={data.name}
          className="rounded-lg"
        />
        <div
          className="text-xs absolute bottom-1 right-1 text-white rounded-lg p-1.5 px-2.5"
          style={{ backgroundColor: "rgba(75, 85, 99, .7)" }}
        >
          {data.length} دقیقه
        </div>
        <div
          className="text-xs absolute bottom-1 left-1 text-white rounded-lg p-1.5 px-2.5 flex items-center justify-center gap-1"
          style={{ backgroundColor: "rgba(75, 85, 99, .7)" }}
        >
          <div>{data.plays}</div>
          <FaPlay className="text-xl" />
        </div>
      </div>
    </Link>
  );
}

export default StoryCard;
