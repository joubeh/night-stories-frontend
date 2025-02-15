"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAlertStore } from "@/store/alertStore";
import { FaCircleInfo } from "react-icons/fa6";

export default function Alert() {
  const { message, type, hideAlert, resetOnNavigation } = useAlertStore();
  const pathname = usePathname();

  useEffect(() => {
    resetOnNavigation();
  }, [pathname]);

  if (!message) return null;

  return (
    <div className="p-4">
      <div
        className={`flex gap-2 items-center p-4 text-sm ${
          type === "ok" ? "text-blue-800 bg-blue-50" : "text-red-800 bg-red-50"
        } rounded-lg`}
        role="alert"
      >
        <FaCircleInfo className="text-xl" />
        <div>{message}</div>
      </div>
    </div>
  );
}
