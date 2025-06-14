import { z } from "zod";

// Validate
export const usernamePayload = z.string().min(3).max(255);
export const passwordPayload = z.string().min(7).max(255);
export const rolePayload = z.enum(["User", "Admin"]);
// Register
export const RegisterPayload = z.object({
  username: usernamePayload,
  password: passwordPayload,
  role: rolePayload,
});
export type RegisterResponse = {
  username: string;
  password: string;
  role: "User" | "Admin";
  createdAt: string;
  updatedAt: string;
};
// Login
export const LoginPayload = z.object({
  username: usernamePayload,
  password: passwordPayload,
});
export type LoginResponse = {
  token: string;
};
// Me
export type MeResponse = {
  id: string;
  username: string;
  role: string;
};
// Verification
export type RegisterInput = z.infer<typeof RegisterPayload>;
export type LoginInput = z.infer<typeof LoginPayload>;
