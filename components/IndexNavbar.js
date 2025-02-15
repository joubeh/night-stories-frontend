"use client";
import { useState, useEffect } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function Navbar({
  categories,
  searchTerm,
  setSearchTerm,
  filter,
  setFilter,
  resetData,
}) {
  const [lazySearch, setLazySearch] = useState(searchTerm);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchTerm(lazySearch);
      resetData();
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
          <div
            onClick={(e) => {
              setFilter("all");
              resetData();
            }}
            className={`text-center bg-c2 text-xs p-1 px-4 rounded-full cursor-pointer hover:text-c3 ${
              filter === "all" && "text-c3"
            }  shadow-lg hover:shadow-none`}
            style={{ minWidth: "max-content" }}
          >
            <div className="text-center" style={{ minWidth: "max-content" }}>
              همه
            </div>
          </div>
          <div
            onClick={(e) => {
              setFilter("plays");
              resetData();
            }}
            className={`text-center bg-c2 text-xs p-1 px-4 rounded-full cursor-pointer hover:text-c3 ${
              filter === "plays" && "text-c3"
            }  shadow-lg hover:shadow-none`}
            style={{ minWidth: "max-content" }}
          >
            <div className="text-center" style={{ minWidth: "max-content" }}>
              محبوب ترین
            </div>
          </div>
          {categories.map((c) => {
            return (
              <div
                onClick={(e) => {
                  setFilter(`${c.id}`);
                  resetData();
                }}
                key={c.id}
                className={`text-center bg-c2 text-xs p-1 px-4 rounded-full cursor-pointer hover:text-c3 ${
                  filter === "" + c.id && "text-c3"
                } shadow-lg hover:shadow-none`}
                style={{ minWidth: "max-content" }}
              >
                <div
                  className="text-center"
                  style={{ minWidth: "max-content" }}
                >
                  {c.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
