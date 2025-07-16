// pages/bathroom/[slug].tsx

import { GetServerSideProps, GetServerSidePropsContext } from "next";
import ProductSingle from "@/src/components/Bathroom/ProductSingle";
import Breadcrumb from "@/src/components/layout/Breadcrumb";
import Container from "@/src/components/layout/Container";
import Footer from "@/src/components/layout/Footer";
import Header from "@/src/components/layout/Header";
import { Product } from "@/src/types";
import { fetchProductBySlug } from "../api/services/fetchProducts";
import Head from "next/head";
import { getContactInfo } from "../api/services/contactService";

interface BathroomDetailedProps {
  product: Product;
  phone: string;
}

const BathroomDetailed = ({ product  ,phone}: BathroomDetailedProps) => {
  return (
    <>
       <Head>
        <meta name="author" content="https://markup.az/" />
        <title>{"Elita Group | " + product.title}</title>
      </Head>
      <Container>
        <Header activeItem="hamam" />
      </Container>

      <Container>
        <Breadcrumb />
      </Container>

      <Container>
        <ProductSingle product={product} phone={phone} />
      </Container>

      <Container>
        <Footer />
      </Container>
    </>
  );
};

export default BathroomDetailed;

export const getServerSideProps: GetServerSideProps<
  BathroomDetailedProps
> = async (context: GetServerSidePropsContext) => {
  const slugParam = context.params?.slug;
  const lang = context.locale || "az"; 
  if (typeof slugParam !== "string") {
    return { notFound: true };
  }

  try {
    const product = await fetchProductBySlug(slugParam, lang);
    const contact = await getContactInfo(lang);
     const phone = contact.phone || "";
    return {
      props: {
        product,
         phone,
      },
    };
  } catch (err) {
    console.error(err);
    return { notFound: true };
  }
};
