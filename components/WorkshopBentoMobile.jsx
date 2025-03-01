"use client";

import {
  BentoGrid,
  BentoGridItem,
} from "@/components/acertinity_ui/bento-grid.jsx";
import animationData from "@/public/workshop/rocket.json";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { ArrowLeft, X } from "lucide-react";
import Image from "next/image";
import React from "react";

const BentoGridMobile = ({ shouldAnimate }) => {
  return (
    <div className="pt-4 pb-8 px-4">
      {/* Custom layout based on wireframe */}
      <div className="grid grid-cols-12 gap-4">
        {/* Text 1 - Left sidebar */}
        <motion.div
          className="col-span-3 h-full border-3 rounded-xl flex items-center justify-center"
          initial={
            shouldAnimate ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }
          }
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: shouldAnimate ? 2.2 : 0 }}
        >
          <div className="flex items-center justify-center h-full w-full">
            <h3 className="-rotate-90 text-base font-semibold tracking-wide whitespace-nowrap transform translate-y-0">
              Development
            </h3>
          </div>
        </motion.div>

        {/* Image 2 - Top right - MODIFIED: added h-full to make it fill height */}
        <motion.div
          className="col-span-9"
          initial={
            shouldAnimate ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: shouldAnimate ? 2.4 : 0 }}
        >
          <div className="flex items-center justify-center w-full h-full rounded-xl overflow-hidden border-3 bg-gradient-to-br from-neutral-900 to-neutral-800">
            <Image
              src="/workshop/blockchain.svg"
              alt="Blockchain"
              width={180}
              height={180}
              className="object-contain"
            />
          </div>
        </motion.div>

        {/* Main Image - Center */}
        <motion.div
          className="col-span-8 row-span-2"
          initial={
            shouldAnimate ? { opacity: 0, x: -50 } : { opacity: 1, x: 0 }
          }
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          <div className="w-full h-full rounded-xl overflow-hidden border-3 border-white shadow-lg">
            <Image
              src="/workshop/main.png"
              alt="Main Logo"
              width={500}
              height={500}
              className="object-cover w-full h-full"
            />
          </div>
        </motion.div>

        {/* Text 3 - Right sidebar - keeping original row-span-2 */}
        <motion.div
          className="col-span-4 row-span-3 h-full border-3 bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-xl flex items-center justify-center bg-neutral-800"
          initial={shouldAnimate ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: shouldAnimate ? 2.6 : 0 }}
        >
          <div className="flex items-center justify-center h-full w-full">
            <h3 className="-rotate-90 text-xl font-semibold tracking-wide whitespace-nowrap transform translate-y-0">
              {/* The web Development details are given below */}
              Checkout our exciting workshops below
            </h3>
          </div>
        </motion.div>

        {/* Image 1 - Bottom left - MODIFIED: added h-full to make it fill height */}
        <motion.div
          className="col-span-5"
          initial={shouldAnimate ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: shouldAnimate ? 2.8 : 0 }}
        >
          <div className="flex items-center justify-center w-full h-full rounded-xl overflow-hidden border-3 bg-gradient-to-br from-neutral-900 to-neutral-800">
            <Image
              src="/workshop/cyber.svg"
              alt="Cybersecurity"
              width={150}
              height={150}
              className="object-contain"
            />
          </div>
        </motion.div>

        {/* Text 2 - Bottom middle */}
        <motion.div
          className="col-span-3 h-full border-3 rounded-xl flex items-center justify-center"
          initial={shouldAnimate ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: shouldAnimate ? 3.0 : 0 }}
        >
          <div className="flex items-center justify-center h-full w-full">
            <h3 className="-rotate-90 text-md font-semibold tracking-wide whitespace-nowrap transform translate-y-0">
              Scroll Down
              <ArrowLeft
                className=" items-center opacity-60"
                size={30}
                strokeWidth={2}
              />
            </h3>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Component definitions (reused from original)
const Cybersecurity = () => {
  return (
    <div className="flex items-center justify-center w-full h-32 rounded-xl overflow-hidden border-0 bg-gradient-to-br from-neutral-900 to-neutral-800">
      <Image
        src="/workshop/cyber.svg"
        alt="Cybersecurity"
        width={120}
        height={120}
        className="object-contain"
      />
    </div>
  );
};

const Blockchain = () => {
  return (
    <div className="flex items-center justify-center w-full h-32 rounded-xl overflow-hidden border-0 bg-gradient-to-br from-neutral-900 to-neutral-800">
      <Image
        src="/workshop/blockchain.svg"
        alt="Blockchain"
        width={120}
        height={120}
        className="object-contain"
      />
    </div>
  );
};

const Electronics = () => {
  return (
    <div className="flex items-center justify-center w-full h-32 rounded-xl overflow-hidden border-0 bg-gradient-to-br from-neutral-900 to-neutral-800">
      <Image
        src="/workshop/elecronics.png"
        alt="Electronics"
        width={120}
        height={120}
        className="object-contain"
      />
    </div>
  );
};

export default BentoGridMobile;
