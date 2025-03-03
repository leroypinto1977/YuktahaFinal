// "use client";

// import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import { useEffect, useState } from "react";

// export const SponsorsCarousel = ({ sponsors, autoplay = false }) => {
//   const [active, setActive] = useState(0);

//   const handleNext = () => {
//     setActive((prev) => (prev + 1) % sponsors.length);
//   };

//   const handlePrev = () => {
//     setActive((prev) => (prev - 1 + sponsors.length) % sponsors.length);
//   };

//   const isActive = (index) => {
//     return index === active;
//   };

//   useEffect(() => {
//     if (autoplay) {
//       const interval = setInterval(handleNext, 5000);
//       return () => clearInterval(interval);
//     }
//   }, [autoplay]);

//   const randomRotateY = () => {
//     return Math.floor(Math.random() * 21) - 10;
//   };

//   return (
//     <div className="max-w-sm md:max-w-4xl mx-auto antialiased font-bold px-4 md:px-8 lg:px-12 py-16">
//       <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
//         <div>
//           <div className="relative h-80 w-full">
//             <AnimatePresence>
//               {sponsors.map((sponsor, index) => (
//                 <motion.div
//                   key={sponsor.src}
//                   initial={{
//                     opacity: 0,
//                     scale: 0.9,
//                     z: -100,
//                     rotate: randomRotateY(),
//                   }}
//                   animate={{
//                     opacity: isActive(index) ? 1 : 0.7,
//                     scale: isActive(index) ? 1 : 0.95,
//                     z: isActive(index) ? 0 : -100,
//                     rotate: isActive(index) ? 0 : randomRotateY(),
//                     zIndex: isActive(index) ? 999 : sponsors.length + 2 - index,
//                     y: isActive(index) ? [0, -80, 0] : 0,
//                   }}
//                   exit={{
//                     opacity: 0,
//                     scale: 0.9,
//                     z: 100,
//                     rotate: randomRotateY(),
//                   }}
//                   transition={{
//                     duration: 0.4,
//                     ease: "easeInOut",
//                   }}
//                   className="absolute inset-0 origin-bottom"
//                 >
//                   <Image
//                     src={sponsor.src}
//                     alt={sponsor.name}
//                     width={500}
//                     height={500}
//                     draggable={false}
//                     className="h-full w-full rounded-3xl object-cover object-center bg-white p-6"
//                   />
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </div>
//         </div>
//         <div className="flex justify-between flex-col py-4">
//           <motion.div
//             key={active}
//             initial={{
//               y: 20,
//               opacity: 0,
//             }}
//             animate={{
//               y: 0,
//               opacity: 1,
//             }}
//             exit={{
//               y: -20,
//               opacity: 0,
//             }}
//             transition={{
//               duration: 0.2,
//               ease: "easeInOut",
//             }}
//           >
//             <h3 className="text-2xl font-bold text-black">
//               {sponsors[active].name}
//             </h3>
//             <p className="text-sm text-gray-500 dark:text-neutral-500">
//               {sponsors[active].designation}
//             </p>
//             <motion.p className="text-lg max-w-2xl text-neutral-800 my-8">
//               {sponsors[active].quote.split(" ").map((word, index) => (
//                 <motion.span
//                   key={index}
//                   initial={{
//                     filter: "blur(10px)",
//                     opacity: 0,
//                     y: 5,
//                   }}
//                   animate={{
//                     filter: "blur(0px)",
//                     opacity: 1,
//                     y: 0,
//                   }}
//                   transition={{
//                     duration: 0.2,
//                     ease: "easeInOut",
//                     delay: 0.02 * index,
//                   }}
//                   className="inline-block"
//                 >
//                   {word}&nbsp;
//                 </motion.span>
//               ))}
//             </motion.p>
//           </motion.div>
//         </div>
//       </div>
//       {/* Navigation arrows at the bottom */}
//       <div className="flex justify-center gap-4 mt-8">
//         <button
//           onClick={handlePrev}
//           className="h-10 w-10 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
//         >
//           <IconArrowLeft className="h-6 w-6 text-black dark:text-neutral-200 group-hover/button:rotate-12 transition-transform duration-300" />
//         </button>
//         <button
//           onClick={handleNext}
//           className="h-10 w-10 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
//         >
//           <IconArrowRight className="h-6 w-6 text-black dark:text-neutral-200 group-hover/button:-rotate-12 transition-transform duration-300" />
//         </button>
//       </div>
//     </div>
//   );
// };

// "use client";

// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { useAutoAnimate } from "@formkit/auto-animate/react";
// import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import React, { useEffect, useState, useRef } from "react";
// import { useImperativeHandle } from "react";

// export const SponsorsCarousel = ({ sponsors, autoplay = false }) => {
//   const [active, setActive] = useState(0);
//   const [parent] = useAutoAnimate();
//   const carouselRef = useRef(null);

//   const handleNext = () => {
//     if (carouselRef.current) {
//       carouselRef.current.scrollNext();
//     }
//     setActive((prev) => (prev + 1) % sponsors.length);
//   };

//   const handlePrev = () => {
//     if (carouselRef.current) {
//       carouselRef.current.scrollPrev();
//     }
//     setActive((prev) => (prev - 1 + sponsors.length) % sponsors.length);
//   };

//   useEffect(() => {
//     if (autoplay) {
//       const interval = setInterval(handleNext, 5000);
//       return () => clearInterval(interval);
//     }
//   }, [autoplay]);

//   return (
//     <div className="max-w-sm md:max-w-4xl mx-auto antialiased font-bold px-4 md:px-8 lg:px-12 py-16">
//       <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
//         <div>
//           <Carousel ref={carouselRef} className="w-full">
//             <CarouselContent>
//               {sponsors.map((sponsor, index) => (
//                 <CarouselItem key={sponsor.src}>
//                   <div className="p-1">
//                     <Card className="border-0 shadow-lg">
//                       <CardContent className="flex items-center justify-center p-0">
//                         <Image
//                           src={sponsor.src}
//                           alt={sponsor.name}
//                           width={500}
//                           height={500}
//                           draggable={false}
//                           className="h-80 w-full rounded-3xl object-cover object-center bg-white p-6"
//                         />
//                       </CardContent>
//                     </Card>
//                   </div>
//                 </CarouselItem>
//               ))}
//             </CarouselContent>
//           </Carousel>
//         </div>

//         <div className="flex justify-between flex-col py-4" ref={parent}>
//           <motion.div
//             key={active}
//             initial={{
//               y: 20,
//               opacity: 0,
//             }}
//             animate={{
//               y: 0,
//               opacity: 1,
//             }}
//             exit={{
//               y: -20,
//               opacity: 0,
//             }}
//             transition={{
//               duration: 0.2,
//               ease: "easeInOut",
//             }}
//           >
//             <h3 className="text-2xl font-bold text-black">
//               {sponsors[active].name}
//             </h3>
//             <p className="text-sm text-gray-500 dark:text-neutral-500">
//               {sponsors[active].designation}
//             </p>
//             <motion.p className="text-lg max-w-2xl text-neutral-800 my-8">
//               {sponsors[active].quote.split(" ").map((word, index) => (
//                 <motion.span
//                   key={index}
//                   initial={{
//                     filter: "blur(10px)",
//                     opacity: 0,
//                     y: 5,
//                   }}
//                   animate={{
//                     filter: "blur(0px)",
//                     opacity: 1,
//                     y: 0,
//                   }}
//                   transition={{
//                     duration: 0.2,
//                     ease: "easeInOut",
//                     delay: 0.02 * index,
//                   }}
//                   className="inline-block"
//                 >
//                   {word}&nbsp;
//                 </motion.span>
//               ))}
//             </motion.p>
//           </motion.div>
//         </div>
//       </div>

//       {/* Navigation arrows at the bottom */}
//       <div className="flex justify-center gap-4 mt-8">
//         <button
//           onClick={handlePrev}
//           className="h-10 w-10 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
//         >
//           <IconArrowLeft className="h-6 w-6 text-black dark:text-neutral-200 group-hover/button:rotate-12 transition-transform duration-300" />
//         </button>
//         <button
//           onClick={handleNext}
//           className="h-10 w-10 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
//         >
//           <IconArrowRight className="h-6 w-6 text-black dark:text-neutral-200 group-hover/button:-rotate-12 transition-transform duration-300" />
//         </button>
//       </div>
//     </div>
//   );
// };

// "use client";

// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { useAutoAnimate } from "@formkit/auto-animate/react";
// import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
// import useEmblaCarousel from "embla-carousel-react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";

// export const SponsorsCarousel = ({ sponsors, autoplay = false }) => {
//   const [active, setActive] = useState(0);
//   const [parent] = useAutoAnimate();
//   const [carouselApi, setCarouselApi] = useState(null);

//   // Set up the carousel API
//   const onApiChange = (api) => {
//     setCarouselApi(api);

//     if (api) {
//       api.on("select", () => {
//         // Update active state when carousel changes
//         setActive(api.selectedScrollSnap());
//       });
//     }
//   };

//   const handleNext = () => {
//     if (carouselApi) {
//       carouselApi.scrollNext();
//     }
//   };

//   const handlePrev = () => {
//     if (carouselApi) {
//       carouselApi.scrollPrev();
//     }
//   };

//   useEffect(() => {
//     if (autoplay && carouselApi) {
//       const interval = setInterval(handleNext, 5000);
//       return () => clearInterval(interval);
//     }
//   }, [autoplay, carouselApi]);

//   return (
//     <div className="max-w-sm md:max-w-4xl mx-auto antialiased font-bold px-4 md:px-8 lg:px-12 py-16">
//       <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
//         <div>
//           <Carousel
//             className="w-full"
//             onApiChange={onApiChange}
//             setApi={setCarouselApi}
//           >
//             <CarouselContent>
//               {sponsors.map((sponsor, index) => (
//                 <CarouselItem key={sponsor.src}>
//                   <div className="p-1">
//                     <Card className="border-0 shadow-lg">
//                       <CardContent className="flex items-center justify-center p-0">
//                         <Image
//                           src={sponsor.src}
//                           alt={sponsor.name}
//                           width={500}
//                           height={500}
//                           draggable={false}
//                           className="h-80 w-full rounded-3xl object-cover object-center bg-white p-6"
//                         />
//                       </CardContent>
//                     </Card>
//                   </div>
//                 </CarouselItem>
//               ))}
//             </CarouselContent>
//           </Carousel>
//         </div>

//         <div className="flex justify-between flex-col py-4" ref={parent}>
//           <motion.div
//             key={active}
//             initial={{
//               y: 20,
//               opacity: 0,
//             }}
//             animate={{
//               y: 0,
//               opacity: 1,
//             }}
//             exit={{
//               y: -20,
//               opacity: 0,
//             }}
//             transition={{
//               duration: 0.2,
//               ease: "easeInOut",
//             }}
//           >
//             <h3 className="text-2xl font-bold text-black">
//               {sponsors[active].name}
//             </h3>
//             <p className="text-sm text-gray-500 dark:text-neutral-500">
//               {sponsors[active].designation}
//             </p>
//             <motion.p className="text-lg max-w-2xl text-neutral-800 my-8">
//               {sponsors[active].quote.split(" ").map((word, index) => (
//                 <motion.span
//                   key={index}
//                   initial={{
//                     filter: "blur(10px)",
//                     opacity: 0,
//                     y: 5,
//                   }}
//                   animate={{
//                     filter: "blur(0px)",
//                     opacity: 1,
//                     y: 0,
//                   }}
//                   transition={{
//                     duration: 0.2,
//                     ease: "easeInOut",
//                     delay: 0.02 * index,
//                   }}
//                   className="inline-block"
//                 >
//                   {word}&nbsp;
//                 </motion.span>
//               ))}
//             </motion.p>
//           </motion.div>
//         </div>
//       </div>

//       {/* Navigation arrows at the bottom */}
//       <div className="flex justify-center gap-4 mt-8">
//         <button
//           onClick={handlePrev}
//           className="h-10 w-10 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
//         >
//           <IconArrowLeft className="h-6 w-6 text-black dark:text-neutral-200 group-hover/button:rotate-12 transition-transform duration-300" />
//         </button>
//         <button
//           onClick={handleNext}
//           className="h-10 w-10 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
//         >
//           <IconArrowRight className="h-6 w-6 text-black dark:text-neutral-200 group-hover/button:-rotate-12 transition-transform duration-300" />
//         </button>
//       </div>
//     </div>
//   );
// };

"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export const SponsorsCarousel = ({ sponsors, autoplay = false }) => {
  const [active, setActive] = useState(0);
  const [parent] = useAutoAnimate();
  const [carouselApi, setCarouselApi] = useState(null);

  // Set up the carousel API
  useEffect(() => {
    if (carouselApi) {
      // Set initial index
      carouselApi.scrollTo(active);

      // Event listener for when carousel changes
      const onSelect = () => {
        setActive(carouselApi.selectedScrollSnap());
      };

      carouselApi.on("select", onSelect);

      // Cleanup
      return () => {
        carouselApi.off("select", onSelect);
      };
    }
  }, [carouselApi]);

  // Manually update carousel when active state changes externally
  useEffect(() => {
    if (carouselApi) {
      carouselApi.scrollTo(active);
    }
  }, [active, carouselApi]);

  const handleNext = () => {
    if (carouselApi) {
      carouselApi.scrollNext();
    } else {
      // Fallback if API isn't available
      setActive((prev) => (prev + 1) % sponsors.length);
    }
  };

  const handlePrev = () => {
    if (carouselApi) {
      carouselApi.scrollPrev();
    } else {
      // Fallback if API isn't available
      setActive((prev) => (prev - 1 + sponsors.length) % sponsors.length);
    }
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  return (
    <div className="max-w-sm md:max-w-4xl mx-auto antialiased font-bold px-4 md:px-8 lg:px-12 py-16">
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <Carousel
            className="w-full"
            setApi={setCarouselApi}
            opts={{
              loop: true,
              align: "start",
            }}
          >
            <CarouselContent>
              {sponsors.map((sponsor, index) => (
                <CarouselItem key={sponsor.src}>
                  <div className="p-1">
                    <Card className="border-0 shadow-lg">
                      <CardContent className="flex items-center justify-center p-0">
                        <Image
                          src={sponsor.src}
                          alt={sponsor.name}
                          width={500}
                          height={500}
                          draggable={false}
                          className="h-80 w-full rounded-3xl object-cover object-center bg-white p-6"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <div className="flex justify-between flex-col py-4" ref={parent}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{
                y: 20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -20,
                opacity: 0,
              }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
            >
              <h3 className="text-2xl font-bold text-black">
                {sponsors[active].name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-neutral-500">
                {sponsors[active].designation}
              </p>
              <motion.p className="text-lg max-w-2xl text-neutral-800 my-8">
                {sponsors[active].quote.split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{
                      filter: "blur(10px)",
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      filter: "blur(0px)",
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                      delay: 0.02 * index,
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation arrows at the bottom */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={handlePrev}
          className="h-10 w-10 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
        >
          <IconArrowLeft className="h-6 w-6 text-black dark:text-neutral-200 group-hover/button:rotate-12 transition-transform duration-300" />
        </button>
        <button
          onClick={handleNext}
          className="h-10 w-10 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
        >
          <IconArrowRight className="h-6 w-6 text-black dark:text-neutral-200 group-hover/button:-rotate-12 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
};
