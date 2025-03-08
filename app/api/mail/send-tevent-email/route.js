import TEventRegistrationEmail from "@/components/emails/TEventRegistrationEmail";
import { render } from "@react-email/render";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email, userName, eventName, eventId } = await req.json();

    if (!email || !userName || !eventName || !eventId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Render the email HTML
    const emailHtml = await render(
      <TEventRegistrationEmail
        userName={userName}
        eventName={eventName}
        eventId={eventId}
      />
    );

    // Configure SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "yukta@psgitech.ac.in",
        // clientId: process.env.CLIENT_ID,
        // clientSecret: process.env.CLIENT_SECRET,
        // refreshToken: process.env.REFRESH_TOKEN,
        // accessToken: process.env.ACCESS_TOKEN,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Send the email
    await transporter.sendMail({
      from: '"Yuktaha 2k25" <no-reply@yuktaha.com>',
      to: email,
      subject: "Technical Event Registration Confirmation",
      html: emailHtml,
    });

    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { message: "Failed to send email", error: error.message },
      { status: 500 }
    );
  }
}
