"use client";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function InvitePage() {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();
  const [invitedUsers, setInvitedUsers] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth");
    }
  }, [isAuthenticated, router]);

  async function fetchData() {
    try {
      const res = await api("/api/account/invited", { method: "GET" });
      if (res.status === "ok") {
        setInvitedUsers(res.invited);
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
        <div>
          شما می توانید با دعوت از دوستان خود به برنامه سکه رایگان دریافت کنید.
        </div>
        <div className="mt-3">
          کافیست دوست شما در هنگام ثبت نام کد دعوت شما را وارد کند و بعد از آن
          ۳۰ سکه به شما و ۳۰ سکه هم به دوستتان هدیه داده می شود.
        </div>
        <div className="mt-3">
          کد دعوت شما:{" "}
          <code className="text-c2 font-semibold bg-gray-300 px-1">
            {user.phone}
          </code>
        </div>
        <hr className="my-3" />
        {invitedUsers.length > 0 ? (
          <>
            <div>افرادی که دعوت کردید</div>
            <div className="mt-3">
              {invitedUsers.map((i) => {
                return (
                  <div
                    key={i.id}
                    className="flex items-center gap-2 mb-2 bg-gray-700 p-2 rounded-lg"
                  >
                    <img
                      src={process.env.NEXT_PUBLIC_ASSETS_URL + i.image}
                      alt={i.first_name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{i.first_name + " " + i.last_name}</span>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div>شما تا به حال کسی را دعوت نکرده اید</div>
        )}
      </div>
    </>
  );
}
