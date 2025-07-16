import Hero from "@/src/components/DesignPage/Hero";
import Container from "@/src/components/layout/Container";
import Header from "@/src/components/layout/Header";
import React from "react";
import AboutSection from "@/src/components/DesignPage/AboutSection";
import Footer from "@/src/components/layout/Footer";
import { getBanner } from "../api/services/fetchBanner";
import { BannerItem } from "@/src/types";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useTranslation } from "react-i18next";

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

interface ConstructionProps {
  bannerData: BannerItem & {
    information: InformationItem[];
  };
}

function Construction({ bannerData }: ConstructionProps) {
  const { t } = useTranslation();
  return (
    <>
       <Head>
        <meta name="author" content="https://markup.az/" />
        <title>{"Elita Group | " + t("contactDetails.repair_construction")}</title>
      </Head>
      <Container>
        <Header activeItem="temir" />
      </Container>
      <Hero
        title={bannerData.title}
        image={bannerData.image}
        video={bannerData.video}
      />

      <Container>
        <AboutSection information={bannerData.information} />
      </Container>
      <Container>
        <Footer />
      </Container>
    </>
  );
}

export default Construction;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const lang = context.locale || "az";
  try {
    const slug = "temir-tikinti";
    const bannerData = await getBanner(slug, lang);

    return {
      props: {
        bannerData,
      },
    };
  } catch (error) {
    console.error("Error fetching banner data:", error);
    return {
      props: {
        bannerData: {
          title: "",
          image: "",
          video: "",
          description: "",
          information: [],
        }, // Default empty state
      },
    };
  }
}
