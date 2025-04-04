"use client";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaCircleChevronRight } from "react-icons/fa6";

export default function PrizePage() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [hasPrize, setHasPrize] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth");
    }
  }, [isAuthenticated, router]);

  async function fetchData() {
    try {
      const res = await api("/api/account/prize", { method: "POST" });
      if (res.status === "ok") {
        setHasPrize(res.hasPrize);
      } else {
        fetchData();
      }
    } catch (e) {
      fetchData();
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="p-5 md:max-w-xl md:mx-auto text-white">
        <div className="text-2xl text-center">جایزه روزانه</div>
        <img
          src="/assets/prize.jpg"
          alt="prize"
          className="block w-max mx-auto mt-5"
        />
        {hasPrize ? (
          <>
            <div className="text-center mt-5">جایزه امروز شما: ۳ سکه</div>
            <div className="text-center mt-2">
              برای دریافت جایزه بعدی فردا دوباره بیایید
            </div>
          </>
        ) : (
          <div className="text-center mt-5">
            شما جایزه امروزتان را دریافت کردید. برای جایزه بعدی فردا دوباره به
            قسمت جایزه سربزنید.
          </div>
        )}
        <div className="mt-2">
          <Link
            href={`/account`}
            className="text-white bg-orange-400 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center flex items-center justify-center gap-1"
          >
            <FaCircleChevronRight className="text-md" />
            <span>بازگشت به حساب</span>
          </Link>
        </div>
      </div>
    </>
  );
}
