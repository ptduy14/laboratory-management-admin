"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { Layout } from "../components/layout/layout";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import { AppProvider } from "@/contexts/AppContext";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
  session?: any;
}

export function Providers({ children, themeProps, session }: ProvidersProps) {
  const pathname = usePathname();
  return (
    <SessionProvider session={session}>
      <NextUIProvider>
        <NextThemesProvider
          defaultTheme="system"
          attribute="class"
          {...themeProps}
        >
          <AppProvider>
            {pathname === "/login" || pathname.startsWith("/api") ? (
              children
            ) : (
              <Layout>{children}</Layout>
            )}
            <ToastContainer />
          </AppProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}
