"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useAlertStore } from "@/store/alertStore";

export default function ReportPage({ params }) {
  const router = useRouter();
  const { showAlert } = useAlertStore();
  const { isAuthenticated, user } = useAuthStore();
  const [story, setStory] = useState(null);
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth");
    }
  }, [isAuthenticated, router]);

  async function fetchStory() {
    try {
      const res = await api(`/api/story/${(await params).slug}`, {
        method: "GET",
      });

      setStory(res.story);
    } catch (e) {
      console.log(e);
      fetchStory();
    }
  }

  useEffect(() => {
    fetchStory();
  }, []);

  if (!story) return null;

  async function submit(e) {
    e.preventDefault();
    if (!details) return;
    setLoading(true);
    try {
      const res = await api(`/api/story/${story.slug}/report`, {
        method: "POST",
        body: JSON.stringify({ details }),
      });
      if (res.status === "ok") {
        showAlert("گزارش شما ثبت شد. با تشکر.", "ok");
        setDetails("");
      }
    } catch (e) {
      console.log(e);
      showAlert("خطایی رخ داده لطفا دوباره امتحان کنید.", "error");
    }
    setLoading(false);
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
      </div>
      <div className="p-3 pb-0 text-lg text-center">
        مشکلی در این داستان می بینید؟
      </div>
      <form onSubmit={submit} className="p-3 md:max-w-xl md:mx-auto text-white">
        <div className="mb-3">
          <label className="block mb-2 text-sm">شرح خطا</label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          ></textarea>
        </div>
        <button
          disabled={loading}
          type="submit"
          className="text-white bg-c3 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          {loading ? (
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
      <div className="p-3 pt-0">
        <Link
          href={`/story/${story.slug}`}
          className="text-white bg-orange-500 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center flex items-center justify-center gap-1"
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
              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
              clipRule="evenodd"
            />
          </svg>
          <span>بازگشت</span>
        </Link>
      </div>
    </>
  );
}
