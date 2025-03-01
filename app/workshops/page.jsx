"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamic imports for both desktop and mobile components
const BentoGridHome = dynamic(() => import("@/components/WorkshopBento"), {
  ssr: false,
});

const BentoGridMobile = dynamic(
  () => import("@/components/WorkshopBentoMobile"),
  {
    ssr: false,
  }
);

const WorkshopGroups = dynamic(() => import("@/components/WorkshopGroups"), {
  ssr: false,
});

const Workshops = () => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
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

  // Handle page visibility and scroll to top
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

  // Handle animation state
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

      <div
        className={`${
          isMobile ? "h-auto" : "h-[calc(100vh-4rem)]"
        } overflow-hidden`}
      >
        {isMobile ? (
          <BentoGridMobile shouldAnimate={shouldAnimate} />
        ) : (
          <BentoGridHome shouldAnimate={shouldAnimate} />
        )}
      </div>

      <div>
        <WorkshopGroups />
      </div>
    </div>
  );
};

export default Workshops;
