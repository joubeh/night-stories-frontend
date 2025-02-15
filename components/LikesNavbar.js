"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaMagnifyingGlass, FaCirclePlus, FaFolder } from "react-icons/fa6";

export default function Navbar({
  searchTerm,
  setSearchTerm,
  folders,
  folderFilter,
  setFolderFilter,
}) {
  const [lazySearch, setLazySearch] = useState(searchTerm);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchTerm(lazySearch);
    }, 1500);
    return () => clearTimeout(timeoutId);
  }, [lazySearch]);

  return (
    <div className="w-full">
      <div className="p-3 bg-c1 text-white mx-auto rounded-b-lg shadow-lg max-w-xl">
        <div className="text-sm text-center">
          قصه شب برای همه بچه‌های این سرزمین
        </div>
        <div className="text-xs text-center">
          (بنیاد نظریانی |{" "}
          <a href="https://nazariani.org" target="_blank">
            Nazariani.org
          </a>
          )
        </div>
        <div className="relative mt-3">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-white">
            <FaMagnifyingGlass />
          </div>
          <input
            value={lazySearch}
            onInput={(e) => setLazySearch(e.target.value)}
            type="text"
            className="text-white bg-c2 text-xs rounded-lg block w-full ps-10 p-2.5 shadow-lg"
            placeholder="جستجو"
          />
        </div>
        <div
          className="mt-3 flex items-center gap-1 md:pb-1"
          style={{ overflowY: "hidden", overflowX: "auto" }}
        >
          <Link
            href="/folder/create"
            className={`text-center bg-c2 text-xs p-1 px-4 rounded-full cursor-pointer hover:text-c3  shadow-lg hover:shadow-none`}
            style={{ minWidth: "max-content" }}
          >
            <div
              className="flex items-center justify-center gap-1"
              style={{ minWidth: "max-content" }}
            >
              <FaCirclePlus />
              <span>افزودن پوشه</span>
            </div>
          </Link>
          {folders.map((c) => {
            return (
              <div
                onClick={(e) => {
                  setFolderFilter(c.id);
                }}
                key={c.id}
                className={`text-center bg-c2 text-xs p-1 px-4 rounded-full cursor-pointer hover:text-c3 ${
                  folderFilter === c.id && "text-c3"
                } shadow-lg hover:shadow-none`}
                style={{ minWidth: "max-content" }}
              >
                <div
                  className="flex items-center justify-center gap-1"
                  style={{ minWidth: "max-content" }}
                >
                  <FaFolder />
                  <span>{c.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
