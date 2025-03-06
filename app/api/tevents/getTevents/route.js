import { connectToDatabase } from "@/lib/mongodb";
// import { NTEvent } from "@/models/EventDetails";
import { TEvent } from "@/models/EventDetails";
import { NextResponse } from "next/server";

// tevents/getTevents/route.js
export async function GET(request) {
  try {
    const apiKey = request.headers.get("x-api-key");

    // Validate API key
    if (!apiKey || apiKey !== process.env.API_KEY) {
      return Response.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get("eventId");
    await connectToDatabase();
    let event;
    if (eventId) {
      event = await TEvent.findOne({ eventid: parseInt(eventId) });
      if (!event) {
        console.log("Event not found for eventId:", eventId);
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
      }

      console.log("Event not found for eventId:", eventId);
      return NextResponse.json({ event }, { status: 200 });
    } else {
      event = await TEvent.find({})
        .select(
          "eventid name dept short_desc outer_Img time date fees limit availability"
        )
        .sort({ date: 1 });
      return NextResponse.json({ events: event }, { status: 200 });
    }
  } catch (error) {
    console.error("Error in event fetch:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
