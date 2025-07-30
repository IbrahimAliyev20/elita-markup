import Image from 'next/image';
import React from 'react';

interface GalleryCardProps {
  title: string;
  imageUrl: string;
}

export function GalleryCard({ title, imageUrl, }: GalleryCardProps) {
  return (
 
      <div className="relative overflow-hidden rounded-md h-[377px]">
        <Image
          width={400}
          height={400}
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 bg-white px-4 py-1">
          <h3 className="text-black text-base font-medium">{title}</h3>
        </div>
      </div>
  );
}