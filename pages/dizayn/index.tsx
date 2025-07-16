// pages/design.tsx
import Hero from "@/src/components/DesignPage/Hero";
import Container from "@/src/components/layout/Container";
import Header from "@/src/components/layout/Header";
import React from "react";
import AboutSection from "@/src/components/DesignPage/AboutSection";
import ServicesSection from "@/src/components/DesignPage/ServicesSection";
import ServicesSlider from "@/src/components/DesignPage/ServicesSlider";
import Footer from "@/src/components/layout/Footer";
import { BannerItem, Category, ServiceData } from "@/src/types";
import { fetchServices } from "../api/services/fetchServices";
import { getBanner } from "../api/services/fetchBanner";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import { fetchIntroServices } from "../api/services/fetchIntroCategories";

interface InformationItem {
  title: string;
  description: string;
  image_1: string;
  image_2: string;
  image_3: string;
  thumb_image_1: string;
  thumb_image_2: string;
  thumb_image_3: string;
}

interface DesignPageProps {
  services: ServiceData[];
  bannerData: BannerItem & {
    information: InformationItem[];
  };
  categories: Category[];
}

function Design({ services, bannerData, categories }: DesignPageProps) {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <meta name="author" content="https://markup.az/" />
        <title>{"Elita Group | " + t("contactDetails.design")}</title>
      </Head>
      <Container>
        <Header activeItem="dizayn" />
      </Container>
      <Hero
        title={bannerData.title}
        image={bannerData.image}
        video={bannerData.video}
        // description={bannerData.description}
      />

      <Container>
        <AboutSection information={bannerData.information} />
      </Container>
      <Container>
        <ServicesSection
          description={categories[0]?.service_description || ""}
        />
        <ServicesSlider services={services} />
        <Footer />
      </Container>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const lang = context.locale || "az";
  try {
    const slug = "dizayn";
    const services = await fetchServices(lang);
    const bannerData = await getBanner(slug, lang);
    const categories = await fetchIntroServices(lang);
    return {
      props: {
        services,
        bannerData,
        categories,
      },
    };
  } catch (error) {
    console.error("Error fetching services:", error);
    return {
      props: {
        services: [],
        bannerData: {
          title: "",
          image: "",
          video: "",
          description: "",
          information: [],
        },
        categories: [],
      },
    };
  }
}

export default Design;
