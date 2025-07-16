import Image from "next/image";
import React from "react";

interface ProjectImagesProps {
  images: Array<{
    image: string;
    thumb_image: string;
  }>;
}

function ProjectImages({ images }: ProjectImagesProps) {
  if (!images || images.length === 0) return null;

  return (
    <div className="w-full flex flex-col lg:flex-row justify-between py-8 lg:py-14">
      <div className="flex flex-col w-full lg:w-1/3">
        <div className="hidden lg:flex flex-col gap-6 pt-8 lg:pt-14">
          {images.slice(0, 2).map((img, index) => (
            <div key={index} className="flex justify-center lg:block">
              <Image
                width={400}
                height={400}
                src={img.image}
                alt={`Project image ${index + 1}`}
                className="h-[200px] lg:h-[300px] w-[150px] lg:w-[200px] object-cover"
                style={{ marginLeft: index === 1 ? '160px' : '0' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right Column - Show third image if it exists */}
      <div className="flex flex-col w-full lg:w-2/3 lg:mt-0">
        <div className="flex flex-col gap-6 lg:gap-8">
          {images[2] && (
            <div className="pt-8 lg:pt-12">
              <Image
                width={800}
                height={500}
                src={images[2].image}
                alt="Project main image"
                className="object-cover w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[628px]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectImages;