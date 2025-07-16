// src/components/Bathroom/Partners.tsx
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface Partner {
  name: string;
  image: string;
  thumb_image: string;
  slug: string;
}

interface PartnersProps {
  brands: Partner[];
}

export default function Partners({ brands }: PartnersProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const speedRef = useRef(0.5);
  const targetSpeedRef = useRef(0.5);

  const getEnoughBrands = () => {
    if (brands.length === 0) return [];

    const minItems = 12;
    const repeatCount = Math.ceil(minItems / brands.length);
    return Array(repeatCount)
      .fill(null)
      .flatMap(() => [...brands]);
  };

  const enoughBrands = getEnoughBrands();
  const doubledBrands = [...enoughBrands, ...enoughBrands];

  useEffect(() => {
    let frameId: number;
    const step = () => {
      speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.1;
      const el = containerRef.current;
      if (el) {
        el.scrollLeft += speedRef.current;
        const resetPoint = el.scrollWidth / 2;
        if (el.scrollLeft >= resetPoint) {
          el.scrollLeft -= resetPoint;
        }
      }
      frameId = requestAnimationFrame(step);
    };
    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="overflow-hidden py-4">
      <div
        ref={containerRef}
        onMouseEnter={() => {
          targetSpeedRef.current = 0;
        }}
        onMouseLeave={() => {
          targetSpeedRef.current = 0.5;
        }}
        className="flex items-center whitespace-nowrap space-x-8 overflow-x-auto no-scrollbar"
      >
        {doubledBrands.map((brand, i) => (
          <Link
            key={`${brand.slug}-${i}`}
            href={`/brendler/${brand.slug}`}
            className="focus:outline-none"
          >
            <div
              className="
                px-4 py-2 
                bg-white 
                transition-shadow duration-300
                dark:bg-brandGray dark:border-brandGraySecondary
                cursor-pointer
              "
            >
              <Image
                width={120}
                height={64}
                src={brand.image || brand.thumb_image}
                alt={brand.name}
                className="
                  h-10 md:h-12 max-w-[100px] object-contain
                  filter grayscale hover:grayscale-0 
                  transition duration-300 ease-in-out
                  icon-dark-mode
                "
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
