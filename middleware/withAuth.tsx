"use client";
import { useLayoutEffect } from "react";
import { checkAuthenticate } from "@/utils/checkAuthenticate";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export const withAuth = (Component: any) => {
  return function WithAuth(props: any) {
    const isAuthenticated = checkAuthenticate();
    const router = useRouter();
    const pathname = usePathname();

    useLayoutEffect(() => {
      if (!isAuthenticated) {
        router.push("/login");
      } else {
        if (pathname === "/login") {
          router.push("/");
        }
      }
    }, []);

    return <Component {...props} />;
  };
};
