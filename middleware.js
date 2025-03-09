// import {
//   authMiddleware,
//   withAuth,
// } from "@kinde-oss/kinde-auth-nextjs/middleware";

// export default function middleware(req: Request) {
//   return withAuth(req);
// }

// export const config = {
//   matcher: ["/profile"],
// };

import UserDetails from "./models/UserDetails";
import {
  authMiddleware,
  withAuth,
} from "@kinde-oss/kinde-auth-nextjs/middleware";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export default async function middleware(req) {
  // First apply the Kinde authentication middleware
  const authResult = await withAuth(req);

  // If the auth middleware redirected or responded, return that response
  if (authResult instanceof Response) {
    return authResult;
  }

  // Get the path from the request
  const path = req.nextUrl.pathname;

  // Check if the path is one of our protected role-based routes
  if (
    path === "/admin" ||
    path.startsWith("/admin/") ||
    path === "/staff" ||
    path.startsWith("/staff/")
  ) {
    try {
      // Get the user ID from Kinde auth
      const kindeId =
        req.headers.get("x-kinde-user-id") ||
        req.cookies.get("kinde_user_id")?.value;

      if (!kindeId) {
        // Redirect to login if no user ID
        return NextResponse.redirect(new URL("/api/auth/login", req.url));
      }

      // Connect to MongoDB if not connected
      if (mongoose.connection.readyState !== 1) {
        // You might want to use your existing DB connection method here
        await mongoose.connect(process.env.MONGODB_URI);
      }

      // Find the user in your database
      const user = await UserDetails.findOne({ k_id: kindeId });

      if (!user) {
        // If user not found, redirect to unauthorized page
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }

      // Check if the user has the required role
      if (
        (path === "/admin" || path.startsWith("/admin/")) &&
        user.userRole !== "admin"
      ) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }

      if (
        (path === "/staff" || path.startsWith("/staff/")) &&
        user.userRole !== "staff"
      ) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }

      // If all checks pass, allow access
      return NextResponse.next();
    } catch (error) {
      console.error("Error in role-based middleware:", error);
      return NextResponse.redirect(new URL("/error", req.url));
    }
  }

  // For non-protected routes, continue with normal auth
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/admin", "/admin/:path*", "/staff", "/staff/:path*"],
};
