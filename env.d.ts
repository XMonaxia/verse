// env.d.ts
namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_BASE_URL: string;
    TESTING_ENDPOINT: string;
    MONGODB_URI: string;
    JWT_SECRET: string;
    JWT_REFRESH_TOKEN: string;
  }
}
