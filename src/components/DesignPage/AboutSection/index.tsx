import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface InformationItem {
  title: string;
  description: string;
  image_1: string;
  image_2: string;
  image_3: string;
  thumb_image_1: string;
  thumb_image_2: string;
  thumb_image_3: string;
}


interface AboutSectionProps {
  information: InformationItem[];
}

function AboutSection({ information }: AboutSectionProps, ) {
  const [expandedItems, setExpandedItems] = useState<boolean[]>(
    new Array(information.length).fill(false)
  );
  const [hasOverflow, setHasOverflow] = useState<boolean[]>(
    new Array(information.length).fill(false)
  );
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const checkOverflow = () => {
      const newHasOverflow = new Array(information.length).fill(false);
      textRefs.current.forEach((ref, index) => {
        if (ref) {
          const lineHeight = parseInt(window.getComputedStyle(ref).lineHeight);
          // 4 sətirdən artıq olub-olmadığını yoxlayır
          const clampedHeight = lineHeight * 4;
          newHasOverflow[index] = ref.scrollHeight > clampedHeight;
        }
      });
      setHasOverflow(newHasOverflow);
    };

    const timer = setTimeout(checkOverflow, 100);
    window.addEventListener("resize", checkOverflow);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkOverflow);
    };
  }, [information]);

  const toggleExpanded = (index: number) => {
    setExpandedItems((prev) => {
      const newExpanded = [...prev];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };

  return (
    <div>
      {information.map((item, index) => (
        <div
          key={index}
          className="w-full flex flex-col py-8 xl:py-14"
        >
          <div className="w-full h-auto grid grid-cols-1 xl:grid-cols-3 md:gap-[100px] mb-10 xl:mb-16">
            <div className="col-span-1 flex flex-col">
              <div className="flex gap-3 items-center">
                <span className="text-elements text-[1.125rem] xl:text-[1.25rem] font-medium font-Moneta">
                  ({String(index + 1).padStart(2, "0")})
                </span>
                <svg
                  className="flex-1 h-[1px]"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 1"
                >
                  <line
                    x1="0"
                    y1="0.5"
                    x2="100"
                    y2="0.5"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-elements"
                  />
                </svg>
              </div>
              <h2 className="text-textBase pt-6 xl:pt-8 font-archivo text-2xl md:text-3xl xl:text-4xl font-medium leading-9 text-end">
                {item.title}
              </h2>

              {item.title === 'Mətbəx mebeli' && (
                <div className="flex w-full justify-end mt-8">
                  <Link
                    href="/gallery"
                    className="items-center justify-center py-2 px-4 bg-[#5A635C] text-white"
                  >
                    Qalereyaya keçid et
                  </Link>
                </div>
              )}
            </div>

            <div className="col-span-2 flex flex-col mt-8 xl:mt-0">
              <div className="w-full">
                <div className="hidden md:flex items-center h-[23px] mt-[3px]">
                  <svg
                    className="w-full h-[1px]"
                    preserveAspectRatio="none"
                    viewBox="0 0 100 1"
                  >
                    <line
                      x1="0"
                      y1="0.5"
                      x2="100"
                      y2="0.5"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-elements"
                    />
                  </svg>
                </div>
                <div className="pt-6 xl:pt-8">
                  <p
                    dangerouslySetInnerHTML={{ __html: item.description }}
                    ref={(el) => {
                      textRefs.current[index] = el;
                    }}
                    className={`text-secondary text-left text-sm xl:text-base font-manrope max-w-full xl:max-w-[805px] transition-all duration-300 ${
                      expandedItems[index] ? "" : "line-clamp-4"
                    }`}
                  />

                  {hasOverflow[index] && (
                    <button
                      onClick={() => toggleExpanded(index)}
                      className="text-elements hover:text-textBase transition-colors duration-200 text-sm xl:text-base font-medium mt-3 underline underline-offset-2"
                    >
                      {expandedItems[index] ? t("show_less") : t("show_more")}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full grid grid-cols-1 xl:grid-cols-3 md:gap-[100px] mb-10 xl:mb-16 ">
            <div className="hidden xl:flex col-span-1 flex-col gap-10">
              <div className="w-full">
                <Image
                  width={500}
                  height={500}
                  src={item.image_1}
                  alt={`${item.title} - Image 1`}
                  className="w-full h-[300px] object-cover"
                />
              </div>
              <div className="w-full">
                <Image
                  width={500}
                  height={500}
                  src={item.image_2}
                  alt={`${item.title} - Image 2`}
                  className="w-full h-[300px] object-cover"
                />
              </div>
            </div>

            <div className="w-full h-auto col-span-2 ">
              <Image
                width={500}
                height={500}
                src={item.image_3}
                alt={`${item.title} - Main Image`}
                className="w-full h-[200px] md:h-[640px] object-cover"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AboutSection;