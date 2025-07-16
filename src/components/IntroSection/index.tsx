import { FC, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { IntroServiceData } from "@/src/types";

interface IntroSectionProps {
  introData: IntroServiceData[];
}

const IntroSection: FC<IntroSectionProps> = ({ introData }) => {
  const router = useRouter();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Custom routes for each section
  const customRoutes = ["/dizayn", "/temir", "/mebel", "/hamam"];

  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, introData.length);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, [introData]);

  const handleInteraction = (idx: number) => {
    if (isMobile && hoveredIdx === idx) {
      setHoveredIdx(null);
      if (videoRefs.current[idx]) {
        videoRefs.current[idx]?.pause();
      }
      return;
    }

    videoRefs.current.forEach((video) => {
      if (video) video.pause();
    });

    setHoveredIdx(idx);

    if (videoRefs.current[idx]) {
      videoRefs.current[idx]?.play();
    }
  };

  const handleMouseLeave = () => {
    if (isMobile) return;

    videoRefs.current.forEach((video) => {
      if (video) video.pause();
    });

    setHoveredIdx(null);
  };

  const handleNavigate = (idx: number) => {
    const route = customRoutes[idx] || `/${introData[idx]?.slug}`;
    router.push(route);
  };

  return (
    <section className="relative w-full bg-neutral-900">
      <div className="absolute inset-x-0 top-0 flex justify-center py-4 z-20">
        <Image
          src="/images/logo/logo-elita.png"
          alt="Logo"
          width={120}
          height={70}
          className="object-contain w-[150px] "
          priority
          quality={100}
        />
      </div>

      <div
        className={`max-w-screen mx-auto flex flex-col lg:flex-row lg:divide-x-[0.2px] lg:divide-white ${
          isMobile ? "h-auto" : "h-screen"
        }`}
      >
        {introData.map((item, idx) => {
          const isHovered = hoveredIdx === idx;

          const desktopWidth = isHovered
            ? "600px"
            : hoveredIdx !== null
            ? `calc((100% - 600px) / ${introData.length - 1})`
            : `${100 / introData.length}%`;

          const mobileHeight = isHovered ? "400px" : "280px";

          return (
            <div
              key={idx}
              className={`
                group relative cursor-pointer px-6 md:px-10 overflow-hidden transition-all duration-1000 ease-in-out
                ${
                  isMobile
                    ? "pt-12 py-4 border-b border-white last:border-b-0"
                    : "py-20 h-full"
                }
              `}
              style={{
                width: isMobile ? "100%" : desktopWidth,
                height: isMobile ? mobileHeight : "auto",
                filter: isHovered ? "grayscale(0%)" : "grayscale(100%)",
                transition: isMobile
                  ? "height 0.7s ease-out, filter 0.5s ease-out"
                  : "width 0.7s ease-out, filter 0.5s ease-out",
              }}
              onClick={() => {
                if (isMobile) {
                  handleInteraction(idx);
                } else if (isHovered) {
                  handleNavigate(idx);
                }
              }}
              onMouseEnter={() => !isMobile && handleInteraction(idx)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Background Image Layer */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.35) 100%), url('${item.image}')`,
                  opacity: isHovered ? 0 : 1,
                }}
              />

              {/* Video Layer */}
              <video
                ref={(el: HTMLVideoElement | null) => {
                  videoRefs.current[idx] = el;
                }}
                className="absolute inset-0 object-cover w-full h-full transition-opacity duration-1000"
                style={{ opacity: isHovered ? 1 : 0 }}
                loop
                muted
                playsInline
                src={item.video_intro || undefined}
              />

              {/* Content layer */}
              <div className="relative z-10 flex flex-col justify-between h-full w-full">
                <div className="flex justify-between items-center text-base md:text-xl text-lightSageGreen font-medium leading-7">
                  <p className="font-archivo">0{idx + 1}</p>
                  <svg
                    width="100"
                    height="2"
                    viewBox="0 0 140 2"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="md:w-[140px]"
                  >
                    <rect y="0.5" width="100%" height="1" fill="#E2E7E3" />
                  </svg>
                </div>

                <div className="flex flex-col mt-auto">
                  <h2
                    className={`
                    text-2xl md:text-3xl font-archivo  font-semibold text-lightSageGreen leading-8 
                    transform transition-all duration-1000 ease-in-out 
                    ${!isMobile && "group-hover:-translate-y-4"}
                  `}
                  >
                    {item.title}
                  </h2>

                  <div
                    className={`
                    transition-all duration-1000 ease-in-out overflow-hidden
                    ${
                      isHovered
                        ? "max-h-60 opacity-100 mt-4"
                        : "max-h-0 opacity-0"
                    }
                  `}
                  >
                    <p
                      className="text-lightSageGreen line-clamp-5 font-manrope text-sm md:text-base leading-6 font-normal mb-4 md:mb-6"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                    <div
                      className="text-white leading-4 font-archivo font-normal text-sm md:text-base flex flex-row items-center gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavigate(idx);
                      }}
                    >
                      Ətraflı
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 5.3335L14.6666 8.00016M14.6666 8.00016L12 10.6668M14.6666 8.00016H1.33331"
                          stroke="#FAFAFA"
                          strokeWidth="0.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default IntroSection;
