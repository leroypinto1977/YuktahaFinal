// /profile/nte/[eventId]/page.jsx
"use client";

import Navbar from "@/components/Navbar";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useParams } from "next/navigation";
import React from "react";

const NonTechnicalEventProfileDetail = () => {
  const [event, setEvent] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const { user } = useKindeBrowserClient();
  const { eventId } = useParams();
  const numericEventId = eventId ? parseInt(eventId, 10) : null;

  React.useEffect(() => {
    if (!numericEventId || !user?.email) return;

    const fetchEventAndRegistration = async () => {
      try {
        // First fetch user details to check registration
        const userResponse = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/getUser?email=${user.email}`,
          {
            cache: "no-store",
            headers: {
              "x-api-key": process.env.API_KEY, // Read from env
            },
          }
        );

        if (!userResponse.ok) {
          throw new Error("Failed to fetch user details");
        }

        const userData = await userResponse.json();

        // Check if event is in user's registered non-technical events
        const isRegistered = userData.ntevents.some(
          (e) => e.eventid === numericEventId
        );

        if (!isRegistered) {
          setError("Non-Technical Event Unregistered");
          setLoading(false);
          return;
        }

        // If registered, fetch event details
        const eventResponse = await fetch(
          `/api/ntevents/getNTevents?eventId=${numericEventId}`,
          {
            headers: {
              "x-api-key": process.env.API_KEY, // Read from env
            },
          }
        );

        if (!eventResponse.ok) {
          throw new Error("Event not found");
        }

        const eventData = await eventResponse.json();
        setEvent(eventData.event);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEventAndRegistration();
  }, [numericEventId, user?.email]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="flex justify-center items-center h-[calc(100vh-64px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="flex justify-center items-center h-[calc(100vh-64px)]">
          <div className="text-white text-xl">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-800 to-neutral-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-8 shadow-xl">
          <h2 className="text-3xl text-center font-bold pb-5">
            Non-Technical Event
          </h2>
          {event.outer_Img && (
            <div className="mb-8 flex justify-center">
              {/* Image Container with 16:9 Aspect Ratio */}
              <div className="max-w-5xl aspect-video overflow-hidden rounded-xl">
                <img
                  src={event.outer_Img}
                  alt={event.name}
                  className="w-full h-full object-cover "
                />
              </div>
            </div>
          )}

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">{event.name}</h1>
            <p className="text-gray-400 text-lg">{event.desc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-white mb-3">
                  Event Details
                </h2>
                <div className="space-y-2">
                  <p className="text-gray-400">
                    <span className="font-medium text-white">Department:</span>{" "}
                    {event.dept}
                  </p>
                  <p className="text-gray-400">
                    <span className="font-medium text-white">Date:</span>{" "}
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-400">
                    <span className="font-medium text-white">Time:</span>{" "}
                    {event.time}
                  </p>
                  <p className="text-gray-400">
                    <span className="font-medium text-white">Venue:</span>{" "}
                    {event.venue}
                  </p>
                  <p className="text-gray-400">
                    <span className="font-medium text-white">Fees:</span> ₹
                    {event.fees}
                  </p>
                  {/* <p className="text-gray-400">
                    <span className="font-medium text-white">
                      Availability:
                    </span>{" "}
                    {event.availability}/{event.limit} spots
                  </p> */}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white mb-3">
                  Event Coordinators
                </h2>
                <p className="text-gray-400">
                  <span className="font-medium text-white">Name:</span>{" "}
                  {event.ecn}
                </p>
                <p className="text-gray-400">
                  <span className="font-medium text-white">Contact:</span>{" "}
                  {event.ecc}
                </p>

                {event.ecn2 && event.ecc2 && (
                  <>
                    <p className="text-gray-400">
                      <span className="font-medium text-white">Name:</span>{" "}
                      {event.ecn2}
                    </p>
                    <p className="text-gray-400">
                      <span className="font-medium text-white">Contact:</span>{" "}
                      {event.ecc2}
                    </p>
                  </>
                )}
              </div>
              {!event.open && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-3">
                    Registration Status:
                  </h2>
                  <p className="text-gray-400">
                    Registration is closed. Try Onspot if possible.
                  </p>
                </div>
              )}
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">
                Requirements from participants
              </h2>
              <p className="text-gray-400 whitespace-pre-line">{event.pr}</p>
            </div>
          </div>

          <div className="mt-8">
            <button
              disabled={!event.open}
              onClick={() =>
                handleEventRegistration(user, numericEventId, "non-technical")
              }
              className={`px-8 py-3 rounded-lg text-white transition-opacity ${
                event.open && event.availability > 0
                  ? "bg-gradient-to-l from-[rgb(50,130,184)] to-[#f05454] hover:opacity-90"
                  : "bg-gray-600 cursor-not-allowed"
              }`}
            >
              {!event.open
                ? "Registration Closed"
                : event.availability === 0
                ? "Event Full"
                : "Register Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NonTechnicalEventProfileDetail;
