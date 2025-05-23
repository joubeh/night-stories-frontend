"use client";
import React, { useState, useEffect } from "react";
import {
  FaCoins,
  FaCircleInfo,
  FaCircleChevronRight,
  FaArrowsRotate,
} from "react-icons/fa6";
import numberFormat from "@/lib/numberFormat";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useAlertStore } from "@/store/alertStore";
import api from "@/lib/api";
import Link from "next/link";

const iranCoinBundles = [10, 20, 50, 100];
const foreignCoinBundles = [100, 200, 500, 1000];

export default function DepositPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const showAlert = useAlertStore((state) => state.showAlert);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(
    user.phone[1] === "9" && user.phone[2] === "8" ? "iran" : "foreign"
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth");
    }
  }, [isAuthenticated, router]);

  if (!user) return null;

  async function selectBundle(amount) {
    setLoading(true);
    try {
      const res = await api(`/api/account/deposit?amount=${amount}`, {
        method: "POST",
      });
      if (res.status === "ok") {
        window.location.href = res.pay_link;
      } else {
        showAlert(res.message, "error");
      }
    } catch (error) {
      showAlert("خطایی رخ داده لطفا دوباره امتحان کنید.", "error");
    }
    setLoading(false);
  }

  return (
    <div className="md:max-w-xl md:mx-auto text-white">
      {paymentMethod === "iran" && (
        <div className="p-4 pb-0">
          <div
            className="flex items-center p-4 text-sm text-blue-800 rounded-lg bg-blue-50 gap-2"
            role="alert"
          >
            <FaCircleInfo />
            <div>قبل از پرداخت حتما فیلترشکن خود را خاموش کنید</div>
          </div>
        </div>
      )}
      <div className="text-lg text-center pt-4">خرید سکه</div>
      <div className="flex items-center justify-center gap-2 mt-2">
        <FaCoins />
        <div>سکه های شما: {user.balance}</div>
      </div>
      <div className="text-sm mt-5 text-center">
        مقدار سکه مورد نیاز خود را انتخاب کنید
      </div>
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
      ) : paymentMethod === "iran" ? (
        <div className="grid grid-cols-2 gap-2 p-3">
          {iranCoinBundles.map((item) => {
            return (
              <button
                onClick={(e) => selectBundle(item)}
                key={item}
                className="bg-c3 p-2 rounded-lg"
              >
                <div className="flex items-center justify-center gap-1">
                  <FaCoins />
                  <div>{item} سکه</div>
                </div>
                <div className="text-sm mt-1">
                  {numberFormat(item * 1000)} تومان
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 p-3">
          {foreignCoinBundles.map((item) => {
            return (
              <button
                onClick={(e) => {
                  router.push(`/account/deposit/foreign?amount=${item}`);
                }}
                key={item}
                className="bg-c3 p-2 rounded-lg"
              >
                <div className="flex items-center justify-center gap-1">
                  <FaCoins />
                  <div>{item} سکه</div>
                </div>
                <div className="text-sm mt-1" dir="ltr">
                  {numberFormat(parseInt(item * 0.05))}€
                </div>
              </button>
            );
          })}
        </div>
      )}
      <Link
        className="block w-full text-center p-2 text-sm"
        href="/terms-and-conditions"
      >
        «با ادامه فرآیند خرید، <span className="text-c3">قوانین و مقررات</span>{" "}
        را می‌پذیرم.»
      </Link>
      <Link
        className="block w-full text-center p-2 text-sm"
        href="/privacy-policy"
      >
        <span className="text-c3">سیاست حریم شخصی (Privacy Policy)</span>
      </Link>
      <div className="m-2">
        <button
          onClick={(e) => {
            paymentMethod === "iran"
              ? setPaymentMethod("foreign")
              : setPaymentMethod("iran");
          }}
          className="text-white bg-c4 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center flex items-center justify-center gap-1"
        >
          <FaArrowsRotate className="text-md" />
          <span>
            {paymentMethod === "iran" ? "پرداخت ارزی" : "پرداخت ریالی"}
          </span>
        </button>
      </div>
      <div className="m-2">
        <Link
          href={`/account`}
          className="text-white bg-orange-400 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center flex items-center justify-center gap-1"
        >
          <FaCircleChevronRight className="text-md" />
          <span>بازگشت به حساب</span>
        </Link>
      </div>
    </div>
  );
}
