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
// import { useEffect, useState } from "react";

// const WorkshopGrid = ({
//   workshops: propWorkshops,
//   isModalView = false,
//   groupId,
// }) => {
//   const [workshops, setWorkshops] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const router = useRouter();

//   // Effect to handle body scroll lock
//   useEffect(() => {
//     if (isModalView) {
//       // Disable scrolling on body when modal is open
//       document.body.style.overflow = "hidden";
//       // Save the current scroll position
//       const scrollPosition = window.scrollY;
//       document.body.style.position = "fixed";
//       document.body.style.top = `-${scrollPosition}px`;
//       document.body.style.width = "100%";

//       return () => {
//         // Re-enable scrolling when modal is closed
//         document.body.style.overflow = "";
//         document.body.style.position = "";
//         document.body.style.top = "";
//         document.body.style.width = "";
//         // Restore scroll position
//         window.scrollTo(0, scrollPosition);
//       };
//     }
//   }, [isModalView]);

//   useEffect(() => {
//     if (propWorkshops) {
//       setWorkshops(propWorkshops.data || []);
//       setLoading(false);
//       return;
//     }

//     const fetchWorkshops = async () => {
//       try {
//         // Use the groupId prop instead of workshopId
//         const response = await fetch(`/api/workshop/getGroup/${groupId}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch workshops");
//         }
//         const result = await response.json();
//         if (result.success && Array.isArray(result.data)) {
//           setWorkshops(result.data);
//         } else {
//           throw new Error("Invalid data format received from API");
//         }
//       } catch (err) {
//         setError(err.message);
//         setWorkshops([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (groupId) {
//       // Only fetch if groupId is provided
//       fetchWorkshops();
//     }
//   }, [propWorkshops, groupId]);

//   if (loading) {
//     return (
//       <div className="w-full px-4 py-16 bg-black text-white text-center">
//         Loading workshops...
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

//   const workshopsToDisplay = Array.isArray(workshops) ? workshops : [];
//   // const filteredWorkshops = workshopsToDisplay.filter(
//   //   (workshop) => workshop.open
//   // );
//   const filteredWorkshops = workshopsToDisplay;

//   const getGridClass = (itemCount) => {
//     switch (itemCount) {
//       case 1:
//         return "grid-cols-1 max-w-md mx-auto";
//       case 2:
//         return "grid-cols-2 max-w-3xl mx-auto";
//       case 3:
//         return "grid-cols-3 max-w-6xl mx-auto";
//       case 4:
//         return "grid-cols-2 max-w-3xl mx-auto";
//       default:
//         return "grid-cols-3 max-w-6xl mx-auto";
//     }
//   };

//   return (
//     <section
//       className={`w-full ${
//         !isModalView
//           ? "px-4 py-16 bg-gradient-to-br from-neutral-800 to-neutral-900"
//           : ""
//       }`}
//     >
//       {!isModalView && (
//         <motion.h2
//           className="text-4xl font-bold text-center text-white mb-12"
//           initial={{ opacity: 0, y: 20 }}
//           transition={{ duration: 0.6 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//         >
//           Workshops
//         </motion.h2>
//       )}
//       <div
//         className={`grid ${getGridClass(filteredWorkshops.length)} gap-6 px-4`}
//       >
//         {filteredWorkshops.map((workshop, index) => (
//           <motion.div
//             key={workshop._id}
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: index * 0.1 }}
//             viewport={{ once: true }}
//             whileHover={{ scale: 1 }}
//             className="w-full pt-4"
//           >
//             <Card className="bg-zinc-900 border-zinc-800 h-full border-3 rounded-3xl hover:border-zinc-700 transition-all duration-300 overflow-hidden">
//               <CardHeader className="p-0">
//                 <motion.div
//                   className="relative w-full rounded-t-xl overflow-hidden pt-4 px-4"
//                   whileHover={{ scale: 1.2 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <Image
//                     src={workshop.outer_Img || "/workshop/main.png"}
//                     alt={workshop.name}
//                     width={400}
//                     height={300}
//                     className="object-cover aspect-video w-full h-full rounded-t-2xl"
//                   />
//                 </motion.div>
//                 <div className="p-6">
//                   <CardTitle className="text-white">{workshop.name}</CardTitle>
//                   <div className="flex gap-2 mt-2">
//                     <span className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded">
//                       {workshop.dept}
//                     </span>
//                   </div>
//                   <CardDescription className="text-zinc-400 mt-2">
//                     {workshop.short_desc}
//                   </CardDescription>
//                 </div>
//               </CardHeader>
//               <CardFooter className="flex justify-end">
//                 <Button
//                   className="group items-center pt-2 pb-2"
//                   onClick={() => {
//                     router.push(`/workshops/${workshop.workshopid}`);
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

// export default WorkshopGrid;

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

// Mobile Workshop Card Component
const MobileWorkshopCard = ({ workshop, index, router }) => {
  return (
    <motion.div
      key={workshop._id}
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
              src={workshop.outer_Img || "/workshop/main.png"}
              alt={workshop.name}
              width={300}
              height={200}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent" />
            <div className="absolute bottom-3 left-3">
              <span className="text-xs bg-zinc-800/90 text-zinc-300 px-2 py-1 rounded-full">
                {workshop.dept}
              </span>
            </div>
          </div>
        </CardHeader>
        <div className="p-4 flex-grow">
          <CardTitle className="text-white text-lg mb-2">
            {workshop.name}
          </CardTitle>
          <CardDescription className="text-zinc-400 line-clamp-2 text-sm">
            {workshop.short_desc}
          </CardDescription>
        </div>
        <CardFooter className="flex justify-end p-3 pt-0">
          <Button
            size="sm"
            className="group items-center"
            onClick={() => {
              router.push(`/workshops/${workshop.workshopid}`);
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

// Desktop Workshop Card Component
const DesktopWorkshopCard = ({ workshop, index, router }) => {
  return (
    <motion.div
      key={workshop._id}
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
                src={workshop.outer_Img || "/workshop/main.png"}
                alt={workshop.name}
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
              <CardTitle className="text-white">{workshop.name}</CardTitle>
              <div className="flex gap-2 mt-2">
                <span className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded">
                  {workshop.dept}
                </span>
              </div>
              <CardDescription className="text-zinc-400 mt-2">
                {workshop.short_desc}
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
                router.push(`/workshops/${workshop.workshopid}`);
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

const WorkshopGrid = ({
  workshops: propWorkshops,
  isModalView = false,
  groupId,
}) => {
  const [workshops, setWorkshops] = useState([]);
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

  // Effect to handle body scroll lock
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
    if (propWorkshops) {
      setWorkshops(propWorkshops.data || []);
      setLoading(false);
      return;
    }

    const fetchWorkshops = async () => {
      try {
        const response = await fetch(`/api/workshop/getGroup/${groupId}`, {
          method: "GET",
          // headers: {
          //   "x-api-key": process.env.API_KEY, // Read from env
          // },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch workshops");
        }
        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          setWorkshops(result.data);
        } else {
          throw new Error("Invalid data format received from API");
        }
      } catch (err) {
        setError(err.message);
        setWorkshops([]);
      } finally {
        setLoading(false);
      }
    };

    if (groupId) {
      fetchWorkshops();
    }
  }, [propWorkshops, groupId]);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center px-4 py-16 bg-gradient-to-br from-neutral-800 to-neutral-900 text-white text-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mb-4"></div>
          <p>Loading workshops...</p>
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

  const workshopsToDisplay = Array.isArray(workshops) ? workshops : [];
  const filteredWorkshops = workshopsToDisplay;

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
            Browse Workshops
          </h3>
          <div className="overflow-x-auto snap-x snap-mandatory flex gap-2 pb-4 px-2">
            {filteredWorkshops.map((workshop, index) => (
              <div
                className="min-w-[250px] max-w-[250px] snap-start"
                key={workshop._id}
              >
                <MobileWorkshopCard
                  workshop={workshop}
                  index={index}
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
      {!isModalView && (
        <motion.h2
          className="text-4xl font-bold text-center text-white mb-12"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Workshops
        </motion.h2>
      )}
      <div
        className={`grid ${getGridClass(
          filteredWorkshops.length
        )} gap-4 md:gap-8`}
      >
        {filteredWorkshops.map((workshop, index) => (
          <DesktopWorkshopCard
            key={workshop._id}
            workshop={workshop}
            index={index}
            router={router}
          />
        ))}
      </div>
    </section>
  );
};

export default WorkshopGrid;
