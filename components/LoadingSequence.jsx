"use client";

import { Counter } from "./Counter";
import { BackgroundGradientCard } from "./EventCard";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { ShootingStars } from "./acertinity_ui/shooting-stars";
import { SparklesCore } from "./acertinity_ui/sparkles";
import { StarsBackground } from "./acertinity_ui/stars-background";
import { AnimatedTestimonialsDisplay } from "@/components/AnimatedTestimonials";
import { CardTestimonialCarouselDemo } from "@/components/CardTestimonialCarousel";
import { LogoTicker } from "@/components/LogoTicker";
import PixelCardWithImage from "@/components/PixelCardWithImage";
import { SponsorsCarouselDisplay } from "@/components/SponsorsCarouselDisplay";
import { TextReveal } from "@/components/magicui/text-reveal";
import PixelCard from "@/components/react-bits/PixelCard";
import TiltedCard from "@/components/react-bits/TiltedCard";
import { Progress } from "@heroui/progress";
import Lenis from "@studio-freight/lenis";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
// Import the LogoTicker component
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Calendar as CalendarIcon } from "lucide-react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

const eventDate = new Date("2025-03-14T11:00:00").getTime();

// Create fixed viewport dimensions that won't change after initialization
const useFixedViewport = () => {
  const [viewport, setViewport] = useState({
    width: 0,
    height: 0,
    isMobile: false,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Set viewport dimensions once at initialization
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobile = width < 768;

      setViewport({
        width,
        height,
        isMobile,
      });
    }
  }, []);

  return viewport;
};

// Modified device detection hook that uses fixed viewport
const useIsMobile = () => {
  const { isMobile } = useFixedViewport();
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
  const { isMobile, height: viewportHeight } = useFixedViewport();
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

const SponsorsSection = () => {
  const containerRef = useRef(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8], [0, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.8], [100, 0, 0]);

  // Mobile-optimized sponsors section
  if (isMobile) {
    return (
      <div
        ref={containerRef}
        className="bg-[#FBF8EF] w-full py-16 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <ScrollBasedSection>
              <h2 className="text-2xl xs:text-3xl sm:text-4xl font-semibold font-sofia text-black mb-6">
                Our Sponsors
              </h2>
              <div className="w-24 h-1 bg-black mx-auto"></div>
            </ScrollBasedSection>
          </div>
          <SponsorsCarouselDisplay />
          {/* <CardTestimonialCarouselDemo /> */}
          <ScrollBasedSection delay={0.4}>
            <div className="text-center mt-10"></div>
          </ScrollBasedSection>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      className="bg-[#FBF8EF] w-full py-16 md:py-32 relative overflow-hidden"
      style={{
        opacity,
        y,
        transition: { duration: 0.5 },
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <ScrollBasedSection>
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-semibold font-sofia text-black mb-6">
              Our Sponsors
            </h2>
            <div className="w-24 h-1 bg-black mx-auto"></div>
          </ScrollBasedSection>
        </div>
        <SponsorsCarouselDisplay />
        <ScrollBasedSection delay={0.6}>
          <div className="text-center mt-12"></div>
        </ScrollBasedSection>
      </div>
    </motion.div>
  );
};

// const EventLineupSection = () => {
//   const containerRef = useRef(null);
//   const isMobile = useIsMobile();
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end start"],
//   });

//   const cards = [
//     {
//       src: "/home/EventLineup/workshop.png",
//       title: "Card 1",
//       url: "https://yuktaha.com/workshops",
//     },
//     {
//       src: "/home/EventLineup/tevent.png",
//       title: "Card 2",
//       url: "https://yuktaha.com/events",
//     },
//     {
//       src: "/home/EventLineup/ntevent.png",
//       title: "Card 3",
//       url: "https://yuktaha.com/events",
//     },
//   ];

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

//   // Gradient bordered card for mobile view
//   const GradientBorderedImage = ({ imageSrc, url }) => {
//     return (
//       <div
//         className="relative rounded-xl p-[2px] overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-600 to-neutral-300 cursor-pointer"
//         onClick={() => window.open(url, "_blank")}
//       >
//         <div className="relative bg-black rounded-xl overflow-hidden h-full">
//           <div className="aspect-[1/1] overflow-hidden">
//             <img
//               src={imageSrc}
//               alt="Event"
//               className="w-full h-full object-cover"
//             />
//           </div>
//         </div>
//       </div>
//     );
//   };

//   if (isMobile) {
//     return (
//       <div ref={containerRef} className="h-auto py-16 relative">
//         <div className="w-full h-full flex flex-col justify-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//           >
//             <div className="flex justify-center mb-0">
//               <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold font-sofia text-center text-white relative z-20">
//                 Event Lineup
//               </h1>
//             </div>
//             <div className="w-full md:w-[40rem] h-20 relative mx-auto mb-8">
//               <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
//               <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
//               <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
//               <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
//               <SparklesCore
//                 background="transparent"
//                 minSize={0.4}
//                 maxSize={1}
//                 particleDensity={200}
//                 className="w-full h-full"
//                 particleColor="#FFFFFF"
//               />
//             </div>
//           </motion.div>

//           <div className="flex flex-col justify-center items-center px-2 xs:px-3 sm:px-4 space-y-8">
//             {cards.map((card, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, margin: "-50px" }}
//                 transition={{
//                   duration: 0.6,
//                   delay: index * 0.2,
//                   ease: "easeOut",
//                 }}
//                 className="px-4 w-full max-w-xs"
//               >
//                 <GradientBorderedImage imageSrc={card.src} url={card.url} />
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Desktop view remains unchanged
//   return (
//     <div ref={containerRef} className="h-[300vh] relative">
//       <div className="sticky top-0 w-full h-screen flex items-center justify-center bg-gradient-to-br from-neutral-950 to-neutral-900">
//         <div className="w-full h-full flex flex-col justify-center">
//           <ScrollBasedSection>
//             <div className="flex justify-center mb-0">
//               <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold font-sofia text-center text-white relative z-20">
//                 Event Lineup
//               </h1>
//             </div>
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
//               <div className="absolute inset-0 w-full h-full bg-transparent [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
//             </div>
//           </ScrollBasedSection>
//           <div className="flex flex-col md:flex-row justify-center items-center px-2 xs:px-3 sm:px-4 md:px-20 space-y-8 md:space-y-0 md:space-x-10">
//             {cards.map((card, index) => (
//               <Link href={card.url} key={index}>
//                 <motion.div
//                   key={index}
//                   style={{
//                     opacity: cardAnimations[index].opacity,
//                     y: cardAnimations[index].y,
//                   }}
//                   className="px-2 xs:px-3 sm:px-4 md:px-6 w-full md:w-auto"
//                 >
//                   <TiltedCard
//                     showMobileWarning={false}
//                     showTooltip={false}
//                     imageSrc={card.src}
//                     url={card.url}
//                   />
//                 </motion.div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

const EventLineupSection = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const isMobile = useIsMobile();

  // Set up smooth scroll for this section
  useEffect(() => {
    // Ensure refs are ready
    if (!containerRef.current || cardsRef.current.length === 0) return;

    // Create smooth scroll observer for desktop
    if (!isMobile) {
      // Configure the smooth scroll behavior
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: "vertical",
        smooth: true,
        smoothTouch: false, // Disable on touch devices
        touchMultiplier: 1.5,
      });

      // Connect lenis to RAF for smooth animation
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
      };
    }
  }, [isMobile, containerRef]);

  // Set up animation for cards
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const cards = [
    {
      src: "/home/EventLineup/workshop.png",
      title: "Card 1",
      url: "https://yuktaha.com/workshops",
    },
    {
      src: "/home/EventLineup/tevent.png",
      title: "Card 2",
      url: "https://yuktaha.com/events",
    },
    {
      src: "/home/EventLineup/ntevent.png",
      title: "Card 3",
      url: "https://yuktaha.com/events",
    },
  ];

  // Create card animations with staggered reveal
  const cardAnimations = cards.map((_, index) => {
    const startThreshold = 0.1 + index * 0.15; // Reduced gap between animations
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
      scale: useTransform(
        scrollYProgress,
        [0, startThreshold, endThreshold, 0.9, 1],
        [0.8, 0.8, 1, 1, 0.9]
      ),
      rotate: useTransform(
        scrollYProgress,
        [0, startThreshold, endThreshold, 0.9, 1],
        [5, 5, 0, 0, -3]
      ),
    };
  });

  // Gradient bordered card for mobile view with improved animation
  const GradientBorderedImage = ({ imageSrc, url, index }) => {
    return (
      <motion.div
        ref={(el) => (cardsRef.current[index] = el)}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            type: "spring",
            damping: 15,
            stiffness: 100,
            delay: index * 0.2,
            duration: 0.8,
          },
        }}
        viewport={{ once: true, margin: "-100px" }}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.3 },
        }}
        className="relative rounded-xl p-[2px] overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-600 to-neutral-300 cursor-pointer"
        onClick={() => window.open(url, "_blank")}
      >
        <div className="relative bg-black rounded-xl overflow-hidden h-full">
          <div className="aspect-[1/1] overflow-hidden">
            <img
              src={imageSrc}
              alt="Event"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </motion.div>
    );
  };

  if (isMobile) {
    return (
      <div
        id="event-lineup"
        ref={containerRef}
        className="h-auto py-16 relative scroll-mt-16"
      >
        <div className="w-full h-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
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
                particleDensity={200}
                className="w-full h-full"
                particleColor="#FFFFFF"
              />
            </div>
          </motion.div>
          <div className="flex flex-col justify-center items-center px-2 xs:px-3 sm:px-4 space-y-8">
            {cards.map((card, index) => (
              <div key={index} className="px-4 w-full max-w-xs">
                <GradientBorderedImage
                  imageSrc={card.src}
                  url={card.url}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Enhanced desktop view with smoother animations
  return (
    <div
      id="event-lineup"
      ref={containerRef}
      className="h-[200vh] relative scroll-mt-16"
    >
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
              <Link href={card.url} key={index}>
                <motion.div
                  ref={(el) => (cardsRef.current[index] = el)}
                  style={{
                    opacity: cardAnimations[index].opacity,
                    y: cardAnimations[index].y,
                    scale: cardAnimations[index].scale,
                    rotate: cardAnimations[index].rotate,
                  }}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                  className="px-2 xs:px-3 sm:px-4 md:px-6 w-full md:w-auto transform transition-all duration-500"
                >
                  <TiltedCard
                    showMobileWarning={false}
                    showTooltip={false}
                    imageSrc={card.src}
                    url={card.url}
                  />
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// New AnimatedTestimonials component with improved mobile rendering
const AnimatedTestimonialsScreen = () => {
  const containerRef = useRef(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8], [0, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.8], [100, 0, 0]);

  // Mobile-optimized testimonials section
  if (isMobile) {
    return (
      <div
        ref={containerRef}
        className="bg-[#FBF8EF] w-full py-16 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <ScrollBasedSection>
              <h2 className="text-2xl xs:text-3xl sm:text-4xl font-semibold font-sofia text-black mb-6">
                Gallery - Yuktaha 2k24
              </h2>
              <div className="w-24 h-1 bg-black mx-auto"></div>
            </ScrollBasedSection>
          </div>
          <AnimatedTestimonialsDisplay />
          <ScrollBasedSection delay={0.4}>
            <div className="text-center mt-10"></div>
          </ScrollBasedSection>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      className="bg-[#FBF8EF] w-full py-16 md:py-32 relative overflow-hidden"
      style={{
        opacity,
        y,
        transition: { duration: 0.5 },
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <ScrollBasedSection>
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-semibold font-sofia text-black mb-6">
              Gallery - Yuktaha 2k24
            </h2>
            <div className="w-24 h-1 bg-black mx-auto"></div>
          </ScrollBasedSection>
        </div>
        <AnimatedTestimonialsDisplay />
        <ScrollBasedSection delay={0.6}>
          <div className="text-center mt-12"></div>
        </ScrollBasedSection>
      </div>
    </motion.div>
  );
};

const AnimatedFooter = () => {
  const footerRef = useRef(null);
  const { isMobile, height: viewportHeight } = useFixedViewport();
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
  const {
    isMobile,
    width: viewportWidth,
    height: viewportHeight,
  } = useFixedViewport();

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
                <h2 className="text-2xl xs:text-3xl sm:text-4xl text-left font-semibold font-sofia text-black px-4 xs:px-5 sm:px-6 md:pl-20">
                  About Us
                </h2>
              </ScrollBasedSection>
              <ScrollBasedSection className="mt-2 xs:mt-3 sm:mt-4" delay={0.2}>
                <p className="text-lg sm:text-2xl md:text-4xl text-left max-w-7xl font-semibold font-sofia text-white pt-4 xs:pt-6 sm:pt-8 md:pt-16 px-4 xs:px-5 sm:px-6 md:pl-20">
                  YUKTAHA'25 is a{" "}
                  <span className="text-black">National Level Event</span> aims
                  to showcase technological and inventive skills from students
                  across the country, providing a platform for innovative minds
                  to shine.
                </p>
              </ScrollBasedSection>

              {/* Adding flex-grow to create space */}
              <div className="flex-grow min-h-[100px]"></div>

              {/* Logo ticker positioned at the bottom */}
              {/* <div className="absolute bottom-0 left-0 right-0">
                <ScrollBasedSection delay={0.3}>
                  {isMobile ? (
                    <div className="w-full overflow-hidden">
                      <LogoTicker speed={25} />
                    </div>
                  ) : (
                    <div className="w-full overflow-hidden">
                      <LogoTicker speed={40} />
                    </div>
                  )}
                </ScrollBasedSection>
              </div> */}
            </div>

            <SponsorsSection />
            {/* <CardTestimonialCarouselDemo /> */}

            <EventLineupSection />
            {/* Modified Testimonials Section with conditional rendering */}
            <AnimatedTestimonialsScreen />
            <AnimatedFooter />
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};
export default LoadingSequence;
