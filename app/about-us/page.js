import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function AboutUsPage() {
  return (
    <>
      <Navbar />
      <div className="p-5 md:max-w-xl md:mx-auto text-white">
        <div className="w-max mx-auto">
          <Image
            width={300}
            height={300}
            className="rounded-lg md:max-w-[20rem]"
            src="/assets/about.jpg"
            alt="about us"
          />
        </div>
        <p className="mt-5 flex items-center justify-around gap-2">
          <a
            target="_blank"
            className="text-center text-white bg-c3 bock p-2 px-4 rounded-lg"
            href="https://hamibash.com/qeseyeshab"
          >
            حمایت از ما
          </a>
          <Link
            href="/contact-us"
            className="text-center text-white bg-c3 bock p-2 px-4 rounded-lg"
          >
            ارتباط با ما
          </Link>
        </p>
        <div className="mt-5 mx-5 flex items-center gap-5 justify-center">
          <Image
            alt="logo-samandehi"
            src="/assets/samandehi.png"
            width={300}
            height={300}
          />
          <a
            referrerPolicy="origin"
            target="_blank"
            href="https://trustseal.enamad.ir/?id=532774&Code=fUIVlp3uFqUPUhjuIXsKFVrRuF2DMHKP"
          >
            <Image
              src="/assets/enamad.png"
              alt="enamd"
              width={300}
              height={300}
            />
          </a>
        </div>
      </div>
    </>
  );
}
