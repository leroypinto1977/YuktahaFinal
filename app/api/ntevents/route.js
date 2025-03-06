import { connectToDatabase } from "@/lib/mongodb";
import { NTEvent } from "@/models/EventDetails";
import { TEvent } from "@/models/EventDetails";
import { NextResponse } from "next/server";

// ntevents/route.js
export async function POST(req) {
  const API_KEY = process.env.API_KEY; // Store API key in environment variable

  const apiKey = req.headers.get("x-api-key");

  // Validate API key
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return Response.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  await connectToDatabase();
  try {
    const body = await req.json();
    const event = await NTEvent.create(body);
    return Response.json({ success: true, data: event }, { status: 201 });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function GET(req, res) {
  const API_KEY = process.env.API_KEY; // Store API key in environment variable

  // Get API key from request headers
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  await connectToDatabase();
  try {
    const events = await NTEvent.find(
      {},
      "name dept short_desc eventid open outer_Img"
    );
    return Response.json(events, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}
