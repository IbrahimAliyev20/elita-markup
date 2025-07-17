import Header from "@/src/components/layout/Header";
import React from "react";
import Container from "@/src/components/layout/Container";
import Footer from "@/src/components/layout/Footer";

const SocialMediaPage = () => {
  const instagramPosts = [
    "https://www.instagram.com/p/DL9gKhPNQTD/embed",
    "https://www.instagram.com/p/DL5GEs7NB_f/embed",
    "https://www.instagram.com/p/DLFpUxTtO0j/embed",
    "https://www.instagram.com/p/DLAfeIKtqHa/embed",
    "https://www.instagram.com/p/DL9gKhPNQTD/embed",
    "https://www.instagram.com/p/DL5GEs7NB_f/embed",
    "https://www.instagram.com/p/DLFpUxTtO0j/embed",
    "https://www.instagram.com/p/DLAfeIKtqHa/embed",
  ];

  return (
    <>
      <Container>
        <Header />
      </Container>

      <Container>
        <div className="min-h-screen pt-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-10">
            {instagramPosts.map((postUrl, index) => (
              <div key={index} className="w-full h-[350px] mx-auto rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src={postUrl}
                  className="w-full h-full border-0"
                  allowFullScreen
                  scrolling="no"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                ></iframe>
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

export default SocialMediaPage;