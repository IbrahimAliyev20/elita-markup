import React from "react";
import { GetServerSideProps, NextPage } from "next";

import Breadcrumb from "@/src/components/layout/Breadcrumb";
import Container from "@/src/components/layout/Container";
import Footer from "@/src/components/layout/Footer";
import Header from "@/src/components/layout/Header";
import Image from "next/image";
import { GalleryCardList } from "@/src/components/GaleryPage/GaleryCardlist";

import { GalleryCategory } from "@/src/types";
import { getGallery } from "./api/services/gallery";
import { useTranslation } from "react-i18next";

interface GalleryPageProps {
  categories: GalleryCategory[];
}

const Galery: NextPage<GalleryPageProps> = ({ categories }) => {
  const { t } = useTranslation();
  return (
    <>
      <Container>
        <Header />
        <Breadcrumb />
      </Container>
      <div>
        <div className="relative w-full h-[300px] md:h-[620px] bg-gray-200">
          <Image
            width={1920}
            height={620}
            priority
            src="/images/logo/galeryhero.jpg"
            alt="Qalereya başlığı"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/25"></div>
          <div className="relative z-10 flex items-center justify-center h-full">
            <h1 className="text-white font-archivo text-5xl md:text-8xl font-normal">
              {t("gallery")}
            </h1>
          </div>
        </div>
      </div>
      <Container>
        <div className="flex flex-col items-center justify-center py-10">
          <GalleryCardList categories={categories} />
        </div>
      </Container>
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const lang = context.locale || "az";

    const response = await getGallery(lang);

    const categoriesToShow = response.data;

    return {
      props: {
        categories: categoriesToShow,
      },
    };
  } catch (error) {
    console.error("Gallery page data fetch error:", error);
    return {
      props: {
        categories: [],
      },
    };
  }
};

export default Galery;
