// "use client";

// import { Counter } from "./Counter";
// import { BackgroundGradientCard } from "./EventCard";
// import Footer from "./Footer";
// import Navbar from "./Navbar";
// import { ShootingStars } from "./acertinity_ui/shooting-stars";
// import { SparklesCore } from "./acertinity_ui/sparkles";
// import { StarsBackground } from "./acertinity_ui/stars-background";
// import { TextReveal } from "@/components/magicui/text-reveal";
// import { Progress } from "@heroui/progress";
// import {
//   motion,
//   AnimatePresence,
//   useScroll,
//   useTransform,
// } from "framer-motion";
// import { ChevronDown } from "lucide-react";
// import React, { useState, useEffect, useRef } from "react";

// const eventDate = new Date("2025-03-14T11:00:00").getTime();

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

// // Modified scroll-locked section component
// const StickyScrollSection = ({ children, height, className, id }) => {
//   const containerRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"],
//   });

//   return (
//     <div
//       ref={containerRef}
//       id={id}
//       className={`relative ${className}`}
//       style={{ height: height }}
//     >
//       <div className="sticky top-0 left-0 right-0 h-screen overflow-hidden">
//         {children}
//       </div>
//     </div>
//   );
// };

// // Staggered cards component with sequential animation
// const StaggeredCards = () => {
//   const containerRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end start"],
//   });

//   // Card data with src props
//   const cards = [
//     { src: undefined, title: "Card 1" },
//     { src: "/home/card2.webp", title: "Card 2" },
//     { src: undefined, title: "Card 3" },
//   ];

//   return (
//     <div
//       ref={containerRef}
//       className="h-[300vh] relative" // Taller container to allow for more scroll distance
//     >
//       <div className="sticky top-0 w-full h-screen flex items-center justify-center bg-black">
//         <div className="w-full h-full flex flex-col justify-center">
//           {/* Event Lineup Title */}
//           <ScrollBasedSection>
//             <div className="flex justify-center mb-0">
//               <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold font-sofia text-center text-white relative z-20">
//                 Event Lineup
//               </h1>
//             </div>

//             {/* Sparkles below the title */}
//             <div className="w-full md:w-[40rem] h-20 relative mx-auto mb-8">
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

//           {/* Cards with more spacing */}
//           <div className="flex flex-col md:flex-row justify-center items-center px-2 xs:px-3 sm:px-4 md:px-20 space-y-8 md:space-y-0 md:space-x-10">
//             {cards.map((card, index) => {
//               // Calculate scroll progress thresholds for each card
//               const startThreshold = 0.1 + index * 0.2;
//               const endThreshold = startThreshold + 0.15;

//               // Create opacity and y transforms specific to each card's scroll position
//               const cardOpacity = useTransform(
//                 scrollYProgress,
//                 [0, startThreshold, endThreshold, 0.9, 1],
//                 [0, 0, 1, 1, 0]
//               );

//               const cardY = useTransform(
//                 scrollYProgress,
//                 [0, startThreshold, endThreshold, 0.9, 1],
//                 [100, 100, 0, 0, -100]
//               );

//               return (
//                 <motion.div
//                   key={index}
//                   style={{ opacity: cardOpacity, y: cardY }}
//                   className="px-2 xs:px-3 sm:px-4 md:px-6 w-full md:w-auto"
//                 >
//                   <BackgroundGradientCard
//                     src={card.src}
//                     className="py-3 xs:py-4 sm:py-5 md:py-10"
//                   />
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const AnimatedFooter = () => {
//   const footerRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: footerRef,
//     offset: ["start end", "end end"],
//   });

//   const footerOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
//   const footerY = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, 0]);

//   return (
//     <div ref={footerRef} className="h-[40vh] relative">
//       {" "}
//       <div className="sticky bottom-0 w-full">
//         <motion.div
//           style={{ opacity: footerOpacity, y: footerY }}
//           className="w-full"
//         >
//           <Footer />
//         </motion.div>
//       </div>
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
//             <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl text-left font-semibold font-sofia text-black px-4 xs:px-5 sm:px-6 md:pl-20">
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

//         {/* Event lineup with sticky scroll animation */}
//         <StaggeredCards />

//         {/* Footer with animated entry */}
//         <AnimatedFooter />
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

// "use client";

// import { Counter } from "./Counter";
// import { BackgroundGradientCard } from "./EventCard";
// import Footer from "./Footer";
// import Navbar from "./Navbar";
// import { ShootingStars } from "./acertinity_ui/shooting-stars";
// import { SparklesCore } from "./acertinity_ui/sparkles";
// import { StarsBackground } from "./acertinity_ui/stars-background";
// import { TextReveal } from "@/components/magicui/text-reveal";
// import { Progress } from "@heroui/progress";
// import {
//   motion,
//   AnimatePresence,
//   useScroll,
//   useTransform,
// } from "framer-motion";
// import { ChevronDown } from "lucide-react";
// import React, { useState, useEffect, useRef } from "react";

// const eventDate = new Date("2025-03-14T11:00:00").getTime();

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
//       className="flex flex-row justify-center text-center w-full text-white text-base xs:text-lg sm:text-xl md:text-2xl font-semibold m-2 md:m-4 gap-6"
//     >
//       <motion.span
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 1 }}
//         className="p-2 font-sofia text-[#3B6790]"
//       >
//         <Counter className="" number={timeLeft.days} title="" />{" "}
//         {timeLeft.days == 1 ? "Day" : "Days"}
//       </motion.span>
//       <motion.span
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 1 }}
//         className="p-2 font-sofia text-[#3B6790]"
//       >
//         <Counter className="flex" number={timeLeft.hours} title="" />{" "}
//         {timeLeft.hours == 1 ? "Hour" : "Hours"}
//       </motion.span>
//       <motion.span
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 1 }}
//         className="p-2 font-sofia text-[#3B6790]"
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

// // Modified scroll-locked section component
// const StickyScrollSection = ({ children, height, className, id }) => {
//   const containerRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"],
//   });
//   return (
//     <div
//       ref={containerRef}
//       id={id}
//       className={`relative ${className}`}
//       style={{ height: height }}
//     >
//       <div className="sticky top-0 left-0 right-0 h-screen overflow-hidden">
//         {children}
//       </div>
//     </div>
//   );
// };

// // Staggered cards component with sequential animation
// const StaggeredCards = () => {
//   const containerRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end start"],
//   });
//   // Card data with src props
//   const cards = [
//     { src: undefined, title: "Card 1" },
//     { src: "/home/card2.webp", title: "Card 2" },
//     { src: undefined, title: "Card 3" },
//   ];
//   return (
//     <div
//       ref={containerRef}
//       className="h-[300vh] relative" // Taller container to allow for more scroll distance
//     >
//       <div className="sticky top-0 w-full h-screen flex items-center justify-center bg-black">
//         <div className="w-full h-full flex flex-col justify-center">
//           {/* Event Lineup Title */}
//           <ScrollBasedSection>
//             <div className="flex justify-center mb-0">
//               <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold font-sofia text-center text-white relative z-20">
//                 Event Lineup
//               </h1>
//             </div>
//             {/* Sparkles below the title */}
//             <div className="w-full md:w-[40rem] h-20 relative mx-auto mb-8">
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
//           {/* Cards with more spacing */}
//           <div className="flex flex-col md:flex-row justify-center items-center px-2 xs:px-3 sm:px-4 md:px-20 space-y-8 md:space-y-0 md:space-x-10">
//             {cards.map((card, index) => {
//               // Calculate scroll progress thresholds for each card
//               const startThreshold = 0.1 + index * 0.2;
//               const endThreshold = startThreshold + 0.15;
//               // Create opacity and y transforms specific to each card's scroll position
//               const cardOpacity = useTransform(
//                 scrollYProgress,
//                 [0, startThreshold, endThreshold, 0.9, 1],
//                 [0, 0, 1, 1, 0]
//               );
//               const cardY = useTransform(
//                 scrollYProgress,
//                 [0, startThreshold, endThreshold, 0.9, 1],
//                 [100, 100, 0, 0, -100]
//               );
//               return (
//                 <motion.div
//                   key={index}
//                   style={{ opacity: cardOpacity, y: cardY }}
//                   className="px-2 xs:px-3 sm:px-4 md:px-6 w-full md:w-auto"
//                 >
//                   <BackgroundGradientCard
//                     src={card.src}
//                     className="py-3 xs:py-4 sm:py-5 md:py-10"
//                   />
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const AnimatedFooter = () => {
//   const footerRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: footerRef,
//     offset: ["start end", "end end"],
//   });
//   const footerOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
//   const footerY = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, 0]);
//   return (
//     <div ref={footerRef} className="h-[40vh] relative">
//       {" "}
//       <div className="sticky bottom-0 w-full">
//         <motion.div
//           style={{ opacity: footerOpacity, y: footerY }}
//           className="w-full"
//         >
//           <Footer />
//         </motion.div>
//       </div>
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

//   // Display loading progress indicator
//   const loadingScreen = (
//     <motion.div
//       initial={{ y: 0 }}
//       animate={{ y: loading ? 0 : "-100%" }}
//       transition={{ duration: 0.8, ease: "easeInOut" }}
//       className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center px-4"
//     >
//       <div className="relative flex flex-col items-center w-full max-w-md">
//         <motion.div
//           className="w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 border-gray-800"
//           animate={{ rotate: 360 }}
//           transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//         />
//         <motion.img
//           src="/logo/Yuktaha_Logo.PNG"
//           alt="Logo"
//           className="absolute w-28 h-28 xs:w-36 xs:h-36 sm:w-44 sm:h-44 md:w-60 md:h-60 lg:w-72 lg:h-72 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
//         />

//         {/* Add loading progress bar */}
//         <div className="w-full mt-16 max-w-xs">
//           <div className="bg-gray-800 rounded-full h-2 w-full">
//             <div
//               className="bg-blue-500 h-2 rounded-full transition-all duration-300"
//               style={{ width: `${loadingProgress}%` }}
//             ></div>
//           </div>
//           <p className="text-gray-400 text-sm mt-2 text-center">
//             {loadingText} {loadingProgress}%
//           </p>
//         </div>
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
//           className="w-full"
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
//           <div className="flex items-center justify-center h-full pb-32">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ delay: 1, duration: 1.5 }}
//               className="z-20 w-full max-w-md text-center"
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
//                 className="text-3xl xs:text-4xl sm:text-4xl md:text-5xl text-center font-semibold font-sofia bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white z-20 m-2 xs:m-3 sm:m-4 md:m-7"
//               >
//                 Yuktaha 2025
//               </motion.h2>
//               <motion.h4
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{ delay: 1.2, duration: 1 }}
//                 className="text-center text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 z-20 font-sofia mb-4"
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
//             <ChevronDown className="text-white w-6 h-6 md:w-10 md:h-10" />
//           </motion.div>
//         </div>
//         <div className="bg-[#3B6790] w-full h-full py-8 xs:py-12 sm:py-16 md:py-32">
//           <ScrollBasedSection className="mb-6 xs:mb-8 sm:mb-10">
//             <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl text-left font-semibold font-sofia text-black px-4 xs:px-5 sm:px-6 md:pl-20">
//               About Us
//             </h2>
//           </ScrollBasedSection>
//           <ScrollBasedSection className="mt-2 xs:mt-3 sm:mt-4" delay={0.2}>
//             <p className="text-base xs:text-lg sm:text-2xl md:text-4xl text-left max-w-7xl font-semibold font-sofia text-white pt-4 xs:pt-6 sm:pt-8 md:pt-16 px-4 xs:px-5 sm:px-6 md:pl-20">
//               YUKTAHA'25 is a{" "}
//               <span className="text-black">National Level Event</span> aims to
//               showcase technological and inventive skills from students across
//               the country, providing a platform for innovative minds to shine.
//             </p>
//           </ScrollBasedSection>
//         </div>
//         {/* Event lineup with sticky scroll animation */}
//         <StaggeredCards />
//         {/* Footer with animated entry */}
//         <AnimatedFooter />
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

// "use client";

// import { Counter } from "./Counter";
// import { BackgroundGradientCard } from "./EventCard";
// import Footer from "./Footer";
// import Navbar from "./Navbar";
// import { ShootingStars } from "./acertinity_ui/shooting-stars";
// import { SparklesCore } from "./acertinity_ui/sparkles";
// import { StarsBackground } from "./acertinity_ui/stars-background";
// import { TextReveal } from "@/components/magicui/text-reveal";
// import { Progress } from "@heroui/progress";
// import {
//   motion,
//   AnimatePresence,
//   useScroll,
//   useTransform,
// } from "framer-motion";
// import { ChevronDown } from "lucide-react";
// import React, { useState, useEffect, useRef } from "react";

// const eventDate = new Date("2025-03-14T11:00:00").getTime();

// // Device detection hook
// const useIsMobile = () => {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     // Check if window is available (client-side)
//     if (typeof window !== "undefined") {
//       const checkMobile = () => {
//         setIsMobile(window.innerWidth < 768); // Consider devices under 768px as mobile
//       };

//       // Initial check
//       checkMobile();

//       // Listen for resize events
//       window.addEventListener("resize", checkMobile);

//       // Cleanup listener
//       return () => window.removeEventListener("resize", checkMobile);
//     }
//   }, []);

//   return isMobile;
// };

// const CountdownTimer = () => {
//   const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
//   const isMobile = useIsMobile();

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

//   // Simpler animation for mobile
//   if (isMobile) {
//     return (
//       <div className="flex flex-row justify-center text-center w-full text-white text-base xs:text-lg sm:text-xl md:text-2xl font-semibold m-2 md:m-4 gap-6">
//         <span className="p-2 font-sofia text-[#3B6790]">
//           <Counter className="" number={timeLeft.days} title="" />{" "}
//           {timeLeft.days == 1 ? "Day" : "Days"}
//         </span>
//         <span className="p-2 font-sofia text-[#3B6790]">
//           <Counter className="flex" number={timeLeft.hours} title="" />{" "}
//           {timeLeft.hours == 1 ? "Hour" : "Hours"}
//         </span>
//         <span className="p-2 font-sofia text-[#3B6790]">
//           <Counter className="flex" number={timeLeft.minutes} title="" />{" "}
//           {timeLeft.minutes == 1 ? "Minute" : "Minutes"}
//         </span>
//       </div>
//     );
//   }

//   // Full animation for desktop
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 1 }}
//       className="flex flex-row justify-center text-center w-full text-white text-base xs:text-lg sm:text-xl md:text-2xl font-semibold m-2 md:m-4 gap-6"
//     >
//       <motion.span
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 1 }}
//         className="p-2 font-sofia text-[#3B6790]"
//       >
//         <Counter className="" number={timeLeft.days} title="" />{" "}
//         {timeLeft.days == 1 ? "Day" : "Days"}
//       </motion.span>
//       <motion.span
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 1 }}
//         className="p-2 font-sofia text-[#3B6790]"
//       >
//         <Counter className="flex" number={timeLeft.hours} title="" />{" "}
//         {timeLeft.hours == 1 ? "Hour" : "Hours"}
//       </motion.span>
//       <motion.span
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 1 }}
//         className="p-2 font-sofia text-[#3B6790]"
//       >
//         <Counter className="flex" number={timeLeft.minutes} title="" />{" "}
//         {timeLeft.minutes == 1 ? "Minute" : "Minutes"}
//       </motion.span>
//     </motion.div>
//   );
// };

// const ScrollBasedSection = ({ children, className, delay = 0 }) => {
//   const sectionRef = useRef(null);
//   const isMobile = useIsMobile();
//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start end", "end start"],
//   });

//   // For desktop: full scroll-based animations
//   const opacity = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [0, 1, 1, 0]);
//   const y = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [50, 0, 0, -50]);

//   // For mobile: simpler fade-in animation
//   if (isMobile) {
//     return (
//       <motion.div
//         ref={sectionRef}
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ delay, duration: 0.5 }}
//         className={className}
//       >
//         {children}
//       </motion.div>
//     );
//   }

//   // Desktop animation
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

// // Modified scroll-locked section component with mobile optimization
// const StickyScrollSection = ({ children, height, className, id }) => {
//   const containerRef = useRef(null);
//   const isMobile = useIsMobile();

//   // For mobile: reduced height to improve performance
//   const mobileHeight = isMobile ? `${parseInt(height) * 0.6}px` : height;

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"],
//   });

//   return (
//     <div
//       ref={containerRef}
//       id={id}
//       className={`relative ${className}`}
//       style={{ height: mobileHeight }}
//     >
//       <div className="sticky top-0 left-0 right-0 h-screen overflow-hidden">
//         {children}
//       </div>
//     </div>
//   );
// };

// // Staggered cards component with conditional animation
// const StaggeredCards = () => {
//   const containerRef = useRef(null);
//   const isMobile = useIsMobile();
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end start"],
//   });

//   // Card data with src props
//   const cards = [
//     { src: undefined, title: "Card 1" },
//     { src: "/home/card2.webp", title: "Card 2" },
//     { src: undefined, title: "Card 3" },
//   ];

//   // Mobile version with simpler animation
//   if (isMobile) {
//     return (
//       <div
//         ref={containerRef}
//         className="h-[200vh] relative" // Reduced height for mobile
//       >
//         <div className="sticky top-0 w-full h-screen flex items-center justify-center bg-black">
//           <div className="w-full h-full flex flex-col justify-center">
//             {/* Event Lineup Title - simplified for mobile */}
//             <div className="flex justify-center mb-0">
//               <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold font-sofia text-center text-white relative z-20">
//                 Event Lineup
//               </h1>
//             </div>

//             {/* Simplified sparkles for mobile */}
//             <div className="w-full md:w-[40rem] h-20 relative mx-auto mb-8">
//               <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
//               <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
//             </div>

//             {/* Cards with simpler animation for mobile */}
//             <div className="flex flex-col justify-center items-center px-2 xs:px-3 sm:px-4 space-y-8">
//               {cards.map((card, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: index * 0.2, duration: 0.5 }}
//                   className="px-2 xs:px-3 sm:px-4 w-full"
//                 >
//                   <BackgroundGradientCard
//                     src={card.src}
//                     className="py-3 xs:py-4 sm:py-5"
//                   />
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Desktop version with full animation
//   return (
//     <div
//       ref={containerRef}
//       className="h-[300vh] relative" // Taller container for desktop
//     >
//       <div className="sticky top-0 w-full h-screen flex items-center justify-center bg-black">
//         <div className="w-full h-full flex flex-col justify-center">
//           {/* Event Lineup Title */}
//           <ScrollBasedSection>
//             <div className="flex justify-center mb-0">
//               <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold font-sofia text-center text-white relative z-20">
//                 Event Lineup
//               </h1>
//             </div>
//             {/* Sparkles below the title */}
//             <div className="w-full md:w-[40rem] h-20 relative mx-auto mb-8">
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
//           {/* Cards with more spacing */}
//           <div className="flex flex-col md:flex-row justify-center items-center px-2 xs:px-3 sm:px-4 md:px-20 space-y-8 md:space-y-0 md:space-x-10">
//             {cards.map((card, index) => {
//               // Calculate scroll progress thresholds for each card
//               const startThreshold = 0.1 + index * 0.2;
//               const endThreshold = startThreshold + 0.15;
//               // Create opacity and y transforms specific to each card's scroll position
//               const cardOpacity = useTransform(
//                 scrollYProgress,
//                 [0, startThreshold, endThreshold, 0.9, 1],
//                 [0, 0, 1, 1, 0]
//               );
//               const cardY = useTransform(
//                 scrollYProgress,
//                 [0, startThreshold, endThreshold, 0.9, 1],
//                 [100, 100, 0, 0, -100]
//               );
//               return (
//                 <motion.div
//                   key={index}
//                   style={{ opacity: cardOpacity, y: cardY }}
//                   className="px-2 xs:px-3 sm:px-4 md:px-6 w-full md:w-auto"
//                 >
//                   <BackgroundGradientCard
//                     src={card.src}
//                     className="py-3 xs:py-4 sm:py-5 md:py-10"
//                   />
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const AnimatedFooter = () => {
//   const footerRef = useRef(null);
//   const isMobile = useIsMobile();
//   const { scrollYProgress } = useScroll({
//     target: footerRef,
//     offset: ["start end", "end end"],
//   });

//   const footerOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
//   const footerY = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, 0]);

//   // Simplified footer animation for mobile
//   if (isMobile) {
//     return (
//       <div ref={footerRef} className="h-[30vh] relative">
//         <div className="sticky bottom-0 w-full">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//             className="w-full"
//           >
//             <Footer />
//           </motion.div>
//         </div>
//       </div>
//     );
//   }

//   // Full animation for desktop
//   return (
//     <div ref={footerRef} className="h-[40vh] relative">
//       <div className="sticky bottom-0 w-full">
//         <motion.div
//           style={{ opacity: footerOpacity, y: footerY }}
//           className="w-full"
//         >
//           <Footer />
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// const LoadingSequence = ({ children }) => {
//   const [loading, setLoading] = useState(true);
//   const [loadingProgress, setLoadingProgress] = useState(0);
//   const [loadingText, setLoadingText] = useState("initialising");
//   const [showContent, setShowContent] = useState(false);
//   const isMobile = useIsMobile();

//   useEffect(() => {
//     // Faster loading for mobile
//     const increment = isMobile ? 2 : 1;
//     const interval = isMobile ? 20 : 30;

//     const timer = setInterval(() => {
//       setLoadingProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(timer);
//           setTimeout(
//             () => {
//               setLoading(false);
//               setTimeout(() => setShowContent(true), isMobile ? 500 : 1000);
//             },
//             isMobile ? 300 : 500
//           );
//           return 100;
//         }
//         if (prev < 25) setLoadingText("initialising");
//         else if (prev < 50) setLoadingText("opening");
//         else if (prev < 75) setLoadingText("loading");
//         else setLoadingText("starting");
//         return prev + increment;
//       });
//     }, interval);
//     return () => clearInterval(timer);
//   }, [isMobile]);

//   // Display loading progress indicator
//   const loadingScreen = (
//     <motion.div
//       initial={{ y: 0 }}
//       animate={{ y: loading ? 0 : "-100%" }}
//       transition={{ duration: 0.8, ease: "easeInOut" }}
//       className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center px-4"
//     >
//       <div className="relative flex flex-col items-center w-full max-w-md">
//         <motion.div
//           className="w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 border-gray-800"
//           animate={{ rotate: 360 }}
//           transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//         />
//         <motion.img
//           src="/logo/Yuktaha_Logo.PNG"
//           alt="Logo"
//           className="absolute w-28 h-28 xs:w-36 xs:h-36 sm:w-44 sm:h-44 md:w-60 md:h-60 lg:w-72 lg:h-72 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
//         />

//         {/* Add loading progress bar */}
//         <div className="w-full mt-16 max-w-xs">
//           <div className="bg-gray-800 rounded-full h-2 w-full">
//             <div
//               className="bg-blue-500 h-2 rounded-full transition-all duration-300"
//               style={{ width: `${loadingProgress}%` }}
//             ></div>
//           </div>
//           <p className="text-gray-400 text-sm mt-2 text-center">
//             {loadingText} {loadingProgress}%
//           </p>
//         </div>
//       </div>
//     </motion.div>
//   );

//   // Main content with conditional rendering based on device type
//   const mainContent = showContent && (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -20 }}
//         transition={{ delay: isMobile ? 0.3 : 0.5 }}
//         className="bg-black"
//       >
//         <motion.div
//           initial={{ opacity: 0, top: [-30] }}
//           animate={{ opacity: 1, top: 0 }}
//           transition={{
//             delay: isMobile ? 0.5 : 1,
//             duration: isMobile ? 0.5 : 1,
//           }}
//           className="w-full"
//         >
//           <Navbar />
//         </motion.div>
//         <div className="relative w-full h-screen">
//           {/* Conditionally render complex animations */}
//           {!isMobile && (
//             <>
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ delay: 0.2 }}
//               >
//                 <StarsBackground className="bg-black absolute inset-0" />
//               </motion.div>
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ delay: 0.4 }}
//               >
//                 <ShootingStars className="absolute inset-0" />
//               </motion.div>
//             </>
//           )}

//           {/* Simplified background for mobile */}
//           {isMobile && (
//             <div className="bg-black absolute inset-0">
//               {/* Simplified static stars background */}
//               <div
//                 className="absolute inset-0 opacity-70"
//                 style={{
//                   backgroundImage:
//                     "radial-gradient(white 1px, transparent 1px)",
//                   backgroundSize: "50px 50px",
//                 }}
//               />
//             </div>
//           )}

//           <div className="flex items-center justify-center h-full pb-32">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{
//                 delay: isMobile ? 0.5 : 1,
//                 duration: isMobile ? 0.8 : 1.5,
//               }}
//               className="z-20 w-full max-w-md text-center"
//             >
//               <motion.h4
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{
//                   delay: isMobile ? 0.6 : 1.2,
//                   duration: isMobile ? 0.5 : 1,
//                 }}
//                 className="text-center text-gray-600 z-20 font-sofia text-xs xs:text-sm sm:text-base"
//               >
//                 PSG iTech Presents
//               </motion.h4>
//               <motion.h2
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -500 }}
//                 transition={{
//                   delay: isMobile ? 0.5 : 1,
//                   duration: isMobile ? 0.8 : 1.5,
//                 }}
//                 className="text-3xl xs:text-4xl sm:text-4xl md:text-5xl text-center font-semibold font-sofia bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white z-20 m-2 xs:m-3 sm:m-4 md:m-7"
//               >
//                 Yuktaha 2025
//               </motion.h2>
//               <motion.h4
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{
//                   delay: isMobile ? 0.6 : 1.2,
//                   duration: isMobile ? 0.5 : 1,
//                 }}
//                 className="text-center text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 z-20 font-sofia mb-4"
//               >
//                 Starts In
//               </motion.h4>
//               <CountdownTimer />
//             </motion.div>
//           </div>

//           {/* Simplified scroll indicator for mobile */}
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{
//               delay: 1,
//               repeat: Infinity,
//               duration: isMobile ? 1 : 1.5,
//             }}
//             className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
//           >
//             <ChevronDown className="text-white w-6 h-6 md:w-10 md:h-10" />
//           </motion.div>
//         </div>

//         {/* About Us section */}
//         <div className="bg-[#3B6790] w-full h-full py-8 xs:py-12 sm:py-16 md:py-32">
//           <ScrollBasedSection className="mb-6 xs:mb-8 sm:mb-10">
//             <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl text-left font-semibold font-sofia text-black px-4 xs:px-5 sm:px-6 md:pl-20">
//               About Us
//             </h2>
//           </ScrollBasedSection>
//           <ScrollBasedSection className="mt-2 xs:mt-3 sm:mt-4" delay={0.2}>
//             <p className="text-base xs:text-lg sm:text-2xl md:text-4xl text-left max-w-7xl font-semibold font-sofia text-white pt-4 xs:pt-6 sm:pt-8 md:pt-16 px-4 xs:px-5 sm:px-6 md:pl-20">
//               YUKTAHA'25 is a{" "}
//               <span className="text-black">National Level Event</span> aims to
//               showcase technological and inventive skills from students across
//               the country, providing a platform for innovative minds to shine.
//             </p>
//           </ScrollBasedSection>
//         </div>

//         {/* Event lineup with sticky scroll animation */}
//         <StaggeredCards />

//         {/* Footer with animated entry */}
//         <AnimatedFooter />
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

// "use client";

// import { Counter } from "./Counter";
// import { BackgroundGradientCard } from "./EventCard";
// import Footer from "./Footer";
// import Navbar from "./Navbar";
// import { ShootingStars } from "./acertinity_ui/shooting-stars";
// import { SparklesCore } from "./acertinity_ui/sparkles";
// import { StarsBackground } from "./acertinity_ui/stars-background";
// import { TextReveal } from "@/components/magicui/text-reveal";
// import { Progress } from "@heroui/progress";
// import {
//   motion,
//   AnimatePresence,
//   useScroll,
//   useTransform,
// } from "framer-motion";
// import { ChevronDown } from "lucide-react";
// import React, { useState, useEffect, useRef } from "react";

// const eventDate = new Date("2025-03-14T11:00:00").getTime();

// // Device detection hook
// const useIsMobile = () => {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     // Check if window is available (client-side)
//     if (typeof window !== "undefined") {
//       const checkMobile = () => {
//         setIsMobile(window.innerWidth < 768); // Consider devices under 768px as mobile
//       };

//       // Initial check
//       checkMobile();

//       // Listen for resize events
//       window.addEventListener("resize", checkMobile);

//       // Cleanup listener
//       return () => window.removeEventListener("resize", checkMobile);
//     }
//   }, []);

//   return isMobile;
// };

// const CountdownTimer = () => {
//   const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
//   const isMobile = useIsMobile();

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

//   // Render conditionally after all hooks are called
//   if (isMobile) {
//     return (
//       <div className="flex flex-row justify-center text-center w-full text-white text-base xs:text-lg sm:text-xl md:text-2xl font-semibold m-2 md:m-4 gap-6">
//         <span className="p-2 font-sofia text-[#3B6790]">
//           <Counter className="" number={timeLeft.days} title="" />{" "}
//           {timeLeft.days == 1 ? "Day" : "Days"}
//         </span>
//         <span className="p-2 font-sofia text-[#3B6790]">
//           <Counter className="flex" number={timeLeft.hours} title="" />{" "}
//           {timeLeft.hours == 1 ? "Hour" : "Hours"}
//         </span>
//         <span className="p-2 font-sofia text-[#3B6790]">
//           <Counter className="flex" number={timeLeft.minutes} title="" />{" "}
//           {timeLeft.minutes == 1 ? "Minute" : "Minutes"}
//         </span>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-row justify-center text-center w-full text-white text-base xs:text-lg sm:text-xl md:text-2xl font-semibold m-2 md:m-4 gap-6">
//       <span className="p-2 font-sofia text-[#3B6790]">
//         <Counter className="" number={timeLeft.days} title="" />{" "}
//         {timeLeft.days == 1 ? "Day" : "Days"}
//       </span>
//       <span className="p-2 font-sofia text-[#3B6790]">
//         <Counter className="flex" number={timeLeft.hours} title="" />{" "}
//         {timeLeft.hours == 1 ? "Hour" : "Hours"}
//       </span>
//       <span className="p-2 font-sofia text-[#3B6790]">
//         <Counter className="flex" number={timeLeft.minutes} title="" />{" "}
//         {timeLeft.minutes == 1 ? "Minute" : "Minutes"}
//       </span>
//     </div>
//   );
// };

// const ScrollBasedSection = ({ children, className, delay = 0 }) => {
//   const sectionRef = useRef(null);
//   const isMobile = useIsMobile();
//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start end", "end start"],
//   });

//   // Always create these transforms
//   const opacity = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [0, 1, 1, 0]);
//   const y = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [50, 0, 0, -50]);

//   // Conditional rendering after all hooks
//   if (isMobile) {
//     return (
//       <motion.div
//         ref={sectionRef}
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ delay, duration: 0.5 }}
//         className={className}
//       >
//         {children}
//       </motion.div>
//     );
//   }

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

// const StickyScrollSection = ({ children, height, className, id }) => {
//   const containerRef = useRef(null);
//   const isMobile = useIsMobile();
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"],
//   });

//   // Calculate height based on mobile status
//   const adjustedHeight = isMobile ? `${parseInt(height) * 0.6}px` : height;

//   return (
//     <div
//       ref={containerRef}
//       id={id}
//       className={`relative ${className}`}
//       style={{ height: adjustedHeight }}
//     >
//       <div className="sticky top-0 left-0 right-0 h-screen overflow-hidden">
//         {children}
//       </div>
//     </div>
//   );
// };

// const StaggeredCards = () => {
//   const containerRef = useRef(null);
//   const isMobile = useIsMobile();
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end start"],
//   });

//   // Card data with src props
//   const cards = [
//     { src: undefined, title: "Card 1" },
//     { src: "/home/card2.webp", title: "Card 2" },
//     { src: undefined, title: "Card 3" },
//   ];

//   // IMPORTANT: We need to call ALL hooks unconditionally
//   // Create transforms for all cards regardless of mobile/desktop
//   const cardAnimations = cards.map((_, index) => {
//     const startThreshold = 0.1 + index * 0.2;
//     const endThreshold = startThreshold + 0.15;

//     // Always create these transforms, even for mobile
//     return {
//       opacity: useTransform(
//         scrollYProgress,
//         [0, startThreshold, endThreshold, 0.9, 1],
//         [0, 0, 1, 1, 0]
//       ),
//       y: useTransform(
//         scrollYProgress,
//         [0, startThreshold, endThreshold, 0.9, 1],
//         [100, 100, 0, 0, -100]
//       ),
//     };
//   });

//   // Now the conditional rendering is safe because all hooks were called
//   if (isMobile) {
//     return (
//       <div ref={containerRef} className="h-[200vh] relative">
//         <div className="sticky top-0 w-full h-screen flex items-center justify-center bg-black">
//           <div className="w-full h-full flex flex-col justify-center">
//             {/* Event Lineup Title - simplified for mobile */}
//             <div className="flex justify-center mb-0">
//               <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold font-sofia text-center text-white relative z-20">
//                 Event Lineup
//               </h1>
//             </div>
//             {/* Simplified sparkles for mobile */}
//             <div className="w-full md:w-[40rem] h-20 relative mx-auto mb-8">
//               <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
//               <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
//             </div>
//             {/* Cards with simpler animation for mobile */}
//             <div className="flex flex-col justify-center items-center px-2 xs:px-3 sm:px-4 space-y-8">
//               {cards.map((card, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: index * 0.2, duration: 0.5 }}
//                   className="px-2 xs:px-3 sm:px-4 w-full"
//                 >
//                   <BackgroundGradientCard
//                     src={card.src}
//                     className="py-3 xs:py-4 sm:py-5"
//                   />
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Desktop version with full animation
//   return (
//     <div ref={containerRef} className="h-[300vh] relative">
//       <div className="sticky top-0 w-full h-screen flex items-center justify-center bg-black">
//         <div className="w-full h-full flex flex-col justify-center">
//           {/* Event Lineup Title */}
//           <ScrollBasedSection>
//             <div className="flex justify-center mb-0">
//               <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold font-sofia text-center text-white relative z-20">
//                 Event Lineup
//               </h1>
//             </div>
//             {/* Sparkles below the title */}
//             <div className="w-full md:w-[40rem] h-20 relative mx-auto mb-8">
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
//           {/* Cards with more spacing */}
//           <div className="flex flex-col md:flex-row justify-center items-center px-2 xs:px-3 sm:px-4 md:px-20 space-y-8 md:space-y-0 md:space-x-10">
//             {cards.map((card, index) => (
//               <motion.div
//                 key={index}
//                 style={{
//                   opacity: cardAnimations[index].opacity,
//                   y: cardAnimations[index].y,
//                 }}
//                 className="px-2 xs:px-3 sm:px-4 md:px-6 w-full md:w-auto"
//               >
//                 <BackgroundGradientCard
//                   src={card.src}
//                   className="py-3 xs:py-4 sm:py-5 md:py-10"
//                 />
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const AnimatedFooter = () => {
//   const footerRef = useRef(null);
//   const isMobile = useIsMobile();
//   const { scrollYProgress } = useScroll({
//     target: footerRef,
//     offset: ["start end", "end end"],
//   });

//   // Always call these transforms
//   const footerOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
//   const footerY = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, 0]);

//   // Then do conditional rendering
//   if (isMobile) {
//     return (
//       <div ref={footerRef} className="h-[30vh] relative">
//         <div className="sticky bottom-0 w-full">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//             className="w-full"
//           >
//             <Footer />
//           </motion.div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div ref={footerRef} className="h-[40vh] relative">
//       <div className="sticky bottom-0 w-full">
//         <motion.div
//           style={{ opacity: footerOpacity, y: footerY }}
//           className="w-full"
//         >
//           <Footer />
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// const LoadingSequence = ({ children }) => {
//   const [loading, setLoading] = useState(true);
//   const [loadingProgress, setLoadingProgress] = useState(0);
//   const [loadingText, setLoadingText] = useState("initialising");
//   const [showContent, setShowContent] = useState(false);
//   const isMobile = useIsMobile();

//   useEffect(() => {
//     // Faster loading for mobile
//     const increment = isMobile ? 2 : 1;
//     const interval = isMobile ? 20 : 30;
//     const timer = setInterval(() => {
//       setLoadingProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(timer);
//           setTimeout(
//             () => {
//               setLoading(false);
//               setTimeout(() => setShowContent(true), isMobile ? 500 : 1000);
//             },
//             isMobile ? 300 : 500
//           );
//           return 100;
//         }
//         if (prev < 25) setLoadingText("initialising");
//         else if (prev < 50) setLoadingText("opening");
//         else if (prev < 75) setLoadingText("loading");
//         else setLoadingText("starting");
//         return prev + increment;
//       });
//     }, interval);
//     return () => clearInterval(timer);
//   }, [isMobile]);

//   // All JSX defined after all hooks are called
//   return (
//     <>
//       <motion.div
//         initial={{ y: 0 }}
//         animate={{ y: loading ? 0 : "-100%" }}
//         transition={{ duration: 0.8, ease: "easeInOut" }}
//         className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center px-4"
//       >
//         {/* Loading screen content */}
//         <div className="relative flex flex-col items-center w-full max-w-md">
//           <motion.div
//             className="w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 border-gray-800"
//             animate={{ rotate: 360 }}
//             transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//           />
//           <motion.img
//             src="/logo/Yuktaha_Logo.PNG"
//             alt="Logo"
//             className="absolute w-28 h-28 xs:w-36 xs:h-36 sm:w-44 sm:h-44 md:w-60 md:h-60 lg:w-72 lg:h-72 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
//           />
//           {/* Add loading progress bar */}
//           <div className="w-full mt-16 max-w-xs">
//             <div className="bg-gray-800 rounded-full h-2 w-full">
//               <div
//                 className="bg-blue-500 h-2 rounded-full transition-all duration-300"
//                 style={{ width: `${loadingProgress}%` }}
//               ></div>
//             </div>
//             <p className="text-gray-400 text-sm mt-2 text-center">
//               {loadingText} {loadingProgress}%
//             </p>
//           </div>
//         </div>
//       </motion.div>

//       {showContent && (
//         <AnimatePresence>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ delay: isMobile ? 0.3 : 0.5 }}
//             className="bg-black"
//           >
//             <motion.div
//               initial={{ opacity: 0, top: [-30] }}
//               animate={{ opacity: 1, top: 0 }}
//               transition={{
//                 delay: isMobile ? 0.5 : 1,
//                 duration: isMobile ? 0.5 : 1,
//               }}
//               className="w-full"
//             >
//               <Navbar />
//             </motion.div>
//             <div className="relative w-full h-screen">
//               {/* Conditionally render complex animations */}
//               {!isMobile && (
//                 <>
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     transition={{ delay: 0.2 }}
//                   >
//                     <StarsBackground className="bg-black absolute inset-0" />
//                   </motion.div>
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     transition={{ delay: 0.4 }}
//                   >
//                     <ShootingStars className="absolute inset-0" />
//                   </motion.div>
//                 </>
//               )}

//               {/* Simplified background for mobile */}
//               {isMobile && (
//                 <div className="bg-black absolute inset-0">
//                   {/* Simplified static stars background */}
//                   <div
//                     className="absolute inset-0 opacity-70"
//                     style={{
//                       backgroundImage:
//                         "radial-gradient(white 1px, transparent 1px)",
//                       backgroundSize: "50px 50px",
//                     }}
//                   />
//                 </div>
//               )}

//               <div className="flex items-center justify-center h-full pb-32">
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{
//                     delay: isMobile ? 0.5 : 1,
//                     duration: isMobile ? 0.8 : 1.5,
//                   }}
//                   className="z-20 w-full max-w-md text-center"
//                 >
//                   <motion.h4
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -20 }}
//                     transition={{
//                       delay: isMobile ? 0.6 : 1.2,
//                       duration: isMobile ? 0.5 : 1,
//                     }}
//                     className="text-center text-gray-600 z-20 font-sofia text-xs xs:text-sm sm:text-base"
//                   >
//                     PSG iTech Presents
//                   </motion.h4>
//                   <motion.h2
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -500 }}
//                     transition={{
//                       delay: isMobile ? 0.5 : 1,
//                       duration: isMobile ? 0.8 : 1.5,
//                     }}
//                     className="text-3xl xs:text-4xl sm:text-4xl md:text-5xl text-center font-semibold font-sofia bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white z-20 m-2 xs:m-3 sm:m-4 md:m-7"
//                   >
//                     Yuktaha 2025
//                   </motion.h2>
//                   <motion.h4
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -20 }}
//                     transition={{
//                       delay: isMobile ? 0.6 : 1.2,
//                       duration: isMobile ? 0.5 : 1,
//                     }}
//                     className="text-center text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 z-20 font-sofia mb-4"
//                   >
//                     Starts In
//                   </motion.h4>
//                   <CountdownTimer />
//                 </motion.div>
//               </div>

//               {/* Simplified scroll indicator for mobile */}
//               <motion.div
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{
//                   delay: 1,
//                   repeat: Infinity,
//                   duration: isMobile ? 1 : 1.5,
//                 }}
//                 className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
//               >
//                 <ChevronDown className="text-white w-6 h-6 md:w-10 md:h-10" />
//               </motion.div>
//             </div>

//             {/* About Us section */}
//             <div className="bg-[#3B6790] w-full h-full py-8 xs:py-12 sm:py-16 md:py-32">
//               <ScrollBasedSection className="mb-6 xs:mb-8 sm:mb-10">
//                 <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl text-left font-semibold font-sofia text-black px-4 xs:px-5 sm:px-6 md:pl-20">
//                   About Us
//                 </h2>
//               </ScrollBasedSection>
//               <ScrollBasedSection className="mt-2 xs:mt-3 sm:mt-4" delay={0.2}>
//                 <p className="text-base xs:text-lg sm:text-2xl md:text-4xl text-left max-w-7xl font-semibold font-sofia text-white pt-4 xs:pt-6 sm:pt-8 md:pt-16 px-4 xs:px-5 sm:px-6 md:pl-20">
//                   YUKTAHA'25 is a{" "}
//                   <span className="text-black">National Level Event</span> aims
//                   to showcase technological and inventive skills from students
//                   across the country, providing a platform for innovative minds
//                   to shine.
//                 </p>
//               </ScrollBasedSection>
//             </div>

//             {/* Event lineup with sticky scroll animation */}
//             <StaggeredCards />

//             {/* Footer with animated entry */}
//             <AnimatedFooter />
//           </motion.div>
//         </AnimatePresence>
//       )}
//     </>
//   );
// };

// export default LoadingSequence;

// "use client";

// import { Counter } from "./Counter";
// import { BackgroundGradientCard } from "./EventCard";
// import Footer from "./Footer";
// import Navbar from "./Navbar";
// import { ShootingStars } from "./acertinity_ui/shooting-stars";
// import { SparklesCore } from "./acertinity_ui/sparkles";
// import { StarsBackground } from "./acertinity_ui/stars-background";
// import { TextReveal } from "@/components/magicui/text-reveal";
// import { Progress } from "@heroui/progress";
// import {
//   motion,
//   AnimatePresence,
//   useScroll,
//   useTransform,
// } from "framer-motion";
// import { ChevronDown } from "lucide-react";
// import React, { useState, useEffect, useRef } from "react";

// const eventDate = new Date("2025-03-14T11:00:00").getTime();

// // Device detection hook
// const useIsMobile = () => {
//   const [isMobile, setIsMobile] = useState(false);
//   useEffect(() => {
//     // Check if window is available (client-side)
//     if (typeof window !== "undefined") {
//       const checkMobile = () => {
//         setIsMobile(window.innerWidth < 768); // Consider devices under 768px as mobile
//       };
//       // Initial check
//       checkMobile();
//       // Listen for resize events
//       window.addEventListener("resize", checkMobile);
//       // Cleanup listener
//       return () => window.removeEventListener("resize", checkMobile);
//     }
//   }, []);
//   return isMobile;
// };

// const CountdownTimer = () => {
//   const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
//   const isMobile = useIsMobile();

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
//     <div className="flex flex-row justify-center text-center w-full text-white text-base xs:text-lg sm:text-xl md:text-2xl font-semibold m-2 md:m-4 gap-6">
//       <span className="p-2 font-sofia text-[#3B6790]">
//         <Counter className="" number={timeLeft.days} title="" />{" "}
//         {timeLeft.days == 1 ? "Day" : "Days"}
//       </span>
//       <span className="p-2 font-sofia text-[#3B6790]">
//         <Counter className="flex" number={timeLeft.hours} title="" />{" "}
//         {timeLeft.hours == 1 ? "Hour" : "Hours"}
//       </span>
//       <span className="p-2 font-sofia text-[#3B6790]">
//         <Counter className="flex" number={timeLeft.minutes} title="" />{" "}
//         {timeLeft.minutes == 1 ? "Minute" : "Minutes"}
//       </span>
//     </div>
//   );
// };

// // Modified to work consistently for both mobile and desktop
// const ScrollBasedSection = ({ children, className, delay = 0 }) => {
//   const sectionRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start end", "end start"],
//   });

//   const opacity = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [0, 1, 1, 0]);
//   const y = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [50, 0, 0, -50]);

//   const isMobile = useIsMobile();

//   // For mobile: use staggered animation with scrollYProgress
//   if (isMobile) {
//     return (
//       <motion.div
//         ref={sectionRef}
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ delay, duration: 0.5 }}
//         className={className}
//       >
//         {children}
//       </motion.div>
//     );
//   }

//   // For desktop: use the scroll-based animation as before
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

// const StickyScrollSection = ({ children, height, className, id }) => {
//   const containerRef = useRef(null);
//   const isMobile = useIsMobile();

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"],
//   });

//   // Calculate height based on mobile status
//   const adjustedHeight = isMobile ? `${parseInt(height) * 0.6}px` : height;

//   return (
//     <div
//       ref={containerRef}
//       id={id}
//       className={`relative ${className}`}
//       style={{ height: adjustedHeight }}
//     >
//       <div className="sticky top-0 left-0 right-0 h-screen overflow-hidden">
//         {children}
//       </div>
//     </div>
//   );
// };

// // Modified EventLineupSection with improved mobile support
// const EventLineupSection = () => {
//   const containerRef = useRef(null);
//   const isMobile = useIsMobile();

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end start"],
//   });

//   // Card data with src props
//   const cards = [
//     { src: undefined, title: "Card 1" },
//     { src: "/home/card2.webp", title: "Card 2" },
//     { src: undefined, title: "Card 3" },
//   ];

//   return (
//     <div
//       ref={containerRef}
//       className="h-auto py-16 md:py-32 relative"
//       id="event-lineup"
//     >
//       {/* Shooting stars background for entire section */}
//       <div className="absolute inset-0 z-0 pointer-events-none">
//         <StarsBackground className="absolute inset-0" />
//         <ShootingStars className="absolute inset-0" />
//       </div>

//       <div className="w-full bg-black bg-opacity-90 relative z-10">
//         <div className="w-full h-full flex flex-col justify-center">
//           {/* Event Lineup Title */}
//           <ScrollBasedSection>
//             <div className="flex justify-center mb-6">
//               <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold font-sofia text-center text-white relative z-20">
//                 Event Lineup
//               </h1>
//             </div>
//             {/* Sparkles below the title */}
//             <div className="w-full md:w-[40rem] h-20 relative mx-auto mb-8">
//               <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
//               <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
//               <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
//               <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
//               <SparklesCore
//                 background="transparent"
//                 minSize={0.4}
//                 maxSize={1}
//                 particleDensity={isMobile ? 600 : 1200}
//                 className="w-full h-full"
//                 particleColor="#FFFFFF"
//               />
//               <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
//             </div>
//           </ScrollBasedSection>

//           {/* Cards with staggered animation for both mobile and desktop */}
//           <div className="flex flex-col md:flex-row justify-center items-center px-2 xs:px-3 sm:px-4 md:px-20 space-y-8 md:space-y-0 md:space-x-10">
//             {cards.map((card, index) => (
//               <ScrollBasedSection
//                 key={index}
//                 delay={index * 0.2}
//                 className="px-2 xs:px-3 sm:px-4 md:px-6 w-full md:w-auto"
//               >
//                 <BackgroundGradientCard
//                   src={card.src}
//                   className="py-3 xs:py-4 sm:py-5 md:py-10"
//                 />
//               </ScrollBasedSection>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // New function for scroll locking and staggered card animation
// const useScrollLockAndStaggeredCards = (containerRef, cards) => {
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end start"],
//   });

//   const cardAnimations = cards.map((_, index) => {
//     const startThreshold = 0.1 + index * 0.2;
//     const endThreshold = startThreshold + 0.15;

//     return {
//       opacity: useTransform(
//         scrollYProgress,
//         [0, startThreshold, endThreshold, 0.9, 1],
//         [0, 0, 1, 1, 0]
//       ),
//       y: useTransform(
//         scrollYProgress,
//         [0, startThreshold, endThreshold, 0.9, 1],
//         [100, 100, 0, 0, -100]
//       ),
//     };
//   });

//   return cardAnimations;
// };

// // Modify the EventLineupSection component
// const EventLineupSectionDesktop = () => {
//   const containerRef = useRef(null);
//   const isMobile = useIsMobile();

//   // Card data with src props
//   const cards = [
//     { src: undefined, title: "Card 1" },
//     { src: "/home/card2.webp", title: "Card 2" },
//     { src: undefined, title: "Card 3" },
//   ];

//   // Use the new function for desktop
//   const cardAnimations = useScrollLockAndStaggeredCards(containerRef, cards);

//   return (
//     <div
//       ref={containerRef}
//       className="h-auto py-16 md:py-32 relative"
//       id="event-lineup"
//     >
//       {/* Shooting stars background for entire section */}
//       <div className="absolute inset-0 z-0 pointer-events-none">
//         <StarsBackground className="absolute inset-0" />
//         <ShootingStars className="absolute inset-0" />
//       </div>

//       <div className="w-full bg-black bg-opacity-90 relative z-10">
//         <div className="w-full h-full flex flex-col justify-center">
//           {/* Event Lineup Title */}
//           <ScrollBasedSection>
//             <div className="flex justify-center mb-6">
//               <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold font-sofia text-center text-white relative z-20">
//                 Event Lineup
//               </h1>
//             </div>
//             {/* Sparkles below the title */}
//             <div className="w-full md:w-[40rem] h-20 relative mx-auto mb-8">
//               <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
//               <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
//               <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
//               <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
//               <SparklesCore
//                 background="transparent"
//                 minSize={0.4}
//                 maxSize={1}
//                 particleDensity={isMobile ? 600 : 1200}
//                 className="w-full h-full"
//                 particleColor="#FFFFFF"
//               />
//               <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
//             </div>
//           </ScrollBasedSection>

//           {/* Cards with staggered animation for both mobile and desktop */}
//           <div className="flex flex-col md:flex-row justify-center items-center px-2 xs:px-3 sm:px-4 md:px-20 space-y-8 md:space-y-0 md:space-x-10">
//             {cards.map((card, index) => (
//               <motion.div
//                 key={index}
//                 style={
//                   !isMobile
//                     ? {
//                         opacity: cardAnimations[index].opacity,
//                         y: cardAnimations[index].y,
//                       }
//                     : {}
//                 }
//                 className="px-2 xs:px-3 sm:px-4 md:px-6 w-full md:w-auto"
//               >
//                 <BackgroundGradientCard
//                   src={card.src}
//                   className="py-3 xs:py-4 sm:py-5 md:py-10"
//                 />
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const AnimatedFooter = () => {
//   const footerRef = useRef(null);
//   const isMobile = useIsMobile();

//   const { scrollYProgress } = useScroll({
//     target: footerRef,
//     offset: ["start end", "end end"],
//   });

//   const footerOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
//   const footerY = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, 0]);

//   // Make the animation consistent for both mobile and desktop
//   return (
//     <div
//       ref={footerRef}
//       className={`h-[${isMobile ? "30vh" : "40vh"}] relative`}
//     >
//       <div className="sticky bottom-0 w-full">
//         <motion.div
//           style={{ opacity: footerOpacity, y: footerY }}
//           className="w-full"
//         >
//           <Footer />
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// const LoadingSequence = ({ children }) => {
//   const [loading, setLoading] = useState(true);
//   const [loadingProgress, setLoadingProgress] = useState(0);
//   const [loadingText, setLoadingText] = useState("initialising");
//   const [showContent, setShowContent] = useState(false);
//   const isMobile = useIsMobile();

//   useEffect(() => {
//     // Faster loading for mobile
//     const increment = isMobile ? 2 : 1;
//     const interval = isMobile ? 20 : 30;

//     const timer = setInterval(() => {
//       setLoadingProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(timer);
//           setTimeout(
//             () => {
//               setLoading(false);
//               setTimeout(() => setShowContent(true), isMobile ? 500 : 1000);
//             },
//             isMobile ? 300 : 500
//           );
//           return 100;
//         }

//         if (prev < 25) setLoadingText("initialising");
//         else if (prev < 50) setLoadingText("opening");
//         else if (prev < 75) setLoadingText("loading");
//         else setLoadingText("starting");

//         return prev + increment;
//       });
//     }, interval);

//     return () => clearInterval(timer);
//   }, [isMobile]);

//   return (
//     <>
//       <motion.div
//         initial={{ y: 0 }}
//         animate={{ y: loading ? 0 : "-100%" }}
//         transition={{ duration: 0.8, ease: "easeInOut" }}
//         className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center px-4"
//       >
//         {/* Loading screen content */}
//         <div className="relative flex flex-col items-center w-full max-w-md">
//           <motion.div
//             className="w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 border-gray-800"
//             animate={{ rotate: 360 }}
//             transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//           />
//           <motion.img
//             src="/logo/Yuktaha_Logo.PNG"
//             alt="Logo"
//             className="absolute w-28 h-28 xs:w-36 xs:h-36 sm:w-44 sm:h-44 md:w-60 md:h-60 lg:w-72 lg:h-72 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
//           />
//           {/* Add loading progress bar */}
//           <div className="w-full mt-16 max-w-xs">
//             <div className="bg-gray-800 rounded-full h-2 w-full">
//               <div
//                 className="bg-blue-500 h-2 rounded-full transition-all duration-300"
//                 style={{ width: `${loadingProgress}%` }}
//               ></div>
//             </div>
//             <p className="text-gray-400 text-sm mt-2 text-center">
//               {loadingText} {loadingProgress}%
//             </p>
//           </div>
//         </div>
//       </motion.div>

//       {showContent && (
//         <AnimatePresence>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ delay: isMobile ? 0.3 : 0.5 }}
//             className="bg-black"
//           >
//             <motion.div
//               initial={{ opacity: 0, top: [-30] }}
//               animate={{ opacity: 1, top: 0 }}
//               transition={{
//                 delay: isMobile ? 0.5 : 1,
//                 duration: isMobile ? 0.5 : 1,
//               }}
//               className="w-full"
//             >
//               <Navbar />
//             </motion.div>

//             {/* Hero Section with Stars & Countdown */}
//             <div className="relative w-full h-screen">
//               {/* Background stars and shooting stars - for both mobile and desktop */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ delay: 0.2 }}
//                 className="absolute inset-0 z-0"
//               >
//                 <StarsBackground className="absolute inset-0" />
//               </motion.div>
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ delay: 0.4 }}
//                 className="absolute inset-0 z-0"
//               >
//                 <ShootingStars className="absolute inset-0" />
//               </motion.div>

//               <div className="flex items-center justify-center h-full pb-32 relative z-10">
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{
//                     delay: isMobile ? 0.5 : 1,
//                     duration: isMobile ? 0.8 : 1.5,
//                   }}
//                   className="z-20 w-full max-w-md text-center"
//                 >
//                   <motion.h4
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -20 }}
//                     transition={{
//                       delay: isMobile ? 0.6 : 1.2,
//                       duration: isMobile ? 0.5 : 1,
//                     }}
//                     className="text-center text-gray-600 z-20 font-sofia text-xs xs:text-sm sm:text-base"
//                   >
//                     PSG iTech Presents
//                   </motion.h4>
//                   <motion.h2
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -500 }}
//                     transition={{
//                       delay: isMobile ? 0.5 : 1,
//                       duration: isMobile ? 0.8 : 1.5,
//                     }}
//                     className="text-3xl xs:text-4xl sm:text-4xl md:text-5xl text-center font-semibold font-sofia bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white z-20 m-2 xs:m-3 sm:m-4 md:m-7"
//                   >
//                     Yuktaha 2025
//                   </motion.h2>
//                   <motion.h4
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -20 }}
//                     transition={{
//                       delay: isMobile ? 0.6 : 1.2,
//                       duration: isMobile ? 0.5 : 1,
//                     }}
//                     className="text-center text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 z-20 font-sofia mb-4"
//                   >
//                     Starts In
//                   </motion.h4>
//                   <CountdownTimer />
//                 </motion.div>
//               </div>

//               {/* Scroll indicator for both mobile and desktop */}
//               <motion.div
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{
//                   delay: 1,
//                   repeat: Infinity,
//                   duration: isMobile ? 1 : 1.5,
//                 }}
//                 className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
//               >
//                 <ChevronDown className="text-white w-6 h-6 md:w-10 md:h-10" />
//               </motion.div>
//             </div>

//             {/* About Us section - With proper spacing and margin to avoid overlap */}
//             <div className="bg-[#3B6790] w-full h-auto py-8 xs:py-12 sm:py-16 md:py-32 relative">
//               <ScrollBasedSection className="mb-6 xs:mb-8 sm:mb-10">
//                 <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl text-left font-semibold font-sofia text-black px-4 xs:px-5 sm:px-6 md:pl-20">
//                   About Us
//                 </h2>
//               </ScrollBasedSection>
//               <ScrollBasedSection className="mt-2 xs:mt-3 sm:mt-4" delay={0.2}>
//                 <p className="text-base xs:text-lg sm:text-2xl md:text-4xl text-left max-w-7xl font-semibold font-sofia text-white pt-4 xs:pt-6 sm:pt-8 md:pt-16 px-4 xs:px-5 sm:px-6 md:pl-20">
//                   YUKTAHA'25 is a{" "}
//                   <span className="text-black">National Level Event</span> aims
//                   to showcase technological and inventive skills from students
//                   across the country, providing a platform for innovative minds
//                   to shine.
//                 </p>
//               </ScrollBasedSection>

//               {/* Added padding to ensure proper spacing between sections */}
//               <div className="pb-8 md:pb-16"></div>
//             </div>

//             {/* Event lineup section with clear separation from About Us */}
//             <EventLineupSection />

//             {/* Footer with animated entry */}
//             <AnimatedFooter />
//           </motion.div>
//         </AnimatePresence>
//       )}
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

// Device detection hook
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }
  }, []);
  return isMobile;
};

// New function for mobile card animations
const useMobileCardAnimations = () => {
  const cardRefs = useRef([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.style.opacity = 1;
              entry.target.style.transform = "translateY(0)";
            }
          });
        },
        { threshold: 0.1 }
      );

      cardRefs.current.forEach((card) => observer.observe(card));

      return () => {
        cardRefs.current.forEach((card) => observer.unobserve(card));
      };
    }
  }, [isMobile]);

  return cardRefs;
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  const isMobile = useIsMobile();

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
    <div className="flex flex-row justify-center text-center w-full text-white text-base xs:text-lg sm:text-xl md:text-2xl font-semibold m-2 md:m-4 gap-6">
      <span className="p-2 font-sofia text-[#3B6790]">
        <Counter className="" number={timeLeft.days} title="" />{" "}
        {timeLeft.days == 1 ? "Day" : "Days"}
      </span>
      <span className="p-2 font-sofia text-[#3B6790]">
        <Counter className="flex" number={timeLeft.hours} title="" />{" "}
        {timeLeft.hours == 1 ? "Hour" : "Hours"}
      </span>
      <span className="p-2 font-sofia text-[#3B6790]">
        <Counter className="flex" number={timeLeft.minutes} title="" />{" "}
        {timeLeft.minutes == 1 ? "Minute" : "Minutes"}
      </span>
    </div>
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

  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <motion.div
        ref={sectionRef}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

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

const StickyScrollSection = ({ children, height, className, id }) => {
  const containerRef = useRef(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const adjustedHeight = isMobile ? `${parseInt(height) * 0.6}px` : height;

  return (
    <div
      ref={containerRef}
      id={id}
      className={`relative ${className}`}
      style={{ height: adjustedHeight }}
    >
      <div className="sticky top-0 left-0 right-0 h-screen overflow-hidden">
        {children}
      </div>
    </div>
  );
};

const EventLineupSection = () => {
  const containerRef = useRef(null);
  const isMobile = useIsMobile();
  const cardRefs = useMobileCardAnimations();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const cards = [
    { src: undefined, title: "Card 1" },
    { src: "/home/card2.webp", title: "Card 2" },
    { src: undefined, title: "Card 3" },
  ];

  const cardAnimations = cards.map((_, index) => {
    const startThreshold = 0.1 + index * 0.2;
    const endThreshold = startThreshold + 0.15;

    return {
      opacity: useTransform(
        scrollYProgress,
        [0, startThreshold, endThreshold, 0.9, 1],
        [0, 0, 1, 1, 0]
      ),
      y: useTransform(
        scrollYProgress,
        [0, startThreshold, endThreshold, 0.9, 1],
        [100, 100, 0, 0, -100]
      ),
    };
  });

  if (isMobile) {
    return (
      <div ref={containerRef} className="h-auto py-16 relative">
        <div className="w-full h-full flex flex-col justify-center">
          <ScrollBasedSection>
            <div className="flex justify-center mb-6">
              <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold font-sofia text-center text-white relative z-20">
                Event Lineup
              </h1>
            </div>
            <div className="w-full md:w-[40rem] h-20 relative mx-auto mb-8">
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            </div>
          </ScrollBasedSection>
          <div className="flex flex-col justify-center items-center px-2 xs:px-3 sm:px-4 space-y-8">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="px-10 w-full"
              >
                <BackgroundGradientCard src={card.src} className="py-8" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="h-[300vh] relative">
      <div className="sticky top-0 w-full h-screen flex items-center justify-center bg-gradient-to-br from-neutral-950 to-neutral-900">
        <div className="w-full h-full flex flex-col justify-center">
          <ScrollBasedSection>
            <div className="flex justify-center mb-0">
              <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold font-sofia text-center text-white relative z-20">
                Event Lineup
              </h1>
            </div>
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
              <div className="absolute inset-0 w-full h-full bg-transparent [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
            </div>
          </ScrollBasedSection>
          <div className="flex flex-col md:flex-row justify-center items-center px-2 xs:px-3 sm:px-4 md:px-20 space-y-8 md:space-y-0 md:space-x-10">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                style={{
                  opacity: cardAnimations[index].opacity,
                  y: cardAnimations[index].y,
                }}
                className="px-2 xs:px-3 sm:px-4 md:px-6 w-full md:w-auto"
              >
                <BackgroundGradientCard
                  src={card.src}
                  className="py-3 xs:py-4 sm:py-5 md:py-10"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const AnimatedFooter = () => {
  const footerRef = useRef(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const footerOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const footerY = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, 0]);

  return (
    <div
      ref={footerRef}
      className={`h-[${isMobile ? "30vh" : "40vh"}] relative`}
    >
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
  const isMobile = useIsMobile();

  useEffect(() => {
    const increment = isMobile ? 2 : 1;
    const interval = isMobile ? 20 : 30;
    const timer = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(
            () => {
              setLoading(false);
              setTimeout(() => setShowContent(true), isMobile ? 500 : 1000);
            },
            isMobile ? 300 : 500
          );
          return 100;
        }
        if (prev < 25) setLoadingText("initialising");
        else if (prev < 50) setLoadingText("opening");
        else if (prev < 75) setLoadingText("loading");
        else setLoadingText("starting");
        return prev + increment;
      });
    }, interval);
    return () => clearInterval(timer);
  }, [isMobile]);

  return (
    <>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: loading ? 0 : "-100%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 bg-gradient-to-br from-neutral-950 to-neutral-900 z-50 flex flex-col items-center justify-center px-4"
      >
        <div className="relative flex flex-col items-center w-full max-w-md">
          <motion.div
            className="w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 border-gray-800"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.img
            src="/logo/Yuktaha_Logo.PNG"
            alt="Logo"
            className="absolute w-28 h-28 xs:w-36 xs:h-36 sm:w-44 sm:h-44 md:w-60 md:h-60 lg:w-72 lg:h-72 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
          />
          <div className="w-full mt-16 max-w-xs">
            <div className="bg-gray-800 rounded-full h-2 w-full">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <p className="text-gray-400 text-sm mt-2 text-center">
              {loadingText} {loadingProgress}%
            </p>
          </div>
        </div>
      </motion.div>

      {showContent && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: isMobile ? 0.3 : 0.5 }}
            // className="bg-black"
            className="bg-gradient-to-br from-neutral-950 to-neutral-900"
          >
            <motion.div
              initial={{ opacity: 0, top: [-30] }}
              animate={{ opacity: 1, top: 0 }}
              transition={{
                delay: isMobile ? 0.5 : 1,
                duration: isMobile ? 0.5 : 1,
              }}
              className="w-full"
            >
              <Navbar />
            </motion.div>

            <div className="relative w-full h-screen">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute inset-0 z-0"
              >
                <StarsBackground className="absolute inset-0" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute inset-0 z-0"
              >
                <ShootingStars className="absolute inset-0" />
              </motion.div>

              <div className="flex items-center justify-center h-full pb-32 relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    delay: isMobile ? 0.5 : 1,
                    duration: isMobile ? 0.8 : 1.5,
                  }}
                  className="z-20 w-full max-w-md text-center"
                >
                  <motion.h4
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      delay: isMobile ? 0.6 : 1.2,
                      duration: isMobile ? 0.5 : 1,
                    }}
                    className="text-center text-gray-600 z-20 font-sofia text-xs xs:text-sm sm:text-base"
                  >
                    PSG iTech Presents
                  </motion.h4>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -500 }}
                    transition={{
                      delay: isMobile ? 0.5 : 1,
                      duration: isMobile ? 0.8 : 1.5,
                    }}
                    className="text-3xl xs:text-4xl sm:text-4xl md:text-5xl text-center font-semibold font-sofia bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white z-20 m-2 xs:m-3 sm:m-4 md:m-7"
                  >
                    Yuktaha 2025
                  </motion.h2>
                  <motion.h4
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      delay: isMobile ? 0.6 : 1.2,
                      duration: isMobile ? 0.5 : 1,
                    }}
                    className="text-center text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 z-20 font-sofia mb-4"
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
                transition={{
                  delay: 1,
                  repeat: Infinity,
                  duration: isMobile ? 1 : 1.5,
                }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
              >
                <ChevronDown className="text-white w-6 h-6 md:w-10 md:h-10" />
              </motion.div>
            </div>

            <div className="bg-[#3B6790] w-full h-auto py-8 xs:py-12 sm:py-16 md:py-32 relative">
              <ScrollBasedSection className="mb-6 xs:mb-8 sm:mb-10">
                <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl text-left font-semibold font-sofia text-black px-4 xs:px-5 sm:px-6 md:pl-20">
                  About Us
                </h2>
              </ScrollBasedSection>
              <ScrollBasedSection className="mt-2 xs:mt-3 sm:mt-4" delay={0.2}>
                <p className="text-base xs:text-lg sm:text-2xl md:text-4xl text-left max-w-7xl font-semibold font-sofia text-white pt-4 xs:pt-6 sm:pt-8 md:pt-16 px-4 xs:px-5 sm:px-6 md:pl-20">
                  YUKTAHA'25 is a{" "}
                  <span className="text-black">National Level Event</span> aims
                  to showcase technological and inventive skills from students
                  across the country, providing a platform for innovative minds
                  to shine.
                </p>
              </ScrollBasedSection>
              <div className="pb-8 md:pb-16"></div>
            </div>

            <EventLineupSection />

            <AnimatedFooter />
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

export default LoadingSequence;
