import Link from "next/link";
import { Inter } from "next/font/google";
import { ArkMark } from "@/components/ark-mark";

const inter = Inter({ subsets: ["latin"] });

/*
 * Shared frame for auth screens: page background + centered logo.
 * Each page renders its own <AuthBackground />, <CornerLink /> and card.
 */
export default function AuthLayout({ children }) {
  return (
    <div
      className={`${inter.className} relative isolate min-h-screen w-full overflow-hidden bg-[#F8F9FC] text-[#111111]`}
    >
      <main className="relative flex flex-col items-center px-4 pb-16 pt-[72px]">
        <Link href="/" className="flex items-center gap-[6px]">
          <ArkMark className="h-[40px] w-[38px] text-[#FF0000]" />
          <span className="text-[32px] font-extrabold leading-none tracking-[-0.02em] text-black">
            ARK
          </span>
        </Link>

        {children}
      </main>
    </div>
  );
}
