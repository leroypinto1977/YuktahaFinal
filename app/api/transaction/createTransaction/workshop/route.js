// import { connectToDatabase } from "@/lib/mongodb";
// import Transaction from "@/models/Transaction";
// import UserDetails from "@/models/UserDetails";
// import Workshop from "@/models/WorkshopDetails";
// import crypto from "crypto";
// import { NextResponse } from "next/server";
// import { v4 as uuidv4 } from "uuid";

// const ENCRYPTION_KEY = process.env.KEYENCRYPT;
// const IVString = process.env.IVSTRING;
// const IV = Buffer.from(IVString, "hex");

// const generateTransactionId = (workshopId, userEmail) => {
//   const uuid = uuidv4();
//   const rawId = `${workshopId}_${userEmail}_${uuid}_${Date.now()}`;
//   const hash = crypto.createHash("sha256").update(rawId).digest("hex");
//   return `TXN_WS_${hash}`;
// };

// export async function POST(request) {
//   try {
//     await connectToDatabase();

//     const body = await request.json();
//     const { userDetails, workshopId } = body;

//     if (!userDetails || !workshopId) {
//       return NextResponse.json(
//         { message: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // Find the workshop
//     const workshop = await Workshop.findOne({ workshopid: workshopId });
//     if (!workshop) {
//       return NextResponse.json(
//         { message: "Workshop not found" },
//         { status: 404 }
//       );
//     }

//     // Check if the user is already registered
//     const user = await UserDetails.findOne({ email: userDetails.email });
//     if (!user) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }

//     const isAlreadyRegistered = user.workshop.some(
//       (w) => w.workshopid === workshopId
//     );
//     if (isAlreadyRegistered) {
//       return NextResponse.json(
//         { message: "Already registered for this workshop" },
//         { status: 400 }
//       );
//     }

//     // Generate a strong transaction ID
//     const transactionId = generateTransactionId(workshopId, userDetails.email);

//     // Create a new transaction document
//     const transaction = new Transaction({
//       transactionId,
//       yuktahaId: userDetails.yuktahaId,
//       firstName: userDetails.firstName,
//       phoneNumber: userDetails.phoneNumber,
//       fees: workshop.fees,
//       event_type: "workshop",
//       eventId: workshop.workshopid,
//       email: userDetails.email,
//       freepass: false,
//       stage: "initiated",
//     });
//     await transaction.save();

//     // Generate encrypted payment data
//     const raw = `regid=${
//       userDetails.yuktahaId
//     } name=${userDetails.firstName.replace(/\s/g, "$")} email=${
//       userDetails.email
//     } categoryid=${workshopId} transactionid=${transactionId} fees=${
//       workshop.fees
//     } returnurl=${
//       process.env.NEXT_PUBLIC_APP_URL
//     }/api/payment/callback provider=2`;

//     const encryptedData = encryptData(raw);
//     const paymentUrl = formatPaymentUrl(encryptedData);

//     return NextResponse.json({ paymentUrl, transactionId }, { status: 200 });
//   } catch (error) {
//     console.error("Error creating transaction:", error);
//     return NextResponse.json(
//       { message: "Internal server error", error: error.message },
//       { status: 500 }
//     );
//   }
// }

// pages/api/transaction/createTransaction/workshop.js

// app/api/transaction/createTransaction/workshop/route.js
import { connectToDatabase } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";
import Workshop from "@/models/WorkshopDetails";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(request) {
  const ENCRYPTION_KEY = process.env.KEYENCRYPT;
  const IVString = process.env.IVSTRING;
  const IV = Buffer.from(IVString, "hex");

  try {
    await connectToDatabase();
    const { userDetails, workshopId } = await request.json();

    // Fetch workshop details using workshopid
    const workshop = await Workshop.findOne({ workshopid: workshopId });
    if (!workshop) {
      return NextResponse.json(
        { message: "Workshop not found" },
        { status: 404 }
      );
    }

    // Generate a unique transaction ID
    const transactionId = `TXN_WS_${Math.floor(Math.random() * 1000000)}`;
    console.log("Transaction ID", transactionId);

    // Create a new transaction
    const transaction = new Transaction({
      transactionId,
      yuktahaId: userDetails.yuktahaId,
      firstName: userDetails.firstName,
      phoneNumber: userDetails.phoneNumber,
      fees: workshop.fees,
      event_type: "workshop",
      eventId: workshopId, // Use workshopId here
      email: userDetails.email,
      freepass: false,
      status: "initiated",
    });

    await transaction.save();

    const paymentParams = {
      regid: userDetails.yuktahaId,
      name: userDetails.firstName,
      email: userDetails.email,
      categoryid: workshopId,
      transactionid: transactionId,
      fees: workshop.fees,
      returnurl: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/callback`,
      provider: 2, // Assuming TPSL as provider
    };

    const raw = `regid=${paymentParams.regid} name=${paymentParams.name.replace(
      /\s/g,
      "$"
    )} email=${paymentParams.email} categoryid=${
      paymentParams.categoryid
    } transactionid=${paymentParams.transactionId} fees=${
      paymentParams.fees
    } returnurl=${paymentParams.redirectURL} provider=2`;

    const hashsha = (text) => {
      return crypto.createHash("sha256").update(text).digest("base64");
    };

    const encryptData = (rawData) => {
      const cipher = crypto.createCipheriv("aes-256-cbc", ENCRYPTION_KEY, IV);
      let encrypted = cipher.update(rawData.concat(hashsha(rawData)));
      encrypted = Buffer.concat([encrypted, cipher.final()]);
      return encrypted.toString("base64");
    };

    const encryptedParams = encryptData(raw);

    // Generate the payment URL
    const paymentUrl = `https://cms.psgps.edu.in/payapp?payment=${encryptedParams}`;

    return NextResponse.json({ paymentUrl }, { status: 200 });
  } catch (error) {
    console.error("Error creating transaction:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// function encryptParams(params) {
//   // Validate ENCRYPTION_KEY and ENCRYPTION_IV
//   const encryptionKey = Buffer.from(process.env.ENCRYPTION_KEY, "ascii");

//   const encryptionIV = Buffer.from(process.env.ENCRYPTION_IV, "hex");

//   // if (!encryptionKey || !encryptionIV) {
//   //   throw new Error(
//   //     "Encryption key or IV is missing in environment variables."
//   //   );
//   // }

//   // if (encryptionKey.length !== 64 || encryptionIV.length !== 32) {
//   //   throw new Error(
//   //     "Invalid encryption key or IV length. Key must be 64 characters and IV must be 32 characters (hex)."
//   //   );
//   // }

//   // Create the cipher
//   const cipher = crypto.createCipheriv(
//     "aes-256-cbc",
//     Buffer.from(encryptionKey, "hex"),
//     Buffer.from(encryptionIV, "hex")
//   );

//   // Encrypt the data
//   let encrypted = cipher.update(JSON.stringify(params), "utf8", "hex");
//   encrypted += cipher.final("hex");

//   return encrypted;
// }
