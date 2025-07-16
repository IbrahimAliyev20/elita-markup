
import Image from 'next/image';
import Link from 'next/link'; 
import React from 'react';

interface GalleryCardProps {
  title: string;
  imageUrl: string;
  categorySlug: string;
  itemSlug: string;
}

export function GalleryCard({ title, imageUrl, categorySlug, itemSlug }: GalleryCardProps) {
  return (
    <Link 
      href={`/gallery/${categorySlug}/${itemSlug}`} 
      className="block group" 
    >
      <div className="relative overflow-hidden rounded-md h-[377px]">
        <Image
          width={400}
          height={400}
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-white text-lg font-semibold">{title}</h3>
        </div>
      </div>
    </Link>
  );
}