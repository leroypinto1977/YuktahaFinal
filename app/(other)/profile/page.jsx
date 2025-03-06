import ProfileCard from "@/components/ProfileCard";
import UserProfile from "@/components/UserProfile";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const parseJsonLikeString = (str) => {
  try {
    // Remove newlines and extra spaces
    const cleanedStr = str.replace(/\n/g, "").replace(/\s+/g, " ");

    // Convert single quotes to double quotes and fix unquoted keys
    const validJsonString = cleanedStr
      .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?\s*:/g, '"$2":') // Fix keys
      .replace(/:\s*['"]([^'"]*)['"]/g, ':"$1"') // Fix string values
      .replace(/:\s*([^",\s}]+)/g, ':"$1"'); // Fix non-string values

    return JSON.parse(validJsonString);
  } catch (error) {
    console.error("Error parsing JSON-like string:", error, "Raw string:", str);
    return null;
  }
};

const parseEventData = (data) => {
  if (!data) return [];

  try {
    // If it's an array of strings, parse each string
    if (Array.isArray(data)) {
      return data
        .map((item) => {
          if (typeof item === "string") {
            const parsed = parseJsonLikeString(item);
            console.log("Parsed item:", parsed); // Debugging log
            return parsed;
          }
          return item;
        })
        .filter(Boolean);
    }

    // If it's a single string
    if (typeof data === "string") {
      const parsed = parseJsonLikeString(data);
      console.log("Parsed item:", parsed); // Debugging log
      return parsed ? [parsed] : [];
    }

    return [];
  } catch (error) {
    console.error("Error parsing event data:", error, "Raw data:", data);
    return [];
  }
};

const mapEventToItem = (event, type) => {
  if (!event) return null;

  const baseProps = {
    type,
    name:
      event.name || `Untitled ${type.charAt(0).toUpperCase() + type.slice(1)}`,
    outer_Img: event.outer_Img || "/workshop/main.png",
  };

  if (type === "workshop") {
    return {
      ...baseProps,
      workshopid: event.workshopid,
      link: `/workshops/${event.workshopid}`,
    };
  }

  return {
    ...baseProps,
    eventid: event.eventid,
    link: `/events/${type}/${event.eventid}`,
  };
};

const Profile = async () => {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();

  if (!user || !isAuthenticated) {
    redirect("/");
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/getUser?email=${user.email}`,
      {
        cache: "no-store",
        headers: {
          "x-api-key": process.env.API_KEY, // Read from env
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user details");
    }

    const userDetails = await response.json();

    if (!userDetails) {
      return <div>User not found</div>;
    }

    // Parse all event types
    const workshops = parseEventData(userDetails.workshop);
    const technicalEvents = parseEventData(userDetails.tevents);
    const nonTechnicalEvents = parseEventData(userDetails.ntevents);

    console.log("Parsed workshops:", workshops);
    console.log("Parsed technical events:", technicalEvents);
    console.log("Parsed non-technical events:", nonTechnicalEvents);

    // Map items with proper type and structure
    const workshopItems = workshops
      .map((item) => mapEventToItem(item, "workshop"))
      .filter(Boolean);
    const technicalEventItems = technicalEvents
      .map((item) => mapEventToItem(item, "technical"))
      .filter(Boolean);
    const nonTechnicalEventItems = nonTechnicalEvents
      .map((item) => mapEventToItem(item, "non-technical"))
      .filter(Boolean);

    // Combine all items
    const allItems = [
      ...workshopItems,
      ...technicalEventItems,
      ...nonTechnicalEventItems,
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-800 to-neutral-900">
        <div className="w-full flex items-center justify-center p-10">
          <UserProfile user={user} userDetails={userDetails} />
        </div>
        {allItems.length > 0 && (
          <div className="w-full px-8 pb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              Workshops and Events
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-[1400px] mx-auto">
              {allItems.map((item, index) => (
                <ProfileCard
                  key={`${item.type}-${
                    item.type === "workshop" ? item.workshopid : item.eventid
                  }`}
                  item={item}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error in Profile component:", error);
    return <div>Error loading profile: {error.message}</div>;
  }
};

export default Profile;
