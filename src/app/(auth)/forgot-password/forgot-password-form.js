"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "@/lib/validations/auth";

const RED = "#FF0000";

export function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onTouched",
    defaultValues: { email: "" },
  });

  async function onSubmit(data) {
    // TODO: call the "send reset link" API with `data` ({ email }).
    console.log("forgot-password", data);
  }

  if (isSubmitSuccessful) {
    return (
      <div className="pb-[66px]">
        <div
          role="status"
          className="mt-[56px] flex min-h-[99px] items-center justify-center rounded-[6px] bg-[#FDE6E8] px-[40px] py-[20px] text-center text-[15px] leading-[24px] text-[#F26D6D]"
        >
          <p className="max-w-[300px]">
            If an account exists with that email, we&apos;ve sent a password reset link.
          </p>
        </div>
        <BackToLogin className="mt-[26px]" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-[42px] pb-[119px]">
      <label htmlFor="email" className="block text-[12px] font-medium leading-[16px] text-black">
        Email address
      </label>
      <input
        id="email"
        type="email"
        autoComplete="email"
        placeholder="name@company.com"
        aria-invalid={errors.email ? "true" : "false"}
        aria-describedby={errors.email ? "email-error" : undefined}
        className={`mt-[10px] h-[40px] w-full rounded-[4px] border bg-[#FDE6E8] px-[26px] text-[12px] text-black outline-none placeholder:text-[#8A8A8A] focus:border-[#FF0000] ${
          errors.email ? "border-[#FF0000]" : "border-transparent"
        }`}
        {...register("email")}
      />
      {errors.email && (
        <p id="email-error" role="alert" className="mt-[6px] text-[11px] leading-[14px]" style={{ color: RED }}>
          {errors.email.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-[24px] h-[40px] w-full rounded-[4px] text-[12px] font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        style={{ backgroundColor: RED }}
      >
        {isSubmitting ? "Sending…" : "Reset password"}
      </button>

      <BackToLogin className="mt-[28px]" />
    </form>
  );
}

function BackToLogin({ className = "" }) {
  return (
    <Link
      href="/login"
      className={`mx-auto flex w-fit items-center gap-[10px] text-[12px] ${className}`}
      style={{ color: RED }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      Back to Login
    </Link>
  );
}
