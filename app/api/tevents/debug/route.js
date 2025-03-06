import { connectToDatabase } from "@/lib/mongodb";
import { TEvent } from "@/models/EventDetails";

export async function GET(request) {
  // const API_KEY = process.env.API_KEY; // Store API key in environment variable

  // const apiKey = request.headers.get("x-api-key");

  // // Validate API key
  // if (!apiKey || apiKey !== process.env.API_KEY) {
  //   return Response.json(
  //     { success: false, error: "Unauthorized" },
  //     { status: 401 }
  //   );
  // }

  await connectToDatabase();

  try {
    // Get all events with minimal fields for debugging
    const events = await TEvent.find({}, "eventid name groupId type").lean();

    return new Response(
      JSON.stringify({
        success: true,
        total: events.length,
        events: events,
        groupCounts: events.reduce((acc, event) => {
          acc[event.groupId] = (acc[event.groupId] || 0) + 1;
          return acc;
        }, {}),
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Debug endpoint error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to fetch debug information",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
