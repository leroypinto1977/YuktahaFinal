// "use client";

// import claudeLogo from "@/public/logo-ticker/logo-claude.png";
// import cohereLogo from "@/public/logo-ticker/logo-cohere.png";
// import langchainLogo from "@/public/logo-ticker/logo-langchain.png";
// import llamaIndexLogo from "@/public/logo-ticker/logo-llamaindex.png";
// import Logoiii from "@/public/logo-ticker/logo-lll.png";
// import mistralLogo from "@/public/logo-ticker/logo-mistral.png";
// import openaiLogo from "@/public/logo-ticker/logo-openai.png";
// import palm2Logo from "@/public/logo-ticker/logo-palm2.png";
// import pytorchLogo from "@/public/logo-ticker/logo-pytorch.png";
// import stabilityLogo from "@/public/logo-ticker/logo-stability.png";
// import { motion } from "framer-motion";
// import Image from "next/image";

// export const LogoTicker = () => {
//   return (
//     <div className="py-8 md:py-12 bg-black">
//       <div className="container">
//         3
//         <div
//           className="flex overflow-hidden"
//           style={{
//             maskImage:
//               "linear-gradient(to right, transparent, black, transparent)",
//           }}
//         >
//           <motion.div
//             className="flex gap-14 flex-none pr-14"
//             animate={{
//               translateX: "-50%",
//             }}
//             transition={{
//               duration: 20,
//               repeat: Infinity,
//               ease: "linear",
//               repeatType: "loop",
//             }}
//           >
//             <Image
//               src={claudeLogo}
//               alt="Claude logo"
//               className="logo-ticker-image"
//             />
//             <Image
//               src={cohereLogo}
//               alt="Cohere logo"
//               className="logo-ticker-image"
//             />
//             <Image
//               src={langchainLogo}
//               alt="Langchain logo"
//               className="logo-ticker-image"
//             />
//             <Image
//               src={llamaIndexLogo}
//               alt="Llama Index logo"
//               className="logo-ticker-image"
//             />
//             <Image src={Logoiii} alt="III logo" className="logo-ticker-image" />
//             <Image
//               src={mistralLogo}
//               alt="Mistral logo"
//               className="logo-ticker-image"
//             />
//             <Image
//               src={openaiLogo}
//               alt="OpenAI logo"
//               className="logo-ticker-image"
//             />
//             <Image
//               src={palm2Logo}
//               alt="Palm 2 logo"
//               className="logo-ticker-image"
//             />
//             <Image
//               src={pytorchLogo}
//               alt="PyTorch logo"
//               className="logo-ticker-image"
//             />
//             <Image
//               src={stabilityLogo}
//               alt="Stability AI logo"
//               className="logo-ticker-image"
//             />
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export const LogoTicker = ({ speed = 20 }) => {
  // Logos array to make it easier to add/remove logos
  const logos = [
    { src: "/logo-ticker/logo-claude.png", alt: "Claude logo" },
    { src: "/logo-ticker/logo-cohere.png", alt: "Cohere logo" },
    { src: "/logo-ticker/logo-langchain.png", alt: "Langchain logo" },
    { src: "/logo-ticker/logo-llamaindex.png", alt: "Llama Index logo" },
    { src: "/logo-ticker/logo-lll.png", alt: "III logo" },
    { src: "/logo-ticker/logo-mistral.png", alt: "Mistral logo" },
    { src: "/logo-ticker/logo-openai.png", alt: "OpenAI logo" },
    { src: "/logo-ticker/logo-palm2.png", alt: "Palm 2 logo" },
    { src: "/logo-ticker/logo-pytorch.png", alt: "PyTorch logo" },
    { src: "/logo-ticker/logo-stability.png", alt: "Stability AI logo" },
  ];

  return (
    <div className="h-40 bg-transparent">
      {" "}
      {/* Fixed height container */}
      <div className="max-w-full mx-auto px-4">
        <div
          className="flex overflow-hidden h-full items-center"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black, transparent)",
          }}
        >
          <motion.div
            className="flex gap-14 flex-none pr-14 h-40 items-center" /* Fixed height for the scrolling content */
            animate={{
              translateX: "-50%",
            }}
            transition={{
              duration: speed,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          >
            {logos.map((logo, index) => (
              <div key={index} className="h-36 flex items-center">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={100}
                  height={40}
                  className="object-contain max-h-12 w-auto"
                />
              </div>
            ))}
            {/* Duplicate logos for seamless looping */}
            {logos.map((logo, index) => (
              <div key={`dup-${index}`} className="h-36 flex items-center">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={100}
                  height={40}
                  className="object-contain max-h-12 w-auto"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
