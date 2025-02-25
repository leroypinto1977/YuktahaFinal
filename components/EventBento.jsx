// "use client";

// import {
//   BentoGrid,
//   BentoGridItem,
// } from "@/components/acertinity_ui/bento-grid.jsx";
// import animationData from "@/public/workshop/rocket.json";
// import "@/app/globals.css";
// import {
//   IconArrowWaveRightUp,
//   IconBoxAlignRightFilled,
//   IconBoxAlignTopLeft,
//   IconClipboardCopy,
//   IconFileBroken,
//   IconSignature,
//   IconTableColumn,
// } from "@tabler/icons-react";
// import { motion } from "framer-motion";
// import Lottie from "lottie-react";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";

// export function BentoGridEventsHome({ shouldEventsAnimate }) {
//   return (
//     <BentoGrid>
//       {items.map((item, i) => {
//         if (!shouldEventsAnimate) {
//           return (
//             <BentoGridItem
//               key={i}
//               title={item.title}
//               description={item.description}
//               header={item.header}
//               icon={item.icon}
//               className={item.className}
//             />
//           );
//         }

//         if (i === 6) {
//           return (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: -200 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{
//                 duration: 1,
//                 ease: "easeOut",
//                 delay: 0,
//               }}
//             >
//               <BentoGridItem
//                 key={i}
//                 title={item.title}
//                 description={item.description}
//                 header={item.header}
//                 icon={item.icon}
//                 className="md:col-span-1 bg-gradient-to-tl from-neutral-600 to-[#3b6790] items-center pb-0 border-4 border-white"
//               ></BentoGridItem>
//             </motion.div>
//           );
//         } else if (i === 5) {
//           return (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 300 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="row-span-2"
//               transition={{
//                 duration: 2,
//                 ease: "easeOut",
//                 delay: 1,
//               }}
//             >
//               <BentoGridItem
//                 key={i}
//                 title={item.title}
//                 description={item.description}
//                 header={item.header}
//                 icon={item.icon}
//                 className="items-center pb-0 border-3"
//               ></BentoGridItem>
//             </motion.div>
//           );
//         } else if (i === 3) {
//           return (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: -300 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="row-span-2 items-center"
//               transition={{
//                 duration: 2,
//                 ease: "easeOut",
//                 delay: 1,
//               }}
//             >
//               <BentoGridItem
//                 key={i}
//                 title={item.title}
//                 description={item.description}
//                 header={item.header}
//                 icon={item.icon}
//                 className=" border-3"
//               ></BentoGridItem>
//             </motion.div>
//           );
//         } else if (i === 9) {
//           return (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, x: 300 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="col-span-2 items-center"
//               transition={{
//                 duration: 2,
//                 ease: "easeOut",
//                 delay: 1.5,
//               }}
//             >
//               <BentoGridItem
//                 key={i}
//                 title={item.title}
//                 description={item.description}
//                 header={item.header}
//                 icon={item.icon}
//                 className=" border-3"
//               ></BentoGridItem>
//             </motion.div>
//           );
//         } else if (i === 2) {
//           return (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: -200 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="items-center "
//               transition={{
//                 duration: 2,
//                 ease: "easeOut",
//                 delay: 1.5,
//               }}
//             >
//               <BentoGridItem
//                 key={i}
//                 title={item.title}
//                 description={item.description}
//                 header={item.header}
//                 icon={item.icon}
//                 className="md:row-span-2 border-3"
//               ></BentoGridItem>
//             </motion.div>
//           );
//         } else if (i === 1) {
//           return (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, x: -200 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="items-center "
//               transition={{
//                 duration: 2,
//                 ease: "easeOut",
//                 delay: 2,
//               }}
//             >
//               <BentoGridItem
//                 key={i}
//                 title={item.title}
//                 description={item.description}
//                 header={item.header}
//                 icon={item.icon}
//                 className="md:row-span-2 border-3"
//               ></BentoGridItem>
//             </motion.div>
//           );
//         } else if (i === 0) {
//           return (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, x: -200 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="items-center row-span-2"
//               transition={{
//                 duration: 2,
//                 ease: "easeOut",
//                 delay: 3,
//               }}
//             >
//               <BentoGridItem
//                 key={i}
//                 title={item.title}
//                 description={item.description}
//                 header={item.header}
//                 icon={item.icon}
//                 className="border-3"
//               ></BentoGridItem>
//             </motion.div>
//           );
//         } else if (i === 7) {
//           return (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, x: 200 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="items-center row-span-2"
//               transition={{
//                 duration: 2,
//                 ease: "easeOut",
//                 delay: 3,
//               }}
//             >
//               <BentoGridItem
//                 key={i}
//                 title={item.title}
//                 description={item.description}
//                 header={item.header}
//                 icon={item.icon}
//                 className="border-3"
//               ></BentoGridItem>
//             </motion.div>
//           );
//         } else if (i === 4) {
//           return (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: -200 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="items-center"
//               transition={{
//                 duration: 2,
//                 ease: "easeOut",
//                 delay: 3.5,
//               }}
//             >
//               <BentoGridItem
//                 key={i}
//                 title={item.title}
//                 description={item.description}
//                 header={item.header}
//                 icon={item.icon}
//                 className="border-3"
//               ></BentoGridItem>
//             </motion.div>
//           );
//         } else if (i === 8) {
//           return (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 200 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="items-center"
//               transition={{
//                 duration: 2,
//                 ease: "easeOut",
//                 delay: 3.5,
//               }}
//             >
//               <BentoGridItem
//                 key={i}
//                 title={item.title}
//                 description={item.description}
//                 header={item.header}
//                 icon={item.icon}
//                 className="border-3"
//               ></BentoGridItem>
//             </motion.div>
//           );
//         } else {
//           return (
//             <BentoGridItem
//               key={i}
//               title={item.title}
//               description={item.description}
//               header={item.header}
//               icon={item.icon}
//               className={item.className}
//             />
//           );
//         }
//       })}
//     </BentoGrid>
//   );
// }

// const Skeleton = () => (
//   <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br light:from-neutral-200 from-neutral-900 to-neutral-800 light:to-neutral-100"></div>
// );

// const Logo = () => {
//   return (
//     <div className="flex items-center justify-center w-full h-full min-h-[6rem] rounded-xl overflow-hidden border-0">
//       <Image
//         src="/events/main.png"
//         alt="Main Logo"
//         width={400}
//         height={200}
//         className="object-contain rounded-xl"
//       />
//     </div>
//   );
// };

// const App = () => {
//   return (
//     <div className="flex items-center justify-center w-full h-full min-h-[6rem] rounded-xl overflow-hidden border-0 bg-gradient-to-br light:from-neutral-200 from-neutral-900 to-neutral-800 light:to-neutral-100">
//       <Image
//         src="/workshop/app.png"
//         alt="Main Logo"
//         width={400}
//         height={200}
//         className="object-contain rounded-xl"
//       />
//     </div>
//   );
// };

// const Innovation = () => {
//   return (
//     <div className="flex items-center justify-center w-full h-full min-h-[6rem] rounded-xl overflow-hidden border-0 bg-gradient-to-br light:from-neutral-200 from-neutral-900 to-neutral-800 light:to-neutral-100">
//       <Image
//         src="/workshop/vr.svg"
//         alt="Main Logo"
//         width={400}
//         height={200}
//         className="object-contain rounded-xl font-sofia"
//       />
//     </div>
//   );
// };

// const Development = () => {
//   return (
//     <div className="flex items-center justify-center w-full h-full min-h-[6rem] rounded-xl overflow-hidden border-0 bg-gradient-to-br light:from-neutral-200 from-neutral-900 to-neutral-800 light:to-neutral-100">
//       <Image
//         src="/workshop/dev.png"
//         alt="Main Logo"
//         width={330}
//         height={200}
//         className="object-contain rounded-xl"
//       />
//     </div>
//   );
// };

// const Electronics = () => {
//   return (
//     <div className="flex items-center justify-center w-full h-full min-h-[6rem] rounded-xl overflow-hidden border-0 bg-gradient-to-br light:from-neutral-200 from-neutral-900 to-neutral-800 light:to-neutral-100">
//       <Image
//         src="/workshop/elecronics.png"
//         alt="Main Logo"
//         width={330}
//         height={200}
//         layout="fit"
//         className="object-contain rounded-xl"
//       />
//     </div>
//   );
// };

// const Entrepreneurship = () => {
//   return (
//     <div className="flex items-start justify-center w-full h-full min-h-[6rem] rounded-xl overflow-hidden border-0 bg-gradient-to-br light:from-neutral-200 from-neutral-900 to-neutral-800 light:to-neutral-100">
//       <Image
//         src="/workshop/entrepreneurship.png"
//         alt="Main Logo"
//         width={330}
//         height={200}
//         layout="fit"
//         className="object-contain rounded-xl"
//       />
//     </div>
//   );
// };

// const Cybersecurity = () => {
//   return (
//     <div className="flex items-center justify-center w-full h-full min-h-[6rem] rounded-xl overflow-hidden border-0 bg-gradient-to-br light:from-neutral-200 from-neutral-900 to-neutral-800 light:to-neutral-100">
//       <Image
//         src="/workshop/cyber.svg"
//         alt="Main Logo"
//         width={330}
//         height={200}
//         layout="fit"
//         className="object-contain rounded-xl"
//       />
//     </div>
//   );
// };

// const Rocket = () => {
//   return (
//     <div className="flex items-center justify-center w-full h-full min-h-[6rem] rounded-xl overflow-hidden border-0 bg-gradient-to-br light:from-neutral-200 from-neutral-900 to-neutral-800 light:to-neutral-100">
//       <Lottie animationData={animationData} loop={true} className="w-[90%]" />
//     </div>
//   );
// };

// const Blockchain = () => {
//   return (
//     <div className="flex items-center justify-center w-full h-full min-h-[6rem] rounded-xl overflow-hidden border-0 bg-gradient-to-br light:from-neutral-200 from-neutral-900 to-neutral-800 light:to-neutral-100">
//       <Image
//         src="/workshop/blockchain.svg"
//         alt="Main Logo"
//         width={330}
//         height={200}
//         layout="fit"
//         className="object-contain rounded-xl"
//       />
//     </div>
//   );
// };

// const Web = () => {
//   return (
//     <div className="flex items-center justify-center w-full h-full min-h-[6rem] rounded-xl overflow-hidden border-0 bg-gradient-to-br light:from-neutral-200 from-neutral-900 to-neutral-800 light:to-neutral-100">
//       <Image
//         src="/workshop/web.svg"
//         alt="Main Logo"
//         width={450}
//         height={200}
//         layout="fit"
//         className="object-contain rounded-xl"
//       />
//     </div>
//   );
// };

// const items = [
//   {
//     title: "Innovation & Technology",
//     description: "Explore the birth of groundbreaking ideas and inventions.",
//     header: <Innovation />,
//     className: "md:row-span-2 border-3 font-sofia",
//   },
//   {
//     title: "Software & Development",
//     description: "Dive into the transformative power of technology.",
//     header: <Development />,
//     className: "border-3",
//   },
//   {
//     title: "Electronics & Hardware",
//     description: "Understand the impact of effective communication.",
//     header: <Electronics />,
//     className: "border-3",
//   },
//   {
//     title: "Cyber Security",
//     description: "Experience the thrill of bringing ideas to life.",
//     header: <Cybersecurity />,
//     className: "border-3 row-span-2",
//   },
//   {
//     title: "Entrepreneurship",
//     description: "Join the quest for understanding and enlightenment.",
//     header: <Entrepreneurship />,
//     className: "border-3",
//   },
//   {
//     header: <Rocket />,
//     className: "border-3 row-span-2",
//   },
//   {
//     header: <Logo />,
//     className:
//       "bg-gradient-to-tl from-neutral-600 to-[#3b6790] items-center pb-0 border-4 border-white",
//   },
//   {
//     title: "Blockchain & Cryptocurrency",
//     description: "Embark on exciting journeys and thrilling discoveries.",
//     header: <Blockchain />,
//     className: "border-3 row-span-2",
//   },
//   {
//     header: <App />,
//     className: "border-3",
//   },
//   {
//     title: "Web Development",
//     description: "Understand the impact of effective web design.",
//     header: <Web />,
//     className: "md:col-span-2 border-3",
//   },
// ];

// This file should be saved as components/EventBento.jsx

"use client";

import {
  BentoGrid,
  BentoGridItem,
} from "@/components/acertinity_ui/bento-grid.jsx";
import animationData from "@/public/workshop/rocket.json";
import "@/app/globals.css";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

// Define component items outside the component function
const items = [
  {
    title: "Innovation & Technology",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: () => (
      <div className="flex items-center justify-center w-full h-full min-h-[6rem] rounded-xl overflow-hidden border-0 bg-gradient-to-br light:from-neutral-200 from-neutral-900 to-neutral-800 light:to-neutral-100">
        <Image
          src="/workshop/vr.svg"
          alt="Main Logo"
          width={400}
          height={200}
          className="object-contain rounded-xl font-sofia"
        />
      </div>
    ),
    className: "md:row-span-2 border-3 font-sofia",
  },
  {
    title: "Software & Development",
    description: "Dive into the transformative power of technology.",
    header: () => (
      <div className="flex items-center justify-center w-full h-full min-h-[6rem] rounded-xl overflow-hidden border-0 bg-gradient-to-br light:from-neutral-200 from-neutral-900 to-neutral-800 light:to-neutral-100">
        <Image
          src="/workshop/dev.png"
          alt="Main Logo"
          width={330}
          height={200}
          className="object-contain rounded-xl"
        />
      </div>
    ),
    className: "border-3",
  },
  {
    title: "Electronics & Hardware",
    description: "Understand the impact of effective communication.",
    header: () => (
      <div className="flex items-center justify-center w-full h-full min-h-[6rem] rounded-xl overflow-hidden border-0 bg-gradient-to-br light:from-neutral-200 from-neutral-900 to-neutral-800 light:to-neutral-100">
        <Image
          src="/workshop/elecronics.png"
          alt="Main Logo"
          width={330}
          height={200}
          layout="fit"
          className="object-contain rounded-xl"
        />
      </div>
    ),
    className: "border-3",
  },
  {
    title: "Cyber Security",
    description: "Experience the thrill of bringing ideas to life.",
    header: () => (
      <div className="flex items-center justify-center w-full h-full min-h-[6rem] rounded-xl overflow-hidden border-0 bg-gradient-to-br light:from-neutral-200 from-neutral-900 to-neutral-800 light:to-neutral-100">
        <Image
          src="/workshop/cyber.svg"
          alt="Main Logo"
          width={330}
          height={200}
          layout="fit"
          className="object-contain rounded-xl"
        />
      </div>
    ),
    className: "border-3 row-span-2",
  },
  {
    title: "Entrepreneurship",
    description: "Join the quest for understanding and enlightenment.",
    header: () => (
      <div className="flex items-start justify-center w-full h-full min-h-[6rem] rounded-xl overflow-hidden border-0 bg-gradient-to-br light:from-neutral-200 from-neutral-900 to-neutral-800 light:to-neutral-100">
        <Image
          src="/workshop/entrepreneurship.png"
          alt="Main Logo"
          width={330}
          height={200}
          layout="fit"
          className="object-contain rounded-xl"
        />
      </div>
    ),
    className: "border-3",
  },
  {
    header: () => (
      <div className="flex items-center justify-center w-full h-full min-h-[6rem] rounded-xl overflow-hidden border-0 bg-gradient-to-br light:from-neutral-200 from-neutral-900 to-neutral-800 light:to-neutral-100">
        <Lottie animationData={animationData} loop={true} className="w-[90%]" />
      </div>
    ),
    className: "border-3 row-span-2",
  },
  {
    header: () => (
      <div className="flex items-center justify-center w-full h-full min-h-[6rem] rounded-xl overflow-hidden border-0">
        <Image
          src="/events/main.png"
          alt="Main Logo"
          width={400}
          height={200}
          className="object-contain rounded-xl"
        />
      </div>
    ),
    className:
      "bg-gradient-to-tl from-neutral-600 to-[#3b6790] items-center pb-0 border-4 border-white",
  },
  {
    title: "Blockchain & Cryptocurrency",
    description: "Embark on exciting journeys and thrilling discoveries.",
    header: () => (
      <div className="flex items-center justify-center w-full h-full min-h-[6rem] rounded-xl overflow-hidden border-0 bg-gradient-to-br light:from-neutral-200 from-neutral-900 to-neutral-800 light:to-neutral-100">
        <Image
          src="/workshop/blockchain.svg"
          alt="Main Logo"
          width={330}
          height={200}
          layout="fit"
          className="object-contain rounded-xl"
        />
      </div>
    ),
    className: "border-3 row-span-2",
  },
  {
    header: () => (
      <div className="flex items-center justify-center w-full h-full min-h-[6rem] rounded-xl overflow-hidden border-0 bg-gradient-to-br light:from-neutral-200 from-neutral-900 to-neutral-800 light:to-neutral-100">
        <Image
          src="/workshop/app.png"
          alt="Main Logo"
          width={400}
          height={200}
          className="object-contain rounded-xl"
        />
      </div>
    ),
    className: "border-3",
  },
  {
    title: "Web Development",
    description: "Understand the impact of effective web design.",
    header: () => (
      <div className="flex items-center justify-center w-full h-full min-h-[6rem] rounded-xl overflow-hidden border-0 bg-gradient-to-br light:from-neutral-200 from-neutral-900 to-neutral-800 light:to-neutral-100">
        <Image
          src="/workshop/web.svg"
          alt="Main Logo"
          width={450}
          height={200}
          layout="fit"
          className="object-contain rounded-xl"
        />
      </div>
    ),
    className: "md:col-span-2 border-3",
  },
];

const BentoGridEventsHome = ({ shouldEventsAnimate }) => {
  return (
    <BentoGrid>
      {items.map((item, i) => {
        const Header = item.header;

        if (!shouldEventsAnimate) {
          return (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={<Header />}
              icon={item.icon}
              className={item.className}
            />
          );
        }

        if (i === 6) {
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -200 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                ease: "easeOut",
                delay: 0,
              }}
            >
              <BentoGridItem
                title={item.title}
                description={item.description}
                header={<Header />}
                icon={item.icon}
                className="md:col-span-1 bg-gradient-to-tl from-neutral-600 to-[#3b6790] items-center pb-0 border-4 border-white"
              />
            </motion.div>
          );
        } else if (i === 5) {
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 300 }}
              animate={{ opacity: 1, y: 0 }}
              className="row-span-2"
              transition={{
                duration: 2,
                ease: "easeOut",
                delay: 1,
              }}
            >
              <BentoGridItem
                title={item.title}
                description={item.description}
                header={<Header />}
                icon={item.icon}
                className="items-center pb-0 border-3"
              />
            </motion.div>
          );
        } else if (i === 3) {
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -300 }}
              animate={{ opacity: 1, y: 0 }}
              className="row-span-2 items-center"
              transition={{
                duration: 2,
                ease: "easeOut",
                delay: 1,
              }}
            >
              <BentoGridItem
                title={item.title}
                description={item.description}
                header={<Header />}
                icon={item.icon}
                className=" border-3"
              />
            </motion.div>
          );
        } else if (i === 9) {
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              className="col-span-2 items-center"
              transition={{
                duration: 2,
                ease: "easeOut",
                delay: 1.5,
              }}
            >
              <BentoGridItem
                title={item.title}
                description={item.description}
                header={<Header />}
                icon={item.icon}
                className=" border-3"
              />
            </motion.div>
          );
        } else if (i === 2) {
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -200 }}
              animate={{ opacity: 1, y: 0 }}
              className="items-center "
              transition={{
                duration: 2,
                ease: "easeOut",
                delay: 1.5,
              }}
            >
              <BentoGridItem
                title={item.title}
                description={item.description}
                header={<Header />}
                icon={item.icon}
                className="md:row-span-2 border-3"
              />
            </motion.div>
          );
        } else if (i === 1) {
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              className="items-center "
              transition={{
                duration: 2,
                ease: "easeOut",
                delay: 2,
              }}
            >
              <BentoGridItem
                title={item.title}
                description={item.description}
                header={<Header />}
                icon={item.icon}
                className="md:row-span-2 border-3"
              />
            </motion.div>
          );
        } else if (i === 0) {
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              className="items-center row-span-2"
              transition={{
                duration: 2,
                ease: "easeOut",
                delay: 3,
              }}
            >
              <BentoGridItem
                title={item.title}
                description={item.description}
                header={<Header />}
                icon={item.icon}
                className="border-3"
              />
            </motion.div>
          );
        } else if (i === 7) {
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              className="items-center row-span-2"
              transition={{
                duration: 2,
                ease: "easeOut",
                delay: 3,
              }}
            >
              <BentoGridItem
                title={item.title}
                description={item.description}
                header={<Header />}
                icon={item.icon}
                className="border-3"
              />
            </motion.div>
          );
        } else if (i === 4) {
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -200 }}
              animate={{ opacity: 1, y: 0 }}
              className="items-center"
              transition={{
                duration: 2,
                ease: "easeOut",
                delay: 3.5,
              }}
            >
              <BentoGridItem
                title={item.title}
                description={item.description}
                header={<Header />}
                icon={item.icon}
                className="border-3"
              />
            </motion.div>
          );
        } else if (i === 8) {
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 200 }}
              animate={{ opacity: 1, y: 0 }}
              className="items-center"
              transition={{
                duration: 2,
                ease: "easeOut",
                delay: 3.5,
              }}
            >
              <BentoGridItem
                title={item.title}
                description={item.description}
                header={<Header />}
                icon={item.icon}
                className="border-3"
              />
            </motion.div>
          );
        } else {
          return (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={<Header />}
              icon={item.icon}
              className={item.className}
            />
          );
        }
      })}
    </BentoGrid>
  );
};

export default BentoGridEventsHome;
