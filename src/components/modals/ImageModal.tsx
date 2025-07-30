import React, { useEffect } from "react";
import { Compare } from "../ui/compare"; 

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  beforeImage: string | null;
  afterImage: string | null;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  beforeImage,
  afterImage,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen || !beforeImage || !afterImage) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="relative z-10 bg-white p-[36px] shadow-xl w-[972px] h-[609px] mx-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-3xl z-20" // z-index əlavə edildi
          aria-label="Close modal"
        >
          &times;
        </button>

        <Compare
          firstImage={beforeImage}
          secondImage={afterImage}
          firstImageClassName="object-contain object-center"
          secondImageClassname="object-contain object-center"
          className="h-[540px] w-[900px]"
          slideMode="hover"
        />
      </div>
    </div>
  );
};