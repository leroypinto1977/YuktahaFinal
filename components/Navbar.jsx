// import NavbarTabs from "./NavbarTabs";
// import UserDropdown from "./UserDropdown";
// import { Button } from "@/components/ui/button";
// import {
//   RegisterLink,
//   LoginLink,
//   LogoutLink,
// } from "@kinde-oss/kinde-auth-nextjs/components";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import Link from "next/link";
// import React from "react";

// export default async function Navbar() {
//   const { getUser, isAuthenticated } = getKindeServerSession();
//   const user = await getUser();
//   const authenticated = await isAuthenticated();
//   console.log(user);

//   const publicNavLinks = [
//     { href: "/", label: "Home" },
//     { href: "/workshops", label: "Workshops" },
//     { href: "/events", label: "Technical Events" },
//     { href: "/about", label: "About" },
//   ];

//   const privateNavLinks = [
//     { href: "/dashboard", label: "Dashboard" },
//     { href: "/profile", label: "Profile" },
//   ];

//   return (
//     <nav className="flex items-center justify-between py-4 px-6 bg-transparent absolute w-full top-0 left-0 z-50">
//       {/* Logo Section */}
//       <div className="w-1/4 flex justify-start">
//         <h1 className="text-lg text-white font-bold">Yukta</h1>
//       </div>

//       {/* Centered Navigation Links */}
//       <NavbarTabs isAuthenticated={authenticated} user={user} />

//       {/* Authentication Section */}
//       <div className="w-1/4 flex justify-end relative">
//         {!(await isAuthenticated()) ? (
//           <div className="flex space-x-2">
//             <LoginLink>
//               <Button>Sign in</Button>
//             </LoginLink>
//             <RegisterLink>
//               <Button variant="outline">Sign up</Button>
//             </RegisterLink>
//           </div>
//         ) : (
//           <UserDropdown user={user} />
//         )}
//       </div>
//     </nav>
//   );
// }

"use client";

import NavbarClient from "./NavbarClient";
// import NavbarClient from "./NewNavbar";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import React from "react";

export default function Navbar() {
  const { user, isAuthenticated } = useKindeBrowserClient();
  const authenticated = isAuthenticated;

  return <NavbarClient authenticated={authenticated} user={user} />;
}
