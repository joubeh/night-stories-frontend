"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { FaFilePen, FaArrowRightFromBracket } from "react-icons/fa6";
import { FaBan } from "react-icons/fa6";

export default function AccountPage() {
  const router = useRouter();
  const { isAuthenticated, user, logout, checkAuth } = useAuthStore();

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth");
    } else {
      checkAuth();
    }
  }, [isAuthenticated, router]);

  async function logoutAndRedirect() {
    await logout();
    router.push("/");
  }

  if (!user) return null;

  return (
    <div className="p-5 md:max-w-xl md:mx-auto text-white">
      <div className="flex items-center gap-2">
        <img
          src={process.env.NEXT_PUBLIC_ASSETS_URL + user.image}
          alt={user.first_name}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <div>
            {user.first_name} {user.last_name}
          </div>
          <div>
            {user.age && (
              <span>{thisYear - parseInt(user.age.split("-")[0])} ساله</span>
            )}{" "}
            {user.city && <span>از {user.city}</span>}
          </div>
        </div>
      </div>

      {user.has_free_trial && (
        <div
          className="flex items-center p-4 my-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
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
      )}

      <Link
        href="/account/edit"
        className="text-white bg-c3 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-2 flex items-center justify-center gap-1"
      >
        <FaFilePen />
        <span>ویرایش اطلاعات</span>
      </Link>
      <div className="mt-5 grid grid-cols-2 gap-2">
        <Link
          href="/account/deposit"
          className="border rounded-lg border-gray-600 p-3"
        >
          <img
            src="/assets/coins.jpg"
            alt="roulette"
            className="w-32 mx-auto block mb-3"
          />
          <div className="text-white bg-c3 rounded-lg text-sm px-3 py-1.5 text-center">
            خرید سکه
          </div>
        </Link>
        <Link
          href="/account/roulette"
          className="border rounded-lg border-gray-600 p-3"
        >
          <img
            src="/assets/roulette.jpg"
            alt="roulette"
            className="w-32 mx-auto block mb-3"
          />
          <div className="text-white bg-c3 rounded-lg text-sm px-3 py-1.5 text-center">
            گردونه شانس
          </div>
        </Link>
        <Link
          href="/account/prize"
          className="border rounded-lg border-gray-600 p-3"
        >
          <img
            src="/assets/prize.jpg"
            alt="roulette"
            className="w-32 mx-auto block mb-3"
          />
          <div className="text-white bg-c3 rounded-lg text-sm px-3 py-1.5 text-center">
            جایزه
          </div>
        </Link>
        <Link
          href="/account/invite"
          className="border rounded-lg border-gray-600 p-3"
        >
          <img
            src="/assets/invite.jpg"
            alt="roulette"
            className="w-32 mx-auto block mb-3"
          />
          <div className="text-white bg-c3 rounded-lg text-sm px-3 py-1.5 text-center">
            دعوت دوستان
          </div>
        </Link>
      </div>
      <button
        onClick={(e) => router.push("/account/unwanted-categories")}
        className="text-white bg-gray-600 rounded-lg text-sm w-full px-5 py-2.5 text-center mt-5 flex items-center justify-center gap-1"
      >
        <FaBan />
        <span>دسته بندی های پنهان</span>
      </button>
      <button
        onClick={(e) => logoutAndRedirect()}
        className="text-white bg-red-600 rounded-lg text-sm w-full px-5 py-2.5 text-center mt-2 flex items-center justify-center gap-1"
      >
        <FaArrowRightFromBracket />
        <span>خروج از حساب</span>
      </button>
    </div>
  );
}
