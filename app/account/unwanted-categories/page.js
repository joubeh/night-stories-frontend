"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { FaFilePen, FaArrowRightFromBracket } from "react-icons/fa6";
import { FaBan } from "react-icons/fa6";
import api from "@/lib/api";
import { useAlertStore } from "@/store/alertStore";
import { FaCircleCheck } from "react-icons/fa6";

export default function UnwantedCategoriesPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const showAlert = useAlertStore((state) => state.showAlert);
  const [categories, setCategories] = useState([]);
  const [unwantedCategories, setUnwantedCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth");
    }
  }, [isAuthenticated, router]);

  async function fetchData() {
    try {
      const res = await api("/api/categories", {
        method: "GET",
      });
      if (res.status === "ok") {
        setCategories(res.allCategories);
        setUnwantedCategories(res.unwantedCategories);
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

  if (!user) return null;

  async function toggleUnwantedCategories(id) {
    try {
      setLoading(true);
      const res = await api(`/api/account/category/${id}/unwanted/toggle`, {
        method: "POST",
      });
      let tmp = JSON.parse(JSON.stringify(unwantedCategories));
      if (tmp.includes(id)) {
        tmp.splice(tmp.indexOf(id), 1);
      } else {
        tmp.push(id);
      }
      setUnwantedCategories(tmp);
    } catch (e) {
      showAlert("خطایی پیش آمده لطفا مجددا امتحان کنید.", "error");
    }
    setLoading(false);
  }

  return (
    <div className="p-3">
      <div>
        شما می توانید دسته بندی هایی که به آنها تمایل ندارید را در برنامه
        غیرفعال کنید.
      </div>
      <div className="mt-3 text-sm text-center">
        برای غیرفعال سازی یا فعال سازی دسته بندی روی آن بزنید.{" "}
        <span className="text-c3">سبز به معنای فعال</span> و{" "}
        <span className="text-gray-500">خاکستری به معنای غیرفعال</span> است.
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
        {categories.map((c) => {
          return (
            <button
              disabled={loading}
              onClick={(e) => toggleUnwantedCategories(c.id)}
              key={c.id}
              className={`${
                unwantedCategories.includes(c.id) ? "bg-gray-500" : "bg-c3"
              } py-1 px-3 rounded-lg text-sm`}
            >
              {c.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
