// // /app/api/sendConfirmationEmail/route.js

// import { YuktahaConfirmationEmail } from "@/components/emails/YuktahaConfirmationEmail";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import { Resend } from "resend";

// // Initialize Resend with your API key
// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(req) {
//   try {
//     // Get user from Kinde Auth for security
//     const { getUser } = getKindeServerSession();
//     const user = await getUser();

//     // If no authenticated user, return unauthorized
//     if (!user) {
//       return new Response(JSON.stringify({ error: "Unauthorized" }), {
//         status: 401,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     if (!process.env.RESEND_API_KEY) {
//       console.error("Resend API key is missing");
//       return new Response(
//         JSON.stringify({ error: "Email service configuration error" }),
//         { status: 500, headers: { "Content-Type": "application/json" } }
//       );
//     } else {
//       console.log("Api Key slot crossed.");
//     }

//     // Get user details from request body
//     const userData = await req.json();

//     // Verify the email matches the authenticated user's email for security
//     if (user.email !== userData.email) {
//       return new Response(
//         JSON.stringify({ error: "Email mismatch with authenticated user" }),
//         { status: 403, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     // Add this before the Resend call
//     console.log("About to send email with data:", {
//       to: userData.email,
//       yuktahaId: userData.yuktahaId,
//     });

//     // Send email using Resend
//     const { data, error } = await resend.emails.send({
//       from: "Yuktaha 2k25<noreply@yuktaha.com>", // Replace with your custom domain
//       to: userData.email,
//       subject: "Welcome to Yuktaha 2025 - Registration Confirmed!",
//       react: await YuktahaConfirmationEmail(userData),
//       text: `Welcome to Yuktaha 2025! Your registration is confirmed. Your Yuktaha ID is: ${userData.yuktahaId}`,
//     });

//     if (error) {
//       return new Response(JSON.stringify({ error: error.message }), {
//         status: 500,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     return new Response(JSON.stringify({ data }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("Detailed error:", error);
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }

// /app/api/sendConfirmationEmail/route.js

import { YuktahaConfirmationEmail } from "@/components/emails/YuktahaConfirmationEmail";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import fs from "fs";
import os from "os";
import path from "path";
import QRCode from "qrcode";
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
      console.log("API Key slot crossed.");
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

    // Generate QR code and save as a temporary file
    const qrCodeFilename = `yuktaha-qr-${userData.yuktahaId}.png`;
    const tempDir = os.tmpdir();
    const qrCodePath = path.join(tempDir, qrCodeFilename);

    // Generate QR code and save to file
    await QRCode.toFile(
      qrCodePath,
      userData.yuktahaId || "registration-complete",
      {
        width: 200,
        margin: 1,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      }
    );

    // Read the QR code file for attachment
    const qrCodeBuffer = fs.readFileSync(qrCodePath);

    console.log("QR code generated at:", qrCodePath);
    console.log("About to send email with data:", {
      to: userData.email,
      yuktahaId: userData.yuktahaId,
      attachments: [{ filename: qrCodeFilename }],
    });

    // Send email using Resend with attachment
    const { data, error } = await resend.emails.send({
      from: "Yuktaha 2k25<noreply@yuktaha.com>", // Replace with your custom domain
      to: userData.email,
      subject: "Welcome to Yuktaha 2025 - Registration Confirmed!",
      react: await YuktahaConfirmationEmail(userData),
      text: `Welcome to Yuktaha 2025! Your registration is confirmed. Your Yuktaha ID is: ${userData.yuktahaId}. We've attached your QR code to this email.`,
      attachments: [
        {
          filename: qrCodeFilename,
          content: qrCodeBuffer,
        },
      ],
    });

    // Clean up the temporary file
    try {
      fs.unlinkSync(qrCodePath);
      console.log("Temporary QR code file deleted");
    } catch (unlinkError) {
      console.error("Error deleting temporary file:", unlinkError);
    }

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
