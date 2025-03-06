import UserDetails from "../../../models/UserDetails";
import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request, res) {
  try {
    // Get email from query parameters

    // const apiKey = request.headers.get("x-api-key");

    // // Validate API key
    // if (!apiKey || apiKey !== process.env.API_KEY) {
    //   return Response.json(
    //     { success: false, error: "Unauthorized" },
    //     { status: 401 }
    //   );
    // }
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
