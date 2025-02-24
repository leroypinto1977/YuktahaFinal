// "use client";

// import { BentoGridEventsHome } from "@/components/EventBento";
// import Navbar from "@/components/Navbar";
// import { motion } from "framer-motion";
// import React, { useEffect, useState } from "react";

// const Events = () => {
//   const [shouldEventsAnimate, setShouldEventsAnimate] = useState(false);

//   useEffect(() => {
//     const lastAnimationEventTime = localStorage.getItem(
//       "lastAnimationEventTime"
//     );
//     const currentTime = new Date().getTime();

//     // Check if the animation was played more than 5 minutes ago
//     if (
//       !lastAnimationEventTime ||
//       currentTime - parseInt(lastAnimationEventTime) > 3 * 60 * 1000
//     ) {
//       setShouldEventsAnimate(true);
//       localStorage.setItem("lastAnimationEventTime", currentTime.toString());
//     } else {
//       setShouldEventsAnimate(false);
//     }
//   }, []);

//   return (
//     <div className="bg-black w-full h-screen flex flex-col">
//       {shouldEventsAnimate ? (
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
//       <div className="flex-1 overflow-hidden">
//         <BentoGridEventsHome shouldEventsAnimate={shouldEventsAnimate} />
//       </div>
//     </div>
//   );
// };

// export default Events;

// "use client";

// import { BentoGridEventsHome } from "@/components/EventBento";
// import Navbar from "@/components/Navbar";
// import { motion } from "framer-motion";
// import React, { useEffect, useState } from "react";

// const Events = () => {
//   const [shouldEventsAnimate, setShouldEventsAnimate] = useState(false);

//   useEffect(() => {
//     const lastAnimationEventTime = localStorage.getItem(
//       "lastAnimationEventTime"
//     );
//     const currentTime = new Date().getTime();

//     // Check if the animation was played more than 3 minutes ago
//     if (
//       !lastAnimationEventTime ||
//       currentTime - parseInt(lastAnimationEventTime) > 0 * 60 * 1000
//     ) {
//       setShouldEventsAnimate(true);
//       localStorage.setItem("lastAnimationEventTime", currentTime.toString());
//     } else {
//       setShouldEventsAnimate(false);
//     }
//   }, []);

//   return (
//     <div className="bg-black w-full h-screen flex flex-col">
//       {shouldEventsAnimate ? (
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
//       <div className="flex-1 overflow-hidden">
//         <BentoGridEventsHome shouldEventsAnimate={shouldEventsAnimate} />
//       </div>
//     </div>
//   );
// };

// export default Events;

"use client";

import EventGroups from "../../components/EventGroups";
import { BentoGridEventsHome } from "@/components/EventBento";
import EventGrid from "@/components/EventGrid";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { useEffect, useState, useLayoutEffect } from "react";

const Events = () => {
  const [shouldEventsAnimate, setShouldEventsAnimate] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);

  // Handle scroll to top immediately on mount
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Ensure scroll position is maintained at top during hydration
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Force scroll to top
      window.scrollTo(0, 0);

      // Add event listener for page visibility changes
      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          window.scrollTo(0, 0);
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);

      // Cleanup
      return () => {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
      };
    }
  }, []);

  useEffect(() => {
    // Disable scrolling during animation
    if (isAnimating) {
      document.body.style.overflow = "hidden";
    }

    const lastAnimationEventTime = localStorage.getItem(
      "lastAnimationEventTime"
    );
    const currentTime = new Date().getTime();

    if (
      !lastAnimationEventTime ||
      currentTime - parseInt(lastAnimationEventTime) > 0 * 60 * 1000
    ) {
      setShouldEventsAnimate(true);
      localStorage.setItem("lastAnimationEventTime", currentTime.toString());

      // Enable scrolling after animation completes
      const timer = setTimeout(() => {
        document.body.style.overflow = "auto";
        setIsAnimating(false);
      }, 5000);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "auto";
      };
    } else {
      setShouldEventsAnimate(false);
      setIsAnimating(false);
      document.body.style.overflow = "auto";
    }
  }, []);

  return (
    <div className="bg-black min-h-screen flex flex-col">
      {shouldEventsAnimate ? (
        <motion.div
          initial={{ opacity: 0, y: -200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: "easeOut",
            delay: 4,
          }}
        >
          <Navbar className="pb-0" />
        </motion.div>
      ) : (
        <Navbar className="pb-0" />
      )}
      <div className="h-[calc(100vh-4rem)] overflow-hidden">
        <BentoGridEventsHome shouldEventsAnimate={shouldEventsAnimate} />
      </div>
      <div className="">
        <EventGroups />
      </div>
    </div>
  );
};

export default Events;
