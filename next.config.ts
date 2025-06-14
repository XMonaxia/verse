import type { NextConfig } from "next";
import PWA from "next-pwa";

const withPWA = PWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  // runtimeCaching: [],
  // buildExcludes: [],
  // sw: "service-worker.ts",
});

const nextConfig: NextConfig = withPWA({
  reactStrictMode: true,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s3.sellerpintar.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
});

export default nextConfig;
