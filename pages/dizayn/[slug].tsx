import Breadcrumb from "@/src/components/layout/Breadcrumb";
import Container from "@/src/components/layout/Container";
import Footer from "@/src/components/layout/Footer";
import Header from "@/src/components/layout/Header";
import ContactBanner from "@/src/components/ProjectDetailed/ContactBanner";
import ProjectDetails from "@/src/components/ProjectDetailed/ProjectDetails";
import ProjectImages from "@/src/components/ProjectDetailed/ProjectImages";
import ProjectVideo from "@/src/components/ProjectDetailed/ProjectVideo";
import React from "react";
import { getContactInfo } from "../api/services/contactService";
import { Category, ContactData, ServiceItem } from "@/src/types";
import Hero from "@/src/components/ProjectDetailed/Hero.tsx";
import { getSingleService } from "../api/services/fetchServices";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { fetchIntroServices } from "../api/services/fetchIntroCategories";

interface ProjectDetailedProps {
  contactData: ContactData | null;
  serviceData: ServiceItem | null;
  categories: Category[] | null;
}

export default function ProjectDetailed({
  contactData,
  serviceData,
  categories,
}: ProjectDetailedProps) {
  if (!serviceData) {
    return <div>Loading...</div>;
  }

  const firstCategoryDescription = categories?.[0]?.service_description || "";
  return (
    <>
      <Head>
        <meta name="author" content="https://markup.az/" />
        <title>{"Elita Group | " + serviceData.title}</title>
      </Head>
      <Container>
        <Header activeItem="dizayn" />
      </Container>
      <Container>
        <Breadcrumb title={serviceData.title} />
      </Container>
      <Hero
        title={serviceData.title}
        image={serviceData.image}
        short_description={serviceData.short_description}
      />
      <Container>
        <ProjectDetails description={firstCategoryDescription} />
        <ProjectVideo videoUrl={serviceData.video} />
        <ProjectImages images={serviceData.images} />
      </Container>

      <ContactBanner contactData={contactData} />
      <Container>
        <Footer />
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const { slug } = context.params as { slug: string };
    const lang = context.locale || "az";

    const [contactData, serviceData, categories] = await Promise.all([
      getContactInfo(lang),
      getSingleService(slug, lang),
      fetchIntroServices(lang),
    ]);

    if (!contactData || !serviceData) {
      return { notFound: true };
    }

    return {
      props: {
        contactData: contactData || null,
        serviceData: serviceData || null,
        categories: categories || null,
      },
    };
  } catch (error) {
    console.error("Error fetching ProjectDetailed page data:", error);
    return {
      notFound: true,
    };
  }
};
