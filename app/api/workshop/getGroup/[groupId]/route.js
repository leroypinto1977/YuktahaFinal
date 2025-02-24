// app/api/workshop/getGroup/[groupId]/route.js

import { connectToDatabase } from "@/lib/mongodb";
import Workshop from "@/models/WorkshopDetails";

export async function GET(req, { params }) {
  await connectToDatabase();

  try {
    // Extract the groupId from the URL parameters
    const groupId = params.groupId;

    // Validate groupId
    if (!groupId) {
      return Response.json(
        { success: false, error: "Group ID is required" },
        { status: 400 }
      );
    }

    // Find workshops matching the groupId
    const workshops = await Workshop.find(
      { groupId: parseInt(groupId) },
      "name dept short_desc workshopid open outer_Img groupId"
    );

    if (!workshops || workshops.length === 0) {
      return Response.json(
        { success: false, error: "No workshops found for this group" },
        { status: 404 }
      );
    }

    return Response.json({ success: true, data: workshops }, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, error: "Failed to fetch workshops by group" },
      { status: 500 }
    );
  }
}
