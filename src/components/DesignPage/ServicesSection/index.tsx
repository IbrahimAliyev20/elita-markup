import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
interface ServicesSectionProps {
  /** the long description of the first service */
  description: string;
}

function ServicesSection({ description }: ServicesSectionProps) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [hasOverflow, setHasOverflow] = useState<boolean>(false);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current && description) {
        // Create a temporary element to measure the full text height
        const tempElement = document.createElement("div");
        tempElement.style.cssText = `
          position: absolute;
          visibility: hidden;
          height: auto;
          width: ${textRef.current.offsetWidth}px;
          font-family: ${window.getComputedStyle(textRef.current).fontFamily};
          font-size: ${window.getComputedStyle(textRef.current).fontSize};
          line-height: ${window.getComputedStyle(textRef.current).lineHeight};
          padding: ${window.getComputedStyle(textRef.current).padding};
          margin: ${window.getComputedStyle(textRef.current).margin};
        `;
        tempElement.textContent = textRef.current.textContent;
        document.body.appendChild(tempElement);

        const fullHeight = tempElement.offsetHeight;
        document.body.removeChild(tempElement);

        // Get the height when clamped to 4 lines
        const lineHeight = parseInt(window.getComputedStyle(textRef.current).lineHeight);
        const clampedHeight = lineHeight * 4;

        setHasOverflow(fullHeight > clampedHeight);
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(checkOverflow, 100);

    window.addEventListener("resize", checkOverflow);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkOverflow);
    };
  }, [description]);

  const toggleExpanded = () => {
    setExpanded(prev => !prev);
  };
  return (
    <div className="w-full grid grid-cols-1 xl:grid-cols-3 md:gap-[100px] py-8 xl:py-14">
      {/* First Column - Title */}
      <div className="col-span-1 flex flex-col">
        <div className="mb-10 xl:mb-[100px]">
          <div className="flex gap-3 items-center">
            <span className="text-elements text-[1.125rem] xl:text-[1.25rem] font-medium font-Moneta">
              (02)
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
            {t("services")}
          </h2>
        </div>
      </div>

      {/* Second Column - Description */}
      <div className="col-span-2 flex flex-col">
        <div className="w-full mt-1">
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
            {description && (
              <>
                <p
                  dangerouslySetInnerHTML={{ __html: description }}
                  ref={textRef}
                  className={`text-secondary text-left text-sm xl:text-base font-manrope max-w-full xl:max-w-[805px] transition-all duration-300 ${
                    expanded ? "" : "line-clamp-4"
                  }`}
                />
                {hasOverflow && (
                  <button
                    onClick={toggleExpanded}
                    className="text-elements hover:text-textBase transition-colors duration-200 text-sm xl:text-base font-medium mt-3 underline underline-offset-2"
                  >
                    {expanded ? t("show_less") : t("show_more")}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicesSection;
