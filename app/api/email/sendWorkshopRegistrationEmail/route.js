import { WorkshopRegistrationEmail } from "@/components/emails/WorkshopRegistrationEmail";
import { Resend } from "resend";

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    // Get user details from request body
    const userData = await req.json();

    // Validate required fields
    if (
      !userData.email ||
      !userData.firstName ||
      !userData.workshopId ||
      !userData.workshopDate ||
      !userData.workshopTime
    ) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields in the request body",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Yuktaha 2k25<noreply@yuktaha.com>", // Replace with your custom domain
      to: userData.email,
      subject: `Thank you for registering for the workshop - ${userData.workshopId}`,
      react: WorkshopRegistrationEmail({
        firstName: userData.firstName,
        workshopId: userData.workshopId,
        workshopDate: userData.workshopDate,
        workshopTime: userData.workshopTime,
      }),
      text: `Thank you ${userData.firstName} for registering for the workshop. Workshop ID: ${userData.workshopId}, Date: ${userData.workshopDate}, Time: ${userData.workshopTime}.`,
    });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Detailed error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
