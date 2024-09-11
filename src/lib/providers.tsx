"use client";
import React, { ReactNode } from "react";
import { MainContextProvider } from "./MainContext";

type Props = {
  children: ReactNode;
};

export default function Providers({ children }: Props) {
  return <MainContextProvider>{children}</MainContextProvider>;
}
