"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRef } from "react";

export function CardTestimonialCarousel({ testimonials, autoplay = false }) {
  const [active, setActive] = useState(0);
  const carouselRef = useRef(null);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
    if (carouselRef.current) {
      carouselRef.current.scrollToItem(active + 1);
    }
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    if (carouselRef.current) {
      carouselRef.current.scrollToItem(active - 1);
    }
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, active]);

  return (
    <div className="max-w-sm md:max-w-4xl mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 py-12">
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <Carousel
            ref={carouselRef}
            className="w-full"
            onScroll={(api) => {
              const index = Math.round(api.normalizedScroll());
              if (index !== active) {
                setActive(index);
              }
            }}
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="overflow-hidden rounded-xl">
                      <CardContent className="flex aspect-square items-center justify-center p-0">
                        <Image
                          src={testimonial.src}
                          alt={testimonial.name}
                          width={500}
                          height={500}
                          className="h-full w-full object-cover object-center"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <div className="flex justify-between flex-col py-4">
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
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold dark:text-white text-black">
                {testimonials[active]?.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-neutral-500">
                {testimonials[active]?.designation}
              </p>
              <motion.p className="text-lg text-gray-500 mt-6 dark:text-neutral-300">
                {testimonials[active]?.quote.split(" ").map((word, index) => (
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

          <div className="flex gap-4 pt-10 md:pt-6">
            <button
              onClick={handlePrev}
              className="h-10 w-10 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
            >
              <IconArrowLeft className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:rotate-12 transition-transform duration-300" />
            </button>
            <button
              onClick={handleNext}
              className="h-10 w-10 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
            >
              <IconArrowRight className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:-rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Usage example
export function CardTestimonialCarouselDemo() {
  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Sarah Chen",
      designation: "Product Manager at TechFlow",
      src: "/workshop/main.png",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Michael Rodriguez",
      designation: "CTO at InnovateSphere",
      // src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      src: "/workshop/electronics.png",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Emily Watson",
      designation: "Operations Director at CloudScale",
      // src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      src: "/workshop/entrepreneurship.png",
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "James Kim",
      designation: "Engineering Lead at DataPro",
      // src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      src: "/workshop/main.png",
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Lisa Thompson",
      designation: "VP of Technology at FutureNet",
      // src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      src: "/workshop/main.png",
    },
  ];

  return (
    <CardTestimonialCarousel testimonials={testimonials} autoplay={false} />
  );
}
