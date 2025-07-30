import React from "react";
import Link from "next/link";

import { GalleryCategory } from "@/src/types";
import { SocialMediaCard } from "../SocialmediaCard";
import { GalleryCard } from "../GaleryCard";

interface GalleryCardListProps {
  categories: GalleryCategory[];
}

export const GalleryCardList: React.FC<GalleryCardListProps> = ({ categories }) => {
  if (!categories || categories.length === 0) {
    return <p className="text-gray-500">Qalereyada heç bir kateqoriya tapılmadı.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
      <Link href="/gallery/social-media">
        <SocialMediaCard />
      </Link>

   {categories.map((category) => (
  <Link key={category.slug} href={`/gallery/${category.slug}`}>
    <GalleryCard
      title={category.title}
      imageUrl={category.thumb_image}
    />
  </Link>
))}
    </div>
  );
};