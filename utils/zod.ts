import { z } from "zod";

// Validate
export const userNamePayload = z.string().min(3).max(255);
export const fullNamePayload = z.string().min(3).max(255);
export const emailPayload = z.string().email().min(3).max(255);
export const passwordPayload = z.string().min(7).max(255);
export const birthPayload = z
  .string()
  .regex(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/, {
    message: "Format tanggal lahir tidak valid (DD-MM-YYYY)",
  });
export const genderPayload = z.enum(["Laki-Laki", "Perempuan"]);
// Register

export const RegisterPayload = z
  .object({
    userName: userNamePayload,
    fullName: fullNamePayload,
    email: emailPayload,
    password: passwordPayload,
    confirmPassword: z.string().min(7).max(255),
    birth: birthPayload,
    gender: genderPayload,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password Tidak Sesuai",
    path: ["confirmPassword"],
  });
// Login
export const LoginPayload = z.object({
  email: emailPayload,
  password: passwordPayload,
});
// Verification
export const verificationPayload = z.string().min(1).max(24);

export type RegisterPayload = z.infer<typeof RegisterPayload>;
export type LoginPayload = z.infer<typeof LoginPayload>;
export type verificationPayload = z.infer<typeof verificationPayload>;
