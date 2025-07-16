import React from "react";
import { IntroServiceData } from "@/src/types";
import { SocialMediaCard } from "../SocialmediaCard";
import { GalleryCard } from "../GaleryCard";

const slugify = (text: string): string => {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')      
    .replace(/&/g, '-and-')  
    .replace(/[^\w\-]+/g, '')  
    .replace(/\-\-+/g, '-')   
    .trim();                 
};

interface GalleryCardListProps {
  categories: IntroServiceData[];
}

export const GalleryCardList: React.FC<GalleryCardListProps> = ({ categories }) => {
  if (!categories || categories.length === 0) {
    return <p className="text-gray-500">Qalereyaya əlavə ediləcək heç bir məzmun tapılmadı.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
      
      <SocialMediaCard />

      {categories.map((category) =>
        (category.information || []).map((item, index) => (
          <GalleryCard
            key={item.title || `${category.slug}-${index}`}
            title={item.title || "Adsız"}
            imageUrl={item.image_1}
            categorySlug={category.slug}
            itemSlug={slugify(item.title || "item")}
          />
        ))
      )}
    </div>
  );
};