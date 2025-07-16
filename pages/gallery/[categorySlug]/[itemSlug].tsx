import { GetServerSideProps, NextPage } from "next";
import { IntroServiceInformation } from "@/src/types";
import Image from "next/image";
import Link from "next/link";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import Container from "@/src/components/layout/Container";
import { getBanner } from "@/pages/api/services/fetchBanner";

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

interface GalleryItemPageProps {
  item: IntroServiceInformation | null;
}

const GalleryItemPage: NextPage<GalleryItemPageProps> = ({ item }) => {
  if (!item) {
    return (
      <>
        <Container>
          <Header />
        </Container>
        <div className="text-center py-20 text-xl">Məlumat tapılmadı.</div>
        <Container>
          <Footer />
        </Container>
      </>
    );
  }

  const images = [item.image_1, item.image_2, item.image_3].filter(Boolean);

  return (
    <>
      <Container>
        <Header />
      </Container>

      <Container>
        <div className="py-20">
        <h1 className="text-3xl md:text-4xl font-medium text-gray-800 mb-8 md:mb-12">
          {item.title}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {images.map((src, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg shadow-md aspect-square"
            >
              <Image
                src={src}
                alt={`${item.title} - şəkil ${index + 1}`}
                width={600}
                height={600}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>

        </div>

        
      </Container>

      <Container>
        <Footer />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { categorySlug, itemSlug } = context.params as {
      categorySlug: string;
      itemSlug: string;
    };

    const categoryData = await getBanner(categorySlug);

    const item = categoryData.information.find(
      (info) => slugify(info.title || "") === itemSlug
    );

    return {
      props: {
        item: item || null, 
      },
    };
  } catch (error) {
    console.error("Single gallery item fetch error:", error);
    return {
      props: { item: null },
    };
  }
};

export default GalleryItemPage;
