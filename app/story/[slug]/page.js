"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaBuildingUser,
  FaCalendarDays,
  FaHeadset,
  FaCoins,
  FaCirclePlay,
  FaCircleUser,
  FaImage,
  FaLanguage,
  FaMicrophoneLines,
  FaPenToSquare,
  FaBookOpen,
  FaBook,
  FaPenNib,
  FaCircleChevronRight,
} from "react-icons/fa6";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useAlertStore } from "@/store/alertStore";
import { usePlayerStore } from "@/store/playerStore";
import Alert from "@/components/Alert";
import PageLoading from "@/components/PageLoading";

const storyInfoMap = [
  {
    key: "author",
    fa: "نویسنده",
    icon: <FaCircleUser />,
  },
  {
    key: "imaging",
    fa: "تصویرگر",
    icon: <FaImage />,
  },
  {
    key: "translator",
    fa: "مترجم",
    icon: <FaLanguage />,
  },
  {
    key: "announcer",
    fa: "گوینده",
    icon: <FaMicrophoneLines />,
  },
  {
    key: "editor",
    fa: "ویراستار",
    icon: <FaPenToSquare />,
  },
  {
    key: "type_of_work",
    fa: "نوع اثر",
    icon: <FaBookOpen />,
  },
  {
    key: "literary_style",
    fa: "گونه ادبی",
    icon: <FaBook />,
  },
  {
    key: "main_title",
    fa: "عنوان اصلی",
    icon: <FaPenNib />,
  },
  {
    key: "publisher",
    fa: "ناشر",
    icon: <FaBuildingUser />,
  },
  {
    key: "studio",
    fa: "استودیو",
    icon: <FaHeadset />,
  },
  {
    key: "publication_date",
    fa: "تاریخ انتشار",
    icon: <FaCalendarDays />,
  },
  {
    key: "language",
    fa: "زبان",
    icon: <FaLanguage />,
  },
];

export default function StoryPage({ params }) {
  const router = useRouter();
  const { showAlert } = useAlertStore();
  const { isAuthenticated, user } = useAuthStore();
  const { setPlaylist, setCurrentTrack, whatIsPlaying } = usePlayerStore();
  const [story, setStory] = useState(null);
  const [liked, setLiked] = useState(false);
  const [hasStory, setHasStory] = useState(false);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [playlistStories, setPlaylistStories] = useState([]);
  const [playIdx, setPlayIdx] = useState(0);
  const [likeLoading, setLikeLoading] = useState(false);
  const [playLoading, setPlayLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);

  async function fetchStory() {
    try {
      const res = await api(`/api/story/${(await params).slug}`, {
        method: "GET",
      });

      setStory(res.story);
      setLiked(res.liked);
      setHasStory(res.hasStory);
      setComments(res.comments);
      setPlaylistStories(res.playlist_stories);
      setPlayIdx(res.play_idx);
    } catch (e) {
      console.log(e);
      fetchStory();
    }
  }

  useEffect(() => {
    fetchStory();
  }, []);

  if (!story) return <PageLoading />;

  async function saveComment(e) {
    e.preventDefault();
    if (!text) return;
    setCommentLoading(true);
    try {
      const res = await api(`/api/story/${story.id}/comment`, {
        method: "POST",
        body: JSON.stringify({ text }),
      });
      if (res.status === "ok") {
        showAlert(
          "نظر شما ذخیره شد و پس از تایید مدیر نمایش داده می شود.",
          "ok"
        );
        setText("");
      }
    } catch (e) {
      console.log(e);
      showAlert("خطایی رخ داده لطفا دوباره امتحان کنید.", "error");
    }
    setCommentLoading(false);
  }

  async function toggleLike() {
    if (likeLoading) return;
    if (!isAuthenticated) {
      router.push("/auth");
      return;
    }
    setLikeLoading(true);
    try {
      const res = await api(`/api/story/${story.id}/like/toggle`, {
        method: "POST",
      });
      if (res.status === "ok") {
        if (res.action === "like") {
          setLiked(true);
        } else {
          setLiked(false);
        }
      }
    } catch (e) {
      showAlert("خطایی رخ داده لطفا دوباره امتحان کنید.", "error");
      console.log(e);
    }
    setLikeLoading(false);
  }

  const getUserOS = () => {
    const userAgent = navigator.userAgent;
    if (/Windows/i.test(userAgent)) return "Windows";
    if (/Mac/i.test(userAgent)) return "MacOS";
    if (/Linux/i.test(userAgent)) return "Linux";
    if (/Android/i.test(userAgent)) return "Android";
    if (/iPhone|iPad|iPod/i.test(userAgent)) return "iOS";
    return "Unknown";
  };

  const getUserBrowser = () => {
    const userAgent = navigator.userAgent;
    if (/chrome|chromium|crios/i.test(userAgent)) return "Chrome";
    if (/firefox|fxios/i.test(userAgent)) return "Firefox";
    if (/safari/i.test(userAgent) && !/chrome|crios|chromium/i.test(userAgent))
      return "Safari";
    if (/edg/i.test(userAgent)) return "Edge";
    if (/opr|opera/i.test(userAgent)) return "Opera";
    return "Unknown";
  };

  function playStory() {
    if (whatIsPlaying && whatIsPlaying.name === story.name) return;
    let tracksArr = [];
    const auth_token = localStorage.getItem("auth_token");
    let guest_id = localStorage.getItem("guest_id");
    if (!guest_id) {
      guest_id = crypto.randomUUID();
      localStorage.setItem("guest_id", guest_id);
    }
    const userOS = getUserOS();
    const userAgent = getUserBrowser();
    playlistStories.forEach((s) => {
      const session = crypto.randomUUID();
      tracksArr.push({
        id: s.id,
        name: s.name,
        session: session,
        url:
          process.env.NEXT_PUBLIC_API_URL +
          `/api/story/${s.id}/play?session=${session}&os=${userOS}&user_agent=${userAgent}` +
          (auth_token ? `&token=${auth_token}` : `&guest_id=${guest_id}`),
        artist: story.playlist_id ? story.playlist.name : "قصه شب",
        cover: process.env.NEXT_PUBLIC_ASSETS_URL + s.image,
      });
      console.log(tracksArr[tracksArr.length - 1]);
    });

    setPlaylist(tracksArr);
    setCurrentTrack(tracksArr[playIdx]);
  }

  function share() {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/story/${story.id}/share`, {
      method: "POST",
    });
    navigator.share({
      text: `"${story.name}" را از اپلیکیشن قصه شب گوش دهید. https://qeseyeshab.ir/story/${story.slug}`,
    });
  }

  function buySection() {
    if (!user) {
      return (
        <div
          className="flex items-center p-4 m-2 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
          role="alert"
        >
          <svg
            className="shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>

          <span className="sr-only">Info</span>
          <div className="flex flex-col">
            <div className="font-bold mb-1">هفت روز رایگان!</div>
            <div>
              شما می‌توانید به نسخه نمونه این داستان گوش دهید. برای پخش نسخه
              کامل لطفا ثبتنام کنید. ثبتنام کنید و هفت روز رایگان به تمامی
              داستان ها گوش دهید.
            </div>
          </div>
        </div>
      );
    }

    if (hasStory) return;

    if (user.has_free_trial) {
      return (
        <div
          className="flex items-center p-4 m-2 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
          role="alert"
        >
          <svg
            className="shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>

          <span className="sr-only">Info</span>
          <div className="flex flex-col">
            <div className="font-bold mb-1">هفت روز رایگان!</div>
            <div>
              تا هفت روز پس از ثبت نام می‌توانید به تمامی داستان ها به صورت
              رایگان گوش دهید.
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="md:max-w-xl md:mx-auto">
        <div className="p-3 text-sm text-center">
          بعد از شنیدن نمونه صوتی، می‌توانید با استفاده از{" "}
          <Link href="/account/deposit" className="text-c3">
            حساب اعتباری خود
          </Link>
          ، فایل کامل را خریداری کنید.
        </div>
        <Link
          href={`/story/${story.slug}/buy`}
          className="bg-c3 text-white text-center p-2 block"
        >
          <div>خرید</div>
          <div className="flex items-center justify-center gap-1 text-xs mt-1">
            <FaCoins />
            <span>{story.price === 0 ? "رایگان" : story.price} سکه</span>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="md:pt-3">
        <div>
          <img
            className="md:max-w-[25rem] md:mx-auto md:rounded-lg"
            src={process.env.NEXT_PUBLIC_ASSETS_URL + story.image}
            alt={story.name}
          />
        </div>
        <div className="flex justify-between items-start p-3 gap-1 md:max-w-[25rem] md:mx-auto bg-c2">
          <button
            disabled={whatIsPlaying && whatIsPlaying.name === story.name}
            onClick={(e) => playStory()}
            className="text-white bg-c3 text-sm flex items-center justify-center rounded-full p-3 px-8"
          >
            {playLoading ? (
              <svg
                className="animate-spin h-6 w-6 ml-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : whatIsPlaying && whatIsPlaying.name === story.name ? null : (
              <FaCirclePlay className="ml-1 text-xl" />
            )}
            <span>
              {whatIsPlaying && whatIsPlaying.name === story.name
                ? "در حال پخش"
                : "پخش"}
            </span>
          </button>
          <div>
            <div
              className={`${liked ? "text-red-600" : "text-c1"} mb-1`}
              dir="ltr"
            >
              <button
                onClick={(e) => {
                  toggleLike();
                }}
                className="bg-gray-200 p-2 rounded-full"
              >
                {likeLoading ? (
                  <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
                  </svg>
                )}
              </button>
            </div>
            <div className="flex items-center justify-center text-sm gap-1">
              <div>{story.length} دقیقه</div>
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {buySection()}
      <div className="p-3 pb-0 text-lg md:max-w-xl md:mx-auto notSelectable">
        {story.name}
      </div>
      <div
        className={`grid ${
          story.info_translate ? "grid-cols-2 gap-2" : "grid-cols-1"
        } md:max-w-xl md:mx-auto p-3`}
      >
        <div
          dir={story.info_dir}
          className="notSelectable prose-invert"
          dangerouslySetInnerHTML={{
            __html: story.info,
          }}
        ></div>
        {story.info_translate && (
          <div
            dir={story.info_translate_dir}
            dangerouslySetInnerHTML={{
              __html: story.info_translate,
            }}
            className="notSelectable prose-invert"
          ></div>
        )}
      </div>

      <div className="p-3 pt-0 md:max-w-xl md:mx-auto flex flex-wrap items-center gap-1">
        <span className="bg-gray-600 text-xs p-1 px-2 rounded flex items-center justify-center">
          <svg
            className="w-4 h-4"
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
          <div>{story.plays}</div>
        </span>
        <button
          onClick={(e) => {
            share();
          }}
          className="bg-gray-600 text-xs p-1 px-2 rounded flex items-center justify-center cursor-pointer hover:text-c3 gap-1"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="M7.926 10.898 15 7.727m-7.074 5.39L15 16.29M8 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm12 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm0-11a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
            />
          </svg>
          <div>اشتراک گذاری</div>
        </button>
        <Link
          href={isAuthenticated ? `/story/${story.slug}/report` : "/auth"}
          className="bg-gray-600 text-xs p-1 px-2 rounded flex items-center justify-center cursor-pointer hover:text-c3 gap-1"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v5a1 1 0 1 0 2 0V8Zm-1 7a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z"
              clipRule="evenodd"
            />
          </svg>
          <div>گزارش خطا</div>
        </Link>
        <span className="bg-gray-600 text-xs p-1 px-2 rounded">
          {story.category.name}
        </span>
        <span className="bg-gray-600 text-xs p-1 px-2 rounded">
          <a href={story.buy_link} target="_blank">
            حمایت از ما
          </a>
        </span>
      </div>
      {story.playlist && (
        <div className="md:max-w-xl md:mx-auto p-3 pb-0">
          <Link
            href={`/playlist/${story.playlist.slug}`}
            className="bg-gray-600 hover:text-c3 p-1 px-2 rounded-lg flex items-center gap-2"
          >
            <div>
              <img
                src={process.env.NEXT_PUBLIC_ASSETS_URL + story.playlist.image}
                alt={story.playlist.name}
                className="w-10 h-10 rounded-lg"
              />
            </div>
            <div>{story.playlist.name}</div>
          </Link>
        </div>
      )}
      <div className="p-3 md:max-w-xl md:mx-auto">
        <div className="text-white bg-gray-600 rounded-lg">
          {storyInfoMap.map((si, idx) => {
            return (
              story[si.key] &&
              story[si.key] !== "-" && (
                <div
                  key={si.key}
                  className="relative inline-flex gap-1 items-center w-full px-4 py-2 text-sm font-medium rounded-t-lg hover:text-c3"
                >
                  {si.icon}
                  <span>
                    {si.fa}: {story[si.key]}
                  </span>
                </div>
              )
            );
          })}
        </div>
        <Link
          href={`/`}
          className="text-white bg-orange-400 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center flex items-center justify-center gap-1 mt-2"
        >
          <FaCircleChevronRight className="text-md" />
          <span>بازگشت به خانه</span>
        </Link>
        <Alert />
        <div className="mt-3">
          <div>نظرات</div>
          {isAuthenticated ? (
            <form
              onSubmit={saveComment}
              className="p-3 md:max-w-xl md:mx-auto text-white"
            >
              <div className="mb-3">
                <label className="block mb-2 text-sm">نظر خود را بنویسید</label>

                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                ></textarea>
              </div>
              <button
                disabled={commentLoading}
                type="submit"
                className="text-white bg-c3 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                {commentLoading ? (
                  <div className="w-max mx-auto">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </div>
                ) : (
                  <>ارسال</>
                )}
              </button>
            </form>
          ) : (
            <Link
              href={"/auth"}
              className="block text-xs p-1 pb-3 text-center text-c3"
            >
              برای نوشتن نظر باید وارد حساب خود شوید.
            </Link>
          )}
          <div>
            {comments.map((comment) => {
              return (
                <div
                  key={comment.id}
                  className="bg-gray-600 rounded-lg p-3 mb-2"
                >
                  <div className="flex items-center gap-1">
                    <img
                      src={
                        process.env.NEXT_PUBLIC_ASSETS_URL + comment.user.image
                      }
                      alt={
                        comment.user.first_name + " " + comment.user.last_name
                      }
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="text-sm">
                      {comment.user.first_name + " " + comment.user.last_name}
                    </div>
                  </div>
                  <div className="mt-2 text-sm">{comment.text}</div>
                  <div className="text-xs mt-2" dir="ltr">
                    {comment.persian_date}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-3 text-center">
          &#169; کلیه حقوق برای{" "}
          <a href="https://nazariani.org" target="_blank" className="text-c3">
            «بنیاد نظریانی»
          </a>{" "}
          و «صاحبان اثر» محفوظ است.
        </div>
      </div>
    </>
  );
}
