import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import nextAuth, { NextAuthOptions } from "next-auth";
import { AuthService } from "@/services/authService";
import axiosConfig from "@/config/axiosConfig";
import GoogleProvider from "next-auth/providers/google";
import { GoogleLoginData } from "@/services/authService";

let userVerifyData: object | null;

export const authOptions: NextAuthOptions = {
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
        axiosConfig();
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
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" && user) {
        const payload = handleTransformData(user, account);
        try {
          axiosConfig();
          const { data } = await AuthService.ggAccessTokenVerify(payload);
          if (!isAccess(data)) {
            return false
          }
          userVerifyData = data;
          console.log("ggAccessTokenVerify", payload);
        } catch (error: any) {
          console.log("error: ", error.response.data);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (userVerifyData) {
        return { ...token, ...userVerifyData}
      }
      return { ...token, ...user };
    },

    async session({ session, token }) {
      userVerifyData = null;
      return {
        ...session,
        user: {
          ...session.user,
          ...token,
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
    return  data.userInfo.roles[0].value === "ADMIN" || data.userInfo.roles[0].value === "MANAGER"
}

const handler = nextAuth(authOptions);
export { handler as GET, handler as POST };
