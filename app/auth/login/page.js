"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { useAlertStore } from "@/store/alertStore";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, phone, login } = useAuthStore();
  const router = useRouter();
  const showAlert = useAlertStore((state) => state.showAlert);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/account");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ phone, password }),
      });
      if (res.status === "ok") {
        login(res.user, res.token);
        router.push("/account");
      } else {
        showAlert(res.message, "error");
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
      <h1 className="mt-3">رمز خود را وارد کنید</h1>
      <div className="mt-1 mb-3">
        <label className="block mb-2 text-sm">رمز</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
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
          <>ورود</>
        )}
      </button>
    </form>
  );
}
