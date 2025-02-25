// "use client";

// import Navbar from "@/components/Navbar";
// import { BentoGridHome } from "@/components/WorkshopBento";
// import WorkshopGrid from "@/components/WorkshopGrid";
// import WorkshopGroups from "@/components/WorkshopGroups";
// import { motion } from "framer-motion";
// import { useEffect, useState, useLayoutEffect } from "react";

// const Workshops = () => {
//   const [shouldAnimate, setShouldAnimate] = useState(false);
//   const [isAnimating, setIsAnimating] = useState(true);

//   // Handle scroll to top immediately on mount
//   useLayoutEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   // Ensure scroll position is maintained at top during hydration
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       // Force scroll to top
//       window.scrollTo(0, 0);

//       // Add event listener for page visibility changes
//       const handleVisibilityChange = () => {
//         if (document.visibilityState === "visible") {
//           window.scrollTo(0, 0);
//         }
//       };

//       document.addEventListener("visibilitychange", handleVisibilityChange);

//       // Cleanup
//       return () => {
//         document.removeEventListener(
//           "visibilitychange",
//           handleVisibilityChange
//         );
//       };
//     }
//   }, []);

//   useEffect(() => {
//     // Disable scrolling during animation
//     if (isAnimating) {
//       document.body.style.overflow = "hidden";
//     }

//     const lastAnimationWorkshopTime = localStorage.getItem(
//       "lastAnimationWorkshopTime"
//     );
//     const currentTime = new Date().getTime();

//     if (
//       !lastAnimationWorkshopTime ||
//       currentTime - parseInt(lastAnimationWorkshopTime) > 0 * 60 * 1000
//     ) {
//       setShouldAnimate(true);
//       localStorage.setItem("lastAnimationWorkshopTime", currentTime.toString());

//       // Enable scrolling after animation completes
//       const timer = setTimeout(() => {
//         document.body.style.overflow = "auto";
//         setIsAnimating(false);
//       }, 5000);

//       return () => {
//         clearTimeout(timer);
//         document.body.style.overflow = "auto";
//       };
//     } else {
//       setShouldAnimate(false);
//       setIsAnimating(false);
//       document.body.style.overflow = "auto";
//     }
//   }, []);

//   return (
//     <div className="bg-black min-h-screen flex flex-col">
//       {shouldAnimate ? (
//         <motion.div
//           initial={{ opacity: 0, y: -200 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{
//             duration: 1,
//             ease: "easeOut",
//             delay: 4,
//           }}
//         >
//           <Navbar />
//         </motion.div>
//       ) : (
//         <Navbar />
//       )}
//       <div className="h-[calc(100vh-4rem)] overflow-hidden">
//         <BentoGridHome shouldAnimate={shouldAnimate} />
//       </div>
//       <div className="">
//         <WorkshopGroups />
//       </div>
//     </div>
//   );
// };

// export default Workshops;

"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamically import components to prevent SSR issues
const BentoGridHome = dynamic(() => import("@/components/WorkshopBento"), {
  ssr: false,
});
const WorkshopGroups = dynamic(() => import("@/components/WorkshopGroups"), {
  ssr: false,
});

const Workshops = () => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);

      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          window.scrollTo(0, 0);
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
      };
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.style.overflow = isAnimating ? "hidden" : "auto";

      const lastAnimationWorkshopTime = localStorage.getItem(
        "lastAnimationWorkshopTime"
      );
      const currentTime = new Date().getTime();

      if (
        !lastAnimationWorkshopTime ||
        currentTime - parseInt(lastAnimationWorkshopTime) > 0
      ) {
        setShouldAnimate(true);
        localStorage.setItem(
          "lastAnimationWorkshopTime",
          currentTime.toString()
        );

        const timer = setTimeout(() => {
          document.body.style.overflow = "auto";
          setIsAnimating(false);
        }, 5000);

        return () => {
          clearTimeout(timer);
          document.body.style.overflow = "auto";
        };
      } else {
        setShouldAnimate(false);
        setIsAnimating(false);
        document.body.style.overflow = "auto";
      }
    }
  }, [isAnimating]);

  return (
    <div className="bg-black min-h-screen flex flex-col">
      {shouldAnimate ? (
        <motion.div
          initial={{ opacity: 0, y: -200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: "easeOut",
            delay: 4,
          }}
        >
          <Navbar />
        </motion.div>
      ) : (
        <Navbar />
      )}
      <div className="h-[calc(100vh-4rem)] overflow-hidden">
        <BentoGridHome shouldAnimate={shouldAnimate} />
      </div>
      <div>
        <WorkshopGroups />
      </div>
    </div>
  );
};

export default Workshops;
