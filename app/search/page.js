"use client";
import { useState, useEffect } from "react";
import StoryCard from "@/components/StoryCard";
import api from "@/lib/api";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function SearchPage() {
  const [stories, setStories] = useState([]);
  const [announcers, setAnnouncers] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [type_of_works, setTypeOfWorks] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [announcer, setAnnouncer] = useState("");
  const [playlist, setPlaylist] = useState("");
  const [language, setLanguage] = useState("");
  const [author, setAuthor] = useState("");
  const [type_of_work, setType_of_work] = useState("");

  async function fetchFilters() {
    try {
      const res = await api("/api/filters", { method: "GET" });
      if (res.status === "ok") {
        setStories(res.stories);
        setAnnouncers(res.announcers);
        setPlaylists(res.playlists);
        setLanguages(res.languages);
        setAuthors(res.authors);
        setTypeOfWorks(res.type_of_works);
      } else {
        fetchFilters();
      }
    } catch (e) {
      fetchFilters();
    }
  }

  useEffect(() => {
    fetchFilters();
  }, []);

  const handleCheckboxChange = (event, key) => {
    const value = event.target.value;
    const updateState = {
      language: setLanguage,
      author: setAuthor,
      type_of_work: setType_of_work,
    };

    if (updateState[key]) {
      updateState[key]((prev) =>
        event.target.checked
          ? [...prev, value]
          : prev.filter((item) => item !== value)
      );
    }
  };

  async function fetchData() {
    let requestUrl = "/api/search?";

    if (searchTerm && searchTerm !== "") requestUrl += `search=${searchTerm}&`;
    if (announcer) requestUrl += `announcer=${announcer}&`;
    if (playlist) requestUrl += `playlist=${playlist}&`;
    if (language.length > 0) requestUrl += `language=${language.join(",")}&`;
    if (author.length > 0) requestUrl += `author=${author.join(",")}&`;
    if (type_of_work.length > 0)
      requestUrl += `type_of_work=${type_of_work.join(",")}&`;

    try {
      const res = await api(requestUrl.slice(0, -1), { method: "GET" });
      if (res.status === "ok") {
        setStories(res.stories);
      }
    } catch (e) {
      console.log(e);
    }
  }

  function toggleAnnouncer(name) {
    if (name === announcer) setAnnouncer(null);
    else setAnnouncer(name);
  }

  function togglePlaylist(id) {
    if (playlist === id) setPlaylist(null);
    else setPlaylist(id);
  }

  return (
    <>
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
              value={searchTerm}
              onInput={(e) => setSearchTerm(e.target.value)}
              type="text"
              className="text-white bg-c2 text-xs rounded-lg block w-full ps-10 p-2.5 shadow-lg"
              placeholder="جستجو"
            />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-1">
            <div className="bg-c2 text-xs p-2">
              <div className="mb-2">گوینده</div>
              <div className="max-h-[9.5rem] overflow-y-scroll">
                {announcers.map((a) => {
                  return (
                    <button
                      onClick={(e) => toggleAnnouncer(a.name)}
                      key={a.id}
                      className={`flex items-center gap-2 p-1.5 ${
                        announcer === a.name ? "bg-c3" : "bg-c1"
                      } rounded-lg mb-1 w-full`}
                    >
                      <img
                        src={process.env.NEXT_PUBLIC_ASSETS_URL + a.image}
                        alt={a.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span>{a.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="bg-c2 text-xs p-2">
              <div className="mb-2">مجموعه</div>
              <div className="max-h-[9.5rem] overflow-y-scroll">
                {playlists.map((a) => {
                  return (
                    <button
                      onClick={(e) => togglePlaylist(a.id)}
                      key={a.id}
                      className={`flex items-center gap-2 p-1.5 ${
                        playlist === a.id ? "bg-c3" : "bg-c1"
                      } rounded-lg mb-1 w-full`}
                    >
                      <img
                        src={process.env.NEXT_PUBLIC_ASSETS_URL + a.image}
                        alt={a.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span>{a.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-1">
            <div>
              <div className="text-xs mb-2">زبان</div>
              <div className="h-[5.5rem] overflow-y-scroll">
                {languages.map((i, idx) => {
                  return (
                    <div key={i} className="flex items-start mb-2">
                      <div className="flex items-center h-5">
                        <input
                          id={`lang${idx}`}
                          type="checkbox"
                          className="w-3 h-3 border border-gray-300 rounded-sm bg-gray-50"
                          value={i}
                          onChange={(e) => handleCheckboxChange(e, "language")}
                          checked={language.includes(i)}
                        />
                      </div>
                      <label htmlFor={`lang${idx}`} className="ms-1 text-xs">
                        {i}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <div className="text-xs mb-2">نویسنده</div>
              <div className="h-[5.5rem] overflow-y-scroll">
                {authors.map((i) => {
                  return (
                    <div key={i.id} className="flex items-start mb-2">
                      <div className="flex items-center h-5">
                        <input
                          id={`author${i.id}`}
                          type="checkbox"
                          className="w-3 h-3 border border-gray-300 rounded-sm bg-gray-50"
                          value={i.name}
                          onChange={(e) => handleCheckboxChange(e, "author")}
                          checked={author.includes(i.name)}
                        />
                      </div>
                      <label htmlFor={`author${i.id}`} className="ms-1 text-xs">
                        {i.name}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <div className="text-xs mb-2">نوع اثر</div>
              <div className="h-[5.5rem] overflow-y-scroll">
                {type_of_works.map((i, idx) => {
                  return (
                    <div key={i} className="flex items-start mb-2">
                      <div className="flex items-center h-5">
                        <input
                          id={`tow${idx}`}
                          type="checkbox"
                          className="w-3 h-3 border border-gray-300 rounded-sm bg-gray-50"
                          value={i}
                          onChange={(e) =>
                            handleCheckboxChange(e, "type_of_work")
                          }
                          checked={type_of_work.includes(i)}
                        />
                      </div>
                      <label htmlFor={`tow${idx}`} className="ms-1 text-xs">
                        {i}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <button
            onClick={(e) => fetchData()}
            className="mt-3 w-full flex items-center justify-center p-2 text-white bg-c3 text-xs gap-1 rounded-lg"
          >
            <FaMagnifyingGlass />
            <span>جستجو</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-2 md:max-w-xl md:mx-auto">
        {stories.map((s) => {
          return <StoryCard key={s.id} data={s} />;
        })}
      </div>
    </>
  );
}
