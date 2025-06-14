// env.d.ts
namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_BASE_URL: string;
    TESTING_ENDPOINT: string;
    MONGODB_URI: string;
    CLOUDINARY_CLOUD_NAME:string
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
    JWT_SECRET: string;
    JWT_REFRESH_TOKEN: string;
  }
}
