"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validations/auth";

const RED = "#FF0000";

const inputClass = (hasError) =>
  `mt-[10px] h-[40px] w-full rounded-[4px] border bg-white px-[24px] text-[12px] text-black outline-none placeholder:text-[#9A9A9A] focus:border-[#FF0000] ${
    hasError ? "border-[#FF0000]" : "border-[#E4E4E7]"
  }`;

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-[6px] text-[11px] leading-[14px]" style={{ color: RED }}>
      {message}
    </p>
  );
}

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: { email: "", password: "", remember: false },
  });

  async function onSubmit(data) {
    // TODO: call the login API with `data` ({ email, password, remember }).
    console.log("login", data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-[34px]">
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
        className={inputClass(errors.email)}
        {...register("email")}
      />
      <FieldError id="email-error" message={errors.email?.message} />

      <label htmlFor="password" className="mt-[26px] block text-[12px] font-medium leading-[16px] text-black">
        Password
      </label>
      <input
        id="password"
        type="password"
        autoComplete="current-password"
        placeholder="name@company.com"
        aria-invalid={errors.password ? "true" : "false"}
        aria-describedby={errors.password ? "password-error" : undefined}
        className={inputClass(errors.password)}
        {...register("password")}
      />
      <FieldError id="password-error" message={errors.password?.message} />

      <div className="mt-[22px] flex items-center justify-between">
        <label className="flex cursor-pointer items-center gap-[10px] text-[12px] font-medium text-black">
          <input
            type="checkbox"
            className="h-[14px] w-[14px] cursor-pointer rounded-[2px] border border-[#E4E4E7] accent-[#FF0000]"
            {...register("remember")}
          />
          Remember me
        </label>
        <Link href="/forgot-password" className="text-[12px] font-medium" style={{ color: RED }}>
          Forgot password
        </Link>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-[62px] h-[40px] w-full rounded-[4px] text-[12px] font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        style={{ backgroundColor: RED }}
      >
        {isSubmitting ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
