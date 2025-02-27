import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";
import "../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yuktaha",
  description: "Innovate, Collaborate, Transform",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <body className="relative bg-black flex flex-col min-h-screen">
      {/* <Navbar /> */}
      <div className="flex-1 flex flex-col">{children}</div>
      <Footer />
    </body>
  );
};

export default layout;
