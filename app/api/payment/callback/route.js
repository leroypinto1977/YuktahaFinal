// import { connectToDatabase } from "@/lib/mongodb";
// import Transaction from "@/models/Transaction";
// import crypto from "crypto";
// import { NextResponse } from "next/server";

// const ENCRYPTION_KEY = process.env.KEYENCRYPT;
// const IVString = process.env.IVSTRING;
// const IV = Buffer.from(IVString, "hex");

// const decryptData = (encryptedData) => {
//   const decipher = crypto.createDecipheriv("aes-256-cbc", ENCRYPTION_KEY, IV);
//   let data = decipher.update(encryptedData, "base64", "ascii");
//   data += decipher.final();
//   return data.substring(0, data.length - 44);
// };

// export async function POST(request) {
//   try {
//     await connectToDatabase();

//     const body = await request.json();
//     const { encryptedData } = body;

//     if (!encryptedData) {
//       return NextResponse.json(
//         { message: "Missing encrypted data" },
//         { status: 400 }
//       );
//     }

//     // Decrypt the payment data
//     const raw = decryptData(encryptedData);
//     const responseArr = raw.split("&");
//     const paymentData = {
//       kriyaId: responseArr[0],
//       categoryid: parseInt(responseArr[1], 10),
//       transactionid: responseArr[2],
//       status: parseInt(responseArr[3], 10),
//     };

//     // Update the transaction status
//     const transaction = await Transaction.findOneAndUpdate(
//       { transactionId: paymentData.transactionid },
//       { stage: paymentData.status === 1 ? "completed" : "failed" },
//       { new: true }
//     );

//     if (!transaction) {
//       return NextResponse.json(
//         { message: "Transaction not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { message: "Payment status updated", transaction },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error processing payment callback:", error);
//     return NextResponse.json(
//       { message: "Internal server error", error: error.message },
//       { status: 500 }
//     );
//   }
// }

// app/api/payment/callback/route.js

import { connectToDatabase } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectToDatabase();
    const { txn_id, txn_status } = await request.json();

    // Find the transaction by transaction ID
    const transaction = await Transaction.findOne({ transactionId: txn_id });
    if (!transaction) {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      );
    }

    // Update the transaction status
    transaction.status = txn_status === 1 ? "success" : "failed";
    await transaction.save();

    console.log("Transaction ID: ", txn_id);
    console.log("Transaction Status: ", txn_status);

    return NextResponse.json(
      { message: "Payment status updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating transaction status:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
