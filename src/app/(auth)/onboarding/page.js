import { AuthBackground } from "@/components/auth/auth-background";
import { OnboardingFlow } from "./onboarding-flow";

export const metadata = {
  title: "Set up your business | Ark",
};

export default function OnboardingPage() {
  return (
    <>
      <AuthBackground left={-672} top={-154} width={1890} />

      <h1 className="mt-[26px] text-center text-[18px] font-semibold leading-[26px] text-black">
        Set up your business space
      </h1>
      <p className="mt-[10px] text-center text-[15px] leading-[22px] text-[#7C7C7C]">
        Tell us about your business to get started with ARK
      </p>

      <OnboardingFlow />
    </>
  );
}
