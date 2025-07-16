import { ServiceData } from "@/src/types";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

interface ServicesSliderProps {
  services: ServiceData[];
}

function ServicesSlider({ services }: ServicesSliderProps) {
  const router = useRouter();

  const displayedServices = services.slice(0, 2);

  const renderTitle = (title: string) => {
    const words = title.split(' ');
    if (words.length === 0) return title;
    
    const lastWord = words.pop();
    const remainingText = words.join(' ');

    return (
      <>
        {remainingText} {remainingText && ' '}
        <span className="font-Moneta text-elementSecondary">{lastWord}</span>
      </>
    );
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-11 pb-7 md:pb-14">
      <div className="hidden lg:block"></div>

      {displayedServices.map((service) => (
        <div
          key={service.slug}
          onClick={() => router.push(`/dizayn/${service.slug}`)}
          className="group relative flex cursor-pointer flex-col gap-6 p-5 transition-all duration-700 hover:bg-elementSecondaryBg overflow-hidden"
        >
          <div className="relative overflow-hidden h-[200px] md:h-[500px]">
            <Image
              src={service.image}
              alt={service.title}
              width={400}
              height={400}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </div>
          <p className="text-textBase text-xl md:text-2xl font-normal font-archivo leading-6">
            {renderTitle(service.title)}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ServicesSlider;