import { EventRegistrationEmail } from "@/components/emails/EventRegistrationEmail";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Resend } from "resend";

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    // Get user from Kinde Auth for security
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    // If no authenticated user, return unauthorized
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("Resend API key is missing");
      return new Response(
        JSON.stringify({ error: "Email service configuration error" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    } else {
      console.log("Api Key slot crossed.");
    }

    // Get user details from request body
    const userData = await req.json();

    // Verify the email matches the authenticated user's email for security
    if (user.email !== userData.email) {
      return new Response(
        JSON.stringify({ error: "Email mismatch with authenticated user" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    // Add this before the Resend call
    console.log("About to send email with data:", {
      to: userData.email,
      yuktahaId: userData.yuktahaId,
      eventType: userData.eventType,
      eventId: userData.eventId,
      transactionId: userData.transactionId,
      firstName: userData.firstName,
    });

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Yuktaha 2k25<noreply@yuktaha.com>", // Replace with your custom domain
      to: userData.email,
      subject: `Thank you for registering for ${userData.eventType} - ${userData.eventId}`,
      react: await EventRegistrationEmail(userData),
      text: `Thank you ${userData.firstName} for registering for ${userData.eventType} - ${userData.eventId}. Your transaction ID is: ${userData.transactionId}. Please wait for 1 hour for the transaction to be approved.`,
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
