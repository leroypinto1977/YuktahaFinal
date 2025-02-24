// // EventGroups.jsx

// import EventGrid from "./EventGrid";
// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
// import { motion, AnimatePresence } from "framer-motion";
// import { ArrowRight, X } from "lucide-react";
// import Image from "next/image";
// import { useState } from "react";

// const EventGroups = () => {
//   const [activeTab, setActiveTab] = useState("technical");
//   const [selectedGroup, setSelectedGroup] = useState(null);
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const technicalGroups = [
//     {
//       id: 1,
//       name: "Paper Presentations & Research",
//       image: "/events/papers.png",
//     },
//     {
//       id: 2,
//       name: "AI & Data Science Challenges",
//       image: "/events/ai.png",
//     },
//     {
//       id: 3,
//       name: "Coding Challenges",
//       image: "/events/coding.png",
//     },
//     {
//       id: 4,
//       name: "Circuit Design & Embedded Systems",
//       image: "/events/circuits.png",
//     },
//     {
//       id: 5,
//       name: "Engineering Challenges",
//       image: "/events/engineering.png",
//     },
//     {
//       id: 6,
//       name: "Escape Room Challenges",
//       image: "/events/escape.png",
//     },
//     {
//       id: 7,
//       name: "Civil Engineering Challenges",
//       image: "/events/civil.png",
//     },
//   ];

//   const handleModalClose = () => {
//     setSelectedGroup(null);
//     setEvents([]);
//   };

//   useEffect(() => {
//     if (selectedGroup) {
//       const fetchEvents = async () => {
//         setLoading(true);
//         try {
//           const response = await fetch(
//             `/api/tevents/getGroup/${selectedGroup.id}`
//           );
//           if (!response.ok) throw new Error("Failed to fetch events");
//           const data = await response.json();
//           setEvents(data);
//         } catch (error) {
//           console.error("Error fetching events:", error);
//         }
//         setLoading(false);
//       };

//       fetchEvents();
//     }
//   }, [selectedGroup]);

//   const EventGroupCard = ({ group, index }) => (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.6, delay: index * 0.1 }}
//       className="h-full"
//     >
//       <Card className="bg-zinc-900 border-zinc-800 overflow-hidden h-full border-3 rounded-3xl hover:border-zinc-700 transition-all duration-300">
//         <CardHeader className="p-0">
//           <motion.div
//             className="relative w-full rounded-t-xl overflow-hidden pt-4 px-4"
//             whileHover={{ scale: 1.25 }}
//             transition={{ duration: 0.3 }}
//           >
//             <Image
//               src={group.image}
//               alt={group.name}
//               width={400}
//               height={300}
//               className="object-cover aspect-video w-full h-full rounded-t-2xl"
//             />
//           </motion.div>
//           <div className="px-6 py-2">
//             <CardTitle className="text-white text-center min-h-[60px] flex items-center justify-center">
//               {group.name}
//             </CardTitle>
//           </div>
//         </CardHeader>
//         <CardFooter className="flex justify-center pb-6">
//           <Button
//             className="group items-center pt-2 pb-2"
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
//     <section className="w-full bg-gradient-to-br from-neutral-800 to-neutral-900">
//       <div className="py-16">
//         <motion.h2
//           className="text-4xl font-bold text-center text-white mb-12"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//         >
//           Events
//         </motion.h2>

//         <div className="flex justify-center mb-8">
//           <Button
//             variant={activeTab === "technical" ? "default" : "secondary"}
//             onClick={() => setActiveTab("technical")}
//             className="mx-2"
//           >
//             Technical Events
//           </Button>
//           <Button
//             variant={activeTab === "non-technical" ? "default" : "secondary"}
//             onClick={() => setActiveTab("non-technical")}
//             className="mx-2"
//           >
//             Non-Technical Events
//           </Button>
//         </div>

//         {activeTab === "technical" ? (
//           <div className="max-w-[90rem] mx-auto px-4 space-y-8">
//             <div className="grid grid-cols-1 gap-8">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                 {technicalGroups.slice(0, 3).map((group, index) => (
//                   <EventGroupCard key={group.id} group={group} index={index} />
//                 ))}
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//                 {technicalGroups.slice(3, 7).map((group, index) => (
//                   <EventGroupCard
//                     key={group.id}
//                     group={group}
//                     index={index + 3}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         ) : (
//           <EventGrid isNonTechnical={true} />
//         )}
//       </div>

//       <AnimatePresence>
//         {selectedGroup && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//             onClick={handleModalClose}
//           >
//             <motion.div
//               initial={{ scale: 0.5, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.5, opacity: 0 }}
//               transition={{ type: "spring", duration: 0.5 }}
//               className="w-[70vw] h-[70vh] bg-zinc-900 rounded-3xl overflow-hidden"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="h-full flex flex-col">
//                 <div className="relative h-1/3">
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
//                     className="absolute top-4 right-4 text-black bg-white"
//                     onClick={handleModalClose}
//                   >
//                     <X size={24} />
//                   </Button>
//                   <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-zinc-900">
//                     <h2 className="text-3xl font-bold text-white">
//                       {selectedGroup.name}
//                     </h2>
//                   </div>
//                 </div>

//                 <div className="flex-1 overflow-y-auto">
//                   {loading ? (
//                     <div className="text-center text-white p-6">
//                       Loading events...
//                     </div>
//                   ) : (
//                     <EventGrid
//                       isModalView={true}
//                       groupId={selectedGroup.id}
//                       events={events}
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

  const groups = [
    {
      id: 1,
      name: "Paper Presentations & Research",
      image: "/events/research.png",
    },
    {
      id: 2,
      name: "AI & Data Science Challenges",
      image: "/events/ai.png",
    },
    {
      id: 3,
      name: "Coding Challenges",
      image: "/events/coding.png",
    },
    {
      id: 4,
      name: "Circuit Design & Embedded Systems",
      image: "/events/circuit.png",
    },
    {
      id: 5,
      name: "Engineering Challenges",
      image: "/workshop/main.png",
    },
    {
      id: 6,
      name: "Escape Room Challenges",
      image: "/events/escape.png",
    },
    {
      id: 7,
      name: "Civil",
      image: "/events/civil.png",
    },
  ];

  useEffect(() => {
    if (selectedGroup) {
      const fetchEvents = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `/api/tevents/getGroup/${selectedGroup.id}`
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
              whileHover={{ scale: 1.25 }}
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
            <CardTitle className="text-white text-center flex items-center justify-center min-h-[60px]">
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
    <section className="w-full px-4 py-8 bg-gradient-to-br from-neutral-800 to-neutral-900">
      <motion.h2
        className="text-4xl font-bold text-center text-white mb-12"
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
        <div className="max-w-[90rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {groups.slice(0, 4).map((group, index) => (
              <GroupCard key={group.id} group={group} index={index} />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[75%] mx-auto">
            {groups.slice(4).map((group, index) => (
              <GroupCard key={group.id} group={group} index={index + 4} />
            ))}
          </div>
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
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleModalClose}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-[70vw] h-[70vh] bg-zinc-900 rounded-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-full flex flex-col">
                <div className="relative h-1/3">
                  <motion.div
                    initial={{ scale: 1.5 }}
                    animate={{ scale: 1 }}
                    className="w-full h-full aspect-video"
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
                    className="absolute top-4 right-4 text-black bg-white"
                    onClick={handleModalClose}
                  >
                    <X size={24} />
                  </Button>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-zinc-900">
                    <h2 className="text-3xl font-bold text-white">
                      {selectedGroup.name} Events
                    </h2>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {loading ? (
                    <div className="text-center text-white p-6">
                      Loading events...
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
