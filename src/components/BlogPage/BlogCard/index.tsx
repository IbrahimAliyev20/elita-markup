// src/components/BlogCard.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface BlogCardProps {
  title: string;
  imageUrl: string;
  excerpt: string;
  slug: string;
  date?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  imageUrl,
  title,
  excerpt,
  slug,
  date = "",
}) => {
  return (
    <Link href={`/blog/${slug}`} passHref>
      <div className="overflow-hidden font-manrope group">
        <div className="relative w-full h-[360px] overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
        </div>

        <div className="flex flex-col gap-1 pt-4">
          {date && (
            <p className="text-gray-500 text-base md:text-lg mb-1">{date}</p>
          )}
          <h3 className="text-gray-800 font-semibold text-lg md:text-2xl mb-2 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-600 text-base md:text-lg line-clamp-3">
            {excerpt}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
