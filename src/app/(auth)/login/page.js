import { AuthBackground } from "@/components/auth/auth-background";
import { CornerLink } from "@/components/auth/corner-link";
import { SocialLogin } from "@/components/auth/social-login";
import { LoginForm } from "./login-form";

export const metadata = {
  title: "Sign in | Ark",
};

export default function LoginPage() {
  return (
    <>
      <AuthBackground />
      <CornerLink text="You don't have an account ?" linkText="Sign up" href="/signup" />

      <div className="mt-[40px] w-full max-w-[536px] rounded-[6px] bg-white px-4 pb-[56px] pt-[32px] shadow-[0_1px_3px_rgba(0,0,0,0.06)] sm:px-[41px]">
        <h1 className="text-center text-[18px] font-semibold leading-[26px] text-black">
          Sign in to your account
        </h1>
        <p className="mt-[16px] text-center text-[15px] leading-[22px] text-[#6B6B6B]">
          Enter your credentials to access your account
        </p>

        <LoginForm />

        <SocialLogin className="mt-[38px]" />
      </div>
    </>
  );
}
