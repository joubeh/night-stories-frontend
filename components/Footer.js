"use client";
import Link from "next/link";
import Player from "@/components/Player";
import { usePathname } from "next/navigation";
import { FaCircleXmark } from "react-icons/fa6";

export default function Footer() {
  const pathname = usePathname();

  function getActive(path) {
    if (pathname == path) {
      return "text-c3";
    }
    return "";
  }

  return (
    <div className="fixed bottom-0 right-0 w-full">
      <Player />
      <div className="flex items-center justify-around gap-1 text-white bg-c1 p-3 md:max-w-xl md:mx-auto">
        <Link href="/" className={getActive("/")}>
          <div className="w-max mx-auto">
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="w-max mx-auto mt-1 text-sm">خانه</div>
        </Link>
        <Link href="/likes" className={getActive("/likes")}>
          <div className="w-max mx-auto">
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
            </svg>
          </div>
          <div className="w-max mx-auto mt-1 text-sm">پسند ها</div>
        </Link>
        <Link href="/search" className={getActive("/search")}>
          <div className="w-max mx-auto">
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z" />
              <path
                fillRule="evenodd"
                d="M21.707 21.707a1 1 0 0 1-1.414 0l-3.5-3.5a1 1 0 0 1 1.414-1.414l3.5 3.5a1 1 0 0 1 0 1.414Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="w-max mx-auto mt-1 text-sm">جستجو</div>
        </Link>
        <Link href="/account" className={getActive("/account")}>
          <div className="w-max mx-auto">
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="w-max mx-auto mt-1 text-sm">حساب</div>
        </Link>
        <Link href="/about-us" className={getActive("/about-us")}>
          <div className="w-max mx-auto">
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="w-max mx-auto mt-1 text-sm">درباره ما</div>
        </Link>
      </div>
    </div>
  );
}
