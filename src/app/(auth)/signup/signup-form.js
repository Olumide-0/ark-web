"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/lib/validations/auth";

const inputClass = (hasError, extra = "") =>
  `mt-[8px] h-[40px] w-full rounded-[4px] border bg-white px-[26px] text-[12px] text-black outline-none placeholder:text-[#8A8A8A] focus:border-[#FF0000] ${
    hasError ? "border-[#FF0000]" : "border-[#E4E4E7]"
  } ${extra}`;

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

function PasswordField({ id, error, registration, autoComplete }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <input
        id={id}
        type={visible ? "text" : "password"}
        autoComplete={autoComplete}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputClass(error, "pr-[52px]")}
        {...registration}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        className="absolute bottom-0 right-[14px] flex h-[40px] w-[24px] items-center justify-center text-[#333]"
      >
        {visible ? <EyeIcon /> : <EyeOffIcon />}
      </button>
    </div>
  );
}

export function SignupForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: "onTouched",
    defaultValues: { fullName: "", email: "", password: "", confirmPassword: "" },
  });

  async function onSubmit(data) {
    // TODO: call the sign-up API with `data` ({ fullName, email, password }).
    console.log("signup", data);
    router.push("/onboarding");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-[37px]">
      <Label htmlFor="fullName">Full Name</Label>
      <input
        id="fullName"
        type="text"
        autoComplete="name"
        placeholder="John smith"
        aria-invalid={errors.fullName ? "true" : "false"}
        aria-describedby={errors.fullName ? "fullName-error" : undefined}
        className={inputClass(errors.fullName)}
        {...register("fullName")}
      />
      <FieldError id="fullName-error" message={errors.fullName?.message} />

      <Label htmlFor="email" className="mt-[29px]">Email address</Label>
      <input
        id="email"
        type="email"
        autoComplete="email"
        placeholder="name@company.com"
        aria-invalid={errors.email ? "true" : "false"}
        aria-describedby={errors.email ? "email-error" : undefined}
        className={inputClass(errors.email)}
        {...register("email")}
      />
      <FieldError id="email-error" message={errors.email?.message} />

      <Label htmlFor="password" className="mt-[29px]">Password</Label>
      <PasswordField
        id="password"
        autoComplete="new-password"
        error={errors.password}
        registration={register("password", { deps: ["confirmPassword"] })}
      />
      {errors.password ? (
        <FieldError id="password-error" message={errors.password.message} />
      ) : (
        <p className="mt-[7px] text-[10px] leading-[14px] text-[#6B6B6B]">
          Password must be at least 8 characters long
        </p>
      )}

      <Label htmlFor="confirmPassword" className="mt-[30px]">Confirm Password</Label>
      <PasswordField
        id="confirmPassword"
        autoComplete="new-password"
        error={errors.confirmPassword}
        registration={register("confirmPassword")}
      />
      <FieldError id="confirmPassword-error" message={errors.confirmPassword?.message} />

      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="mt-[42px] h-[40px] w-full rounded-[4px] bg-[#FF0000] text-[12px] font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isSubmitting ? "Signing up…" : "Sign up"}
      </button>
    </form>
  );
}

function EyeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
      <path d="M3 3l18 18" />
    </svg>
  );
}
