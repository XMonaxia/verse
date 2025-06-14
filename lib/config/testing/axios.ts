import { AllCategoryResponse, AllResponse } from "@/utils/testing/types";
import {
  LoginInput,
  LoginResponse,
  RegisterInput,
  RegisterResponse,
} from "@/utils/testing/zod";
import axios from "axios";
const baseURL =
  process.env.TESTING_ENDPOINT || "https://test-fe.mysellerpintar.com";
const axiosInstance = axios.create({
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
    const response =
      await axiosInstance.get<AllCategoryResponse>("/api/categories");
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
