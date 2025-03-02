import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/app/AuthProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ToastProvider } from "@/components/ui/toast";
import { HeroUIProvider } from "@heroui/react";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yuktaha",
  description: "Innovate, Collaborate, Transform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en" className="bg-black">
        {/* <body className={`${inter.className} flex flex-col min-h-screen`}>
          {children}
        </body> */}
        {children}
        {/* <ToastProvider>{children}</ToastProvider> */}
      </html>
    </AuthProvider>
  );
}
