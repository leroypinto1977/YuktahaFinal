// "use client";

// // Ensures this component only renders on the client side
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// export default function NavbarTabs({ isAuthenticated, user }) {
//   const pathname = usePathname();
//   console.log("pathname:", pathname);

//   const publicNavLinks = [
//     { href: "/", label: "Home" },
//     { href: "/workshops", label: "Workshops" },
//     { href: "/events", label: "Events" },
//     { href: "/ambassador", label: "Student Ambassador" },
//   ];

//   const privateNavLinks = [
//     // { href: "/dashboard", label: "Dashboard" },
//     { href: "/profile", label: "Profile" },
//   ];

//   return (
//     <>
//       {/* Centered Navigation Links */}
//       <div className="w-2/4 flex justify-center space-x-6">
//         {publicNavLinks.map((link) => {
//           const isActive = pathname === link.href;

//           return (
//             <Link
//               key={link.href}
//               href={link.href}
//               className={`text-white nav-tabs font-sofia ${
//                 isActive ? "active" : ""
//               }`}
//             >
//               {link.label}
//             </Link>
//           );
//         })}

//         {/* Private Links (Authenticated Users) */}
//         {isAuthenticated &&
//           privateNavLinks.map((link) => {
//             const isActive = pathname === link.href;

//             return (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className={`text-white nav-tabs font-sofia ${
//                   isActive ? "active" : ""
//                 }`}
//               >
//                 {link.label}
//               </Link>
//             );
//           })}
//       </div>
//     </>
//   );
// }
// NavbarTabs.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarTabs({ isAuthenticated, user, isMobile }) {
  const pathname = usePathname();

  const publicNavLinks = [
    { href: "/", label: "Home" },
    { href: "/workshops", label: "Workshops" },
    { href: "/events", label: "Events" },
    { href: "/ambassador", label: "Student Ambassador" },
  ];

  const privateNavLinks = [{ href: "/profile", label: "Profile" }];

  const linkClasses = isMobile
    ? "text-white font-sofia text-lg hover:text-gray-300 block py-2"
    : "text-white nav-tabs font-sofia";

  const containerClasses = isMobile
    ? "flex flex-col space-y-2"
    : "flex justify-center space-x-6";

  return (
    <div className={containerClasses}>
      {publicNavLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`${linkClasses} ${isActive ? "active" : ""}`}
          >
            {link.label}
          </Link>
        );
      })}

      {isAuthenticated &&
        privateNavLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`${linkClasses} ${isActive ? "active" : ""}`}
            >
              {link.label}
            </Link>
          );
        })}
    </div>
  );
}
