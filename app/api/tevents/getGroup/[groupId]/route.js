import { connectToDatabase } from "@/lib/mongodb";
import { TEvent } from "@/models/EventDetails";

export async function GET(req, { params }) {
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
    const groupId = params.groupId;

    if (!groupId) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Group ID is required",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const events = await TEvent.find(
      {
        groupId: parseInt(groupId),
      },
      "name dept short_desc eventid open outer_Img groupId type registrationFee teamSize"
    );

    if (!events || events.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "No events found for this group",
        }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: events,
        metadata: {
          groupId: groupId,
          count: events.length,
        },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching technical events by group:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to fetch technical events",
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
