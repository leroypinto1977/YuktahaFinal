import { connectToDatabase } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";
import UserDetails from "@/models/UserDetails";
import Workshop from "@/models/WorkshopDetails";
import { NextResponse } from "next/server";

export async function POST(request, res) {
  const apiKey = request.headers.get("x-api-key");

  // Validate API key
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return Response.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }
  try {
    await connectToDatabase();

    const body = await request.json();
    const { userDetails, workshopId, transactionId } = body;

    // Validate required fields
    const missingFields = [];
    if (!userDetails) missingFields.push("userDetails");
    if (!workshopId) missingFields.push("workshopId");
    if (!transactionId) missingFields.push("transactionId");

    if (missingFields.length > 0) {
      return NextResponse.json(
        { message: `Missing required fields: ${missingFields.join(", ")}` },
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

    // Check workshop availability
    if (workshop.availability <= 0) {
      return NextResponse.json(
        { message: "Workshop is full" },
        { status: 400 }
      );
    }

    // Find user
    const user = await UserDetails.findOne({ email: userDetails.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check if user is already registered for this workshop
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

    const mailParameters = {
      email: userDetails.email,
      yuktahId: userDetails.yuktahaId,
      eventType: "Workshop",
      eventId: workshopId,
      transactionId: transactionid,
      firstName: userDetails.firstName,
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

    // Update transaction status
    const updatedTransaction = await Transaction.findOneAndUpdate(
      { transactionId },
      { status: "completed" }, // Update transaction stage
      { new: true }
    );

    if (!updatedTransaction) {
      throw new Error("Failed to update transaction document");
    }

    return NextResponse.json(
      {
        message: "Workshop registered successfully",
        workshop: newWorkshopRegistration,
        workshopsRegistered: updatedUser.workshopsRegistered,
        transaction: updatedTransaction,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Workshop registration error:", error);
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
