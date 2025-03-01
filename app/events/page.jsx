// "use client";

// import Navbar from "@/components/Navbar";
// import { motion } from "framer-motion";
// import dynamic from "next/dynamic";
// import { useEffect, useState } from "react";

// // Lazy load components to prevent SSR issues
// const EventGroups = dynamic(() => import("../../components/EventGroups"), {
//   ssr: false,
// });
// const BentoGridEventsHome = dynamic(() => import("@/components/EventBento"), {
//   ssr: false,
// });

// const Events = () => {
//   const [shouldEventsAnimate, setShouldEventsAnimate] = useState(false);
//   const [isAnimating, setIsAnimating] = useState(true);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       window.scrollTo(0, 0);

//       const handleVisibilityChange = () => {
//         if (document.visibilityState === "visible") {
//           window.scrollTo(0, 0);
//         }
//       };

//       document.addEventListener("visibilitychange", handleVisibilityChange);

//       return () => {
//         document.removeEventListener(
//           "visibilitychange",
//           handleVisibilityChange
//         );
//       };
//     }
//   }, []);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       document.body.style.overflow = isAnimating ? "hidden" : "auto";

//       const lastAnimationEventTime = localStorage.getItem(
//         "lastAnimationEventTime"
//       );
//       const currentTime = new Date().getTime();

//       if (
//         !lastAnimationEventTime ||
//         currentTime - parseInt(lastAnimationEventTime) > 0
//       ) {
//         setShouldEventsAnimate(true);
//         localStorage.setItem("lastAnimationEventTime", currentTime.toString());

//         const timer = setTimeout(() => {
//           document.body.style.overflow = "auto";
//           setIsAnimating(false);
//         }, 5000);

//         return () => {
//           clearTimeout(timer);
//           document.body.style.overflow = "auto";
//         };
//       } else {
//         setShouldEventsAnimate(false);
//         setIsAnimating(false);
//         document.body.style.overflow = "auto";
//       }
//     }
//   }, [isAnimating]);

//   return (
//     <div className="bg-black min-h-screen flex flex-col">
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
//           <Navbar className="pb-0" />
//         </motion.div>
//       ) : (
//         <Navbar className="pb-0" />
//       )}
//       <div className="h-[calc(100vh-4rem)] overflow-hidden">
//         <BentoGridEventsHome shouldEventsAnimate={shouldEventsAnimate} />
//       </div>
//       <div>
//         <EventGroups />
//       </div>
//     </div>
//   );
// };

// export default Events;

"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Lazy load components to prevent SSR issues
const EventGroups = dynamic(() => import("../../components/EventGroups"), {
  ssr: false,
});

const BentoGridEventsHome = dynamic(() => import("@/components/EventBento"), {
  ssr: false,
});

const BentoGridEventsMobile = dynamic(
  () => import("@/components/EventBentoMobile"),
  {
    ssr: false,
  }
);

const Events = () => {
  const [shouldEventsAnimate, setShouldEventsAnimate] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screen size on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Standard breakpoint for mobile
    };
    // Initial check
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
      const lastAnimationEventTime = localStorage.getItem(
        "lastAnimationEventTime"
      );
      const currentTime = new Date().getTime();
      if (
        !lastAnimationEventTime ||
        currentTime - parseInt(lastAnimationEventTime) > 0
      ) {
        setShouldEventsAnimate(true);
        localStorage.setItem("lastAnimationEventTime", currentTime.toString());
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
    }
  }, [isAnimating]);

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
      <div
        className={`${
          isMobile ? "h-auto" : "h-[calc(100vh-4rem)]"
        } overflow-hidden`}
      >
        {isMobile ? (
          <BentoGridEventsMobile shouldEventsAnimate={shouldEventsAnimate} />
        ) : (
          <BentoGridEventsHome shouldEventsAnimate={shouldEventsAnimate} />
        )}
      </div>
      <div>
        <EventGroups />
      </div>
    </div>
  );
};

export default Events;
