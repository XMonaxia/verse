import { AllCategoryResponse, AllResponse } from "@/utils/testing/types";
import {
  AddArticleInput,
  AddArticleResponse,
  AddCategoryInput,
  AddCategoryResponse,
  LoginInput,
  LoginResponse,
  RegisterInput,
  RegisterResponse,
} from "@/utils/testing/zod";
import axios from "axios";
const baseURL =
  process.env.TESTING_ENDPOINT || "https://test-fe.mysellerpintar.com";
export const axiosInstance = axios.create({
  baseURL,
});
// Testing
export async function register(data: RegisterInput): Promise<RegisterResponse> {
  try {
    const response = await axiosInstance.post<RegisterResponse>(
      "/api/auth/register",
      data
    );
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(err.response.data?.message || "Register gagal");
    }
    throw new Error("Gagal register: Network atau server error");
  }
}
export async function login(data: LoginInput): Promise<LoginResponse> {
  try {
    const response = await axiosInstance.post<LoginResponse>(
      "/api/auth/login",
      data
    );
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(err.response.data?.message || "Login gagal");
    }
    throw new Error("Gagal login: Network atau server error");
  }
}
// Article
export async function allArticle(): Promise<AllResponse> {
  try {
    const response = await axiosInstance.get<AllResponse>("/api/articles");
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(
        err.response.data?.message || "Error Saat Mengambil Article"
      );
    }
    throw new Error("Article gagal di ambil");
  }
}
// Categories
export async function allCategories(): Promise<AllCategoryResponse> {
  try {
    const response = await axiosInstance.get<AllCategoryResponse>(
      "/api/categories"
    );
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(
        err.response.data?.message || "Error Saat Mengambil Categories"
      );
    }
    throw new Error("Categories gagal di ambil");
  }
}
// ADD Category + Article
export async function addArticle(
  data: AddArticleInput,
  token: string
): Promise<AddArticleResponse> {
  try {
    const response = await axiosInstance.post<AddArticleResponse>(
      "/api/articles",
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(err.response.data?.message || "Login gagal");
    }
    throw new Error("Gagal login: Network atau server error");
  }
}
export async function addCategory(
  data: AddCategoryInput,
  token: string
): Promise<AddCategoryResponse> {
  try {
    const response = await axiosInstance.post<AddCategoryResponse>(
      "/api/categories",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(
        err.response.data?.message || "Gagal menambahkan kategori"
      );
    }
    throw new Error("Network/server error");
  }
}
export async function updateCategory(
  id: string,
  data: AddCategoryInput,
  token: string
): Promise<AddCategoryResponse> {
  const response = await axiosInstance.patch<AddCategoryResponse>(
    `/api/categories/${id}`,
    data,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
}
export async function deleteCategory(
  id: string,
  token: string
): Promise<{ message: string }> {
  const response = await axiosInstance.delete<{ message: string }>(
    `/api/categories/${id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
}
