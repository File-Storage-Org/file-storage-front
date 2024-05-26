"use client";
import "./globals.css";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/services/auth/AuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>File Storage</title>
      </head>
      <body>
        <AuthProvider>
          <Navbar />
          <div>{children}</div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
