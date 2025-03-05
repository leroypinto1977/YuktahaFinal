// app/api/transaction/createTransaction/tevent/route.js
import { connectToDatabase } from "@/lib/mongodb";
import { TEvent } from "@/models/EventDetails";
import Transaction from "@/models/Transaction";
import Workshop from "@/models/WorkshopDetails";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(request) {
  const ENCRYPTION_KEY = process.env.KEYENCRYPT;
  const IVString = process.env.IVSTRING;
  const IV = Buffer.from(IVString, "hex");

  let transactionId;

  try {
    await connectToDatabase();
    const { userDetails, eventId } = await request.json();

    // Fetch workshop details using eventId
    const event = await TEvent.findOne({ eventid: eventId });
    if (!event) {
      return NextResponse.json(
        { message: "Technical Event not found" },
        { status: 404 }
      );
    }

    const generateUniqueTransactionId = async () => {
      let generatedId;
      let isUnique = false;

      while (!isUnique) {
        generatedId = `TXN_YUK_TE_${Date.now()}_${Math.floor(
          1000 + Math.random() * 9000
        )}`; // Ensures better uniqueness

        // Check if this transaction ID already exists
        const existingTransaction = await Transaction.findOne({
          transactionId: generatedId,
        });
        if (!existingTransaction) {
          isUnique = true; // Exit loop if ID is unique
        }
      }

      return generatedId;
    };

    try {
      transactionId = await generateUniqueTransactionId(); // Assign to the outer variable
      console.log("Transaction ID:", transactionId);

      const transaction = new Transaction({
        transactionId,
        yuktahaId: userDetails.yuktahaId,
        firstName: userDetails.firstName,
        phoneNumber: userDetails.phoneNumber,
        fees: event.fees,
        event_type: "tevent",
        eventId: eventId,
        email: userDetails.email,
        freepass: false,
        status: "initiated",
      });

      await transaction.save();
      console.log("Transaction created successfully");
      // return transaction;
    } catch (error) {
      console.error("Error creating transaction:", error);
      throw error;
    }

    const paymentParams = {
      regid: userDetails.yuktahaId,
      name: userDetails.firstName,
      email: userDetails.email,
      categoryid: eventId,
      txn_id: transactionId,
      fees: event.fees,
      returnurl: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/tevent/callback`,
      provider: 2,
    };

    console.log("Payment params: ", paymentParams);

    const raw = `regid=${paymentParams.regid} name=${paymentParams.name.replace(
      /\s/g,
      "$"
    )} email=${paymentParams.email} categoryid=10 transactionid=${
      paymentParams.txn_id
    } fees=${paymentParams.fees} returnurl=${
      paymentParams.returnurl
    } provider=2`;

    console.log(raw);

    const hashsha = (text) => {
      return crypto.createHash("sha256").update(text).digest("base64");
    };

    const encryptData = (rawData) => {
      const cipher = crypto.createCipheriv("aes-256-cbc", ENCRYPTION_KEY, IV);
      let encrypted = cipher.update(rawData.concat(hashsha(rawData)));
      encrypted = Buffer.concat([encrypted, cipher.final()]);
      return encrypted.toString("base64");
    };

    const decryptData = (encryptedData) => {
      const decipher = crypto.createDecipheriv(
        "aes-256-cbc",
        ENCRYPTION_KEY,
        IV
      );
      let data = decipher.update(encryptedData, "base64", "ascii");
      data += decipher.final();
      return data.substring(0, data.length - 44);
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
