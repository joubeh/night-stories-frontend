import Link from "next/link";
import Navbar from "@/components/Navbar";
import { FaCircleChevronRight, FaDownload } from "react-icons/fa6";

export default function TermsAndConditionsPage() {
  return (
    <>
      <Navbar />
      <div className="p-5 md:max-w-xl md:mx-auto text-white">
        <div className="text-center text-xl">قوانین و مقررات قصه شب</div>
        <div className="mt-5">
          <Link
            href={
              process.env.NEXT_PUBLIC_ASSETS_URL +
              "/assets/terms-and-conditions.pdf"
            }
            target="_blank"
            download
            className="text-white bg-c3 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center flex items-center justify-center gap-1"
          >
            <FaDownload className="text-md" />
            <span>دانلود pdf قوانین و مقررات</span>
          </Link>
        </div>
        <div className="mt-2">
          <Link
            href={`/account/deposit`}
            className="text-white bg-orange-400 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center flex items-center justify-center gap-1"
          >
            <FaCircleChevronRight className="text-md" />
            <span>بازگشت</span>
          </Link>
        </div>
      </div>
    </>
  );
}
