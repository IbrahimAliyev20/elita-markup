"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Container from "../Container";
import { getSocialMedia } from "@/pages/api/services/fetchSocialMedia";
import { Category, IntroServiceData, SocialMedia } from "@/src/types";
import { fetchCategories } from "@/pages/api/services/fetchCategories";
import { fetchIntroCategories } from "@/pages/api/services/fetchIntroCategories";

export default function Footer() {
  const { t } = useTranslation();
  const [socialmedia, setSocialMedia] = useState<SocialMedia[]>([]);
  const [categoryproduct, setCategoryProduct] = useState<Category[]>([]);
  const [category, setCategory] = useState<IntroServiceData[]>([]);

  useEffect(() => {
    const fetchProductCategoryData = async () => {
      try {
        const data = await fetchCategories();
        if (data) {
          setCategoryProduct(data);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategoryProduct([]);
      }
    };
    fetchProductCategoryData();
  }, []);

  useEffect(() => {
    const fetchSocialData = async () => {
      try {
        const data = await getSocialMedia();
        if (data) {
          setSocialMedia(data);
        }
      } catch (error) {
        console.error("Failed to fetch social media:", error);
        setSocialMedia([]);
      }
    };
    fetchSocialData();
  }, []);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const data = await fetchIntroCategories();
        if (data) {
          setCategory(data);
        }
      } catch (error) {
        console.error("Failed to fetch intro categories:", error);
        setCategory([]);
      }
    };
    fetchCategoryData();
  }, []);

 
  return (
    <footer className="bg-[#545C56] text-white pt-12 pb-8">
      <Container>
        <div className="border-t border-white/20"></div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 py-12">
          <div className="md:col-span-1">
            <Image
              src="/images/logo/logo-elita2.png"
              alt="Elita Group Logo"
              width={120}
              height={40}
              className="w-[120px] h-auto brightness-0 invert mb-4"
            />
            <div className=" flex   justify-start items-center space-x-4">
              {socialmedia?.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={24}
                    height={24}
                    className="w-5 h-5 object-cover"
                  />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-base mb-6">
              {t("design")}
            </h3>
            <ul className="space-y-3">
              {category
                .find((cat) => cat.slug === "dizayn")
                ?.information.map((info) => (
                  <li key={info.title}>
                    <Link
                      href="/dizayn"
                      className="text-gray-300 hover:text-white text-sm transition-colors"
                    >
                      {info.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-base mb-6">
              {t("repair_construction")}
            </h3>
            <ul className="space-y-3">
              {category
                .find((cat) => cat.slug === "temir-tikinti") 
                ?.information.map((info) => (
                  <li key={info.title}>
                    <Link
                      href="/temir"
                      className="text-gray-300 hover:text-white text-sm transition-colors"
                    >
                      {info.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-base mb-6">
              {t("furniture")}
            </h3>
            <ul className="space-y-3">
              {category
                .find((cat) => cat.slug === "mebel")
                ?.information.map((info) => (
                  <li key={info.title}>
                    <Link
                      href="/mebel"
                      className="text-gray-300 hover:text-white text-sm transition-colors"
                    >
                      {info.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-base mb-6">
              {t("bath_accessories")}
            </h3>
            <ul className="space-y-3">
              {categoryproduct.map((item, index) => (
                <li key={index}>
                  <Link
                    href={`/category/${item.slug}`}
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-base mb-6">
              {t("footer.elita")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/haqqimizda"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/elaqe"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  {t("contact")}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  {t("blog")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              {t("footer.copyright")}
            </div>
            <div className="text-center md:text-right">
              <Link
                href="https://markup.az/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                {t("footer.made_by")}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}