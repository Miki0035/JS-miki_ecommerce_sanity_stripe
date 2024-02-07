import React, { ReactNode } from "react";
import "./globals.css";

import { Layout } from "@/components";
import { StateContext } from "@/context/StateContext";
import { Toaster } from "react-hot-toast";


export default function RootLayout({ children }: { children: ReactNode}) {
  return (
    <html lang="en">
      <body>
        <StateContext>
          <Toaster />
          <Layout>{children}</Layout>
        </StateContext>
      </body>
    </html>
  );
}
