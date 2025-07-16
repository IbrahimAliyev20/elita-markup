import IntroSection from "@/src/components/IntroSection";
import { IntroServiceData } from "@/src/types";
import { fetchIntroServices } from "./api/services/fetchIntroCategories";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";

interface HomeProps {
  introData: IntroServiceData[];
}

export default function Home({ introData }: HomeProps) {

  return (
    <>
      <Head>
        <meta name="author" content="https://markup.az/" />
        <title>{ "Elita Group"}</title>
      </Head>
      <main>
        <IntroSection introData={introData} />
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const lang = context.locale || "az";
  try {
    const introData = await fetchIntroServices(lang);

    if (!introData) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        introData,
      },
    };
  } catch (error) {
    console.error("Error fetching intro services:", error);
    return {
      props: {
        introData: [],
      },
    };
  }
}
