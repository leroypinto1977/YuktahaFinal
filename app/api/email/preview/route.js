// /app/api/email/preview/route.js
import { YuktahaConfirmationEmail } from "@/components/emails/YuktahaConfirmationEmail";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function GET(req) {
  try {
    // Get user from Kinde Auth for security
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    // If no authenticated user, return unauthorized
    if (!user || !user.id) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Sample data for preview
    const sampleData = {
      firstName: "John",
      lastName: "Doe",
      email: user.email,
      yuktahaId: "YUK2025-1234",
      college: "Example University",
      department: "Computer Science",
      city: "Tech City",
      phoneNumber: "1234567890",
      yearOfStudy: "3",
    };

    // Generate the email component
    const emailHtml = await YuktahaConfirmationEmail(sampleData);

    // Return the HTML for preview
    return new Response(emailHtml, {
      status: 200,
      headers: { "Content-Type": "text/html" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
