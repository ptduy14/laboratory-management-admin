"use client";
import { AppContextType } from "next/dist/shared/lib/utils";
import { ReactNode, useContext, useState } from "react";
import { createContext } from "react";
import { Dispatch, SetStateAction } from "react";

const AppContext = createContext<contextValueType | undefined>(undefined);

interface AppState {
  currentCategoryId: number,
  categories: [],
}

interface contextValueType {
  appState: AppState,
  setAppState: Dispatch<SetStateAction<AppState>>
}

const initialState: AppState = {
  currentCategoryId: 1,
  categories: [],
};

export const AppProvider = ({ children }: {children: ReactNode}) => {
  const [appState, setAppState] = useState<AppState>(initialState);

  const contextValue: contextValueType = {
    appState, 
    setAppState
  }

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};


export const useAppContext = (): contextValueType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
}