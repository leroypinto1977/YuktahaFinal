// import { connectToDatabase } from "@/lib/mongodb";
// import Workshop from "@/models/WorkshopDetails";

// export async function POST(req) {
//   await connectToDatabase();

//   try {
//     const body = await req.json(); // Next.js App Router requires `req.json()`
//     const workshop = await Workshop.create(body);
//     return Response.json({ success: true, data: workshop }, { status: 201 });
//   } catch (error) {
//     return Response.json(
//       { success: false, error: error.message },
//       { status: 400 }
//     );
//   }
// }

// export async function GET() {
//   await connectToDatabase();

//   try {
//     const workshops = await Workshop.find(
//       {},
//       "name dept short_desc workshopid open outer_Img"
//     );
//     return Response.json(workshops, { status: 200 });
//   } catch (error) {
//     return Response.json(
//       { error: "Failed to fetch workshops" },
//       { status: 500 }
//     );
//   }
// }

// app/api/workshop/getWorkshop/route.js

import { connectToDatabase } from "@/lib/mongodb";
import Workshop from "@/models/WorkshopDetails";
import { NextResponse } from "next/server";

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
    const workshopId = searchParams.get("workshopId");

    // Connect to MongoDB
    await connectToDatabase();

    let workshop;
    if (workshopId) {
      // If workshopId is provided, fetch specific workshop
      workshop = await Workshop.findOne({ workshopid: parseInt(workshopId) });

      if (!workshop) {
        return NextResponse.json(
          { error: "Workshop not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({ workshop }, { status: 200 });
    } else {
      // If no workshopId, fetch all workshops
      workshop = await Workshop.find({})
        .select(
          "workshopid name dept short_desc outer_Img time date fees limit availability"
        )
        .sort({ date: 1 });

      return NextResponse.json({ workshops: workshop }, { status: 200 });
    }
  } catch (error) {
    console.error("Error in workshop fetch:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
