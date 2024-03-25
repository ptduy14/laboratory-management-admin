import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    id: string;
    accessToken: string;
    user: any
  }

  interface User {
    id: string;
    access_token: string,
    userInfo: any
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accessToken: string
  }
}