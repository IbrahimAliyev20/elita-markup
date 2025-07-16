
import Image from "next/image";
import React from "react";

interface HeroProps {
  title: string;
  image: string;
  short_description: string;
}

function Hero({ title, image, short_description }: HeroProps) {
  return (
    <div className="w-full flex flex-col md:flex-row ">
      <div className="w-full md:w-[65%] h-[360px]">
        <Image
          src={image}
          alt="Hero image elita"
          width={600}
          height={360}
          className="w-full h-full object-cover"
        />
      </div>

      <div
        className="
        flex-none
        w-full md:w-[35%]
        h-[360px]
        bg-elementSecondaryBg
        p-8
        flex
        flex-col
        justify-center
      "
      >
        <div className="flex flex-col justify-center gap-7 my-auto">
          <h1 className="font-archivo font-medium text-5xl leading-11 text-textBase">
            {title}
          </h1>
          <p className="text-textBase text-base">{short_description}</p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
