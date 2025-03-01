import UserDetails from "../../../models/UserDetails";
import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Get email from query parameters
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Email parameter is required" },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Check if user exists
    const existingUser = await UserDetails.findOne({ email: email });

    // Return result
    return NextResponse.json({ exists: !!existingUser });
  } catch (error) {
    console.error("Error checking user:", error);
    return NextResponse.json(
      { error: "Failed to check user" },
      { status: 500 }
    );
  }
}
