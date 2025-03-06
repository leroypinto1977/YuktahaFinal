// app/api/tevents/registerTevent/route.js
import { connectToDatabase } from "@/lib/mongodb";
import { TEvent } from "@/models/EventDetails";
import Transaction from "@/models/Transaction";
import UserDetails from "@/models/UserDetails";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // const apiKey = request.headers.get("x-api-key");

    // // Validate API key
    // if (!apiKey || apiKey !== process.env.API_KEY) {
    //   return Response.json(
    //     { success: false, error: "Unauthorized" },
    //     { status: 401 }
    //   );
    // }

    await connectToDatabase();
    const body = await request.json();

    if (!body.userDetails || !body.eventId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const { userDetails, eventId } = body;

    // Find the event
    const event = await TEvent.findOne({ eventid: eventId });
    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    // Check event availability
    if (event.availability <= 0) {
      return NextResponse.json({ message: "Event is full" }, { status: 400 });
    }

    // Find user
    const user = await UserDetails.findOne({ email: userDetails.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check if user is already registered for this event
    const isAlreadyRegistered = user.tevents.some((e) => e.eventid === eventId);
    if (isAlreadyRegistered) {
      return NextResponse.json(
        { message: "Already registered for this event" },
        { status: 400 }
      );
    }

    // Create new event registration
    const newEventRegistration = {
      name: event.name,
      eventid: eventId,
      outer_Img: event.outer_Img,
      paid: true,
    };

    // // Create transaction
    // const transactionId = `TE${eventId}_${Date.now()}`;
    // const transaction = new Transaction({
    //   transactionId,
    //   yuktahaId: userDetails.yuktahaId,
    //   firstName: userDetails.firstName,
    //   phoneNumber: userDetails.phoneNumber,
    //   fees: event.fees,
    //   event_type: "technical",
    //   eventId: event.eventid,
    //   email: userDetails.email,
    //   freepass: false,
    // });
    // await transaction.save();

    // Prepare participant data according to new schema
    const participantData = {
      yuktahaId: userDetails.yuktahaId,
      firstName: userDetails.firstName,
      email: userDetails.email,
      phoneNumber: userDetails.phoneNumber,
      college: userDetails.college,
    };

    // Update event details
    const updatedEvent = await TEvent.findOneAndUpdate(
      { eventid: eventId },
      {
        $push: { participants: participantData },
        $inc: {
          count: 1,
          availability: -1,
        },
      },
      { new: true }
    );

    if (!updatedEvent) {
      throw new Error("Failed to update event document");
    }

    // Update user document
    const updatedUser = await UserDetails.findOneAndUpdate(
      { email: userDetails.email },
      {
        $push: { tevents: newEventRegistration },
        $inc: { teventsRegistered: 1 },
      },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("Failed to update user document");
    }

    return NextResponse.json(
      {
        message: "Event registered successfully",
        event: newEventRegistration,
        teventsRegistered: updatedUser.teventsRegistered,
        transaction: transaction,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Event registration error:", error);
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
