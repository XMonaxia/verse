import { ImageHomeTypes } from "@/model/ImageHome";
import { MusicTypes } from "@/model/Music";
import { PuisiTypes } from "@/model/Puisi";
import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "https://naliverse.xyz";
const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});
export async function getImages(): Promise<ImageHomeTypes[]> {
  return axiosInstance
    .get<ImageHomeTypes[]>("/api/image")
    .then((res) => res.data)
    .catch((err) => {
      console.error("Gagal fetch images:", err);
      return [];
    });
}
export async function getMusic(): Promise<MusicTypes[]> {
  return axiosInstance
    .get<MusicTypes[]>("/api/music")
    .then((res) => res.data)
    .catch((err) => {
      console.error("Failed to fetch music:", err);
      return [];
    });
}
export async function getPuisi(): Promise<PuisiTypes[]> {
  return axiosInstance
    .get<PuisiTypes[]>("/api/puisi")
    .then((res) => res.data)
    .catch((err) => {
      console.error("Gagal fetch puisi:", err);
      return [];
    });
}
