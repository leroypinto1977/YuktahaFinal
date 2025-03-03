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
    const transactionId = `TXN_YUK_WS_${Math.floor(Math.random() * 1000000)}`;
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
      provider: 2,
    };

    const raw = `regid=${paymentParams.regid} name=${paymentParams.name.replace(
      /\s/g,
      "$"
    )} email=${paymentParams.email} categoryid=10 transactionid=${
      paymentParams.transactionId
    } fees=${paymentParams.fees} returnurl=${
      paymentParams.returnurl
    } provider=2`;

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
    const paymentUrl = `https://cms.psgps.edu.in/testpayapp?payment=${encryptedParams}`;

    return NextResponse.json({ paymentUrl }, { status: 200 });
  } catch (error) {
    console.error("Error creating transaction:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
