// pages/about.tsx
import React from "react";
import AboutDetails from "@/src/components/AboutPage/AboutDetails";
import Faq from "@/src/components/AboutPage/Faq";
import Hero from "@/src/components/AboutPage/Hero";
import MissionAndVision from "@/src/components/AboutPage/MissionAndVision";
import Breadcrumb from "@/src/components/layout/Breadcrumb";
import Container from "@/src/components/layout/Container";
import Footer from "@/src/components/layout/Footer";
import Header from "@/src/components/layout/Header";
import ContactBanner from "@/src/components/ProjectDetailed/ContactBanner";
import { getAboutData } from "./api/services/aboutServices";
import { getMissionData } from "./api/services/servicesService";
import { getFaqData } from "./api/services/faqService";
import { getContactInfo } from "./api/services/contactService";
import {
  AboutData,
  MissionData,
  FaqData,
  ContactData,
  MetaTag,
  BreadcrumbsApiResponse,
} from "@/src/types";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { getMetaByTitle } from "./api/services/fetchMeta";
import { fetchBreadcrumbs } from "./api/services/fetchBreadcrumbs";
import { useTranslation } from "react-i18next";

interface AboutPageProps {
  aboutData: AboutData | null;
  missionData: MissionData[] | null;
  faqData: FaqData[] | null;
  contactData: ContactData | null;
  metaData: MetaTag | null;
  breadcrumbs: BreadcrumbsApiResponse | null;
}

export default function About({
  aboutData,
  missionData,
  faqData,
  contactData,
  metaData,
  breadcrumbs,
}: AboutPageProps) {
  const aboutBreadcrumb = breadcrumbs?.data?.find(
    (item) => item.title === "About"
  );
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{"Elita Group | " + t("contactDetails.about")}</title>
        <meta
          name="description"
          content={metaData?.meta_description || "About page"}
        />
        <meta name="keywords" content={metaData?.meta_keyword || "about"} />
        <meta name="author" content="https://markup.az/" />
      </Head>
      <Container>
        <Header />
        <Breadcrumb />
      </Container>

      <Hero aboutBreadcrumb={aboutBreadcrumb} data={aboutData} />

      <Container>
        {aboutData && <AboutDetails data={aboutData} />}

        {aboutData && (
          <MissionAndVision aboutData={aboutData} data={missionData} />
        )}

        {faqData && <Faq data={faqData} />}
      </Container>

      <ContactBanner contactData={contactData} />

      <Container>
        <Footer />
      </Container>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const lang = context.locale || "az";

  try {
    const [
      aboutData,
      missionData,
      faqData,
      contactData,
      metaData,
      breadcrumbs,
    ] = await Promise.all([
      getAboutData(lang),
      getMissionData(lang),
      getFaqData(lang),
      getContactInfo(lang),
      getMetaByTitle("About", lang),
      fetchBreadcrumbs(lang),
    ]);

    if (!contactData) {
      return { notFound: true };
    }

    return {
      props: {
        aboutData: aboutData || null,
        missionData: missionData || null,
        faqData: faqData || null,
        contactData: contactData || null,
        metaData: metaData || null,
        breadcrumbs: breadcrumbs || null,
      },
    };
  } catch (error) {
    console.error("Error fetching About page data:", error);
    return {
      props: {
        aboutData: null,
        missionData: null,
        faqData: null,
        contactData: null,
        metaData: null,
        breadcrumbs: null,
      },
    };
  }
}
