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
        roles: [
          {
            id: integer,
            name: string,
            value: string,
            status: boolean
          }
        ];
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
