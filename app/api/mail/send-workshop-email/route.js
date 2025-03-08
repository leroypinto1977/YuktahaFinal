// // api/mail/send-workshop-email/route.js

// import WorkshopRegistrationEmail from "@/components/emails/WorkshopRegistrationEmail";
// import { render } from "@react-email/render";
// import nodemailer from "nodemailer";

// export async function POST(req) {
//   try {
//     const { email, userName, workshopName, workshopId } = await req.json();

//     if (!email || !userName || !workshopName || !workshopId) {
//       return Response.json(
//         { message: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // Render the email HTML
//     const emailHtml = render(
//       <WorkshopRegistrationEmail
//         userName={userName}
//         workshopName={workshopName}
//         workshopId={workshopId}
//       />
//     );

//     // // SMTP Configuration
//     // const transporter = nodemailer.createTransport({
//     //   host: "smtp.yourdomain.com", // Replace with your SMTP server
//     //   port: 587, // Use 465 for SSL, 587 for TLS
//     //   secure: false,
//     //   auth: {
//     //     user: process.env.EMAIL_USER, // Your email (stored in .env)
//     //     pass: process.env.EMAIL_PASSWORD, // Email password (stored in .env)
//     //   },
//     // });

//     const transporter = nodemailer.createTransport({
//       // host: 'smtp.gmail.com',
//       // port: 587,
//       // secure: false, // secure:true for port 465, secure:false for port 587
//       service: "gmail",
//       auth: {
//         type: "OAuth2",
//         user: "yukta@psgitech.ac.in",
//         clientId: process.env.CLIENT_ID,
//         clientSecret: process.env.CLIENT_SECRET,
//         refreshToken: process.env.REFRESH_TOKEN,
//         accessToken: process.env.ACCESS_TOKEN,
//         // pass: "ohiwzlqsaorwumwl"
//       },
//       tls: {
//         rejectUnauthorized: false,
//       },
//     });

//     // Send the email
//     await transporter.sendMail({
//       from: '"Yuktaha 2k25" <no-reply@yuktaha.com>',
//       to: email,
//       subject: "Workshop Registration Confirmation",
//       html: emailHtml,
//     });

//     return Response.json(
//       { message: "Email sent successfully!" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Email sending error:", error);
//     return Response.json(
//       { message: "Failed to send email", error: error.message },
//       { status: 500 }
//     );
//   }
// }

import WorkshopRegistrationEmail from "@/components/emails/WorkshopRegistrationEmail";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email, userName, workshopName, workshopId } = await req.json();

    if (!email || !userName || !workshopName || !workshopId) {
      return Response.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Await the render function
    const emailHtml = await render(
      <WorkshopRegistrationEmail
        userName={userName}
        workshopName={workshopName}
        workshopId={workshopId}
      />
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "yukta@psgitech.ac.in",
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: process.env.ACCESS_TOKEN,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Send the email
    await transporter.sendMail({
      from: '"Yuktaha 2k25" <no-reply@yuktaha.com>',
      to: email,
      subject: "Workshop Registration Confirmation",
      html: emailHtml, // Now correctly awaited
    });

    return Response.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email sending error:", error);
    return Response.json(
      { message: "Failed to send email", error: error.message },
      { status: 500 }
    );
  }
}
