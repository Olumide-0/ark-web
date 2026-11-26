"use client";

import { useState } from "react";
import { Stepper } from "./stepper";
import { BusinessTypeForm } from "./business-type-form";
import { BusinessDetailsForm } from "./business-details-form";
import { PlanForm } from "./plan-form";

const STEPS = {
  1: {
    title: "Select your business type",
    description: "Choose the option that best describes your organization",
  },
  2: {
    title: "Tell us about your business",
    description: "This information helps us customize your experience",
  },
  3: {
    title: "Choose your plan",
    description: "Select the plan that fits your business needs",
  },
};

export function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({});

  function goTo(next, values) {
    setData((d) => ({ ...d, ...values }));
    setStep(next);
    window.scrollTo({ top: 0 });
  }

  async function finish(values) {
    const all = { ...data, ...values };
    setData(all);
    // TODO: create the business and start payment for `all.plan`.
    console.log("onboarding", all);
  }

  const { title, description } = STEPS[step];

  return (
    <>
      <div className="mt-[61px]">
        <Stepper current={step} />
      </div>

      <div className="mt-[62px] w-full max-w-[711px] rounded-[6px] bg-white px-4 pt-[39px] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
        <h2 className="text-center text-[18px] font-semibold leading-[26px] text-black">{title}</h2>
        <p className="mt-[13px] text-center text-[15px] leading-[22px] text-[#7C7C7C]">
          {description}
        </p>

        {step === 1 && (
          <BusinessTypeForm
            defaultValue={data.businessType}
            onNext={(values) => goTo(2, values)}
          />
        )}
        {step === 2 && (
          <BusinessDetailsForm
            defaultValues={data}
            onBack={(values) => goTo(1, values)}
            onNext={(values) => goTo(3, values)}
          />
        )}
        {step === 3 && (
          <PlanForm
            defaultValue={data.plan}
            onBack={(values) => goTo(2, values)}
            onNext={finish}
          />
        )}
      </div>
    </>
  );
}
