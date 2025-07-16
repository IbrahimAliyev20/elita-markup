import React, { useState, useEffect } from "react";
import BlogCard from "../BlogCard";
import PropTypes from 'prop-types';

const ITEMS_PER_PAGE = 6;

const BlogGrid = ({ blogsData }) => {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(false);
  const posts = blogsData.data;

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 100;
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - threshold;

      if (atBottom && !loading && visibleCount < posts.length) {
        setLoading(true);
        // simulate load delay
        setTimeout(() => {
          setVisibleCount((prev) =>
            Math.min(prev + ITEMS_PER_PAGE, posts.length)
          );
          setLoading(false);
        }, 500);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, visibleCount, posts.length]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-14">
      {posts.slice(0, visibleCount).map((post) => (
        <BlogCard
          key={post.slug}
          title={post.title}
          imageUrl={post.image}
          excerpt={post.description.replace(/<[^>]*>/g, "").substring(0, 100)}
          slug={post.slug}
        />
      ))}

      {loading && (
        <div className="col-span-full flex justify-center mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-gray-600"></div>
        </div>
      )}
    </div>
  );
};

BlogGrid.propTypes = {
  blogsData: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
      })
    ).isRequired,
    links: PropTypes.object,
    meta: PropTypes.object,
  }).isRequired,
};

export default BlogGrid;