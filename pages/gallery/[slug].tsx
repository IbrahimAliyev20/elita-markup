import React, { useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import Container from "@/src/components/layout/Container";
import { ImageModal } from "@/src/components/modals/ImageModal";
import { GalleryItem } from "@/src/types";
import { getGalleryBySlug } from "@/pages/api/services/gallery";

interface GalleryDetailPageProps {
  galleryItems: GalleryItem[];
}

const GalleryDetailPage: NextPage<GalleryDetailPageProps> = ({ galleryItems }) => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  if (!galleryItems || galleryItems.length === 0) {
    return (
      <>
        <Container>
          <Header />
        </Container>
        <div className="text-center py-20 text-xl">Məlumat tapılmadı.</div>
        <Footer />
      </>
    );
  }

  const categoryTitle = galleryItems[0].category ;
  console.log(galleryItems)
  return (
    <>
      <Container>
        <Header />
      </Container>

      <Container>
        <div className="py-10 md:py-25">
          <h1 className="text-3xl md:text-4xl font-medium text-gray-800 mb-8 md:mb-12 text-start">
            {categoryTitle}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {galleryItems.map((item, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg shadow-md aspect-square cursor-pointer group"
                onClick={() => setSelectedItem(item)} 
              >
                <Image
                  src={item.thumb_cover} 
                  alt={item.category}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>

      <Footer />

      <ImageModal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)} 
        beforeImage={selectedItem?.before || null} 
        afterImage={selectedItem?.after || null}   
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { slug } = context.params as { slug: string };
    const lang = context.locale || 'en';

    console.log(` slug: '${slug}', lang: '${lang}' `);

    const response = await getGalleryBySlug(slug, lang);

    console.log(" Data:", JSON.stringify(response.data, null, 2));

    return {
      props: {
        galleryItems: response.data || [],
      },
    };
  } catch (error) {
    console.error("Single gallery detail fetch error:", error);
    return {
      props: { galleryItems: [] },
    };
  }
};

export default GalleryDetailPage;