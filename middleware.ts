import { withAuth } from "next-auth/middleware";

export default withAuth(
  async function middleware(req) {
    // const user = req.nextauth.token;
    // console.log(user)
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (req.nextUrl.pathname.startsWith("/accounts") && token?.role !== "ADMIN") {
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
