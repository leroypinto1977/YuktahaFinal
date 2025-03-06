// // /wk/[eventId]/page.jsx
// "use client";

// import Navbar from "@/components/Navbar";
// import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
// import { useParams } from "next/navigation";
// import React from "react";

// const WorkshopProfileDetail = () => {
//   const [workshop, setWorkshop] = React.useState(null);
//   const [loading, setLoading] = React.useState(true);
//   const [error, setError] = React.useState(null);
//   const { user } = useKindeBrowserClient();
//   const { eventId } = useParams();
//   const numericEventId = eventId ? parseInt(eventId, 10) : null;

//   React.useEffect(() => {
//     if (!numericEventId || !user?.email) return;

//     const fetchWorkshopAndRegistration = async () => {
//       try {
//         // First fetch user details to check registration
//         const userResponse = await fetch(
//           `${process.env.NEXT_PUBLIC_APP_URL}/api/getUser?email=${user.email}`,
//           { cache: "no-store" }
//         );

//         if (!userResponse.ok) {
//           throw new Error("Failed to fetch user details");
//         }

//         const userData = await userResponse.json();

//         // Check if workshop is in user's registered workshops
//         const isRegistered = userData.workshop.some(
//           (w) => w.workshopid === numericEventId
//         );

//         if (!isRegistered) {
//           setError("Workshop Unregistered");
//           setLoading(false);
//           return;
//         }

//         // If registered, fetch workshop details
//         const workshopResponse = await fetch(
//           `/api/workshop/getWorkshop?workshopId=${numericEventId}`
//         );

//         if (!workshopResponse.ok) {
//           throw new Error("Workshop not found");
//         }

//         const workshopData = await workshopResponse.json();
//         setWorkshop(workshopData.workshop);
//       } catch (err) {
//         setError(err.message);
//         console.error("Error fetching data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWorkshopAndRegistration();
//   }, [numericEventId, user?.email]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-black">
//         <Navbar />
//         <div className="flex justify-center items-center h-[calc(100vh-64px)]">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-black">
//         <Navbar />
//         <div className="flex justify-center items-center h-[calc(100vh-64px)]">
//           <div className="text-white text-xl">{error}</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-neutral-800 to-neutral-900">
//       <Navbar />
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-8 shadow-xl">
//           <h2 className="text-3xl text-center font-bold pb-5">Workshop</h2>
//           {workshop.outer_Img && (
//             <div className="mb-8 flex justify-center">
//               <div className="max-w-5xl aspect-video overflow-hidden rounded-xl">
//                 <img
//                   src={workshop.outer_Img}
//                   alt={workshop.name}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </div>
//           )}
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-white mb-4">
//               {workshop.name}
//             </h1>
//             <p className="text-gray-400 text-lg">{workshop.desc}</p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div className="space-y-6">
//               <div>
//                 <h2 className="text-xl font-semibold text-white mb-3">
//                   Workshop Details
//                 </h2>
//                 <div className="space-y-2">
//                   <p className="text-gray-400">
//                     <span className="font-medium text-white">Department:</span>{" "}
//                     {workshop.dept}
//                   </p>
//                   <p className="text-gray-400">
//                     <span className="font-medium text-white">Date:</span>{" "}
//                     {new Date(workshop.date).toLocaleDateString()}
//                   </p>
//                   <p className="text-gray-400">
//                     <span className="font-medium text-white">Time:</span>{" "}
//                     {workshop.time}
//                   </p>
//                   <p className="text-gray-400">
//                     <span className="font-medium text-white">Venue:</span>{" "}
//                     {workshop.venue}
//                   </p>
//                 </div>
//               </div>
//               <div>
//                 <h2 className="text-xl font-semibold text-white mb-3">
//                   Workshop Coordinators
//                 </h2>
//                 <p className="text-gray-400">
//                   <span className="font-medium text-white">Name:</span>{" "}
//                   {workshop.ecn}
//                 </p>
//                 <p className="text-gray-400">
//                   <span className="font-medium text-white">Contact:</span>{" "}
//                   {workshop.ecc}
//                 </p>
//                 {workshop.ecn2 && workshop.ecc2 && (
//                   <>
//                     <p className="text-gray-400">
//                       <span className="font-medium text-white">Name:</span>{" "}
//                       {workshop.ecn2}
//                     </p>
//                     <p className="text-gray-400">
//                       <span className="font-medium text-white">Contact:</span>{" "}
//                       {workshop.ecc2}
//                     </p>
//                   </>
//                 )}
//               </div>
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold text-white mb-3">
//                 Requirements from participants
//               </h2>
//               <p className="text-gray-400 whitespace-pre-line">{workshop.pr}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WorkshopProfileDetail;

"use client";

import Navbar from "@/components/Navbar";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useParams } from "next/navigation";
import React from "react";

const WorkshopProfileDetail = () => {
  const [workshop, setWorkshop] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const { user } = useKindeBrowserClient();
  const { eventId } = useParams();
  const numericEventId = eventId ? parseInt(eventId, 10) : null;

  React.useEffect(() => {
    if (!numericEventId || !user?.email) return;

    const fetchWorkshopAndRegistration = async () => {
      try {
        const userResponse = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/getUser?email=${user.email}`,
          {
            method: "GET",
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
        const isRegistered = userData.workshop.some(
          (w) => w.workshopid === numericEventId
        );

        if (!isRegistered) {
          setError("Workshop Unregistered");
          setLoading(false);
          return;
        }

        const workshopResponse = await fetch(
          `/api/workshop/getWorkshop?workshopId=${numericEventId}`,
          {
            method: "GET",
            headers: {
              "x-api-key": process.env.API_KEY, // Read from env
            },
          }
        );

        if (!workshopResponse.ok) {
          throw new Error("Workshop not found");
        }

        const workshopData = await workshopResponse.json();
        setWorkshop(workshopData.workshop);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshopAndRegistration();
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
          <h2 className="text-3xl text-center font-bold pb-5">Workshop</h2>
          {workshop.outer_Img && (
            <div className="mb-8 flex justify-center">
              <div className="max-w-5xl aspect-video overflow-hidden rounded-xl">
                <img
                  src={workshop.outer_Img}
                  alt={workshop.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* New 3-column grid for Date, Time, Venue */}
          <div className="grid grid-cols-3 gap-4 mb-8 text-center">
            <div className=" bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Date</h3>
              <p className="text-gray-400">
                {new Date(workshop.date).toLocaleDateString()}
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Time</h3>
              <p className="text-gray-400">{workshop.time}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Venue</h3>
              <p className="text-gray-400">{workshop.venue}</p>
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">
              {workshop.name}
            </h1>
            <p className="text-gray-400 text-lg">{workshop.desc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-white mb-3">
                  Workshop Details
                </h2>
                <div className="space-y-2">
                  <p className="text-gray-400">
                    <span className="font-medium text-white">Department:</span>{" "}
                    {workshop.dept}
                  </p>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-3">
                  Workshop Coordinators
                </h2>
                <p className="text-gray-400">
                  <span className="font-medium text-white">Name:</span>{" "}
                  {workshop.ecn}
                </p>
                <p className="text-gray-400">
                  <span className="font-medium text-white">Contact:</span>{" "}
                  {workshop.ecc}
                </p>
                {workshop.ecn2 && workshop.ecc2 && (
                  <>
                    <p className="text-gray-400">
                      <span className="font-medium text-white">Name:</span>{" "}
                      {workshop.ecn2}
                    </p>
                    <p className="text-gray-400">
                      <span className="font-medium text-white">Contact:</span>{" "}
                      {workshop.ecc2}
                    </p>
                  </>
                )}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white mb-3">
                Requirements from participants
              </h2>
              <p className="text-gray-400 whitespace-pre-line">{workshop.pr}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopProfileDetail;
