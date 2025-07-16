
import React from "react";
import Container from "../../layout/Container";
import Image from "next/image";

interface HeroProps {
  title: string;
  image?: string;
  video?: string;
  // Remove description from interface if not needed, or keep it if you plan to use it
}

function Hero({ title, image, video }: HeroProps) {
  return (
    <div className="relative w-full h-[300px] md:h-[620px] flex items-center justify-start overflow-hidden">
      {video ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        image && (
          <Image
            width={400}
            height={500}
            src={image}
            alt={title}
            className="absolute w-full h-full object-cover"
          />
        )
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      <div className="flex flex-col md:flex-row md:justify-between md:items-start relative z-10">
        <Container>
          <h1 className="text-5xl md:text-[96px] text-white font-archivo opacity-90">
            {title}
          </h1>
        </Container>
      </div>
    </div>
  );
}

export default Hero;
