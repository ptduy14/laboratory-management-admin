"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { Layout } from "../components/layout/layout";
import { usePathname } from "next/navigation";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const pathname = usePathname();

  return (
    <NextUIProvider>
      <NextThemesProvider
        defaultTheme="system"
        attribute="class"
        {...themeProps}
      >
        {pathname === "/login" ? children : <Layout>{children}</Layout>}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
