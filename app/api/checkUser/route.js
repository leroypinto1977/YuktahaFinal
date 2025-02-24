// import { connectDb } from "@/lib/mongodb";
// import UserDetails from "@/models/User";

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   try {
//     const { email } = req.body;
//     if (!email) {
//       return res.status(400).json({ error: "Email is required" });
//     }

//     await connectDb();
//     const user = await UserDetails.findOne({ email });

//     res.status(200).json({ user: user || null });
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }
