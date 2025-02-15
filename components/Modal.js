"use client";
import { useState } from "react";
import api from "@/lib/api";
import { FaFolder } from "react-icons/fa6";
import { useAlertStore } from "@/store/alertStore";

const Modal = ({ isOpen, onClose, folders, like, fetchData }) => {
  const showAlert = useAlertStore((state) => state.showAlert);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  async function addToFolder(folderId) {
    setLoading(true);
    try {
      const res = await api(`/api/folder/${folderId}/like/${like}/attach`, {
        method: "POST",
      });
      if (res.status === "ok") {
        await fetchData();
        onClose();
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-5">
      <div className="bg-c1 rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text">افزودن به پوشه</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            ✕
          </button>
        </div>
        <div className=" flex items-center text-sm flex-wrap gap-2 justify-center">
          {folders.map((f) => (
            <button
              disabled={loading}
              onClick={(e) => addToFolder(f.id)}
              className="flex items-center gap-1 bg-c2 rounded-full py-1.5 px-3"
              key={f.id}
            >
              <FaFolder />
              <span>{f.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
