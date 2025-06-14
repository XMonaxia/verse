export function getToken(): string {
  if (typeof window === "undefined") {
    throw new Error("Window is not defined");
  }
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
  if (!token) {
    throw new Error("Token tidak ditemukan di cookie");
  }
  return token;
}
