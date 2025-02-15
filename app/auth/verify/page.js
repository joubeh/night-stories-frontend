"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { useAlertStore } from "@/store/alertStore";
import Link from "next/link";

export default function VerifyPage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { phone, isAuthenticated, action, setCode: storeCode } = useAuthStore();
  const router = useRouter();
  const { showAlert } = useAlertStore();
  const [resendCounter, setResendCounter] = useState(180);

  function secToTime(value) {
    const minutes = Math.floor(value / 60);
    const seconds = value - minutes * 60;
    return `${minutes}:${seconds}`;
  }

  useEffect(() => {
    setInterval(() => {
      setResendCounter((state) => state - 1);
    }, 1000);
  }, []);

  function resendUI() {
    if (resendCounter > 0) {
      return <>ارسال مجدد در {secToTime(resendCounter)}</>;
    }
    return (
      <Link className="text-c3" href="/auth">
        ارسال مجدد
      </Link>
    );
  }

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/account");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api("/api/auth/verify", {
        method: "POST",
        body: JSON.stringify({ phone, code }),
      });
      if (res.status === "ok") {
        storeCode(code);
        router.push(`/auth/${action}`);
      } else {
        showAlert(res.error, "error");
      }
    } catch (error) {
      showAlert("خطایی رخ داده لطفا دوباره امتحان کنید.", "error");
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-5 md:max-w-xl md:mx-auto pb-[12rem] text-white"
    >
      <h1 className="text-center text-xl">ورود به حساب</h1>
      <h1 className="mt-3">کد تایید ارسال شده برایتان را وارد کنید</h1>
      <div className="mt-1 mb-3">
        <label className="block mb-2 text-sm">کد تایید</label>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="----"
          required
        />
      </div>
      <div className="p-3">{resendUI()}</div>
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
          <>ورود</>
        )}
      </button>
    </form>
  );
}
