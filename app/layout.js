"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import Footer from "@/components/Footer";
import Alert from "@/components/Alert";
import "./globals.css";
import PageLoading from "@/components/PageLoading";
import { GoogleTagManager } from "@next/third-parties/google";

export default function RootLayout({ children }) {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      await checkAuth();
      setIsLoading(false);
    }

    loadUser();
  }, []);

  if (isLoading)
    return (
      <html dir="rtl">
        <GoogleTagManager gtmId="GTM-5H44ZQCCDE" />
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
              <div>
                <PageLoading />
              </div>
            </div>
            <Footer />
          </div>
        </body>
      </html>
    );

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
