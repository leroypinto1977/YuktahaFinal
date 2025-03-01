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
//             ? `/api/tevents/${groupId}`
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
//     return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-[90rem] mx-auto";
//   };

//   // const filteredEvents = events.filter((event) => event.open);
//   const filteredEvents = events;

//   return (
//     <section
//       className={`w-full ${
//         !isModalView
//           ? "px-4 py-16 bg-gradient-to-br from-neutral-800 to-neutral-900"
//           : ""
//       }`}
//     >
//       <div className={`grid ${getGridClass(filteredEvents.length)} gap-8`}>
//         {filteredEvents.map((event, index) => (
//           <motion.div
//             key={event.eventid}
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: index * 0.1 }}
//             whileHover={{ scale: 1 }}
//             className="w-full h-full"
//           >
//             <Card className="bg-zinc-900 border-zinc-800 h-full border-3 rounded-3xl hover:border-zinc-700 transition-all duration-300 overflow-hidden flex flex-col">
//               <CardHeader className="p-0 flex-grow">
//                 <div className="relative w-full pt-4 px-4 aspect-video">
//                   <motion.div
//                     className="w-full h-full aspect-video rounded-t-2xl overflow-hidden"
//                     whileHover={{ scale: 1.2 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <Image
//                       src={event.outer_Img || "/events/default.png"}
//                       alt={event.name}
//                       width={400}
//                       height={300}
//                       className="object-cover w-full h-full"
//                     />
//                   </motion.div>
//                 </div>
//                 <div className="p-6 flex-grow">
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
//               <CardFooter className="flex justify-end p-6">
//                 <Button
//                   className="group items-center"
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

// Mobile Event Card Component
const MobileEventCard = ({ event, index, activeTab, router }) => {
  return (
    <motion.div
      key={event.eventid}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="w-full snap-start"
    >
      <Card className="bg-zinc-900 border-zinc-800 border-2 rounded-2xl overflow-hidden shadow-lg mx-2 h-full flex flex-col">
        <CardHeader className="p-0">
          <div className="relative w-full aspect-video">
            <Image
              src={event.outer_Img || "/events/default.png"}
              alt={event.name}
              width={300}
              height={200}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent" />
            <div className="absolute bottom-3 left-3">
              <span className="text-xs bg-zinc-800/90 text-zinc-300 px-2 py-1 rounded-full">
                {event.dept}
              </span>
            </div>
          </div>
        </CardHeader>
        <div className="p-4 flex-grow">
          <CardTitle className="text-white text-lg mb-2">
            {event.name}
          </CardTitle>
          <CardDescription className="text-zinc-400 line-clamp-2 text-sm">
            {event.short_desc}
          </CardDescription>
        </div>
        <CardFooter className="flex justify-end p-3 pt-0">
          <Button
            size="sm"
            className="group items-center"
            onClick={() => {
              router.push(`/events/${activeTab}/${event.eventid}`);
            }}
          >
            Register
            <ArrowRight
              className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
              size={14}
              strokeWidth={2}
              aria-hidden="true"
            />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

// Desktop Event Card Component
const DesktopEventCard = ({ event, index, activeTab, router }) => {
  return (
    <motion.div
      key={event.eventid}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="w-full h-full"
    >
      <Card className="bg-zinc-900 border-zinc-800 h-full border-3 rounded-3xl hover:border-zinc-700 transition-all duration-300 overflow-hidden flex flex-col shadow-xl hover:shadow-2xl hover:shadow-indigo-900/10">
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
                className="object-cover w-full h-full transition-transform duration-700"
              />
            </motion.div>
          </div>
          <div className="p-6 flex-grow">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <CardTitle className="text-white">{event.name}</CardTitle>
              <div className="flex gap-2 mt-2">
                <span className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded">
                  {event.dept}
                </span>
              </div>
              <CardDescription className="text-zinc-400 mt-2">
                {event.short_desc}
              </CardDescription>
            </motion.div>
          </div>
        </CardHeader>
        <CardFooter className="flex justify-end p-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
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
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const EventGrid = ({
  events: propEvents,
  isModalView = false,
  groupId,
  activeTab = "technical",
}) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

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
      <div className="w-full flex items-center justify-center px-4 py-16 bg-gradient-to-br from-neutral-800 to-neutral-900 text-white text-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mb-4"></div>
          <p>Loading events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full px-4 py-16 bg-gradient-to-br from-neutral-800 to-neutral-900 text-white text-center">
        <div className="bg-red-900/20 border border-red-800 p-4 rounded-lg max-w-md mx-auto">
          <p>Error: {error}</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const getGridClass = (itemCount) => {
    if (isModalView) {
      if (isMobile) return "grid-cols-1 max-w-sm mx-auto";

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

    if (isMobile) return "grid-cols-1";
    return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-[90rem] mx-auto";
  };

  // const filteredEvents = events.filter((event) => event.open);
  const filteredEvents = events;

  if (isMobile && !isModalView) {
    return (
      <section className="w-full px-0 py-8 bg-gradient-to-br from-neutral-800 to-neutral-900">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="pb-2"
        >
          <h3 className="text-white font-medium text-lg px-4 mb-3">
            Browse Events
          </h3>
          <div className="overflow-x-auto snap-x snap-mandatory flex gap-2 pb-4 px-2">
            {filteredEvents.map((event, index) => (
              <div
                className="min-w-[250px] max-w-[250px] snap-start"
                key={event.eventid}
              >
                <MobileEventCard
                  event={event}
                  index={index}
                  activeTab={activeTab}
                  router={router}
                />
              </div>
            ))}
            <div className="min-w-4 snap-start"></div>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section
      className={`w-full ${
        !isModalView
          ? "px-4 py-16 bg-gradient-to-br from-neutral-800 to-neutral-900"
          : "px-2 py-4"
      }`}
    >
      <div
        className={`grid ${getGridClass(filteredEvents.length)} gap-4 md:gap-8`}
      >
        {filteredEvents.map((event, index) => (
          <DesktopEventCard
            key={event.eventid}
            event={event}
            index={index}
            activeTab={activeTab}
            router={router}
          />
        ))}
      </div>
    </section>
  );
};

export default EventGrid;
