import Image from "next/image";
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

function AboutSection({ information }: AboutSectionProps) {
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
          // Create a temporary element to measure the full text height
          const tempElement = document.createElement("div");
          tempElement.style.cssText = `
            position: absolute;
            visibility: hidden;
            height: auto;
            width: ${ref.offsetWidth}px;
            font-family: ${window.getComputedStyle(ref).fontFamily};
            font-size: ${window.getComputedStyle(ref).fontSize};
            line-height: ${window.getComputedStyle(ref).lineHeight};
            padding: ${window.getComputedStyle(ref).padding};
            margin: ${window.getComputedStyle(ref).margin};
          `;
          tempElement.textContent = ref.textContent;
          document.body.appendChild(tempElement);

          const fullHeight = tempElement.offsetHeight;
          document.body.removeChild(tempElement);

          // Get the height when clamped to 4 lines
          const lineHeight = parseInt(window.getComputedStyle(ref).lineHeight);
          const clampedHeight = lineHeight * 4;

          newHasOverflow[index] = fullHeight > clampedHeight;
        }
      });
      setHasOverflow(newHasOverflow);
    };

    // Small delay to ensure DOM is ready
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
          className="w-full grid grid-cols-1 xl:grid-cols-3 md:gap-[100px] py-8 xl:py-14"
        >
          {/* First Column - Title and Left Images */}
          <div className="col-span-1 flex flex-col">
            {/* Title Section */}
            <div className="mb-10 xl:mb-[100px]">
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
              <h2 className="text-textBase text-right pt-6 xl:pt-8 font-archivo text-2xl md:text-3xl xl:text-4xl font-medium leading-9">
                {item.title}
              </h2>
            </div>

            {/* Left Images with equal spacing */}
            <div className="hidden xl:flex flex-col justify-between gap-10">
              <div className="flex justify-center xl:block">
                <Image
                  width={400}
                  height={400}
                  src={item.image_1}
                  alt={`${item.title} - Image 1`}
                  className="h-[200px] xl:h-[300px] w-[150px] xl:w-[450px] object-cover"
                />
              </div>
              <div className="flex self-end xl:block">
                <Image
                  width={400}
                  height={400}
                  src={item.image_2}
                  alt={`${item.title} - Image 2`}
                  className="h-[200px] xl:h-[300px] w-[150px] xl:w-[450px] object-cover"
                />
              </div>
            </div>
          </div>

          {/* Second Column - Description and Right Image */}
          <div className="col-span-2 flex flex-col">
            {/* Description */}
            <div className="w-full mt-1 mb-[100px]">
              <div className="hidden xl:flex items-center h-[23px]">
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
                {/* {item.description} */}

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

            {/* Right Image with same height as left images container */}
            <div className="w-full flex items-center">
              <Image
                width={800}
                height={500}
                src={item.image_3}
                alt={`${item.title} - Main Image`}
                className="object-cover w-full h-[300px] sm:h-[400px] md:h-[500px] xl:h-[628px]"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AboutSection;
