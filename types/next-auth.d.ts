import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      access_token: string,
      userInfo: {
        address: string | null;
        email: string;
        firstName: string;
        id: integer;
        lastName: string;
        phone: integer | null;
        photo: string | null;
        roles: [];
        status: boolean;
      };
    };
  }

  interface User {}
}

declare module "next-auth/jwt" {
  interface JWT {
    userInfo: {
      roles: Array
    }
  }
}
