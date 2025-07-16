// pages/blog/index.tsx
import React from "react";
import Hero from "@/src/components/BlogPage/Hero";
import BlogGrid from "@/src/components/BlogPage/BlogGrid";
import Breadcrumb from "@/src/components/layout/Breadcrumb";
import Container from "@/src/components/layout/Container";
import Footer from "@/src/components/layout/Footer";
import Header from "@/src/components/layout/Header";
import { BlogApiResponse, BreadcrumbsApiResponse, MetaTag } from "@/src/types";
import { getBlogsData } from "../api/services/blogsService";
import { getMetaByTitle } from "../api/services/fetchMeta";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { fetchBreadcrumbs } from "../api/services/fetchBreadcrumbs";
import { useTranslation } from "react-i18next";

interface BlogPageProps {
  blogsData: BlogApiResponse;
  metaData: MetaTag | null;
  breadcrumbs: BreadcrumbsApiResponse | null;
}

export default function Blog({ blogsData, metaData, breadcrumbs }: BlogPageProps) {
  const blogBreadcrumb = breadcrumbs?.data?.find(item => item.title === "Blog");
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{"Elita Group | " + t("contactDetails.blog")}</title>
        <meta
          name="description"
          content={metaData?.meta_description || "Our latest articles"}
        />
        <meta name="keywords" content={metaData?.meta_keyword || "blog"} />
        <meta name="author" content="https://markup.az/" />
      </Head>

      <Container>
        <Header />
        <Breadcrumb />
      </Container>

      <Hero blogBreadcrumb={blogBreadcrumb} />

      <Container>
        <BlogGrid blogsData={blogsData} />
      </Container>

      <Container>
        <Footer />
      </Container>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const lang = context.locale || "az";

  try {
    const [blogsData, metaData, breadcrumbs] = await Promise.all([
      getBlogsData(lang),
      getMetaByTitle("Blog", lang),
      fetchBreadcrumbs(lang),
    ]);

    return {
      props: {
        blogsData,
        metaData,
        breadcrumbs,
      },
    };
  } catch (error) {
    console.error("Error fetching Blog page data:", error);

    return {
      props: {
        blogsData: null,
        metaData: null,
      },
    };
  }
}
