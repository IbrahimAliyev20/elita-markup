import React from "react";
import { GetServerSideProps, NextPage } from "next";

import Header from "@/src/components/layout/Header";
import Container from "@/src/components/layout/Container";
import Footer from "@/src/components/layout/Footer";
import { InstagramLink } from "@/src/types"; 
import { getInstagramLinks } from "../api/services/instagramlinks";

interface SocialMediaPageProps {
  posts: InstagramLink[];
}

const SocialMediaPage: NextPage<SocialMediaPageProps> = ({ posts }) => {
  return (
    <>
      <Container>
        <Header />
      </Container>

      <Container>
        <div className="min-h-screen pt-20">
          {posts.length === 0 ? (
            <div className="text-center text-xl text-gray-500">
              Heç bir Instagram postu tapılmadı.
            </div>
          ) : (
            <div className="grid grid-cols-1 h-full sm:grid-cols-2 md:grid-cols-3 gap-8 py-10">
              {posts.map((post, index) => (
                <div
                  key={index}
                  className="w-full h-[600px] mx-auto rounded-lg overflow-hidden shadow-lg"
                >
                  <iframe
                    src={`${post.link}embed`} 
                    className="w-full h-full border-0"
                    allowFullScreen
                    scrolling="no"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  ></iframe>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>

      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const lang = context.locale || "az";
    const response = await getInstagramLinks(lang);

    return {
      props: {
        posts: response.data || [], 
      },
    };
  } catch (error) {
    console.error("Instagram links fetch error:", error);
    return {
      props: {
        posts: [],
      },
    };
  }
};

export default SocialMediaPage;