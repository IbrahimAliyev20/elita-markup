import React, { FC, useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useRouter, NextRouter } from "next/router";
import { BsChevronDown } from "react-icons/bs";
type Language = "AZ" | "EN" | "RU";

const LanguageSwitcher: FC = () => {
  const { i18n } = useTranslation();
  const router: NextRouter = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    (router.locale?.toUpperCase() as Language) || "AZ"
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (language: Language) => {
    if (language === selectedLanguage) return;
    setSelectedLanguage(language);
    i18n.changeLanguage(language.toLowerCase());
    localStorage.setItem("selectedLanguage", language);
    setIsDropdownOpen(false);
    router.push(router.asPath, router.asPath, {
      locale: language.toLowerCase(),
    });
  };

  useEffect(() => {
    const saved =
      (localStorage.getItem("selectedLanguage") as Language) || "AZ";
    setSelectedLanguage(saved);
    i18n.changeLanguage(saved.toLowerCase());
  }, [i18n]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}
      ref={dropdownRef}
    >
      <button
        id="dropdownLanguageButton"
        type="button"
        className="px-2 flex items-center justify-center gap-2 py-1 text-base font-gilroy focus:outline-none"
      >
        {selectedLanguage}
        <BsChevronDown
          className={`
            text-xs transform-gpu origin-center
            transition-all duration-500 ease-out
            ${isDropdownOpen ? "rotate-180 scale-110" : "rotate-0 scale-100"}
          `}
        />
      </button>

      <div
        className={`
          absolute z-[999] w-28 mt-2 font-gilroy bg-white
          md:border md:border-gray-300 md:rounded-sm md:shadow-lg md:p-2
          transition-all duration-300 ease-in-out
          ${
            isDropdownOpen
              ? "opacity-100 translate-y-0 visible"
              : "opacity-0 -translate-y-4 invisible"
          }
          md:left-1/2 md:-translate-x-1/2
        `}
      >
        <ul className="py-1">
          {["AZ", "EN", "RU"].map((lang) => (
            <li
              key={lang}
              onClick={() => handleLanguageChange(lang as Language)}
              className={`
                px-4 py-2 cursor-pointer rounded
                hover:bg-amber-50  hover:text-amber-600 text-base transition-colors
                ${
                  selectedLanguage === lang
                    ? "text-neutral-700 font-semibold"
                    : "text-neutral-700"
                }
              `}
            >
              {lang}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
