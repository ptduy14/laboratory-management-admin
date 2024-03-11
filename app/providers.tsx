"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { Layout } from "../components/layout/layout";
import { usePathname } from "next/navigation";
import { AuthProvider } from "@/contexts/AuthContext";
import { Provider } from "react-redux";
import { store, persistor } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const pathname = usePathname();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NextUIProvider>
          <NextThemesProvider
            defaultTheme="system"
            attribute="class"
            {...themeProps}
          >
            <AuthProvider>
              {pathname === "/login" ? children : <Layout>{children}</Layout>}
              <ToastContainer />
            </AuthProvider>
          </NextThemesProvider>
        </NextUIProvider>
      </PersistGate>
    </Provider>
  );
}
