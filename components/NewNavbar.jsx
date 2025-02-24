import UserDropdown from "./UserDropdown";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function NavbarClient({ authenticated, user }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const publicNavLinks = [
    { href: "/", label: "Home" },
    { href: "/workshops", label: "Workshops" },
    { href: "/events", label: "Events" },
    { href: "/ambassador", label: "Student Ambassador" },
  ];

  const privateNavLinks = [{ href: "/profile", label: "Profile" }];

  const baseNavClasses = "flex items-center justify-between px-6 w-full z-50";
  const navClasses =
    pathname === "/"
      ? `${baseNavClasses} py-4 bg-transparent absolute top-0 left-0`
      : `${baseNavClasses} ${
          pathname === "/events" || pathname === "/workshops" ? "pt-4" : "py-4"
        } bg-transparent`;

  return (
    <nav className={navClasses}>
      {/* Logo Section */}
      <div className="flex items-center">
        <h1 className="text-lg text-white font-bold font-sofia">Yuktaha</h1>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center justify-center space-x-6 flex-1 mx-4">
        {publicNavLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-white nav-tabs font-sofia ${
              pathname === link.href ? "active" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
        {authenticated &&
          privateNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-white nav-tabs font-sofia ${
                pathname === link.href ? "active" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
      </div>

      {/* Desktop Auth Section */}
      <div className="hidden md:flex items-center">
        {!authenticated ? (
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
        ) : (
          <UserDropdown user={user} />
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[300px] bg-[#1a1a1a] border-l border-gray-800">
            <div className="flex flex-col space-y-4 mt-8">
              {publicNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-white font-sofia text-lg hover:text-gray-300 ${
                    pathname === link.href ? "text-blue-400" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {authenticated &&
                privateNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-white font-sofia text-lg hover:text-gray-300 ${
                      pathname === link.href ? "text-blue-400" : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              {!authenticated ? (
                <div className="flex flex-col space-y-2 mt-4">
                  <LoginLink>
                    <Button className="w-full bg-[#3B6790] font-sofia">
                      Sign In
                    </Button>
                  </LoginLink>
                  <RegisterLink>
                    <Button variant="outline" className="w-full font-sofia">
                      Register
                    </Button>
                  </RegisterLink>
                </div>
              ) : (
                <div className="mt-4">
                  <UserDropdown user={user} />
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
