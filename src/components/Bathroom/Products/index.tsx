// src/components/Bathroom/Products.tsx
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Product } from "@/src/types";
import { useTranslation } from "react-i18next";

interface ProductItemProps {
  product: Product;
}

function ProductItem({ product }: ProductItemProps) {
  const defaultImage = product.images?.[0]?.image || "";
  const [currentImage, setCurrentImage] = useState<string>(defaultImage);
  const seen = new Set<string>();
  const colorVariants = product.images.reduce<
    { id: number; color: string; image: string; colorName: string }[]
  >((acc, img) => {
    if (!seen.has(img.hex)) {
      seen.add(img.hex);
      acc.push({
        id: acc.length,
        color: img.hex,
        image: img.image,
        colorName: img.color_name,
      });
    }
    return acc;
  }, []);

  return (
    <Link href={`/hamam/${product.slug}`} passHref>
      <div className="flex flex-col gap-4 group hover:opacity-90 transition-opacity cursor-pointer">
        <div className="relative aspect-square w-full bg-[#E9EDEA] overflow-hidden">
          <Image
            src={currentImage}
            alt={product.title}
            fill
            className="object-contain !h-[200px] mx-auto my-auto"
          />

          <div className="absolute left-3 top-3 flex gap-2 z-10">
            {colorVariants.map((variant) => (
              <button
                key={variant.id}
                className="w-5 h-5 border border-gray-300 hover:scale-110 transition-transform"
                style={{ backgroundColor: variant.color }}
                onMouseEnter={() => setCurrentImage(variant.image)}
                onMouseLeave={() => setCurrentImage(defaultImage)}
                aria-label={`Change color to ${variant.colorName}`}
                title={variant.colorName}
              />
            ))}
          </div>
        </div>

        <div className="text-[#5A635C] font-manrope text-base">
          {product.category}
        </div>
        <h2 className="text-[#18181B] font-archivo font-medium text-xl">
          {product.title}
        </h2>
      </div>
    </Link>
  );
}

interface ProductsProps {
  products?: Product[];
  loading?: boolean;
  searchTerm?: string;
  hasSearched?: boolean;
}

function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      <div className="aspect-square w-full bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-6 bg-gray-200 rounded w-full"></div>
    </div>
  );
}

export default function Products({
  products = [],
  loading = false,
  searchTerm = "",
  hasSearched = false,
}: ProductsProps) {
  const { t } = useTranslation();

  // Show loading skeleton when loading is true
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 my-10">
        {Array.from({ length: 8 }).map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </div>
    );
  }

  // Handle no results differently for search vs filter
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 my-10">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-archivo text-neutral-800 mb-2">
          {hasSearched && searchTerm
            ? t("no_results_for", { term: searchTerm })
            : t("no_products_found")}
        </h3>
        <p className="text-neutral-600 text-center max-w-md">
          {hasSearched && searchTerm
            ? t("try_another_search_term_or_change_filters")
            : t("try_changing_search_criteria_or_clearing_filters")}
        </p>
      </div>
    );
  }

  // Show actual products when not loading and products exist
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 my-10">
      {products.map((product) => (
        <ProductItem key={product.slug} product={product} />
      ))}
    </div>
  );
}
