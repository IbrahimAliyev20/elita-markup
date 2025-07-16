import React, { useState, useEffect, useMemo } from "react";
import ProductSlider from "./ProductSlider";
import DetailedInfo from "./DetailedInfo";
import { ImageVariant, Product } from "@/src/types";

interface ProductSingleProps {
  product: Product;
  phone: string;
}

function ProductSingle({ product, phone }: ProductSingleProps) {
  const uniqueColors = useMemo(() => [
    ...new Map(
      product.images.map((img: ImageVariant) => [
        `${img.color_name}-${img.hex}`,
        { color_name: img.color_name, hex: img.hex }
      ])
    ).values(),
  ], [product.images]);

  const [selectedColor, setSelectedColor] = useState<{ color_name: string; hex: string } | undefined>(
    uniqueColors.length > 0 ? uniqueColors[0] : undefined
  );

  useEffect(() => {
    if (uniqueColors.length > 0 && !selectedColor) {
      setSelectedColor(uniqueColors[0]);
    }
  }, [product.images, selectedColor, uniqueColors]);

  const handleColorSelect = (colorName: string, hex: string) => {
    setSelectedColor({ color_name: colorName, hex });
  };

  return (
    <div className="flex flex-col md:flex-row gap-5 justify-between">
      <div className="w-full md:w-1/2">
        <ProductSlider 
          images={product.images} 
          selectedColor={selectedColor}
        />
      </div>

      <div className="w-full md:w-1/2">
        <DetailedInfo 
          product={product} 
          phone={phone}
          selectedColor={selectedColor}
          onColorSelect={handleColorSelect}
        />
      </div>
    </div>
  );
}

export default ProductSingle;
