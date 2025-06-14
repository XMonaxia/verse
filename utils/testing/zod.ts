import { z } from "zod";

// Validate
export const usernamePayload = z.string().min(3).max(255);
export const passwordPayload = z.string().min(7).max(255);
export const rolePayload = z.enum(["User", "Admin"]);
export const categoryPayload = z.enum([
  "Teknologi",
  "Bisnis",
  "Olahraga",
  "Hiburan",
]);
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
// Add Category
export const AddCategoryPayload = z.object({
  name: categoryPayload,
});
export type AddCategoryResponse = {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};
// Add Article
export const AddArticlePayload = z.object({
  title: passwordPayload,
  content: passwordPayload,
  categoryId: usernamePayload,
  imageUrl: categoryPayload,
});
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
