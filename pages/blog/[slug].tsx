import Breadcrumb from "@/src/components/layout/Breadcrumb";
import Container from "@/src/components/layout/Container";
import Footer from "@/src/components/layout/Footer";
import Header from "@/src/components/layout/Header";
import BlogDetails from "@/src/components/BlogPage/BlogDetailed";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { BlogItem } from "@/src/types";
import { getSingleBlogData } from "../api/services/blogsService";
import Head from "next/head";
interface BlogDetailedProps {
  blog: BlogItem;
}

function BlogDetailed({ blog }: BlogDetailedProps) {
  return (
    <>
      <Head>
        <meta name="author" content="https://markup.az/" />
        <meta
          name="description"
          content={blog?.title || "Our latest articles"}
        />
        <title>{"Elita Group | " + blog.title}</title>
      </Head>
      <Container>
        <Header />
        <Breadcrumb />
        <BlogDetails blog={blog} />
        <Footer />
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const lang = context.locale || "az";
  const slug = context.params?.slug as string;

  try {
    const blog = await getSingleBlogData(slug, lang);
    if (!blog) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        blog,
      },
    };
  } catch (error) {
    console.error("Failed to fetch blog post:", error);
    return {
      notFound: true,
    };
  }
};

export default BlogDetailed;
