import { AuthService } from "@/services/authService";
import GoogleProvider from "next-auth/providers/google";
import { GoogleLoginData } from "@/services/authService";
import { RoleEnum } from "@/enums/role";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AccountStatus } from "@/enums/account-status";

let userVerifyData: object | null;

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "foo" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await AuthService.login({
          email: credentials?.email,
          password: credentials?.password,
        });

        if (res.status == 201 && res.data && isAccess(res.data)) {
          return res.data;
        }

        return null;
      },
    }),
  ],

  pages: {
    signIn: "/login",
    error: '/error',
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" && user) {
        const payload = handleTransformData(user, account);
        try {
          const res = await AuthService.ggAccessTokenVerify(payload);
          if (!isAccess(res.data)) {
            return false;
          }
          userVerifyData = res.data;
        } catch (error: any) {
          console.log("error: ", error.response.data.message);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      let data;

      if (!token.hasAccessTokenLocal) token.hasAccessTokenLocal = false;

      if (userVerifyData) {
        data = { ...userVerifyData};
      } else {
        data = { ...user};
      }

      if (trigger === "update" && session?.hasAccessTokenLocal) {
        token.hasAccessTokenLocal = session?.hasAccessTokenLocal
      }

      return { ...token, ...data};
    },

    async session({ session, token }) {
      userVerifyData = null;
      return {
        ...session,
        user: {
          ...session.user,
          ...token,
          hasAccessTokenLocal: token.hasAccessTokenLocal
        },
      };
    },
  },
};

const handleTransformData = (user: any, account: any): GoogleLoginData => {
  const fullName = user.name;
  const firstName = fullName!.split(" ")[0];
  const lastName = fullName!.substring(firstName?.length).trim();
  return {
    email: user.email,
    firstName,
    lastName,
    photo: user.image,
    accessToken: account.access_token,
  };
};

const isAccess = (data: any): boolean => {
  return ((data.userInfo.role === RoleEnum.ADMIN || data.userInfo.role === RoleEnum.MANAGER) && data.userInfo.status === AccountStatus.ACTIVE);
};

export default authOptions;
