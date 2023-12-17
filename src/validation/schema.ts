import * as z from "zod";

export const SignUpFormSchema = z
  .object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    re_password: z.string(),
  })
  .refine((data) => data.password === data.re_password, {
    message: "Passwords don't match",
    path: ["re_password"],
  });

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const ActivationFormSchema = z.object({
  email: z.string().email(),
});

export const ResetPasswordEmailFormSchema = z.object({
  email: z.string().email(),
});

export const ResetPasswordFormSchema = z
  .object({
    new_password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
      new_confirm_password: z.string(),
  })
  .refine((data) => data.new_password === data.new_confirm_password, {
    message: "Passwords don't match",
    path: ["new_confirm_password"],
  });
