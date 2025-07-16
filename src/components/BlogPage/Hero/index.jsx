import Image from "next/image";
import React from "react";

function Hero({blogBreadcrumb}) {
  
  return (
    <div className="relative w-full h-[300px] md:h-[620px] bg-gray-200">
      {/* Background image */}
      <Image
        width={500}
        height={500}
        priority
        src={blogBreadcrumb?.image}
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/25"></div>

      {/* Centered text */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-white font-archivo text-5xl md:text-8xl font-normal">
          {blogBreadcrumb?.name}
        </h1>
      </div>
    </div>
  );
}

export default Hero;
