import React from 'react';
import Image from 'next/image';

export const SocialMediaCard = () => {
  return (
    <div className="relative w-full h-full bg-gray-900 rounded-md overflow-hidden group">
      <div className="flex items-center justify-center h-full">
        <Image
          fill
          src="/images/logo/galerycard.jpg" 
          alt="Social Media"
        />
      </div>

      <div className="absolute top-2 left-2">
        <Image
          width={36}
          height={36}
          src="/images/skill-icons_instagram.png" 
          alt="Instagram"
          className=" rounded-full"
        />
      </div>

    
    </div>
  );
};