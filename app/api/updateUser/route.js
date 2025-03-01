import { connectToDatabase } from "@/lib/mongodb";
import UserDetails from "@/models/UserDetails";

export async function POST(req) {
  try {
    const data = await req.json();

    console.log("Received data:", data);

    if (
      !data.email ||
      typeof data.email !== "string" ||
      data.email.trim() === ""
    ) {
      return new Response(
        JSON.stringify({ error: "Valid email is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    await connectToDatabase();

    let user = await UserDetails.findOne({ email: data.email });

    if (!user) {
      // ✅ Create new user, let `yuktahaId` be auto-generated
      user = new UserDetails({
        k_id: data.k_id,
        firstName: data.firstName,
        lastName: data.lastName,
        city: data.city,
        email: data.email,
        picture: data.picture,
        college: data.college,
        department: data.department,
        yearOfStudy: data.yearOfStudy,
        phoneNumber: data.phoneNumber,
        workshopsRegistered: 0,
        workshop: [],
      });

      await user.save();

      // ✅ Fallback: If `yuktahaId` was not set, update manually
      if (!user.yuktahaId && user.yuktahaNumber) {
        user.yuktahaId = `yuk2k25_${user.yuktahaNumber}`;
        await user.save();
      }
    } else {
      user = await UserDetails.findOneAndUpdate(
        { email: data.email },
        { $set: { ...data } },
        { new: true }
      );

      // ✅ Fallback for `yuktahaId` missing in updates
      if (!user.yuktahaId && user.yuktahaNumber) {
        user.yuktahaId = `yuk2k25_${user.yuktahaNumber}`;
        await user.save();
      }
    }

    return new Response(
      JSON.stringify({
        message: "User updated successfully",
        yuktahaId: user.yuktahaId, // Explicitly include yuktahaId in the response
        user,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response(JSON.stringify({ error: "Error updating user" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
