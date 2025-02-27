// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardFooter,
//   CardTitle,
// } from "@/components/ui/card";
// import { motion, AnimatePresence } from "framer-motion";
// import { ArrowRight } from "lucide-react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// const WorkshopGrid = ({
//   workshops: propWorkshops,
//   isModalView = false,
//   onClose,
// }) => {
//   const [workshops, setWorkshops] = useState([]);
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
//     if (propWorkshops) {
//       setWorkshops(propWorkshops.data || []);
//       setLoading(false);
//       return;
//     }

//     const fetchWorkshops = async () => {
//       try {
//         const response = await fetch("/api/workshop/getGroup/5");
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

//     fetchWorkshops();
//   }, [propWorkshops]);

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
//   const filteredWorkshops = workshopsToDisplay.filter(
//     (workshop) => workshop.open
//   );

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

//   const modalVariants = {
//     hidden: {
//       opacity: 0,
//       scale: 0.8,
//       transition: {
//         duration: 0.3,
//         ease: "easeInOut",
//       },
//     },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: {
//         duration: 0.3,
//         ease: "easeInOut",
//       },
//     },
//     exit: {
//       opacity: 0,
//       scale: 0.8,
//       transition: {
//         duration: 0.3,
//         ease: "easeInOut",
//       },
//     },
//   };

//   return (
//     <AnimatePresence mode="wait">
//       <motion.section
//         key={isModalView ? "modal" : "grid"}
//         initial="hidden"
//         animate="visible"
//         exit="exit"
//         variants={modalVariants}
//         className={`w-full ${
//           !isModalView
//             ? "px-4 py-16 bg-gradient-to-br from-neutral-800 to-neutral-900"
//             : ""
//         }`}
//       >
//         {!isModalView && (
//           <motion.h2
//             className="text-4xl font-bold text-center text-white mb-12"
//             initial={{ opacity: 0, y: 20 }}
//             transition={{ duration: 0.6 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//           >
//             Workshops
//           </motion.h2>
//         )}
//         <div
//           className={`grid ${getGridClass(
//             filteredWorkshops.length
//           )} gap-6 px-4`}
//         >
//           {filteredWorkshops.map((workshop, index) => (
//             <motion.div
//               key={workshop._id}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               viewport={{ once: true }}
//               whileHover={{ scale: 1 }}
//               layout
//               className="w-full"
//             >
//               <Card className="bg-zinc-900 border-zinc-800 h-full border-3 rounded-3xl hover:border-zinc-700 transition-all duration-300 overflow-hidden">
//                 <CardHeader className="p-0">
//                   <motion.div
//                     className="relative w-full rounded-t-xl overflow-hidden pt-4 px-4"
//                     whileHover={{ scale: 1.2 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <Image
//                       src={workshop.outer_Img || "/workshop/main.png"}
//                       alt={workshop.name}
//                       width={400}
//                       height={300}
//                       className="object-cover aspect-video w-full h-full rounded-t-2xl"
//                     />
//                   </motion.div>
//                   <div className="p-6">
//                     <CardTitle className="text-white">
//                       {workshop.name}
//                     </CardTitle>
//                     <div className="flex gap-2 mt-2">
//                       <span className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded">
//                         {workshop.dept}
//                       </span>
//                     </div>
//                     <CardDescription className="text-zinc-400 mt-2">
//                       {workshop.short_desc}
//                     </CardDescription>
//                   </div>
//                 </CardHeader>
//                 <CardFooter className="flex justify-end">
//                   <Button
//                     className="group items-center pt-2 pb-2"
//                     onClick={() => {
//                       if (isModalView && onClose) {
//                         onClose();
//                       } else {
//                         router.push(`/workshops/${workshop.workshopid}`);
//                       }
//                     }}
//                   >
//                     {isModalView ? "Close" : "Register"}
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
//         </div>
//       </motion.section>
//     </AnimatePresence>
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
import { useEffect, useState } from "react";

const WorkshopGrid = ({
  workshops: propWorkshops,
  isModalView = false,
  groupId,
}) => {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Effect to handle body scroll lock
  useEffect(() => {
    if (isModalView) {
      // Disable scrolling on body when modal is open
      document.body.style.overflow = "hidden";
      // Save the current scroll position
      const scrollPosition = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.width = "100%";

      return () => {
        // Re-enable scrolling when modal is closed
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        // Restore scroll position
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
        // Use the groupId prop instead of workshopId
        const response = await fetch(`/api/workshop/getGroup/${groupId}`);
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
      // Only fetch if groupId is provided
      fetchWorkshops();
    }
  }, [propWorkshops, groupId]);

  if (loading) {
    return (
      <div className="w-full px-4 py-16 bg-black text-white text-center">
        Loading workshops...
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

  const workshopsToDisplay = Array.isArray(workshops) ? workshops : [];
  // const filteredWorkshops = workshopsToDisplay.filter(
  //   (workshop) => workshop.open
  // );
  const filteredWorkshops = workshopsToDisplay;

  const getGridClass = (itemCount) => {
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
  };

  return (
    <section
      className={`w-full ${
        !isModalView
          ? "px-4 py-16 bg-gradient-to-br from-neutral-800 to-neutral-900"
          : ""
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
        className={`grid ${getGridClass(filteredWorkshops.length)} gap-6 px-4`}
      >
        {filteredWorkshops.map((workshop, index) => (
          <motion.div
            key={workshop._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1 }}
            className="w-full pt-4"
          >
            <Card className="bg-zinc-900 border-zinc-800 h-full border-3 rounded-3xl hover:border-zinc-700 transition-all duration-300 overflow-hidden">
              <CardHeader className="p-0">
                <motion.div
                  className="relative w-full rounded-t-xl overflow-hidden pt-4 px-4"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={workshop.outer_Img || "/workshop/main.png"}
                    alt={workshop.name}
                    width={400}
                    height={300}
                    className="object-cover aspect-video w-full h-full rounded-t-2xl"
                  />
                </motion.div>
                <div className="p-6">
                  <CardTitle className="text-white">{workshop.name}</CardTitle>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded">
                      {workshop.dept}
                    </span>
                  </div>
                  <CardDescription className="text-zinc-400 mt-2">
                    {workshop.short_desc}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardFooter className="flex justify-end">
                <Button
                  className="group items-center pt-2 pb-2"
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
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WorkshopGrid;
