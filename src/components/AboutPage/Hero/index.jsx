import Image from "next/image";
import React from "react";

function Hero({data , aboutBreadcrumb}) {
  
  return (
    <div className="relative w-full h-[300px] md:h-[620px] bg-gray-200">
      {/* Background image */}
      <Image
        width={1000}
        height={1000}
        priority
        src={aboutBreadcrumb?.image}
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover bg-no-repeat bg-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/25"></div>

      {/* Centered text */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-white font-archivo text-5xl md:text-8xl font-normal">
 {aboutBreadcrumb?.name}
        </h1>
      </div>
    </div>
  );
}

export default Hero;
