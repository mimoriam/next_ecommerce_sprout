declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_DOMAIN: string;
      NEXT_PUBLIC_API_DOMAIN: string;
      NEXT_PUBLIC_POSTGRES_URL: string;
      GITHUB_CLIENT_ID: string;
      GITHUB_CLIENT_SECRET: string;
      NEXTAUTH_URL: string;
      NEXTAUTH_URL_INTERNAL: string;
      AUTH_SECRET: string;
      NEXT_PUBLIC_RESEND_API_KEY: string;
      NEXT_PUBLIC_UPLOADTHING_SECRET: string;
      NEXT_PUBLIC_UPLOADTHING_APP_ID: string;
    }
  }
}

export {};
