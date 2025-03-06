import { connectToDatabase } from "@/lib/mongodb";
import { NTEvent } from "@/models/EventDetails";
import { TEvent } from "@/models/EventDetails";
import { NextResponse } from "next/server";

// ntevents/getNTevents/route.js
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get("eventId");

    const API_KEY = process.env.API_KEY; // Store API key in environment variable

    const apiKey = request.headers.get("x-api-key");

    // Validate API key
    if (!apiKey || apiKey !== process.env.API_KEY) {
      return Response.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectToDatabase();
    let event;
    if (eventId) {
      event = await NTEvent.findOne({ eventid: parseInt(eventId) });
      if (!event) {
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
      }
      return NextResponse.json({ event }, { status: 200 });
    } else {
      event = await NTEvent.find({})
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
