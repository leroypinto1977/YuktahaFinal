// import crypto from "crypto";
// import { NextResponse } from "next/server";

// export async function POST(request) {
//   try {
//     const ENCRYPTION_KEY = process.env.KEYENCRYPT;
//     const IVString = process.env.IVSTRING;
//     const IV = Buffer.from(IVString, "hex");

//     const decryptData = (encryptedData) => {
//       const decipher = crypto.createDecipheriv(
//         "aes-256-cbc",
//         ENCRYPTION_KEY,
//         IV
//       );
//       let data = decipher.update(encryptedData, "base64", "ascii");
//       data += decipher.final();
//       return data.substring(0, data.length - 44);
//     };

//     const decryptPaymentDataToJson = (encryptedData) => {
//       const raw = decryptData(encryptedData);
//       const responseArr = raw.split("&");
//       return {
//         yuktahaId: responseArr[0],
//         categoryid: parseInt(responseArr[1], 10),
//         transactionid: responseArr[2],
//         status: parseInt(responseArr[3], 10),
//       };
//     };

//     const { data: encryptedData } = await request.json();

//     if (!encryptedData) {
//       return NextResponse.json(
//         { message: "Missing data parameter" },
//         { status: 400 }
//       );
//     }

//     const decryptedData = decryptPaymentDataToJson(encryptedData);

//     return NextResponse.json({ decryptedData }, { status: 200 });
//   } catch (error) {
//     console.error("Error decrypting data:", error);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const ENCRYPTION_KEY = process.env.KEYENCRYPT;
    const IVString = process.env.IVSTRING;
    const IV = Buffer.from(IVString, "hex");

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

    const { data: encryptedData } = await request.json();

    if (!encryptedData) {
      return NextResponse.json(
        { message: "Missing data parameter" },
        { status: 400 }
      );
    }

    const decryptedData = decryptPaymentDataToJson(encryptedData);

    return NextResponse.json({ decryptedData }, { status: 200 });
  } catch (error) {
    console.error("Error decrypting data:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
