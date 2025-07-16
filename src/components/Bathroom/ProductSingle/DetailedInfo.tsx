import React from "react";
import { Product, ImageVariant, Attribute } from "@/src/types";
import Link from "next/link";
import { SiWhatsapp } from "react-icons/si";
import { useTranslation } from "react-i18next";

interface DetailedInfoProps {
  product: Product;
  phone: string;
  selectedColor?: { color_name: string; hex: string };
  onColorSelect?: (colorName: string, hex: string) => void;
}

function DetailedInfo({ product, phone, selectedColor, onColorSelect }: DetailedInfoProps) {
  const { t } = useTranslation();
  const sanitizedPhone = phone.replace(/\D/g, "");

  // Group unique colors
  const uniqueColors = [
    ...new Map(
      product.images.map((img: ImageVariant) => [
        `${img.color_name}-${img.hex}`,
        { color_name: img.color_name, hex: img.hex }
      ])
    ).values(),
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <h1 className="text-textBase text-3xl font-semibold font-archivo pb-5 md:pb-10">
          {product.title}
        </h1>

        <div className="flex flex-col gap-4">
          <p className="text-xl text-textBase font-medium font-archivo leading-5">
            {t("contactDetails.general_info")}
          </p>
          <p
            className="text-base text-elementSecondary font-manrope"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>

        <div className="flex flex-col gap-4">
          <p
            className="text-textBase font-archivo text-xl leading-5 font-medium"
            dangerouslySetInnerHTML={{ __html: t("contactDetails.details") }}
          />

          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <p
                className="text-elementSecondary text-base font-medium font-manrope leading-6"
                dangerouslySetInnerHTML={{
                  __html: t("contactDetails.category"),
                }}
              />
              <p
                className="text-textBase font-manrope font-semibold leading-6 text-base"
                dangerouslySetInnerHTML={{
                  __html: product.category,
                }}
              />
            </div>

            <div className="flex justify-between items-center">
              <p
                className="text-elementSecondary text-base font-medium font-manrope leading-6"
                dangerouslySetInnerHTML={{
                  __html: t("contactDetails.brand"),
                }}
              />
              <p
                className="text-textBase font-manrope font-semibold leading-6 text-base"
                dangerouslySetInnerHTML={{
                  __html: product.brand,
                }}
              />
            </div>

            {product.attribute.length > 0 && (
              <div className="flex flex-col gap-1">
                {product.attribute.map((attr: Attribute, idx: number) => (
                  <div key={idx} className="flex justify-between items-center">
                    <p
                      dangerouslySetInnerHTML={{ __html: `${attr.key}:` }}
                      className="text-elementSecondary text-base font-medium font-manrope leading-6"
                    />
                    <p
                      className="text-textBase font-manrope font-semibold leading-6 text-base"
                      dangerouslySetInnerHTML={{
                        __html: attr.value,
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Selected Color */}
            {selectedColor && (
              <div className="flex justify-between items-center">
                <p
                  className="text-elementSecondary text-base font-medium font-manrope leading-6"
                  dangerouslySetInnerHTML={{
                    __html: t("contactDetails.selected_color") || "Selected Color",
                  }}
                />
                <div className="flex items-center gap-2">
                  <span
                    className="w-5 h-5 rounded-full border border-gray-300"
                    style={{ backgroundColor: selectedColor.hex }}
                  />
                  <span className="text-textBase font-manrope font-semibold leading-6 text-base">
                    {selectedColor.color_name}
                  </span>
                </div>
              </div>
            )}

            {/* Color Availability */}
            <div className="flex justify-between items-start">
              <p
                className="text-elementSecondary text-base font-medium font-manrope leading-6"
                dangerouslySetInnerHTML={{
                  __html: t("contactDetails.color_availability"),
                }}
              />
              <div className="flex gap-2 flex-wrap justify-end">
                {uniqueColors.map((color) => (
                  <button
                    key={`${color.color_name}-${color.hex}`}
                    onClick={() => onColorSelect?.(color.color_name, color.hex)}
                    className={`flex items-center text-neutral-700 gap-1 px-2 py-1 rounded border transition-all hover:bg-gray-50 ${
                      selectedColor && 
                      selectedColor.color_name === color.color_name && 
                      selectedColor.hex === color.hex
                        ? "border-gray-800 bg-gray-100"
                        : "border-gray-300"
                    }`}
                    title={color.color_name}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-xs font-medium">{color.color_name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 pt-10">
        <div>
          <Link
            href="/elaqe"
            className="text-textBase border border-textBase py-2 font-archivo font-base w-full flex items-center justify-center leading-5
                      transition-all duration-300 ease-in-out
                      hover:bg-textBase hover:text-white
                      focus:outline-none focus:ring-2 focus:ring-textBase focus:ring-opacity-50
                      active:bg-textBase/90 active:scale-95"
          >
            {t("contactDetails.contact_us")}
          </Link>
        </div>

        <div>
          <a
            href={`https://wa.me/${sanitizedPhone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-textBase border border-textBase py-2 font-archivo font-base w-full flex items-center gap-5 justify-center leading-5
                      transition-all duration-300 ease-in-out
                      hover:bg-emerald-50 hover:border-emerald-800
                      focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50
                      active:bg-emerald-100 active:scale-95"
          >
            <SiWhatsapp className="text-emerald-400 text-base" />
            {t("contactDetails.whatsapp")}
          </a>
        </div>
      </div>
    </div>
  );
}

export default DetailedInfo;
