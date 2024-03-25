import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import nextAuth, { NextAuthOptions } from "next-auth";
import { AuthService } from "@/services/authService";
import axiosConfig from "@/config/axiosConfig";


export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    
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

        if (
          (res.status == 201 &&
            res.data &&
            res.data.userInfo.roles[0].value === "ADMIN") ||
          res.data.userInfo.roles[0].value === "MANAGER"
        ) {
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
    async jwt({ token, user }) {
      console.log("JWT callback", {token, user})
      if (user) {
        token.accessToken = user.access_token
        token.id = user.userInfo.id
        token.name = user.userInfo.firstName
        token.email = user.userInfo.email
        token.role = user.userInfo.roles[0].value
      }
      return token;
    },

    async session({ session, user, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          accessToken: token.accessToken,
          id: token.id,
          name: token.name,
          email: token.email,
          role: token.role
        }
      }
      console.log("Session callback", {session, token})
      // return session;
    },
  },
};



const handler = nextAuth(authOptions);
export { handler as GET, handler as POST };
