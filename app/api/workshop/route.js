import { connectToDatabase } from "@/lib/mongodb";
import Workshop from "@/models/WorkshopDetails";

export async function POST(req, res) {
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
    const body = await req.json(); // Next.js App Router requires `req.json()`
    const workshop = await Workshop.create(body);
    return Response.json({ success: true, data: workshop }, { status: 201 });
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
    const workshops = await Workshop.find(
      {},
      "name dept short_desc workshopid open outer_Img"
    );
    return Response.json(workshops, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch workshops" },
      { status: 500 }
    );
  }
}
