// "use client";

// import EventGrid from "./EventGrid";
// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
// import { motion, AnimatePresence } from "framer-motion";
// import { ArrowRight, X } from "lucide-react";
// import Image from "next/image";
// import { useState, useEffect } from "react";

// const EventGroups = () => {
//   const [activeTab, setActiveTab] = useState("technical");
//   const [selectedGroup, setSelectedGroup] = useState(null);
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   // Check for mobile screen size
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     if (typeof window !== "undefined") {
//       checkMobile();
//       window.addEventListener("resize", checkMobile);
//     }

//     return () => {
//       if (typeof window !== "undefined") {
//         window.removeEventListener("resize", checkMobile);
//       }
//     };
//   }, []);

//   const groups = [
//     {
//       id: 1,
//       name: "Paper Presentations & Research",
//       image: "/event/groups/1.png",
//     },
//     {
//       id: 2,
//       name: "AI & Data Science Challenges",
//       image: "/event/groups/2.png",
//     },
//     {
//       id: 3,
//       name: "Coding Challenges",
//       image: "/event/groups/3.png",
//     },
//     {
//       id: 4,
//       name: "Circuit Design & Embedded Systems",
//       image: "/event/groups/4.png",
//     },
//     {
//       id: 5,
//       name: "Engineering Challenges",
//       image: "/event/groups/5.png",
//     },
//     {
//       id: 6,
//       name: "Escape Room Challenges",
//       image: "/event/groups/6.png",
//     },
//     {
//       id: 7,
//       name: "Civil",
//       image: "/event/groups/7.png",
//     },
//   ];

//   useEffect(() => {
//     if (selectedGroup) {
//       const fetchEvents = async () => {
//         setLoading(true);
//         try {
//           const response = await fetch(
//             `/api/tevents/getGroup/${selectedGroup.id}`
//           );
//           const data = await response.json();

//           if (!response.ok) {
//             throw new Error(data.error || "Failed to fetch events");
//           }

//           if (data.success && Array.isArray(data.data)) {
//             setEvents(data.data);
//           } else {
//             setEvents([]);
//           }
//         } catch (error) {
//           console.error("Error fetching events:", error);
//           setEvents([]);
//           // Optionally, you could add a state for error messages to display to the user
//           // setErrorMessage(error.message);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchEvents();
//     }
//   }, [selectedGroup]);

//   const handleModalClose = () => {
//     setSelectedGroup(null);
//     setEvents([]);
//   };

//   const GroupCard = ({ group, index }) => (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.6, delay: index * 0.1 }}
//       className="w-full h-full"
//     >
//       <Card className="bg-zinc-900 border-zinc-800 overflow-hidden h-full border-3 rounded-3xl hover:border-zinc-700 transition-all duration-300 flex flex-col">
//         <CardHeader className="p-0 flex-grow">
//           <div className="relative w-full pt-4 px-4 aspect-video">
//             <motion.div
//               className="w-full h-full rounded-t-2xl overflow-hidden"
//               whileHover={{ scale: isMobile ? 1.05 : 1.25 }}
//               transition={{ duration: 0.3 }}
//             >
//               <Image
//                 src={group.image}
//                 alt={group.name}
//                 width={400}
//                 height={300}
//                 className="object-cover aspect-video w-full h-full"
//               />
//             </motion.div>
//           </div>
//           <div className="px-6 py-2 flex-grow">
//             <CardTitle
//               className={`text-white text-center flex items-center justify-center ${
//                 isMobile ? "text-sm min-h-[40px]" : "min-h-[60px]"
//               }`}
//             >
//               {group.name}
//             </CardTitle>
//           </div>
//         </CardHeader>
//         <CardFooter className="flex justify-center pb-6 pt-2">
//           <Button
//             className="group items-center"
//             onClick={() => setSelectedGroup(group)}
//           >
//             View Events
//             <ArrowRight
//               className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
//               size={16}
//               strokeWidth={2}
//             />
//           </Button>
//         </CardFooter>
//       </Card>
//     </motion.div>
//   );

//   return (
//     <section className="w-full px-4 py-8 md:py-16 bg-gradient-to-br from-neutral-800 to-neutral-900">
//       <motion.h2
//         className={`${
//           isMobile ? "text-3xl" : "text-4xl"
//         } font-bold text-center text-white mb-8 md:mb-12`}
//         initial={{ opacity: 0, y: 20 }}
//         transition={{ duration: 0.6 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//       >
//         Events
//       </motion.h2>

//       {/* <div className="flex justify-center mb-8">
//         <div className="flex flex-wrap justify-center space-y-2 md:space-y-0">
//           <Button
//             variant={activeTab === "technical" ? "default" : "secondary"}
//             onClick={() => setActiveTab("technical")}
//             className="mx-2 w-full sm:w-auto mb-2 sm:mb-0"
//             size={isMobile ? "sm" : "default"}
//           >
//             Technical Events
//           </Button>
//           <Button
//             variant={activeTab === "non-technical" ? "default" : "secondary"}
//             onClick={() => setActiveTab("non-technical")}
//             className="mx-2 w-full sm:w-auto"
//             size={isMobile ? "sm" : "default"}
//           >
//             Non-Technical Events
//           </Button>
//         </div>
//       </div> */}

//       <div className="flex justify-center mb-8">
//         <Button
//           variant={activeTab === "technical" ? "default" : "secondary"}
//           onClick={() => setActiveTab("technical")}
//           className="mx-2"
//         >
//           Technical Events
//         </Button>
//         <Button
//           variant={activeTab === "non-technical" ? "default" : "secondary"}
//           onClick={() => setActiveTab("non-technical")}
//           className="mx-2"
//         >
//           Non-Technical Events
//         </Button>
//       </div>

//       {activeTab === "technical" ? (
//         <div className="max-w-[90rem] mx-auto space-y-8">
//           {isMobile ? (
//             // Mobile layout - single column
//             <div className="grid grid-cols-1 gap-6">
//               {groups.map((group, index) => (
//                 <GroupCard key={group.id} group={group} index={index} />
//               ))}
//             </div>
//           ) : (
//             // Desktop layout
//             <>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-8">
//                 {groups.slice(0, 4).map((group, index) => (
//                   <GroupCard key={group.id} group={group} index={index} />
//                 ))}
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-[90%] md:max-w-[75%] mx-auto">
//                 {groups.slice(4).map((group, index) => (
//                   <GroupCard key={group.id} group={group} index={index + 4} />
//                 ))}
//               </div>
//             </>
//           )}
//         </div>
//       ) : (
//         <EventGrid activeTab={activeTab} />
//       )}

//       <AnimatePresence>
//         {selectedGroup && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//             onClick={handleModalClose}
//           >
//             <motion.div
//               initial={{ scale: 0.5, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.5, opacity: 0 }}
//               transition={{ type: "spring", duration: 0.5 }}
//               className={`${
//                 isMobile ? "w-[95vw] h-[80vh]" : "w-[70vw] h-[70vh]"
//               } bg-zinc-900 rounded-3xl overflow-hidden`}
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="h-full flex flex-col">
//                 <div className={`relative ${isMobile ? "h-1/4" : "h-1/3"}`}>
//                   <motion.div
//                     initial={{ scale: 1.5 }}
//                     animate={{ scale: 1 }}
//                     className="w-full h-full"
//                   >
//                     <Image
//                       src={selectedGroup.image}
//                       alt={selectedGroup.name}
//                       layout="fill"
//                       objectFit="cover"
//                     />
//                   </motion.div>
//                   <Button
//                     variant="ghost"
//                     className="absolute top-4 right-4 text-black bg-white hover:bg-white/90"
//                     onClick={handleModalClose}
//                   >
//                     <X size={24} />
//                   </Button>
//                   <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-zinc-900">
//                     <h2
//                       className={`${
//                         isMobile ? "text-xl" : "text-3xl"
//                       } font-bold text-white`}
//                     >
//                       {selectedGroup.name} Events
//                     </h2>
//                   </div>
//                 </div>

//                 <div className="flex-1 overflow-y-auto">
//                   {loading ? (
//                     <div className="flex justify-center items-center h-full text-white">
//                       <div className="text-center">
//                         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
//                         <p>Loading events...</p>
//                       </div>
//                     </div>
//                   ) : (
//                     <EventGrid
//                       events={events}
//                       isModalView={true}
//                       groupId={selectedGroup.id}
//                     />
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// };

// export default EventGroups;

"use client";

import EventGrid from "./EventGrid";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

const EventGroups = () => {
  const [activeTab, setActiveTab] = useState("technical");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    if (typeof window !== "undefined") {
      checkMobile();
      window.addEventListener("resize", checkMobile);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", checkMobile);
      }
    };
  }, []);

  const groups = [
    {
      id: 1,
      name: "Paper Presentations & Research",
      image: "/event/groups/1.png",
    },
    {
      id: 2,
      name: "AI & Data Science Challenges",
      image: "/event/groups/2.png",
    },
    {
      id: 3,
      name: "Coding Challenges",
      image: "/event/groups/3.png",
    },
    {
      id: 4,
      name: "Circuit Design & Embedded Systems",
      image: "/event/groups/4.png",
    },
    {
      id: 5,
      name: "Engineering Challenges",
      image: "/event/groups/5.png",
    },
    {
      id: 6,
      name: "Escape Room Challenges",
      image: "/event/groups/6.png",
    },
    {
      id: 7,
      name: "Civil",
      image: "/event/groups/7.png",
    },
  ];

  // Reorganize groups for desktop layout - 4 in first row, 3 in second row
  const topRowGroups = groups.slice(0, 4);
  const bottomRowGroups = groups.slice(4);

  useEffect(() => {
    if (selectedGroup) {
      const fetchEvents = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `/api/tevents/getGroup/${selectedGroup.id}`,
            {
              method: "GET",
              // headers: {
              //   "x-api-key": process.env.API_KEY, // Read from env
              // },
            }
          );
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.error || "Failed to fetch events");
          }
          if (data.success && Array.isArray(data.data)) {
            setEvents(data.data);
          } else {
            setEvents([]);
          }
        } catch (error) {
          console.error("Error fetching events:", error);
          setEvents([]);
          // Optionally, you could add a state for error messages to display to the user
          // setErrorMessage(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchEvents();
    }
  }, [selectedGroup]);

  const handleModalClose = () => {
    setSelectedGroup(null);
    setEvents([]);
  };

  const GroupCard = ({ group, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="w-full h-full"
    >
      <Card className="bg-zinc-900 border-zinc-800 overflow-hidden h-full border-3 rounded-3xl hover:border-zinc-700 transition-all duration-300 flex flex-col">
        <CardHeader className="p-0 flex-grow">
          <div className="relative w-full pt-4 px-4 aspect-video">
            <motion.div
              className="w-full h-full rounded-t-2xl overflow-hidden"
              whileHover={{ scale: isMobile ? 1.05 : 1.25 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={group.image}
                alt={group.name}
                width={400}
                height={300}
                className="object-cover aspect-video w-full h-full"
              />
            </motion.div>
          </div>
          <div className="px-6 py-2 flex-grow">
            <CardTitle
              className={`text-white text-center flex items-center justify-center ${
                isMobile ? "text-sm min-h-[40px]" : "min-h-[60px]"
              }`}
            >
              {group.name}
            </CardTitle>
          </div>
        </CardHeader>
        <CardFooter className="flex justify-center pb-6 pt-2">
          <Button
            className="group items-center"
            onClick={() => setSelectedGroup(group)}
          >
            View Events
            <ArrowRight
              className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
              size={16}
              strokeWidth={2}
            />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );

  return (
    <section className="w-full px-4 py-8 md:py-16 bg-gradient-to-br from-neutral-800 to-neutral-900">
      <motion.h2
        className={`${
          isMobile ? "text-3xl" : "text-4xl"
        } font-bold text-center text-white mb-8 md:mb-12`}
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Events
      </motion.h2>

      <div className="flex justify-center mb-8">
        <Button
          variant={activeTab === "technical" ? "default" : "secondary"}
          onClick={() => setActiveTab("technical")}
          className="mx-2"
        >
          Technical Events
        </Button>
        <Button
          variant={activeTab === "non-technical" ? "default" : "secondary"}
          onClick={() => setActiveTab("non-technical")}
          className="mx-2"
        >
          Non-Technical Events
        </Button>
      </div>

      {activeTab === "technical" ? (
        <div className="max-w-[90rem] mx-auto space-y-8">
          {isMobile ? (
            // Mobile layout - single column
            <div className="grid grid-cols-1 gap-6">
              {groups.map((group, index) => (
                <GroupCard key={group.id} group={group} index={index} />
              ))}
            </div>
          ) : (
            // Desktop layout - 4 in first row, 3 in second row
            <>
              <div className="grid grid-cols-4 gap-8 mb-8">
                {topRowGroups.map((group, index) => (
                  <GroupCard key={group.id} group={group} index={index} />
                ))}
              </div>
              <div className="grid grid-cols-3 gap-8 max-w-[75%] mx-auto">
                {bottomRowGroups.map((group, index) => (
                  <GroupCard key={group.id} group={group} index={index + 4} />
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <EventGrid activeTab={activeTab} />
      )}

      <AnimatePresence>
        {selectedGroup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={handleModalClose}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className={`${
                isMobile ? "w-[95vw] h-[80vh]" : "w-[70vw] h-[70vh]"
              } bg-zinc-900 rounded-3xl overflow-hidden`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-full flex flex-col">
                <div className={`relative ${isMobile ? "h-1/4" : "h-1/3"}`}>
                  <motion.div
                    initial={{ scale: 1.5 }}
                    animate={{ scale: 1 }}
                    className="w-full h-full"
                  >
                    <Image
                      src={selectedGroup.image}
                      alt={selectedGroup.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </motion.div>
                  <Button
                    variant="ghost"
                    className="absolute top-4 right-4 text-black bg-white hover:bg-white/90"
                    onClick={handleModalClose}
                  >
                    <X size={24} />
                  </Button>
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-zinc-900">
                    <h2
                      className={`${
                        isMobile ? "text-xl" : "text-3xl"
                      } font-bold text-white`}
                    >
                      {selectedGroup.name} Events
                    </h2>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {loading ? (
                    <div className="flex justify-center items-center h-full text-white">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
                        <p>Loading events...</p>
                      </div>
                    </div>
                  ) : (
                    <EventGrid
                      events={events}
                      isModalView={true}
                      groupId={selectedGroup.id}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default EventGroups;
