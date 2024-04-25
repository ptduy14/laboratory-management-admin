import { withAuth } from "next-auth/middleware";
import { RoleEnum } from "./enums/role";

export default withAuth(
  async function middleware(req) {
    // const user = req.nextauth.token;
    // console.log(user)
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (req.nextUrl.pathname.startsWith("/accounts") && token?.userInfo.role !== RoleEnum.ADMIN) {
          return false
        } else if (token) {
          return true
        }
        return false
      },
    },
  }
);


export const config = { 
  matcher: ['/((?!login).*)',],
};
