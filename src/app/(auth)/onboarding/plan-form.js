"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { planSchema } from "@/lib/validations/auth";
import { OptionCard, OptionError } from "./option-card";
import { ArrowIcon } from "./icons";

const PLANS = [
  {
    value: "free",
    title: "Free trial",
    price: "$0",
    description: "Perfect for any business",
    features: ["Up to 20 products", "1 user account", "Limited Basic reporting", "Limited Ark Features"],
  },
  {
    value: "starter",
    title: "Starter",
    price: "$29",
    period: "/month",
    description: "Perfect for small businesses just getting started",
    features: ["Up to 1,000 products", "2 user accounts", "Basic reporting", "Email support"],
  },
  {
    value: "professional",
    title: "Professional",
    price: "$79",
    period: "/month",
    description: "For growing businesses with more needs",
    features: ["Up to 10,000 products", "5 user accounts", "Advanced reporting", "Priority support"],
  },
  {
    value: "enterprise",
    title: "Enterprise",
    price: "$199",
    period: "/month",
    description: "For large businesses with complex requirements",
    features: ["Unlimited products", "Unlimited users", "Custom reporting", "Dedicated support"],
  },
];

export function PlanForm({ defaultValue, onBack, onNext }) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(planSchema),
    defaultValues: { plan: defaultValue },
  });

  return (
    <form onSubmit={handleSubmit(onNext)} noValidate className="mx-auto mt-[43px] max-w-[535px] pb-[57px]">
      <fieldset aria-describedby={errors.plan ? "plan-error" : undefined}>
        <legend className="sr-only">Plan</legend>
        <div className="space-y-[30px]">
          {PLANS.map((plan) => (
            <OptionCard
              key={plan.value}
              value={plan.value}
              registration={register("plan")}
              className="min-h-[271px] pb-[24px] pr-[30px] pt-[28px]"
            >
              <span className="flex items-center justify-between gap-4">
                <span className="text-[15px] font-semibold leading-[22px] text-black">
                  {plan.title}
                </span>
                <span className="text-[#FF0000]">
                  <span className="text-[24px] font-bold leading-[22px]">{plan.price}</span>
                  {plan.period && (
                    <span className="text-[15px] font-semibold">{plan.period}</span>
                  )}
                </span>
              </span>
              <span className="mt-[26px] block text-[12px] leading-[16px] text-[#7C7C7C]">
                {plan.description}
              </span>

              <ul className="mt-[23px] space-y-[25px] pl-[10px]">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-[8px] text-[12px] leading-[16px] text-black">
                    <span aria-hidden className="h-[4px] w-[4px] rounded-full bg-black" />
                    {f}
                  </li>
                ))}
              </ul>
            </OptionCard>
          ))}
        </div>
      </fieldset>

      <OptionError id="plan-error" message={errors.plan?.message} />

      <div className="mt-[92px] flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => onBack(getValues())}
          className="flex h-[40px] w-[144px] items-center justify-center gap-[10px] rounded-[4px] border border-[#FFC9C9] bg-white text-[12px] font-semibold text-black transition hover:bg-[#FFF5F5]"
        >
          <ArrowIcon direction="left" />
          Back
        </button>
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="flex h-[40px] w-[144px] items-center justify-center rounded-[4px] bg-[#FF0000] text-[12px] font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isSubmitting ? "Processing…" : "Make payment"}
        </button>
      </div>
    </form>
  );
}
