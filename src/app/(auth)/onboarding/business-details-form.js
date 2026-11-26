"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { businessDetailsSchema } from "@/lib/validations/auth";
import { CustomSelect } from "@/components/ui/custom-select";
import { ArrowIcon } from "./icons";

// TODO: confirm these lists with the product team.
const INDUSTRIES = [
  "Fashion & Apparel",
  "Food & Beverage",
  "Electronics",
  "Health & Beauty",
  "Home & Furniture",
  "Manufacturing",
  "Healthcare",
  "Education",
  "Technology",
  "Other",
];

const EMPLOYEE_RANGES = ["1-10", "11-50", "51-200", "201-500", "500+"];

const fieldClass = (hasError) =>
  `mt-[8px] h-[40px] w-full rounded-[4px] border bg-white px-[26px] text-[12px] text-black outline-none placeholder:text-[#8A8A8A] focus:border-[#FF0000] ${
    hasError ? "border-[#FF0000]" : "border-[#E4E4E7]"
  }`;

function Label({ htmlFor, className = "", children }) {
  return (
    <label htmlFor={htmlFor} className={`block text-[12px] font-medium leading-[16px] text-black ${className}`}>
      {children}
    </label>
  );
}

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-[7px] text-[10px] leading-[14px] text-[#FF0000]">
      {message}
    </p>
  );
}

export function BusinessDetailsForm({ defaultValues, onBack, onNext }) {
  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(businessDetailsSchema),
    mode: "onTouched",
    defaultValues: {
      businessName: defaultValues.businessName ?? "",
      industry: defaultValues.industry ?? "",
      employees: defaultValues.employees ?? "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onNext)} noValidate className="mx-auto mt-[53px] max-w-[450px] pb-[66px]">
      <Label htmlFor="businessName">Business Name</Label>
      <input
        id="businessName"
        type="text"
        autoComplete="organization"
        placeholder="Your business name"
        aria-invalid={errors.businessName ? "true" : "false"}
        aria-describedby={errors.businessName ? "businessName-error" : undefined}
        className={fieldClass(errors.businessName)}
        {...register("businessName")}
      />
      <FieldError id="businessName-error" message={errors.businessName?.message} />

      <Label htmlFor="industry" className="mt-[31px]">Industry</Label>
      <Controller
        name="industry"
        control={control}
        render={({ field }) => (
          <CustomSelect
            {...field}
            id="industry"
            placeholder="Select your industry"
            options={INDUSTRIES}
            error={errors.industry}
            aria-describedby={errors.industry ? "industry-error" : undefined}
          />
        )}
      />
      <FieldError id="industry-error" message={errors.industry?.message} />

      <Label htmlFor="employees" className="mt-[31px]">Number of Employees</Label>
      <Controller
        name="employees"
        control={control}
        render={({ field }) => (
          <CustomSelect
            {...field}
            id="employees"
            placeholder=""
            options={EMPLOYEE_RANGES}
            error={errors.employees}
            aria-describedby={errors.employees ? "employees-error" : undefined}
          />
        )}
      />
      <FieldError id="employees-error" message={errors.employees?.message} />

      <div className="mt-[123px] flex items-center justify-between gap-4">
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
          className="flex h-[40px] w-[144px] items-center justify-center gap-[10px] rounded-[4px] bg-[#FF0000] text-[12px] font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Continue
          <ArrowIcon direction="right" />
        </button>
      </div>
    </form>
  );
}
