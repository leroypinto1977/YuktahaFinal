// // app/api/ntevents/registerNTevent/route.js

// import { connectToDatabase } from "@/lib/mongodb";
// import { NTEvent } from "@/models/EventDetails";
// import { TEvent } from "@/models/EventDetails";
// import Transaction from "@/models/Transaction";
// import UserDetails from "@/models/UserDetails";
// import { NextResponse } from "next/server";

// export async function POST(request) {
//   try {
//     await connectToDatabase();
//     const body = await request.json();

//     if (!body.userDetails || !body.eventId) {
//       return NextResponse.json(
//         { message: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     const { userDetails, eventId } = body;

//     // Find the event
//     const event = await TEvent.findOne({ eventid: eventId });
//     if (!event) {
//       return NextResponse.json({ message: "Event not found" }, { status: 404 });
//     }

//     // Check event availability
//     if (event.availability <= 0) {
//       return NextResponse.json({ message: "Event is full" }, { status: 400 });
//     }

//     // Find user
//     const user = await UserDetails.findOne({ email: userDetails.email });
//     if (!user) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }

//     // Check if user is already registered for this event
//     const isAlreadyRegistered = user.tevents.some((e) => e.eventid === eventId);
//     if (isAlreadyRegistered) {
//       return NextResponse.json(
//         { message: "Already registered for this event" },
//         { status: 400 }
//       );
//     }

//     // Create new event registration
//     const newEventRegistration = {
//       name: event.name,
//       eventid: eventId,
//       outer_Img: event.outer_Img,
//       paid: true,
//     };

//     // Create transaction
//     const transactionId = `TE${eventId}_${Date.now()}`;
//     const transaction = new Transaction({
//       transactionId,
//       yuktahaId: userDetails.yuktahaId,
//       firstName: userDetails.firstName,
//       phoneNumber: userDetails.phoneNumber,
//       fees: event.fees,
//       event_type: "technical",
//       eventId: event.eventid,
//       email: userDetails.email,
//       freepass: false,
//     });
//     await transaction.save();

//     // Prepare participant data according to new schema
//     const participantData = {
//       yuktahaId: userDetails.yuktahaId,
//       firstName: userDetails.firstName,
//       email: userDetails.email,
//       phoneNumber: userDetails.phoneNumber,
//       college: userDetails.college,
//     };

//     // Update event details
//     const updatedEvent = await TEvent.findOneAndUpdate(
//       { eventid: eventId },
//       {
//         $push: { participants: participantData },
//         $inc: {
//           count: 1,
//           availability: -1,
//         },
//       },
//       { new: true }
//     );

//     if (!updatedEvent) {
//       throw new Error("Failed to update event document");
//     }

//     // Update user document
//     const updatedUser = await UserDetails.findOneAndUpdate(
//       { email: userDetails.email },
//       {
//         $push: { tevents: newEventRegistration },
//         $inc: { teventsRegistered: 1 },
//       },
//       { new: true }
//     );

//     if (!updatedUser) {
//       throw new Error("Failed to update user document");
//     }

//     return NextResponse.json(
//       {
//         message: "Event registered successfully",
//         event: newEventRegistration,
//         teventsRegistered: updatedUser.teventsRegistered,
//         transaction: transaction,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Event registration error:", error);
//     return NextResponse.json(
//       {
//         message: "Internal server error",
//         error: error.message,
//         stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
//       },
//       { status: 500 }
//     );
//   }
// }

import { connectToDatabase } from "@/lib/mongodb";
// Adjust this import path based on your project structure
import { NTEvent } from "@/models/EventDetails";
// Add this import
import Transaction from "@/models/Transaction";
import UserDetails from "@/models/UserDetails";
import { NextResponse } from "next/server";

// Add this import

export async function POST(request, res) {
  try {
    const API_KEY = process.env.API_KEY; // Store API key in environment variable

    // Get API key from request headers
    const apiKey = request.headers["x-api-key"];

    if (!apiKey || apiKey !== API_KEY) {
      return res.status(401).json({ message: "Unauthorized" });
    }

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
    const event = await NTEvent.findOne({ eventid: eventId }); // Changed from TEvent to NTEvent
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
    const isAlreadyRegistered = user.ntevents.some(
      (e) => e.eventid === eventId
    ); // Changed from tevents to ntevents
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
    // const transactionId = `NTE${eventId}_${Date.now()}`; // Changed from TE to NTE
    // const transaction = new Transaction({
    //   transactionId,
    //   yuktahaId: userDetails.yuktahaId,
    //   firstName: userDetails.firstName,
    //   phoneNumber: userDetails.phoneNumber,
    //   fees: event.fees,
    //   event_type: "non-technical", // Changed from technical to non-technical
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
    const updatedEvent = await NTEvent.findOneAndUpdate(
      // Changed from TEvent to NTEvent
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
        $push: { ntevents: newEventRegistration }, // Changed from tevents to ntevents
        $inc: { nteventsRegistered: 1 }, // Changed from teventsRegistered to nteventsRegistered
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
        nteventsRegistered: updatedUser.nteventsRegistered, // Changed from teventsRegistered to nteventsRegistered
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
