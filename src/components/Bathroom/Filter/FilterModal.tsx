// src/components/Bathroom/FilterModal.tsx
import React, { useState, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { Category, Brand, Color } from "@/src/types";
import { FilterState } from "@/pages/hamam";
import { useTranslation } from "react-i18next";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  brands: Brand[];
  colors: Color[];
  filters: FilterState;
  onApplyFilters: (filters: FilterState) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  categories,
  brands,
  colors,
  filters,
  onApplyFilters,
}) => {
  const { t } = useTranslation();
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setLocalFilters(filters);
    }
  }, [isOpen, filters]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleFilterChange = (
    section: keyof Omit<FilterState, "search">,
    value: string
  ) => {
    
    setLocalFilters((prev) => {
      const list = prev[section].includes(value)
        ? prev[section].filter((v) => v !== value)
        : [...prev[section], value];
      
      
      return { ...prev, [section]: list };
    });
  };

  // Updated to handle category slugs
  const handleCategoryChange = (categorySlug: string) => {
    handleFilterChange("categories", categorySlug);
  };

  const clearAllFilters = () => {
    setLocalFilters({
      categories: [],
      brands: [],
      colors: [],
      search: filters.search, // Keep search as is
    });
  };

  const applyFilters = () => {
    onApplyFilters(localFilters);
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ease-in-out ${
          isVisible ? "opacity-50" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Modal content */}
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10 font-archivo">
        <div
          className={`relative w-screen max-w-md transform transition-all duration-300 ease-in-out ${
            isVisible ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-5 border-b border-neutral-200">
              <h2 className="text-lg text-neutral-800">{t("filters")}</h2>
              <button onClick={handleClose}>
                <IoClose className="h-6 w-6 text-neutral-800" />
              </button>
            </div>

            {/* Filter sections */}
            <div className="flex-1 overflow-y-auto py-6 px-4">
              {/* Product Type Section - UPDATED TO USE SLUGS */}
              <div className="border-b border-neutral-200 py-4">
                <button
                  className="flex w-full items-center justify-between text-left"
                  onClick={() => toggleSection("type")}
                >
                  <div>
                    <h3 className="text-md text-neutral-800">
                      {t("product_type")}
                    </h3>
                    {localFilters.categories.length > 0 && (
                      <p className="mt-1 text-xs text-neutral-500">
                        {t("selected")}: {localFilters.categories.length}
                      </p>
                    )}
                  </div>
                  {openSection === "type" ? (
                    <IoIosArrowUp className="h-5 w-5 text-neutral-400" />
                  ) : (
                    <IoIosArrowDown className="h-5 w-5 text-neutral-400" />
                  )}
                </button>

                <div
                  className={`mt-4 pl-2 space-y-3 transition-all duration-300 ${
                    openSection === "type" ? "block" : "hidden"
                  }`}
                >
                  {categories.map((category) => {
                    const categorySlug = category.slug || category.name;
                    return (
                      <label key={category.id} className="flex items-center">
                        <input
                          type="checkbox"
                          // Check against slug instead of name
                          checked={localFilters.categories.includes(categorySlug)}
                          // Send slug instead of name
                          onChange={() => handleCategoryChange(categorySlug)}
                          className="h-4 w-4 rounded border-neutral-300"
                        />
                        <span className="ml-3 text-sm text-neutral-800">
                          {/* Still display the name to user */}
                          {category.name}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Brand Section - UPDATED TO USE SLUGS */}
              <div className="border-b border-neutral-200 py-4">
                <button
                  className="flex w-full items-center justify-between text-left"
                  onClick={() => toggleSection("brand")}
                >
                  <div>
                    <h3 className="text-md text-neutral-800">{t("brand")}</h3>
                    {localFilters.brands.length > 0 && (
                      <p className="mt-1 text-xs text-neutral-500">
                        {t("selected")}: {localFilters.brands.length}
                      </p>
                    )}
                  </div>
                  {openSection === "brand" ? (
                    <IoIosArrowUp className="h-5 w-5 text-neutral-400" />
                  ) : (
                    <IoIosArrowDown className="h-5 w-5 text-neutral-400" />
                  )}
                </button>

                <div
                  className={`mt-4 pl-2 space-y-3 transition-all duration-300 ${
                    openSection === "brand" ? "block" : "hidden"
                  }`}
                >
                  {brands.map((brand) => {
                    const brandSlug = brand.slug || brand.name;
                    return (
                      <label key={brand.slug} className="flex items-center">
                        <input
                          type="checkbox"
                          // Check against slug instead of name
                          checked={localFilters.brands.includes(brandSlug)}
                          // Send slug instead of name
                          onChange={() => handleFilterChange("brands", brandSlug)}
                          className="h-4 w-4 rounded border-neutral-300"
                        />
                        <span className="ml-3 text-sm text-neutral-800">
                          {/* Still display the name to user */}
                          {brand.name}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Color Section - UPDATED TO USE SLUGS */}
              <div className="border-b border-neutral-200 py-4">
                <button
                  className="flex w-full items-center justify-between text-left"
                  onClick={() => toggleSection("color")}
                >
                  <div>
                    <h3 className="text-md text-neutral-800">{t("color")}</h3>
                    {localFilters.colors.length > 0 && (
                      <p className="mt-1 text-xs text-neutral-500">
                        {t("selected")}: {localFilters.colors.length}
                      </p>
                    )}
                  </div>
                  {openSection === "color" ? (
                    <IoIosArrowUp className="h-5 w-5 text-neutral-400" />
                  ) : (
                    <IoIosArrowDown className="h-5 w-5 text-neutral-400" />
                  )}
                </button>

                <div
                  className={`mt-4 pl-2 grid grid-cols-2 gap-3 transition-all duration-300 ${
                    openSection === "color" ? "block" : "hidden"
                  }`}
                >
                  {(colors || []).map((color) => {
                    const colorSlug = color.slug || color.name;
                    return (
                      <label key={color.id} className="flex items-center">
                        <input
                          type="checkbox"
                          // Check against slug instead of name
                          checked={localFilters.colors.includes(colorSlug)}
                          // Send slug instead of name
                          onChange={() => handleFilterChange("colors", colorSlug)}
                          className="h-4 w-4 rounded border-neutral-300"
                        />
                        <div className="ml-3 flex items-center">
                          <div
                            className="w-4 h-4 rounded-sm mr-2 border border-neutral-300"
                            style={{ backgroundColor: color.color }}
                          />
                          <span className="text-sm text-neutral-800">
                            {/* Still display the name to user */}
                            {color.name}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="flex flex-col gap-2 border-t border-neutral-200 px-4 py-4">
              <button
                onClick={applyFilters}
                className="bg-neutral-800 px-4 py-2 text-sm text-white hover:bg-neutral-700 transition-colors"
              >
                {t("apply")}
              </button>
              <button
                onClick={clearAllFilters}
                className="border border-neutral-800 px-4 py-2 text-sm text-neutral-800 hover:bg-neutral-100 transition-colors"
              >
                {t("clear_all")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;