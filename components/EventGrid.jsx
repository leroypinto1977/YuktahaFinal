// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardFooter,
//   CardTitle,
// } from "@/components/ui/card";
// import { motion } from "framer-motion";
// import { ArrowRight } from "lucide-react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";

// const EventGrid = () => {
//   const [activeTab, setActiveTab] = useState("technical");
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await fetch(
//           `/api/${activeTab === "technical" ? "tevents" : "ntevents"}`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch events");
//         }
//         const data = await response.json();
//         setEvents(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, [activeTab]);

//   if (loading) {
//     return (
//       <div className="w-full px-4 py-16 bg-black text-white text-center">
//         Loading events...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="w-full px-4 py-16 bg-black text-white text-center">
//         Error: {error}
//       </div>
//     );
//   }

//   return (
//     <section className="w-full px-4 py-16  bg-gradient-to-br from-neutral-800 to-neutral-900">
//       <motion.h2
//         className="text-4xl font-bold text-center text-white mb-12"
//         initial={{ opacity: 0, y: 20 }}
//         transition={{ duration: 0.6 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//       >
//         {activeTab === "technical"
//           ? "Technical Events"
//           : "Non-Technical Events"}
//       </motion.h2>
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

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-full mx-auto pb-16 px-28">
//         {events
//           .filter((event) => event.open)
//           .map((event, index) => (
//             <motion.div
//               key={event.eventid}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: index * 0.2 }}
//               whileHover={{ scale: 1 }}
//             >
//               <Card className="bg-zinc-900 border-zinc-800 h-full border-3 rounded-3xl hover:border-zinc-700 transition-all duration-300 overflow-hidden">
//                 <CardHeader className="p-0">
//                   <motion.div
//                     className="relative w-full rounded-t-xl overflow-hidden pt-4 px-4"
//                     whileHover={{ scale: 1.2 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <Image
//                       src={event.outer_Img || "/workshop/main.png"}
//                       alt={event.name}
//                       width={400}
//                       height={300}
//                       className="object-cover aspect-video w-full h-full rounded-t-2xl"
//                     />
//                   </motion.div>

//                   <div className="p-6">
//                     <CardTitle className="text-white">{event.name}</CardTitle>
//                     <div className="flex gap-2 mt-2">
//                       <span className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded">
//                         {event.dept}
//                       </span>
//                     </div>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="px-6 py-0">
//                   <CardDescription className="text-zinc-400">
//                     {event.short_desc}
//                   </CardDescription>
//                 </CardContent>
//                 <CardFooter className="flex justify-end">
//                   <Button
//                     className="group items-center pt-2 pb-2"
//                     onClick={() => {
//                       router.push(
//                         `/events/${
//                           activeTab === "technical"
//                             ? "technical"
//                             : "non-technical"
//                         }/${event.eventid}`
//                       );
//                     }}
//                   >
//                     Register
//                     <ArrowRight
//                       className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
//                       size={16}
//                       strokeWidth={2}
//                       aria-hidden="true"
//                     />
//                   </Button>
//                 </CardFooter>
//               </Card>
//             </motion.div>
//           ))}
//       </div>
//     </section>
//   );
// };

// export default EventGrid;

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardFooter,
//   CardTitle,
// } from "@/components/ui/card";
// import { motion } from "framer-motion";
// import { ArrowRight } from "lucide-react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";

// const EventGrid = ({
//   events: propEvents,
//   isModalView = false,
//   groupId,
//   activeTab = "technical",
// }) => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     if (isModalView) {
//       document.body.style.overflow = "hidden";
//       const scrollPosition = window.scrollY;
//       document.body.style.position = "fixed";
//       document.body.style.top = `-${scrollPosition}px`;
//       document.body.style.width = "100%";

//       return () => {
//         document.body.style.overflow = "";
//         document.body.style.position = "";
//         document.body.style.top = "";
//         document.body.style.width = "";
//         window.scrollTo(0, scrollPosition);
//       };
//     }
//   }, [isModalView]);

//   useEffect(() => {
//     if (propEvents) {
//       setEvents(propEvents);
//       setLoading(false);
//       return;
//     }

//     const fetchEvents = async () => {
//       try {
//         const response = await fetch(
//           isModalView
//             ? `/api/tevents/getGroups/${groupId}`
//             : `/api/${activeTab === "technical" ? "tevents" : "ntevents"}`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch events");
//         }
//         const data = await response.json();
//         setEvents(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, [propEvents, groupId, activeTab, isModalView]);

//   if (loading) {
//     return (
//       <div className="w-full px-4 py-16 bg-black text-white text-center">
//         Loading events...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="w-full px-4 py-16 bg-black text-white text-center">
//         Error: {error}
//       </div>
//     );
//   }

//   const getGridClass = (itemCount) => {
//     if (isModalView) {
//       switch (itemCount) {
//         case 1:
//           return "grid-cols-1 max-w-md mx-auto";
//         case 2:
//           return "grid-cols-2 max-w-3xl mx-auto";
//         case 3:
//           return "grid-cols-3 max-w-6xl mx-auto";
//         case 4:
//           return "grid-cols-2 max-w-3xl mx-auto";
//         default:
//           return "grid-cols-3 max-w-6xl mx-auto";
//       }
//     }
//     return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-full mx-auto";
//   };

//   const filteredEvents = events.filter((event) => event.open);

//   return (
//     <section
//       className={`w-full ${
//         !isModalView
//           ? "px-4 py-16 bg-gradient-to-br from-neutral-800 to-neutral-900"
//           : ""
//       }`}
//     >
//       <div className={`grid ${getGridClass(filteredEvents.length)} gap-6 px-4`}>
//         {filteredEvents.map((event, index) => (
//           <motion.div
//             key={event.eventid}
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: index * 0.1 }}
//             whileHover={{ scale: 1 }}
//             className="w-full"
//           >
//             <Card className="bg-zinc-900 border-zinc-800 h-full border-3 rounded-3xl hover:border-zinc-700 transition-all duration-300 overflow-hidden">
//               <CardHeader className="p-0">
//                 <motion.div
//                   className="relative w-full rounded-t-xl overflow-hidden pt-4 px-4"
//                   whileHover={{ scale: 1.2 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <Image
//                     src={event.outer_Img || "/events/default.png"}
//                     alt={event.name}
//                     width={400}
//                     height={300}
//                     className="object-cover aspect-video w-full h-full rounded-t-2xl"
//                   />
//                 </motion.div>
//                 <div className="p-6">
//                   <CardTitle className="text-white">{event.name}</CardTitle>
//                   <div className="flex gap-2 mt-2">
//                     <span className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded">
//                       {event.dept}
//                     </span>
//                   </div>
//                   <CardDescription className="text-zinc-400 mt-2">
//                     {event.short_desc}
//                   </CardDescription>
//                 </div>
//               </CardHeader>
//               <CardFooter className="flex justify-end">
//                 <Button
//                   className="group items-center pt-2 pb-2"
//                   onClick={() => {
//                     router.push(`/events/${activeTab}/${event.eventid}`);
//                   }}
//                 >
//                   Register
//                   <ArrowRight
//                     className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
//                     size={16}
//                     strokeWidth={2}
//                     aria-hidden="true"
//                   />
//                 </Button>
//               </CardFooter>
//             </Card>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default EventGrid;

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const EventGrid = ({
  events: propEvents,
  isModalView = false,
  groupId,
  activeTab = "technical",
}) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (isModalView) {
      document.body.style.overflow = "hidden";
      const scrollPosition = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.width = "100%";

      return () => {
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollPosition);
      };
    }
  }, [isModalView]);

  useEffect(() => {
    if (propEvents) {
      setEvents(propEvents);
      setLoading(false);
      return;
    }

    const fetchEvents = async () => {
      try {
        const response = await fetch(
          isModalView
            ? `/api/tevents/${groupId}`
            : `/api/${activeTab === "technical" ? "tevents" : "ntevents"}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [propEvents, groupId, activeTab, isModalView]);

  if (loading) {
    return (
      <div className="w-full px-4 py-16 bg-black text-white text-center">
        Loading events...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full px-4 py-16 bg-black text-white text-center">
        Error: {error}
      </div>
    );
  }

  const getGridClass = (itemCount) => {
    if (isModalView) {
      switch (itemCount) {
        case 1:
          return "grid-cols-1 max-w-md mx-auto";
        case 2:
          return "grid-cols-2 max-w-3xl mx-auto";
        case 3:
          return "grid-cols-3 max-w-6xl mx-auto";
        case 4:
          return "grid-cols-2 max-w-3xl mx-auto";
        default:
          return "grid-cols-3 max-w-6xl mx-auto";
      }
    }
    return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-[90rem] mx-auto";
  };

  // const filteredEvents = events.filter((event) => event.open);
  const filteredEvents = events;

  return (
    <section
      className={`w-full ${
        !isModalView
          ? "px-4 py-16 bg-gradient-to-br from-neutral-800 to-neutral-900"
          : ""
      }`}
    >
      <div className={`grid ${getGridClass(filteredEvents.length)} gap-8`}>
        {filteredEvents.map((event, index) => (
          <motion.div
            key={event.eventid}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1 }}
            className="w-full h-full"
          >
            <Card className="bg-zinc-900 border-zinc-800 h-full border-3 rounded-3xl hover:border-zinc-700 transition-all duration-300 overflow-hidden flex flex-col">
              <CardHeader className="p-0 flex-grow">
                <div className="relative w-full pt-4 px-4 aspect-video">
                  <motion.div
                    className="w-full h-full aspect-video rounded-t-2xl overflow-hidden"
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={event.outer_Img || "/events/default.png"}
                      alt={event.name}
                      width={400}
                      height={300}
                      className="object-cover w-full h-full"
                    />
                  </motion.div>
                </div>
                <div className="p-6 flex-grow">
                  <CardTitle className="text-white">{event.name}</CardTitle>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded">
                      {event.dept}
                    </span>
                  </div>
                  <CardDescription className="text-zinc-400 mt-2">
                    {event.short_desc}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardFooter className="flex justify-end p-6">
                <Button
                  className="group items-center"
                  onClick={() => {
                    router.push(`/events/${activeTab}/${event.eventid}`);
                  }}
                >
                  Register
                  <ArrowRight
                    className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default EventGrid;
