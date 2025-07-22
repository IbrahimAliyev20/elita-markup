
import React from "react";
import Image from "next/image";

interface HeroProps {
  title: string;
  image?: string;
  video?: string;
}

function Hero({ title, image, video }: HeroProps) {
  return (
    <div className="relative w-full h-[300px] md:h-[620px] flex items-center justify-start overflow-hidden mt-[80px]">
      <div className="absolute inset-0 flex">
        <div className="w-[80%] bg-[#D4DCD6]"></div>
        <div className="w-[20%] bg-[#545C56]"></div>
      </div>

      {video && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 right-[24px] w-[300px] md:w-[1044px]  h-full py-6 md:py-10 object-cover z-10"
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {!video && image && (
        <Image
          width={400}
          height={500}
          src={image}
          alt={title}
          className="absolute top-0 left-0 w-full h-full object-cover z-10"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-20" />

      <div className="flex flex-col md:flex-row md:justify-between md:items-start relative z-30">
        <div className="flex items-center justify-center w-full">
          <h1 className="text-3xl md:text-[80px] w-[200px] md:w-[600px] text-white bg-[#545C56] font-archivo opacity-90 px-4 md:px-16  py-6  whitespace-nowrap">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Hero;
