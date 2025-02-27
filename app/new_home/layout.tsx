// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "../globals.css";
// import { AuthProvider } from "@/app/AuthProvider";
// import Footer from "@/components/Footer";
// import Navbar from "@/components/Navbar";

// // const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Ideathon Platform",
//   description: "Innovate, Collaborate, Transform",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <body className={`bg-transparent flex flex-col min-h-screen`}>
//       <Navbar />
//       <main className="flex-1 bg-gray-100 flex flex-col">{children}</main>
//       <Footer />
//     </body>
//   );
// }

// import Footer from "@/components/Footer";
// import Navbar from "@/components/Navbar";
// import { HeroUIProvider } from "@heroui/react";
// import React from "react";
// import "../globals.css";
// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Ideathon Platform",
//   description: "Innovate, Collaborate, Transform",
// };

// const layout = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <body
//       className={`bg-gradient-to-br from-neutral-800 to-neutral-900 flex flex-col min-h-screen`}
//     >
//       <div className="flex-1 bg-gray-100 flex flex-col">{children}</div>
//     </body>
//   );
// };

// export default layout;

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";
import "@/app/globals.css";
import { shouldHideNavbar } from "@/utils/hideNavbarRoutes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yuktaha",
  description: "Innovate, Collaborate, Transform",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <body className="relative bg-gradient-to-br from-neutral-800 to-neutral-900 flex flex-col min-h-screen">
      {/* <Navbar /> */}
      <div className="flex-1 flex flex-col">{children}</div>
      {/* <Footer /> */}
    </body>
  );
};

export default layout;
