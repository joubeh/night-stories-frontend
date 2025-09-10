"use client";

import { useEffect, useState, use } from "react";
import { useAuthStore } from "@/store/authStore";
import Footer from "@/components/Footer";
import Alert from "@/components/Alert";
import "./globals.css";
import PageLoading from "@/components/PageLoading";
import Script from "next/script";

export default function RootLayout({ searchParams, children }) {
  const params = use(searchParams);
  const authToken = params.auth_token;
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      if (authToken) {
        localStorage.setItem("auth_token", authToken);
      }
      await checkAuth();
      setIsLoading(false);
    }

    loadUser();
  }, []);

  if (isLoading)
    return (
      <html dir="rtl">
        <head>
          <title>قصه شب | داستان های صوتی برای کودکان</title>
          <link rel="manifest" href="/manifest.json" />
          <meta
            name="description"
            content="طرح کتابخوانی بنیاد نظریانی: قصه شب برای همه کودکان این سرزمین"
          />
          <meta
            name="google-site-verification"
            content="gEUbi5xCIN-bY1bemhKrDstXkmJ78cPmYh_kiU3JgKk"
          />
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-5H44ZQCCDE"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-5H44ZQCCDE');
  `}
          </Script>
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
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-5H44ZQCCDE"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-5H44ZQCCDE');
  `}
        </Script>
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
