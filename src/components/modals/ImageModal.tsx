import React, { useEffect } from "react";
import { Compare } from "../ui/compare";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]); 

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 ">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className=" relative z-10 bg-white p-[36px] shadow-xl w-[972px] h-[609px]  mx-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-3xl"
          aria-label="Close modal"
        >
          &times;
        </button>

        <Compare
          firstImage="/images/logo/galeryhero.jpg"
          secondImage="/images/logo/galerycard.jpg"
          firstImageClassName="object-cover object-left-top"
          secondImageClassname="object-cover object-left-top"
          className="h-[537px]  md:w-full"
          slideMode="hover"
        />
      </div>
    </div>
  );
};