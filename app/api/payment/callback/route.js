// import { connectToDatabase } from "@/lib/mongodb";
// import Transaction from "@/models/Transaction";
// import UserDetails from "@/models/UserDetails";
// import crypto from "crypto";
// import { NextResponse } from "next/server";

// // Environment variables for encryption
// const ENCRYPTION_KEY = process.env.KEYENCRYPT;
// const IVString = process.env.IVSTRING;
// const IV = Buffer.from(IVString, "hex");

// // Decryption function
// const decryptData = (encryptedData) => {
//   try {
//     const decipher = crypto.createDecipheriv("aes-256-cbc", ENCRYPTION_KEY, IV);
//     let data = decipher.update(encryptedData, "base64", "ascii");
//     data += decipher.final("ascii");
//     return data.substring(0, data.length - 44);
//   } catch (error) {
//     console.error("Decryption error:", error);
//     throw new Error("Failed to decrypt data");
//   }
// };

// // Parse decrypted data to JSON
// const decryptPaymentDataToJson = (encryptedData) => {
//   const raw = decryptData(encryptedData);
//   const responseArr = raw.split("&");

//   return {
//     yuktahaId: responseArr[0],
//     categoryid: parseInt(responseArr[1], 10),
//     transactionid: responseArr[2],
//     status: parseInt(responseArr[3], 10),
//   };
// };

// // API route handler for GET requests
// export async function GET(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const encryptedData = searchParams.get("data");
//     let user;

//     if (!encryptedData) {
//       return NextResponse.json(
//         { error: "Missing data parameter" },
//         { status: 400 }
//       );
//     }

//     const decodedData = decodeURIComponent(encryptedData);
//     const paymentData = decryptPaymentDataToJson(decodedData);

//     // return NextResponse.json(jsonData, { status: 200 });

//     await connectToDatabase();

//     console.log("Recieved Decrypted Payment Data: ", paymentData);

//     // const { txn_id, txn_status } = await request.json();

//     // Find the transaction by transaction ID
//     const transaction = await Transaction.findOne({
//       transactionId: paymentData.transactionid,
//     });
//     if (!transaction) {
//       return NextResponse.json(
//         { message: "Transaction not found" },
//         { status: 404 }
//       );
//     }

//     // Update the transaction status
//     transaction.status = paymentData.status === 1 ? "success" : "failed";
//     await transaction.save();

//     console.log("Yuktaha ID: ", paymentData.yuktahaId);
//     console.log("Transaction ID: ", paymentData.transactionid);
//     console.log("Transaction Status: ", paymentData.status);

//     // const registrationPayload = {
//     //   userDetails: {
//     //     yuktahaId: userDetails.yuktahaId,
//     //     firstName: userDetails.firstName,
//     //     email: userDetails.email,
//     //     phoneNumber: userDetails.phoneNumber,
//     //     college: userDetails.college,
//     //   },
//     //   workshopId: numericWorkshopId,
//     // };

//     user = transaction.yuktahaId;

//     const userDetails = await UserDetails.findOne({ email: user.email });

//     const registrationPayload = {
//       userDetails: {
//         yuktahaId: userDetails.yuktahaId,
//         firstName: userDetails.firstName,
//         email: userDetails.email,
//         phoneNumber: userDetails.phoneNumber,
//         college: userDetails.college,
//       },
//       workshopId: transaction.eventId,
//     };

//     // Register for workshop
//     const workshopResponse = await fetch("/api/workshop/registerWorkshop", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(registrationPayload),
//     });

//     const responseText = await workshopResponse.text();
//     console.log("Workshop Response: ", responseText);

//     return NextResponse.json(
//       { message: "Payment status updated successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error processing callback:", error);
//     return NextResponse.json(
//       { error: "Failed to process payment callback", message: error.message },
//       { status: 500 }
//     );
//   }
// }

// // API route handler for POST requests
// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const { data: encryptedData } = body;

//     if (!encryptedData) {
//       return NextResponse.json(
//         { error: "Missing data parameter" },
//         { status: 400 }
//       );
//     }

//     const decodedData = decodeURIComponent(encryptedData);
//     const jsonData = decryptPaymentDataToJson(decodedData);

//     return NextResponse.json(jsonData, { status: 200 });
//   } catch (error) {
//     console.error("Error processing request:", error);
//     return NextResponse.json(
//       { error: "Failed to process request", message: error.message },
//       { status: 500 }
//     );
//   }
// }

import { connectToDatabase } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";
import UserDetails from "@/models/UserDetails";
import crypto from "crypto";
import { NextResponse } from "next/server";

// Environment variables for encryption
const ENCRYPTION_KEY = process.env.KEYENCRYPT;
const IVString = process.env.IVSTRING;
const IV = Buffer.from(IVString, "hex");

// Decryption function
const decryptData = (encryptedData) => {
  try {
    const decipher = crypto.createDecipheriv("aes-256-cbc", ENCRYPTION_KEY, IV);
    let data = decipher.update(encryptedData, "base64", "ascii");
    data += decipher.final("ascii");
    return data.substring(0, data.length - 44);
  } catch (error) {
    console.error("Decryption error:", error);
    throw new Error("Failed to decrypt data");
  }
};

// Parse decrypted data to JSON
const decryptPaymentDataToJson = (encryptedData) => {
  const raw = decryptData(encryptedData);
  const responseArr = raw.split("&");

  return {
    yuktahaId: responseArr[0],
    categoryid: parseInt(responseArr[1], 10),
    transactionid: responseArr[2],
    status: parseInt(responseArr[3], 10),
  };
};

// API route handler for GET requests
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const encryptedData = searchParams.get("data");
    let user;

    if (!encryptedData) {
      return NextResponse.json(
        { error: "Missing data parameter" },
        { status: 400 }
      );
    }

    const decodedData = decodeURIComponent(encryptedData);
    const paymentData = decryptPaymentDataToJson(decodedData);

    // return NextResponse.json(jsonData, { status: 200 });

    await connectToDatabase();

    console.log("Recieved Decrypted Payment Data: ", paymentData);

    // const { txn_id, txn_status } = await request.json();

    // Find the transaction by transaction ID
    const transaction = await Transaction.findOne({
      transactionId: paymentData.transactionid,
    });
    if (!transaction) {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      );
    }

    // Update the transaction status
    transaction.status = paymentData.status === 1 ? "success" : "failed";
    await transaction.save();

    console.log("Yuktaha ID: ", paymentData.yuktahaId);
    console.log("Transaction ID: ", paymentData.transactionid);
    console.log("Transaction Status: ", paymentData.status);

    const yukID = transaction.yuktahaId;

    const userDetails2 = await UserDetails.findOne({ yuktahaId: yukID });

    const registrationPayload = {
      userDetails: {
        yuktahaId: userDetails2.yuktahaId,
        firstName: userDetails2.firstName,
        email: userDetails2.email,
        phoneNumber: userDetails2.phoneNumber,
        college: userDetails2.college,
      },
      workshopId: transaction.eventId,
      transactionId: paymentData.transactionid,
    };

    // Register for workshop
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    const workshopResponse = await fetch(
      `${baseUrl}/api/workshop/registerWorkshop`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationPayload),
      }
    );

    const responseText = await workshopResponse.text();
    console.log("Workshop Response: ", responseText);

    // return NextResponse.json(
    //   { message: "Payment status updated successfully" },
    //   { status: 200 }
    // );
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/registration/workshop/success`
    );
  } catch (error) {
    console.error("Error processing callback:", error);
    return NextResponse.json(
      { error: "Failed to process payment callback", message: error.message },
      { status: 500 }
    );
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/registration/workshop/success`
    );
  }
}

// API route handler for POST requests
export async function POST(req) {
  try {
    const body = await req.json();
    const { data: encryptedData } = body;

    if (!encryptedData) {
      return NextResponse.json(
        { error: "Missing data parameter" },
        { status: 400 }
      );
    }

    const decodedData = decodeURIComponent(encryptedData);
    const jsonData = decryptPaymentDataToJson(decodedData);

    return NextResponse.json(jsonData, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Failed to process request", message: error.message },
      { status: 500 }
    );
  }
}
