import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { to, subject, text, html } = await req.json();

    // SMTP Configuration
    const transporter = nodemailer.createTransport({
      host: "smtp.yourdomain.com", // Replace with your domain's SMTP server
      port: 587, // Use 465 for SSL, 587 for TLS
      secure: false, // True for port 465, false otherwise
      auth: {
        user: process.env.EMAIL_USER, // Your email (set in .env)
        pass: process.env.EMAIL_PASSWORD, // Use environment variable
      },
    });

    // Send Email
    await transporter.sendMail({
      from: '"Yuktaha 2k25" <noreply@yuktaha.com>',
      to,
      subject,
      text,
      html,
    });

    return Response.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Failed to send email", error: error.message },
      { status: 500 }
    );
  }
}
