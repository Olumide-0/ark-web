import { z } from "zod";

const email = z
  .string()
  .trim()
  .min(1, { error: "Email address is required" })
  .pipe(z.email({ error: "Enter a valid email address" }));

export const forgotPasswordSchema = z.object({
  email,
});

export const signupSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(1, { error: "Full name is required" })
      .min(2, { error: "Enter your full name" }),
    email,
    password: z
      .string()
      .min(1, { error: "Password is required" })
      .min(8, { error: "Password must be at least 8 characters long" }),
    confirmPassword: z.string().min(1, { error: "Confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const BUSINESS_TYPES = ["retail", "enterprise", "nonprofit"];

export const businessTypeSchema = z.object({
  businessType: z.enum(BUSINESS_TYPES, { error: "Select a business type to continue" }),
});

export const businessDetailsSchema = z.object({
  businessName: z
    .string()
    .trim()
    .min(1, { error: "Business name is required" })
    .min(2, { error: "Enter your business name" }),
  industry: z.string().min(1, { error: "Select your industry" }),
  employees: z.string().min(1, { error: "Select the number of employees" }),
});

export const PLANS = ["free", "starter", "professional", "enterprise"];

export const planSchema = z.object({
  plan: z.enum(PLANS, { error: "Select a plan to continue" }),
});

export const loginSchema = z.object({
  email,
  password: z.string().min(1, { error: "Password is required" }),
  remember: z.boolean(),
});
