// pages/about.tsx

import React from "react";
import Breadcrumb from "@/src/components/layout/Breadcrumb";
import Container from "@/src/components/layout/Container";
import Footer from "@/src/components/layout/Footer";
import Header from "@/src/components/layout/Header";
import ContactBanner from "@/src/components/ProjectDetailed/ContactBanner";
import { getContactInfo } from "./api/services/contactService";
import { getMetaByTitle } from "./api/services/fetchMeta";
import { ContactData, MetaTag } from "@/src/types";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useTranslation } from "react-i18next";
interface AboutPageProps {
  contactData: ContactData | null;
  metaData: MetaTag | null;
}

export default function About({ contactData, metaData }: AboutPageProps) {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{"Elita Group | " + t("contactDetails.contact")}</title>
        <meta
          name="description"
          content={metaData?.meta_description || "Contact page"}
        />
        <meta name="keywords" content={metaData?.meta_keyword || "about"} />
        <meta name="author" content="https://markup.az/" />
      </Head>
      <Container>
        <Header />
        <Breadcrumb />
      </Container>
      <ContactBanner contactData={contactData} />
      <iframe
  src={contactData?.map || ""}
        width="100%"
        height="100%"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-[250px] md:h-[400px] mt-4"
      >
      </iframe>

      <Container>
        <Footer />
      </Container>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const lang = context.locale || "az";
  try {
    const [contactData, metaData] = await Promise.all([
      getContactInfo(lang),
      getMetaByTitle("Contact", lang),
    ]);
    if (!contactData) {
      return { notFound: true };
    }
    return {
      props: {
        contactData,
        metaData,
      },
    };
  } catch (error) {
    console.error("Error fetching About page data:", error);
    return {
      props: {
        contactData: null,
        metaData: null,
      },
    };
  }
}
