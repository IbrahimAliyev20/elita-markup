// src/components/Bathroom/ProductSlider.tsx
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { ImageVariant } from "@/src/types";

interface ProductSliderProps {
  /**
   * All color variants returned by the API (array of objects with color_name, hex, image, thumb_image).
   */
  images: ImageVariant[];
  selectedColor?: { color_name: string; hex: string };
}

function ProductSlider({ images, selectedColor }: ProductSliderProps) {
  // Group images by color
  const colorGroups = images.reduce((acc, img) => {
    const key = `${img.color_name}-${img.hex}`;
    if (!acc[key]) {
      acc[key] = {
        color_name: img.color_name,
        hex: img.hex,
        images: [],
      };
    }
    acc[key].images.push(img);
    return acc;
  }, {} as Record<string, { color_name: string; hex: string; images: ImageVariant[] }>);

  const colorOptions = Object.values(colorGroups);

  // Find the index of the selected color
  const selectedColorIndex = selectedColor
    ? colorOptions.findIndex(
        (option) =>
          option.color_name === selectedColor.color_name &&
          option.hex === selectedColor.hex
      )
    : 0;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  // Get current color's images
  const currentColorImages =
    colorOptions[selectedColorIndex >= 0 ? selectedColorIndex : 0]?.images ||
    [];

  // Reset image index when color changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedColor]);

  const goToPrevious = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? currentColorImages.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) =>
      prev === currentColorImages.length - 1 ? 0 : prev + 1
    );
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Dragging functionality for thumbnails
  const startDrag = (e: React.MouseEvent) => {
    if (!thumbnailsRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - thumbnailsRef.current.offsetLeft);
    setScrollLeft(thumbnailsRef.current.scrollLeft);
  };

  const duringDrag = (e: React.MouseEvent) => {
    if (!isDragging || !thumbnailsRef.current) return;
    e.preventDefault();
    const x = e.pageX - thumbnailsRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    thumbnailsRef.current.scrollLeft = scrollLeft - walk;
  };

  const endDrag = () => {
    setIsDragging(false);
  };

  // Auto-center the active thumbnail
  useEffect(() => {
    if (thumbnailsRef.current) {
      const thumbWidth = 100;
      thumbnailsRef.current.scrollTo({
        left:
          currentImageIndex * thumbWidth -
          thumbnailsRef.current.offsetWidth / 2 +
          thumbWidth / 2,
        behavior: "smooth",
      });
    }
  }, [currentImageIndex]);

  if (colorOptions.length === 0) {
    return <div>No images available</div>;
  }

  const activeColorIndex = selectedColorIndex >= 0 ? selectedColorIndex : 0;

  return (
    <div className="product-slider">
      {/* Color Selection */}
      {/* <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Available Colors:</p>
        <div className="flex gap-2 flex-wrap">
          {colorOptions.map((colorGroup, index) => (
            <button
              key={`${colorGroup.color_name}-${colorGroup.hex}`}
              onClick={() => selectColor(index)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md border transition-all ${
                activeColorIndex === index
                  ? "border-gray-800 bg-gray-100"
                  : "border-gray-300 hover:border-gray-500"
              }`}
            >
              <span
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: colorGroup.hex }}
              />
              <span className="text-sm font-medium">{colorGroup.color_name}</span>
            </button>
          ))}
        </div>
      </div> */}

      {/* Main Image with Navigation Arrows */}
      <div className="relative w-full h-[300px] md:h-[450px] bg-[#E9EDEA] rounded-lg overflow-hidden mb-4">
        {currentColorImages.length > 0 && (
          <Image
            src={currentColorImages[currentImageIndex].image}
            alt={`${colorOptions[activeColorIndex].color_name} - Image ${
              currentImageIndex + 1
            }`}
            fill
            className="object-contain"
          />
        )}

        {/* Navigation Arrows - only show if more than 1 image for current color */}
        {currentColorImages.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#E9EDEA] hover:bg-white border border-neutral-700 text-gray-800 rounded-lg p-2 shadow-md transition-all"
            >
              <FiChevronLeft size={18} />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#E9EDEA] hover:bg-white border border-neutral-700 text-gray-800 rounded-lg p-2 shadow-md transition-all"
            >
              <FiChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip - only show if more than 1 image for current color */}
      <div
        ref={thumbnailsRef}
        className="w-full h-32 flex gap-2 overflow-x-auto scrollbar-hide cursor-grab select-none snap-x snap-mandatory"
        onMouseDown={startDrag}
        onMouseMove={duringDrag}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
      >
        {currentColorImages.map((image, index) => (
          <div
            key={`${image.image}-${index}`}
            onClick={() => goToImage(index)}
            className={`flex-shrink-0 w-24 h-24 md:w-32 md:h-32 overflow-hidden border-2 transition-all snap-center cursor-pointer ${
              currentImageIndex === index
                ? "border-neutral-200"
                : "border-transparent"
            }`}
          >
            <Image
              src={image.thumb_image || image.image}
              alt={`${colorOptions[activeColorIndex].color_name} Thumbnail ${
                index + 1
              }`}
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductSlider;
