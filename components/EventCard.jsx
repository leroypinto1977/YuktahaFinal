// "use client";

// import { BackgroundGradient } from "@/components/acertinity_ui/background-gradient";
// import Image from "next/image";
// import React from "react";

// export function BackgroundGradientCard() {
//   return (
//     <div className="max-w-sm mx-auto">
//       <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-black">
//         <Image
//           src={`/home/Designer.jpeg`}
//           alt="jordans"
//           height="400"
//           width="400"
//           className="object-contain rounded-[18px]"
//         />
//         <p className="text-base sm:text-md font-sofia text-white mt-4 dark:text-neutral-200 ">
//           Read more
//         </p>
//       </BackgroundGradient>
//     </div>
//   );
// }

"use client";

import { BackgroundGradient } from "@/components/acertinity_ui/background-gradient";
import Image from "next/image";
import React from "react";

export function BackgroundGradientCard({
  src = "/home/Designer.jpeg",
  className = "",
}) {
  return (
    <div className="max-w-sm mx-auto">
      <BackgroundGradient
        className={`rounded-[22px] max-w-sm p-4 sm:p-10 bg-neutral-900 ${className}`}
      >
        <Image
          src={src}
          alt="image"
          height="400"
          width="400"
          className="object-contain rounded-[18px]"
        />
        <p className="text-base sm:text-md font-sofia text-white mt-4 dark:text-neutral-200 ">
          Read more
        </p>
      </BackgroundGradient>
    </div>
  );
}
