"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { businessTypeSchema } from "@/lib/validations/auth";
import { OptionCard, OptionError } from "./option-card";

const OPTIONS = [
  {
    value: "retail",
    title: "Retail",
    description: "For stores, boutiques, and retail shops",
    features: ["Inventory Management", "Point of Sale", "Procurement Management", "Reporting"],
  },
  {
    value: "enterprise",
    title: "Enterprise",
    description: "For large businesses with multiple locations",
    features: ["Inventory Management", "Point of Sale", "Procurement Management", "Reporting"],
  },
  {
    value: "nonprofit",
    title: "Non-Profit / NGO",
    description: "For charitable organizations and NGOs",
    features: ["Donation Tracking", "Volunteer Management", "Grant Management", "Impact Reporting"],
  },
];

export function BusinessTypeForm({ defaultValue, onNext }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(businessTypeSchema),
    defaultValues: { businessType: defaultValue },
  });

  return (
    <form onSubmit={handleSubmit(onNext)} noValidate className="mx-auto mt-[46px] max-w-[457px] pb-[56px]">
      <fieldset aria-describedby={errors.businessType ? "businessType-error" : undefined}>
        <legend className="sr-only">Business type</legend>
        <div className="space-y-[30px]">
          {OPTIONS.map((opt) => (
            <OptionCard
              key={opt.value}
              value={opt.value}
              registration={register("businessType")}
              className="min-h-[189px] pb-[28px] pr-4 pt-[32px]"
            >
              <span className="block text-[15px] font-semibold leading-[20px] text-black">
                {opt.title}
              </span>
              <span className="mt-[7px] block text-[12px] leading-[16px] text-[#7C7C7C]">
                {opt.description}
              </span>

              <ul className="mt-[16px] grid w-fit grid-cols-[auto_auto] gap-x-[36px] gap-y-[25px] pl-[10px]">
                {opt.features.map((f) => (
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

      <OptionError id="businessType-error" message={errors.businessType?.message} />

      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="mt-[78px] h-[40px] w-full rounded-[4px] bg-[#FF0000] text-[12px] font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Continue
      </button>
    </form>
  );
}
