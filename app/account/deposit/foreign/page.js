"use client";
import React, { useState, useEffect } from "react";
import {
  FaCoins,
  FaCircleInfo,
  FaCircleChevronRight,
  FaArrowsRotate,
  FaMoneyCheckDollar,
} from "react-icons/fa6";
import numberFormat from "@/lib/numberFormat";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useAlertStore } from "@/store/alertStore";
import api from "@/lib/api";
import Link from "next/link";

import { useSearchParams } from "next/navigation";

export default function ForeignDepositPage() {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const showAlert = useAlertStore((state) => state.showAlert);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(user.phone);
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth");
    }
  }, [isAuthenticated, router]);

  if (!user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="md:max-w-xl md:mx-auto text-white">
      <div className="text-lg text-center pt-4">پرداخت ارزی</div>
      <div className="flex items-center justify-center gap-2 mt-2">
        <FaCoins />
        <div>سکه های درخواستی: {amount}</div>
      </div>
      <div className="flex items-center justify-center gap-2 mt-2">
        <FaMoneyCheckDollar />
        <div>مبلغ قابل پرداخت: {numberFormat(parseInt(amount * 0.05))}€</div>
      </div>
      <div className="text-sm mt-5 text-center">
        لطفا اطلاعات خود را کامل کنید
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-5 md:max-w-xl md:mx-auto text-white"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
          <div>
            <label className="block mb-2 text-sm">نام</label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm">نام خانوادگی</label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm">ایمیل</label>
            <input
              dir="ltr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm">شماره تماس</label>
            <input
              dir="ltr"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm">کدپستی</label>
            <input
              dir="ltr"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm">آدرس</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            ></textarea>
          </div>
        </div>
      </form>

      <Link
        className="block w-full text-center p-2 text-sm"
        href="/terms-and-conditions"
      >
        «با ادامه فرآیند خرید، <span className="text-c3">قوانین و مقررات</span>{" "}
        را می‌پذیرم.»
      </Link>
      <div className="m-2">
        <button
          onClick={handleSubmit}
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
            <div className="flex items-center justify-center gap-1">
              <FaCoins className="text-md" />
              <span>پرداخت</span>
            </div>
          )}
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
