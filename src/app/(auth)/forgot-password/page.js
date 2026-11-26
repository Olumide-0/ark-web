import { AuthBackground } from "@/components/auth/auth-background";
import { CornerLink } from "@/components/auth/corner-link";
import { ForgotPasswordForm } from "./forgot-password-form";

export const metadata = {
  title: "Reset password | Ark",
};

export default function ForgotPasswordPage() {
  return (
    <>
      <AuthBackground />
      <CornerLink text="You don't have an account ?" linkText="Sign up" href="/signup" />

      <div className="mt-[36px] w-full max-w-[539px] rounded-[6px] bg-white px-4 pt-[36px] shadow-[0_1px_3px_rgba(0,0,0,0.06)] sm:px-[42px]">
        <h1 className="text-center text-[18px] font-semibold leading-[26px] text-black">
          Reset your password
        </h1>
        <p className="mx-auto mt-[12px] max-w-[340px] text-center text-[15px] leading-[24px] text-[#6B6B6B]">
          Enter your email address and we&apos;ll send you a link to reset your password
        </p>

        <ForgotPasswordForm />
      </div>
    </>
  );
}
