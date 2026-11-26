import { AuthBackground } from "@/components/auth/auth-background";
import { CornerLink } from "@/components/auth/corner-link";
import { SocialLogin } from "@/components/auth/social-login";
import { SignupForm } from "./signup-form";

export const metadata = {
  title: "Create account | Ark",
};

export default function SignupPage() {
  return (
    <>
      <AuthBackground left={-538} top={-128} width={1616} />
      <CornerLink text="Already have an account ?" linkText="Sign in" href="/login" />

      <div className="mt-[38px] w-full max-w-[536px] rounded-[6px] bg-white px-4 pb-[55px] pt-[33px] shadow-[0_1px_3px_rgba(0,0,0,0.06)] sm:px-[39px]">
        <h1 className="text-center text-[18px] font-semibold leading-[26px] text-black">
          Create your account
        </h1>
        <p className="mt-[13px] text-center text-[15px] leading-[22px] text-[#6B6B6B]">
          Enter your information to get started
        </p>

        <SignupForm />

        <SocialLogin className="mt-[40px]" />
      </div>
    </>
  );
}
