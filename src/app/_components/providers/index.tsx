"use client"
import { FC, PropsWithChildren } from "react";
import { FirebaseProvider } from "./Firebase";

export const Providers: FC<PropsWithChildren> = ({children}) => {
  return (
    <FirebaseProvider>
      {children}
    </FirebaseProvider>
  )
}