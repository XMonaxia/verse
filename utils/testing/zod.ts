import { z } from "zod";

// Validate
export const usernamePayload = z.string().min(3);
export const passwordPayload = z.string().min(7);
export const imagePayload = z.string();
export const rolePayload = z.enum(["User", "Admin"]);
// Payload
export const RegisterPayload = z.object({
  username: usernamePayload,
  password: passwordPayload,
  role: rolePayload,
});
export const LoginPayload = z.object({
  username: usernamePayload,
  password: passwordPayload,
});
export const AddCategoryPayload = z.object({
  name: imagePayload,
});
export const AddArticlePayload = z.object({
  title: usernamePayload,
  content: passwordPayload,
  categoryId: usernamePayload,
  imageUrl: imagePayload,
});
// Type
export type RegisterResponse = {
  username: string;
  password: string;
  role: "User" | "Admin";
  createdAt: string;
  updatedAt: string;
};
export type LoginResponse = {
  token: string;
};
export type MeResponse = {
  id: string;
  username: string;
  role: string;
};
export type AddCategoryResponse = {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};
export type AddArticleResponse = {
  id: string;
  title: string;
  content: string;
  userId: string;
  categoryId: string;
  imageUrl: string;
  createdAt: string;
  category: {
    id: string;
    name: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  };
  user: {
    id: string;
    username: string;
    role: string;
  };
};
// Verification
export type RegisterInput = z.infer<typeof RegisterPayload>;
export type LoginInput = z.infer<typeof LoginPayload>;
export type AddCategoryInput = z.infer<typeof AddCategoryPayload>;
export type AddArticleInput = z.infer<typeof AddArticlePayload>;
