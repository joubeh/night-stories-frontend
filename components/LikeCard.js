"use client";
import { useState } from "react";
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import api from "@/lib/api";
import { useAlertStore } from "@/store/alertStore";
import { useRouter } from "next/navigation";

function LikeCard({
  data,
  setSelectedLike = () => {},
  openModal,
  folderFilter,
  fetchData,
}) {
  const showAlert = useAlertStore((state) => state.showAlert);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function removeFromFolder() {
    setLoading(true);
    try {
      const res = await api(`/api/like/${data.id}/folder/detach`, {
        method: "POST",
      });
      if (res.status === "ok") {
        await fetchData();
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
    <div>
      <div className="relative">
        <img
          onClick={(e) => router.push(`/story/${data.slug}`)}
          src={process.env.NEXT_PUBLIC_ASSETS_URL + data.image}
          alt={data.name}
          className="rounded-lg"
        />
        {folderFilter ? (
          <button
            disabled={loading}
            onClick={(e) => removeFromFolder()}
            className="text-xs absolute bottom-1 right-1 text-white rounded-lg p-1.5 px-2.5 flex items-center justify-center gap-1"
            style={{ backgroundColor: "rgba(75, 85, 99, .7)" }}
          >
            <FaCircleMinus />
            <div>حذف از پوشه</div>
          </button>
        ) : (
          <button
            disabled={loading}
            onClick={(e) => {
              setSelectedLike(data.id);
              openModal();
            }}
            className="text-xs absolute bottom-1 right-1 text-white rounded-lg p-1.5 px-2.5 flex items-center justify-center gap-1"
            style={{ backgroundColor: "rgba(75, 85, 99, .7)" }}
          >
            <FaCirclePlus />
            <div>افزودن به پوشه</div>
          </button>
        )}
      </div>
    </div>
  );
}

export default LikeCard;
