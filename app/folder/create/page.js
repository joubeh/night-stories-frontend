"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useAlertStore } from "@/store/alertStore";

export default function CreateFolderPage() {
  const showAlert = useAlertStore((state) => state.showAlert);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth");
    }
  }, [isAuthenticated, router]);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api("/api/folder/create", {
        method: "POST",
        body: JSON.stringify({ name }),
      });
      if (res.status === "ok") {
        router.push("/likes");
      } else {
        showAlert("خطایی پیش آمده لطفا مجددا امتحان کنید.", "error");
      }
    } catch (e) {
      console.log(e);
      showAlert("خطایی پیش آمده لطفا مجددا امتحان کنید.", "error");
    }
    setLoading(false);
  }

  return (
    <>
      <Navbar />
      <form onSubmit={submit} className="p-3 md:max-w-xl md:mx-auto text-white">
        <div className="mb-3">
          <label className="block mb-2 text-sm">نام پوشه</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
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
            <>ذخیره</>
          )}
        </button>
        <Link
          href={`/likes`}
          className="mt-2 text-white bg-orange-500 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center flex items-center justify-center gap-1"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
              clip-rule="evenodd"
            />
          </svg>
          <span>بازگشت</span>
        </Link>
      </form>
    </>
  );
}
