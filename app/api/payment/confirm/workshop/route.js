import { connectToDatabase } from "@/lib/mongodb";
import UserDetails from "@/models/UserDetails";
import Workshop from "@/models/WorkshopDetails";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Connect to the database

    await connectToDatabase();

    // Parse the request body
    const body = await request.json();
    const { transactionId, userDetails, workshopId } = body;

    if (!transactionId || !userDetails || !workshopId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Find the workshop
    const workshop = await Workshop.findOne({ workshopid: workshopId });
    if (!workshop) {
      return NextResponse.json(
        { message: "Workshop not found" },
        { status: 404 }
      );
    }

    // Check if the user is already registered for this workshop
    const user = await UserDetails.findOne({ email: userDetails.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isAlreadyRegistered = user.workshop.some(
      (w) => w.workshopid === workshopId
    );
    if (isAlreadyRegistered) {
      return NextResponse.json(
        { message: "Already registered for this workshop" },
        { status: 400 }
      );
    }

    // Create new workshop registration
    const newWorkshopRegistration = {
      name: workshop.name,
      workshopid: workshopId,
      outer_Img: workshop.outer_Img,
      paid: true,
    };

    // Update workshop details with new participant and counts
    const updatedWorkshop = await Workshop.findOneAndUpdate(
      { workshopid: workshopId },
      {
        $push: {
          participants: {
            yuktahaId: userDetails.yuktahaId,
            firstName: userDetails.firstName,
            email: userDetails.email,
            phoneNumber: userDetails.phoneNumber,
            college: userDetails.college,
          },
        },
        $inc: {
          count: 1,
          availability: -1,
        },
      },
      { new: true }
    );

    if (!updatedWorkshop) {
      throw new Error("Failed to update workshop document");
    }

    // Update user document
    const updatedUser = await UserDetails.findOneAndUpdate(
      { email: userDetails.email },
      {
        $push: { workshop: newWorkshopRegistration },
        $inc: { workshopsRegistered: 1 },
      },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("Failed to update user document");
    }

    return NextResponse.json(
      {
        message: "Payment confirmed and registration completed",
        workshop: updatedWorkshop,
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error confirming payment:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
