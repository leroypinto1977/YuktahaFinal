"use client";

import Navbar from "@/components/Navbar";
import { BackgroundBeams } from "@/components/acertinity_ui/background-beams.jsx";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useParams } from "next/navigation";
import React from "react";

const TechnicalEventDetail = () => {
  const [event, setEvent] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const { user } = useKindeBrowserClient();

  const { eventid } = useParams();
  const numericEventId = eventid ? parseInt(eventid, 10) : null;

  React.useEffect(() => {
    if (!numericEventId) return; // Prevent fetch call if eventid is invalid

    const fetchEvent = async () => {
      try {
        const response = await fetch(
          `/api/tevents/getTevents?eventId=${numericEventId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Handle API errors
        if (data.error) {
          throw new Error(data.error);
        }

        // Check if the event data exists in the response
        if (!data.event) {
          throw new Error("Event data not found in the response");
        }

        setEvent(data.event);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching event:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [numericEventId]);

  const handleEventRegistration = async (user, numericEventId, eventType) => {
    try {
      // First fetch user details
      const userResponse = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/getUser?email=${user.email}`,
        { cache: "no-store" }
      );

      if (!userResponse.ok) {
        const errorData = await userResponse.text();
        throw new Error(`Failed to fetch user details: ${errorData}`);
      }

      const userDetails = await userResponse.json();

      // Prepare event registration payload
      const registrationPayload = {
        userDetails: {
          yuktahaId: userDetails.yuktahaId,
          firstName: userDetails.firstName,
          email: userDetails.email,
          phoneNumber: userDetails.phoneNumber,
          college: userDetails.college,
        },
        eventId: numericEventId,
      };

      // Register for event
      const endpoint =
        eventType === "technical"
          ? "/api/tevents/registerTevents"
          : "/api/ntevents/registerNTevents";

      const eventResponse = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationPayload),
      });

      // Parse response
      const responseText = await eventResponse.text();
      let eventData;
      try {
        eventData = JSON.parse(responseText);
      } catch (e) {
        console.error("Failed to parse response:", responseText);
        throw new Error("Invalid response format");
      }

      if (eventResponse.ok) {
        alert("Event registered successfully!");
        return {
          success: true,
          message: "Event registered successfully!",
          data: eventData,
        };
      } else {
        alert(eventData.message || "Failed to register for event");
        return {
          success: false,
          message: eventData.message,
          error: eventData,
        };
      }
    } catch (error) {
      console.error("Error registering for event:", error);
      alert("An error occurred while registering for the event.");
      return {
        success: false,
        message: "An error occurred while registering for the event.",
        error: error.message,
      };
    }
  };

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

  if (error || !event) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="flex justify-center items-center h-[calc(100vh-64px)]">
          <div className="text-white text-xl">{error || "Event not found"}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-800 to-neutral-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-8 shadow-xl">
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
            {/* <p className="text-gray-400 text-lg">{event.desc}</p> */}
            {event.desc.split("\n").map((line, index) =>
              line.trim() ? (
                <p key={index} className="text-gray-400 text-lg">
                  {line}
                </p>
              ) : (
                <br key={index} />
              )
            )}
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
                  <p className="text-gray-400">
                    <span className="font-medium text-white">Prize Pool:</span>{" "}
                    ₹{event.p_amt}
                  </p>
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

              <div>
                <h2 className="text-xl font-semibold text-white mb-3">
                  About the Event
                </h2>
                <p className="text-gray-400">
                  <span className="font-medium text-white">
                    Number of rounds:
                  </span>{" "}
                  {event.rounds}
                </p>

                {/* <h2 className="text-xl font-semibold text-white mb-3">
                  About the Event
                </h2> */}

                {event.p1 && (
                  <>
                    <h2 className="text-xl font-semibold text-white mb-3">
                      Round 1:
                    </h2>
                    {/* <p className="text-gray-400 font-medium">{event.p1}</p> */}
                    {event.p1.split("\n").map((line, index) =>
                      line.trim() ? (
                        <p key={index} className="text-gray-400 font-medium">
                          {line}
                        </p>
                      ) : (
                        <br key={index} />
                      )
                    )}
                  </>
                )}
                {event.p2 && (
                  <>
                    <h2 className="text-xl font-semibold text-white mb-3">
                      Round 2:
                    </h2>
                    {/* <p className="text-gray-400 font-medium">{event.p2}</p> */}
                    {event.p2.split("\n").map((line, index) =>
                      line.trim() ? (
                        <p key={index} className="text-gray-400 font-medium">
                          {line}
                        </p>
                      ) : (
                        <br key={index} />
                      )
                    )}
                  </>
                )}
                {event.p3 && (
                  <>
                    <h2 className="text-xl font-semibold text-white mb-3">
                      Round 3:
                    </h2>
                    {/* <p className="text-gray-400 font-medium">{event.p3}</p> */}
                    {event.p3.split("\n").map((line, index) =>
                      line.trim() ? (
                        <p key={index} className="text-gray-400 font-medium">
                          {line}
                        </p>
                      ) : (
                        <br key={index} />
                      )
                    )}
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
              {/* <p className="text-gray-400 whitespace-pre-line">{event.pr}</p> */}
              {event.required_materials.split("\n").map((line, index) =>
                line.trim() ? (
                  <p key={index} className="text-gray-400 text-lg">
                    {line}
                  </p>
                ) : (
                  <br key={index} />
                )
              )}
              <h2 className="text-xl font-semibold text-white mb-3">
                Guidelines
              </h2>
              {/* <p className="text-gray-400 whitespace-pre-line">{event.pr}</p> */}
              {event.guidelines.split("\n").map((line, index) =>
                line.trim() ? (
                  <p key={index} className="text-gray-400 text-lg">
                    {line}
                  </p>
                ) : (
                  <br key={index} />
                )
              )}
            </div>
          </div>

          <div className="mt-8">
            <button
              disabled={!event.open}
              onClick={() =>
                handleEventRegistration(user, numericEventId, "technical")
              }
              className={`px-8 py-3 rounded-lg text-white transition-opacity ${
                event.open && event.availability > 0
                  ? "bg-gradient-to-l from-[#3282b8] to-[#f05454] hover:opacity-90"
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

export default TechnicalEventDetail;
