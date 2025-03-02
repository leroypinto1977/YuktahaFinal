import PixelCard from "./react-bits/PixelCard";
import React, { useRef } from "react";

// Import the PixelCard component

const PixelCardWithImage = ({ src }) => {
  // Reference to the section we want to scroll to when "Read More" is clicked
  const targetSectionRef = useRef(null);

  const handleReadMoreClick = () => {
    // Scroll to the target section when the button is clicked
    targetSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col items-center">
      {/* PixelCard with Image */}
      <PixelCard className="w-full max-w-lg" variant="default">
        <div className="absolute w-full p-6 z-10 flex flex-col items-center">
          {/* Image Container with 4:3 aspect ratio */}
          <div className="w-full aspect-[4/3] mb-4 absolute top-0">
            <img
              src={src}
              alt="Featured content"
              className="w-full h-full object-cover rounded-md"
            />
          </div>

          {/* Button below the image */}
          <button
            onClick={handleReadMoreClick}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200"
          >
            Read More
          </button>
        </div>
      </PixelCard>
    </div>
  );
};

export default PixelCardWithImage;
