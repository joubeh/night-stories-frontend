"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import Footer from "@/components/Footer";
import Alert from "@/components/Alert";
import "./globals.css";
import Head from "next/head";

export default function RootLayout({ children }) {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth(); // Check auth status on first load
  }, []);

  return (
    <html dir="rtl">
      <head>
        <title>قصه شب | داستان های صوتی برای کودکان</title>
        <meta
          name="description"
          content="طرح کتابخوانی بنیاد نظریانی: قصه شب برای همه کودکان این سرزمین"
        />
        <meta
          name="google-site-verification"
          content="gEUbi5xCIN-bY1bemhKrDstXkmJ78cPmYh_kiU3JgKk"
        />
      </head>
      <body>
        <div className="bg-c2 min-h-screen text-white">
          <div className="pb-[10rem]">
            <Alert />
            <div>{children}</div>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
