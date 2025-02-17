"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaCircleXmark, FaCircleCheck } from "react-icons/fa6";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useAlertStore } from "@/store/alertStore";

export default function EditAccountPage() {
  const router = useRouter();
  const { isAuthenticated, user, checkAuth } = useAuthStore();
  const showAlert = useAlertStore((state) => state.showAlert);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth");
    }
  }, [isAuthenticated, router]);

  if (!user) return null;

  const getJalaliYear = () => {
    const gYear = new Date().getFullYear();
    return gYear - 621;
  };

  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [birthday, setBirthday] = useState(user.birthday);
  const [gender, setGender] = useState(user.gender);
  const [country, setCountry] = useState(user.country);
  const [province, setProvince] = useState(user.province);
  const [city, setCity] = useState(user.city);
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(null);

  const [birthdayDay, setBirthdayDay] = useState(0);
  const [birthdayMon, setBirthdayMon] = useState(0);
  const [birthdayYer, setBirthdayYer] = useState(0);

  useEffect(() => {
    if (birthday) {
      const spBirthday = birthday.split("-");
      setBirthdayYer(spBirthday[0]);
      setBirthdayMon(spBirthday[1]);
      setBirthdayDay(spBirthday[2]);
    }
  }, []);

  useEffect(() => {
    if (birthdayDay != 0 && birthdayMon != 0 && birthdayYer != 0) {
      setBirthday(`${birthdayYer}-${birthdayMon}-${birthdayDay}`);
    }
  }, [birthdayDay, birthdayMon, birthdayYer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("birthday", birthday);
    formData.append("gender", gender);
    formData.append("country", country);
    formData.append("province", province);
    formData.append("city", city);
    if (image) formData.append("image", image);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/account/update`,
        {
          method: "POST",
          body: formData,
          credentials: "include", // Required for Sanctum authentication,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        return showAlert("خطایی رخ داده لطفا دوباره امتحان کنید.", "error");
      }

      if (data.status !== "ok") {
        return showAlert("خطایی رخ داده لطفا دوباره امتحان کنید.", "error");
      }

      showAlert("تغییرات ذخیره شد.", "ok");
      checkAuth();
    } catch (error) {
      showAlert("خطایی رخ داده لطفا دوباره امتحان کنید.", "error");
    }

    setLoading(false);
  };

  function yearsOptions() {
    let years = [];
    for (let i = 300; i <= getJalaliYear(); i++) {
      years.push(i + 1000);
    }
    years.reverse();
    return years;
  }

  return (
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
          <label className="block mb-2 text-sm">
            عکس (اگر می خواهید تغییر دهید انتخاب کنید)
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block mb-2 text-sm">تاریخ تولد</label>
          <div className="flex items-center justify-center gap-1">
            <div>
              <label className="block mb-2 text-sm">روز</label>
              <select
                value={birthdayDay}
                onChange={(e) => setBirthdayDay(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              >
                <option>انتخاب روز</option>
                {Array.from({ length: 31 }, (_, i) => i + 1).map((i) => (
                  <option key={i} value={`${i}`}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm">ماه</label>
              <select
                value={birthdayMon}
                onChange={(e) => setBirthdayMon(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              >
                <option>انتخاب ماه</option>
                <option value="1">فروردین</option>
                <option value="2">اردیبهشت</option>
                <option value="3">خرداد</option>
                <option value="4">تیر</option>
                <option value="5">مرداد</option>
                <option value="6">شهریور</option>
                <option value="7">مهر</option>
                <option value="8">آبان</option>
                <option value="9">آذر</option>
                <option value="10">دی</option>
                <option value="11">بهمن</option>
                <option value="12">اسفند</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm">سال</label>
              <select
                value={birthdayYer}
                onChange={(e) => setBirthdayYer(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              >
                <option>انتخاب سال</option>
                {yearsOptions().map((i) => (
                  <option key={i} value={`${i}`}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div>
          <label className="block mb-2 text-sm">جنسیت</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          >
            <option value="نامشخص">نامشخص</option>
            <option value="پسر">پسر</option>
            <option value="دختر">دختر</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm">کشور</label>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm">استان</label>
          <select
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          >
            <option value="نامشخص">انتخاب کنید</option>
            <option value="0">لطفا استان را انتخاب نمایید</option>
            <option value="تهران">تهران</option>
            <option value="گیلان">گیلان</option>
            <option value="آذربایجان شرقی">آذربایجان شرقی</option>
            <option value="خوزستان">خوزستان</option>
            <option value="فارس">فارس</option>
            <option value="اصفهان">اصفهان</option>
            <option value="خراسان رضوی">خراسان رضوی</option>
            <option value="قزوین">قزوین</option>
            <option value="سمنان">سمنان</option>
            <option value="قم">قم</option>
            <option value="مرکزی">مرکزی</option>
            <option value="زنجان">زنجان</option>
            <option value="مازندران">مازندران</option>
            <option value="گلستان">گلستان</option>
            <option value="اردبیل">اردبیل</option>
            <option value="آذربایجان غربی">آذربایجان غربی</option>
            <option value="همدان">همدان</option>
            <option value="کردستان">کردستان</option>
            <option value="کرمانشاه">کرمانشاه</option>
            <option value="لرستان">لرستان</option>
            <option value="بوشهر">بوشهر</option>
            <option value="کرمان">کرمان</option>
            <option value="هرمزگان">هرمزگان</option>
            <option value="چهارمحال و بختیاری">چهارمحال و بختیاری</option>
            <option value="یزد">یزد</option>
            <option value="سیستان و بلوچستان">سیستان و بلوچستان</option>
            <option value="ایلام">ایلام</option>
            <option value="کهگلویه و بویراحمد">کهگلویه و بویراحمد</option>
            <option value="خراسان شمالی">خراسان شمالی</option>
            <option value="خراسان جنوبی">خراسان جنوبی</option>
            <option value="البرز">البرز</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm">شهر یا روستا</label>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
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
          <div className="flex items-center justify-center gap-1">
            <FaCircleCheck />
            <span>ثبت تغییرات</span>
          </div>
        )}
      </button>
      <Link
        href="/account"
        className="text-white bg-orange-400 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-2 flex items-center justify-center gap-1"
      >
        <FaCircleXmark />
        <span>بازگشت</span>
      </Link>
    </form>
  );
}
