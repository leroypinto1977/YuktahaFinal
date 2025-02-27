// "use client";

// import { Counter } from "./Counter";
// import { BackgroundGradientCard } from "./EventCard";
// import Footer from "./Footer";
// import Navbar from "./Navbar";
// import { ShootingStars } from "./acertinity_ui/shooting-stars";
// import { SparklesCore } from "./acertinity_ui/sparkles";
// import { StarsBackground } from "./acertinity_ui/stars-background";
// import { Progress } from "@heroui/progress";
// import {
//   motion,
//   AnimatePresence,
//   useScroll,
//   useTransform,
// } from "framer-motion";
// import { ChevronDown } from "lucide-react";
// import React, { useState, useEffect, useRef } from "react";

// const eventDate = new Date("2025-03-15T11:00:00").getTime();

// const CountdownTimer = () => {
//   const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

//   useEffect(() => {
//     const updateCountdown = () => {
//       const now = new Date().getTime();
//       const difference = eventDate - now;

//       if (difference > 0) {
//         const days = Math.floor(difference / (1000 * 60 * 60 * 24));
//         const hours = Math.floor(
//           (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//         );
//         const minutes = Math.floor(
//           (difference % (1000 * 60 * 60)) / (1000 * 60)
//         );
//         setTimeout(() => {
//           setTimeLeft({ days, hours, minutes });
//         }, 1000);
//         setTimeLeft({ days, hours, minutes });
//       } else {
//         setTimeLeft({ days: 0, hours: 0, minutes: 0 });
//       }
//     };

//     const timer = setInterval(updateCountdown, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 1 }}
//       className="flex flex-col xs:flex-col sm:flex-row md:flex-row justify-center text-center w-full text-white text-base xs:text-lg sm:text-xl md:text-2xl font-semibold m-2 md:m-4"
//     >
//       <motion.span
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 1 }}
//         className="p-2 xs:p-3 sm:p-4 md:p-8 font-sofia text-[#3B6790]"
//       >
//         <Counter className="" number={timeLeft.days} title="" />{" "}
//         {timeLeft.days == 1 ? "Day" : "Days"}
//       </motion.span>
//       <motion.span
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 1 }}
//         className="p-2 xs:p-3 sm:p-4 md:p-8 font-sofia text-[#3B6790]"
//       >
//         <Counter className="flex" number={timeLeft.hours} title="" />{" "}
//         {timeLeft.hours == 1 ? "Hour" : "Hours"}
//       </motion.span>
//       <motion.span
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 1 }}
//         className="p-2 xs:p-3 sm:p-4 md:p-8 font-sofia text-[#3B6790]"
//       >
//         <Counter className="flex" number={timeLeft.minutes} title="" />{" "}
//         {timeLeft.minutes == 1 ? "Minute" : "Minutes"}
//       </motion.span>
//     </motion.div>
//   );
// };

// const ScrollBasedSection = ({ children, className, delay = 0 }) => {
//   const sectionRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start end", "end start"],
//   });

//   const opacity = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [0, 1, 1, 0]);
//   const y = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [50, 0, 0, -50]);

//   return (
//     <motion.div
//       ref={sectionRef}
//       style={{ opacity, y }}
//       transition={{ delay }}
//       className={className}
//     >
//       {children}
//     </motion.div>
//   );
// };

// const FooterScrollBasedSection = ({ children, className, delay = 0 }) => {
//   const sectionRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start end", "end start"],
//   });

//   const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
//   const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [50, 0, 0, -50]);

//   return (
//     <motion.div
//       ref={sectionRef}
//       style={{ opacity, y }}
//       transition={{ delay }}
//       className={className}
//     >
//       {children}
//     </motion.div>
//   );
// };

// // Staggered cards container component
// const StaggeredCards = () => {
//   const containerRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start end", "end start"],
//   });

//   // Card data with src props
//   const cards = [
//     { src: undefined, delay: 0 },
//     { src: "/home/card2.webp", delay: 0.2 },
//     { src: undefined, delay: 0.4 },
//   ];

//   return (
//     <div
//       ref={containerRef}
//       className="py-5 xs:py-8 sm:py-10 md:py-20 px-2 xs:px-3 sm:px-4 md:px-20 flex flex-col md:flex-row justify-center items-center space-y-4 xs:space-y-6 sm:space-y-8 md:space-y-0"
//     >
//       {cards.map((card, index) => {
//         const cardOpacity = useTransform(
//           scrollYProgress,
//           [0, 0.1 + card.delay, 0.7 + card.delay, 1],
//           [0, 1, 1, 0]
//         );

//         const cardY = useTransform(
//           scrollYProgress,
//           [0, 0.1 + card.delay, 0.7 + card.delay, 1],
//           [100, 0, 0, -100]
//         );

//         return (
//           <motion.div
//             key={index}
//             style={{ opacity: cardOpacity, y: cardY }}
//             className="px-2 xs:px-3 sm:px-4 md:px-20 w-full md:w-auto"
//           >
//             <BackgroundGradientCard
//               src={card.src}
//               className="py-3 xs:py-4 sm:py-5 md:py-10"
//             />
//           </motion.div>
//         );
//       })}
//     </div>
//   );
// };

// const LoadingSequence = ({ children }) => {
//   const [loading, setLoading] = useState(true);
//   const [loadingProgress, setLoadingProgress] = useState(0);
//   const [loadingText, setLoadingText] = useState("initialising");
//   const [showContent, setShowContent] = useState(false);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setLoadingProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(timer);
//           setTimeout(() => {
//             setLoading(false);
//             setTimeout(() => setShowContent(true), 1000);
//           }, 500);
//           return 100;
//         }

//         if (prev < 25) setLoadingText("initialising");
//         else if (prev < 50) setLoadingText("opening");
//         else if (prev < 75) setLoadingText("loading");
//         else setLoadingText("starting");

//         return prev + 1;
//       });
//     }, 30);

//     return () => clearInterval(timer);
//   }, []);

//   const loadingScreen = (
//     <motion.div
//       initial={{ y: 0 }}
//       animate={{ y: loading ? 0 : "-100%" }}
//       transition={{ duration: 0.8, ease: "easeInOut" }}
//       className="fixed inset-0 bg-black z-50 flex items-center justify-center"
//     >
//       <div className="relative flex flex-col items-center">
//         <motion.div
//           className="w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48 md:w-80 md:h-80 lg:w-96 lg:h-96 border-gray-800"
//           animate={{ rotate: 360 }}
//           transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//         />
//         <motion.img
//           src="/logo/Yuktaha_Logo.PNG"
//           alt="Logo"
//           className="absolute w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48 md:w-80 md:h-80 lg:w-96 lg:h-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
//         />
//       </div>
//     </motion.div>
//   );

//   const mainContent = showContent && (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -20 }}
//         transition={{ delay: 0.5 }}
//         className="bg-black"
//       >
//         <motion.div
//           initial={{ opacity: 0, top: [-30] }}
//           animate={{ opacity: 1, top: 0 }}
//           transition={{ delay: 1, duration: 1 }}
//         >
//           <Navbar />
//         </motion.div>

//         <div className="relative w-full h-screen">
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ delay: 0.2 }}
//           >
//             <StarsBackground className="bg-black absolute inset-0" />
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ delay: 0.4 }}
//           >
//             <ShootingStars className="absolute inset-0" />
//           </motion.div>

//           <div className="flex items-center justify-center h-full px-2 xs:px-3 sm:px-4">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ delay: 1, duration: 1.5 }}
//               className="z-20"
//             >
//               <motion.h4
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{ delay: 1.2, duration: 1 }}
//                 className="text-center text-gray-600 z-20 font-sofia text-xs xs:text-sm sm:text-base"
//               >
//                 PSG iTech Presents
//               </motion.h4>
//               <motion.h2
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -500 }}
//                 transition={{ delay: 1, duration: 1.5 }}
//                 className="lg:text-5xl xs:text-4xl sm:text-4xl md:text-5xl text-center font-semibold font-sofia bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white z-20 m-2 xs:m-3 sm:m-4 md:m-7"
//               >
//                 Yuktaha 2025
//               </motion.h2>
//               <motion.h4
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{ delay: 1.2, duration: 1 }}
//                 className="text-center text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 z-20 font-sofia"
//               >
//                 Starts In
//               </motion.h4>
//               <CountdownTimer />
//             </motion.div>
//           </div>

//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ delay: 1, repeat: Infinity, duration: 1.5 }}
//             className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
//           >
//             <ChevronDown className="text-white w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-10 md:h-10" />
//           </motion.div>
//         </div>

//         <div className="bg-[#3B6790] w-full h-full py-8 xs:py-12 sm:py-16 md:py-32">
//           <ScrollBasedSection className="mb-10">
//             <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl text-left font-semibold font-sofia text-white px-4 xs:px-5 sm:px-6 md:pl-20">
//               About Us
//             </h2>
//           </ScrollBasedSection>

//           <ScrollBasedSection className="mt-4" delay={0.2}>
//             <p className="text-lg xs:text-xl sm:text-3xl md:text-5xl text-left max-w-7xl font-semibold font-sofia text-white pt-5 xs:pt-8 sm:pt-10 md:pt-20 px-4 xs:px-5 sm:px-6 md:pl-20">
//               YUKTAHA'25 is a{" "}
//               <span className="text-black">National Level Event</span> aims to
//               showcase technological and inventive skills from students across
//               the country, providing a platform for innovative minds to shine.
//             </p>
//           </ScrollBasedSection>
//         </div>

//         <div className="bg-black w-full h-full py-8 xs:py-12 sm:py-16 md:py-32">
//           <ScrollBasedSection className="h-full w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
//             <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold font-sofia text-center text-white relative z-20">
//               Event Lineup
//             </h1>
//             <div className="w-full md:w-[40rem] h-20 relative">
//               <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
//               <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
//               <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
//               <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

//               <SparklesCore
//                 background="transparent"
//                 minSize={0.4}
//                 maxSize={1}
//                 particleDensity={1200}
//                 className="w-full h-full"
//                 particleColor="#FFFFFF"
//               />

//               <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
//             </div>
//           </ScrollBasedSection>

//           {/* Replace the individual cards with the StaggeredCards component */}
//           <StaggeredCards />
//         </div>

//         <FooterScrollBasedSection>
//           <Footer />
//         </FooterScrollBasedSection>
//       </motion.div>
//     </AnimatePresence>
//   );

//   return (
//     <>
//       {loadingScreen}
//       {mainContent}
//     </>
//   );
// };

// export default LoadingSequence;

"use client";

import { Counter } from "./Counter";
import { BackgroundGradientCard } from "./EventCard";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { ShootingStars } from "./acertinity_ui/shooting-stars";
import { SparklesCore } from "./acertinity_ui/sparkles";
import { StarsBackground } from "./acertinity_ui/stars-background";
import { TextReveal } from "@/components/magicui/text-reveal";
import { Progress } from "@heroui/progress";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

const eventDate = new Date("2025-03-14T11:00:00").getTime();

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = eventDate - now;
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        setTimeout(() => {
          setTimeLeft({ days, hours, minutes });
        }, 1000);
        setTimeLeft({ days, hours, minutes });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
      }
    };
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="flex flex-col xs:flex-col sm:flex-row md:flex-row justify-center text-center w-full text-white text-base xs:text-lg sm:text-xl md:text-2xl font-semibold m-2 md:m-4"
    >
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="p-2 xs:p-3 sm:p-4 md:p-8 font-sofia text-[#3B6790]"
      >
        <Counter className="" number={timeLeft.days} title="" />{" "}
        {timeLeft.days == 1 ? "Day" : "Days"}
      </motion.span>
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="p-2 xs:p-3 sm:p-4 md:p-8 font-sofia text-[#3B6790]"
      >
        <Counter className="flex" number={timeLeft.hours} title="" />{" "}
        {timeLeft.hours == 1 ? "Hour" : "Hours"}
      </motion.span>
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="p-2 xs:p-3 sm:p-4 md:p-8 font-sofia text-[#3B6790]"
      >
        <Counter className="flex" number={timeLeft.minutes} title="" />{" "}
        {timeLeft.minutes == 1 ? "Minute" : "Minutes"}
      </motion.span>
    </motion.div>
  );
};

const ScrollBasedSection = ({ children, className, delay = 0 }) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [50, 0, 0, -50]);
  return (
    <motion.div
      ref={sectionRef}
      style={{ opacity, y }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Modified scroll-locked section component
const StickyScrollSection = ({ children, height, className, id }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={containerRef}
      id={id}
      className={`relative ${className}`}
      style={{ height: height }}
    >
      <div className="sticky top-0 left-0 right-0 h-screen overflow-hidden">
        {children}
      </div>
    </div>
  );
};

// Staggered cards component with sequential animation
const StaggeredCards = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Card data with src props
  const cards = [
    { src: undefined, title: "Card 1" },
    { src: "/home/card2.webp", title: "Card 2" },
    { src: undefined, title: "Card 3" },
  ];

  return (
    <div
      ref={containerRef}
      className="h-[300vh] relative" // Taller container to allow for more scroll distance
    >
      <div className="sticky top-0 w-full h-screen flex items-center justify-center bg-black">
        <div className="w-full h-full flex flex-col justify-center">
          {/* Event Lineup Title */}
          <ScrollBasedSection>
            <div className="flex justify-center mb-0">
              <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold font-sofia text-center text-white relative z-20">
                Event Lineup
              </h1>
            </div>

            {/* Sparkles below the title */}
            <div className="w-full md:w-[40rem] h-20 relative mx-auto mb-8">
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={1200}
                className="w-full h-full"
                particleColor="#FFFFFF"
              />
              <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
            </div>
          </ScrollBasedSection>

          {/* Cards with more spacing */}
          <div className="flex flex-col md:flex-row justify-center items-center px-2 xs:px-3 sm:px-4 md:px-20 space-y-8 md:space-y-0 md:space-x-10">
            {cards.map((card, index) => {
              // Calculate scroll progress thresholds for each card
              const startThreshold = 0.1 + index * 0.2;
              const endThreshold = startThreshold + 0.15;

              // Create opacity and y transforms specific to each card's scroll position
              const cardOpacity = useTransform(
                scrollYProgress,
                [0, startThreshold, endThreshold, 0.9, 1],
                [0, 0, 1, 1, 0]
              );

              const cardY = useTransform(
                scrollYProgress,
                [0, startThreshold, endThreshold, 0.9, 1],
                [100, 100, 0, 0, -100]
              );

              return (
                <motion.div
                  key={index}
                  style={{ opacity: cardOpacity, y: cardY }}
                  className="px-2 xs:px-3 sm:px-4 md:px-6 w-full md:w-auto"
                >
                  <BackgroundGradientCard
                    src={card.src}
                    className="py-3 xs:py-4 sm:py-5 md:py-10"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const AnimatedFooter = () => {
  const footerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const footerOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const footerY = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, 0]);

  return (
    <div ref={footerRef} className="h-[40vh] relative">
      {" "}
      <div className="sticky bottom-0 w-full">
        <motion.div
          style={{ opacity: footerOpacity, y: footerY }}
          className="w-full"
        >
          <Footer />
        </motion.div>
      </div>
    </div>
  );
};

const LoadingSequence = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("initialising");
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setLoading(false);
            setTimeout(() => setShowContent(true), 1000);
          }, 500);
          return 100;
        }
        if (prev < 25) setLoadingText("initialising");
        else if (prev < 50) setLoadingText("opening");
        else if (prev < 75) setLoadingText("loading");
        else setLoadingText("starting");
        return prev + 1;
      });
    }, 30);
    return () => clearInterval(timer);
  }, []);

  const loadingScreen = (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: loading ? 0 : "-100%" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
    >
      <div className="relative flex flex-col items-center">
        <motion.div
          className="w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48 md:w-80 md:h-80 lg:w-96 lg:h-96 border-gray-800"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.img
          src="/logo/Yuktaha_Logo.PNG"
          alt="Logo"
          className="absolute w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48 md:w-80 md:h-80 lg:w-96 lg:h-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
        />
      </div>
    </motion.div>
  );

  const mainContent = showContent && (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ delay: 0.5 }}
        className="bg-black"
      >
        <motion.div
          initial={{ opacity: 0, top: [-30] }}
          animate={{ opacity: 1, top: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <Navbar />
        </motion.div>
        <div className="relative w-full h-screen">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2 }}
          >
            <StarsBackground className="bg-black absolute inset-0" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.4 }}
          >
            <ShootingStars className="absolute inset-0" />
          </motion.div>
          <div className="flex items-center justify-center h-full px-2 xs:px-3 sm:px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 1, duration: 1.5 }}
              className="z-20"
            >
              <motion.h4
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="text-center text-gray-600 z-20 font-sofia text-xs xs:text-sm sm:text-base"
              >
                PSG iTech Presents
              </motion.h4>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -500 }}
                transition={{ delay: 1, duration: 1.5 }}
                className="lg:text-5xl xs:text-4xl sm:text-4xl md:text-5xl text-center font-semibold font-sofia bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white z-20 m-2 xs:m-3 sm:m-4 md:m-7"
              >
                Yuktaha 2025
              </motion.h2>
              <motion.h4
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="text-center text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 z-20 font-sofia"
              >
                Starts In
              </motion.h4>
              <CountdownTimer />
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 1, repeat: Infinity, duration: 1.5 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
          >
            <ChevronDown className="text-white w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-10 md:h-10" />
          </motion.div>
        </div>
        <div className="bg-[#3B6790] w-full h-full py-8 xs:py-12 sm:py-16 md:py-32">
          <ScrollBasedSection className="mb-10">
            <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl text-left font-semibold font-sofia text-black px-4 xs:px-5 sm:px-6 md:pl-20">
              About Us
            </h2>
          </ScrollBasedSection>
          <ScrollBasedSection className="mt-4" delay={0.2}>
            <p className="text-lg xs:text-xl sm:text-3xl md:text-5xl text-left max-w-7xl font-semibold font-sofia text-white pt-5 xs:pt-8 sm:pt-10 md:pt-20 px-4 xs:px-5 sm:px-6 md:pl-20">
              YUKTAHA'25 is a{" "}
              <span className="text-black">National Level Event</span> aims to
              showcase technological and inventive skills from students across
              the country, providing a platform for innovative minds to shine.
            </p>
          </ScrollBasedSection>
        </div>

        {/* Event lineup with sticky scroll animation */}
        <StaggeredCards />

        {/* Footer with animated entry */}
        <AnimatedFooter />
      </motion.div>
    </AnimatePresence>
  );

  return (
    <>
      {loadingScreen}
      {mainContent}
    </>
  );
};

export default LoadingSequence;
