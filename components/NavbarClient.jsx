// "use client";

// import NavbarTabs from "./NavbarTabs";
// import UserDropdown from "./UserDropdown";
// import { Button } from "@/components/ui/button";
// import {
//   RegisterLink,
//   LoginLink,
// } from "@kinde-oss/kinde-auth-nextjs/components";
// import { usePathname } from "next/navigation";

// export default function NavbarClient({ authenticated, user }) {
//   const pathname = usePathname();
//   console.log("pathname:", pathname);

//   if (pathname !== "/") {
//     if (pathname === "/events" || pathname === "/workshops") {
//       return (
//         <nav className="flex items-center justify-between pt-4 px-6 bg-transparent w-full z-50">
//           {/* Logo Section */}
//           <div className="w-1/4 flex justify-start">
//             <h1 className="text-lg text-white font-bold font-sofia">Yuktaha</h1>
//           </div>

//           {/* Centered Navigation Links */}
//           <NavbarTabs isAuthenticated={authenticated} user={user} />

//           {/* Authentication Section */}
//           <div className="w-1/4 flex justify-end relative">
//             {!authenticated ? (
//               <div className="flex space-x-2">
//                 <LoginLink>
//                   <Button className=" bg-[#3B6790] items-baseline font-sofia">
//                     {/* <span className="font-sofia">Sign in</span> */}
//                     Sign In
//                   </Button>
//                 </LoginLink>
//                 <RegisterLink>
//                   <Button
//                     variant="outline"
//                     className="font-sofia items-baseline"
//                   >
//                     Register
//                   </Button>
//                 </RegisterLink>
//               </div>
//             ) : (
//               <UserDropdown user={user} />
//             )}
//           </div>
//         </nav>
//       );
//     } else {
//       return (
//         <nav className="flex items-center justify-between py-4 px-6 bg-transparent w-full z-50">
//           {/* Logo Section */}
//           <div className="w-1/4 flex justify-start">
//             <h1 className="text-lg text-white font-bold font-sofia">Yuktaha</h1>
//           </div>

//           {/* Centered Navigation Links */}
//           <NavbarTabs isAuthenticated={authenticated} user={user} />

//           {/* Authentication Section */}
//           <div className="w-1/4 flex justify-end relative">
//             {!authenticated ? (
//               <div className="flex space-x-2">
//                 <LoginLink>
//                   <Button className=" bg-[#3B6790] items-baseline font-sofia">
//                     {/* <span className="font-sofia">Sign in</span> */}
//                     Sign In
//                   </Button>
//                 </LoginLink>
//                 <RegisterLink>
//                   <Button
//                     variant="outline"
//                     className="font-sofia items-baseline"
//                   >
//                     Register
//                   </Button>
//                 </RegisterLink>
//               </div>
//             ) : (
//               <UserDropdown user={user} />
//             )}
//           </div>
//         </nav>
//       );
//     }
//   } else {
//     return (
//       <nav className="flex items-center justify-between py-4 px-6 bg-transparent absolute w-full top-0 left-0 z-50">
//         {/* Logo Section */}
//         <div className="w-1/4 flex justify-start">
//           <h1 className="text-lg text-white font-bold font-sofia">Yuktaha</h1>
//         </div>

//         {/* Centered Navigation Links */}
//         <NavbarTabs isAuthenticated={authenticated} user={user} />

//         {/* Authentication Section */}
//         <div className="w-1/4 flex justify-end relative">
//           {!authenticated ? (
//             <div className="flex space-x-2">
//               <LoginLink>
//                 <Button className=" bg-[#3B6790] items-baseline font-sofia">
//                   {/* <span className="font-sofia">Sign in</span> */}
//                   Sign In
//                 </Button>
//               </LoginLink>
//               <RegisterLink>
//                 <Button variant="outline" className="font-sofia items-baseline">
//                   Register
//                 </Button>
//               </RegisterLink>
//             </div>
//           ) : (
//             <UserDropdown user={user} />
//           )}
//         </div>
//       </nav>
//     );
//   }
// }

// NavbarClient.jsx
"use client";

import NavbarTabs from "./NavbarTabs";
import UserDropdown from "./UserDropdown";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

export default function NavbarClient({ authenticated, user }) {
  const pathname = usePathname();

  const baseNavClasses = "flex items-center justify-between px-6 w-full z-50";
  const navClasses =
    pathname === "/"
      ? `${baseNavClasses} py-4 bg-transparent absolute top-0 left-0`
      : `${baseNavClasses} ${
          pathname === "/events" || pathname === "/workshops" ? "pt-4" : "py-4"
        } bg-transparent`;

  const AuthButtons = () => (
    <div className="flex space-x-2">
      <LoginLink>
        <Button className="bg-[#3B6790] items-baseline font-sofia">
          Sign In
        </Button>
      </LoginLink>
      <RegisterLink>
        <Button variant="outline" className="font-sofia items-baseline">
          Register
        </Button>
      </RegisterLink>
    </div>
  );

  return (
    <nav className={navClasses}>
      {/* Logo Section */}
      <div className="w-1/4 flex justify-start">
        <h1 className="text-lg text-white font-bold font-sofia">Yuktaha</h1>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:block w-2/4">
        <NavbarTabs isAuthenticated={authenticated} user={user} />
      </div>

      {/* Desktop Auth Section */}
      <div className="hidden md:flex w-1/4 justify-end relative">
        {!authenticated ? <AuthButtons /> : <UserDropdown user={user} />}
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden flex items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[300px] bg-[#1a1a1a] border-l border-gray-800">
            <div className="flex flex-col space-y-4 mt-8">
              <NavbarTabs
                isAuthenticated={authenticated}
                user={user}
                isMobile={true}
              />
              <div className="mt-4">
                {!authenticated ? (
                  <AuthButtons />
                ) : (
                  <UserDropdown user={user} />
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
