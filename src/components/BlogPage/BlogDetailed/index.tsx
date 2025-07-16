// src/components/BlogPage/BlogDetailed.tsx
import Image from "next/image";
import React from "react";
import { BlogItem } from "@/src/types";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { LuInstagram } from "react-icons/lu";
import { useTranslation } from "react-i18next";

interface BlogDetailsProps {
  blog: BlogItem;
}

function BlogDetails({ blog }: BlogDetailsProps) {
  const { t } = useTranslation();
  const dateString = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleSocialShare = (platform: string) => {
    const currentUrl = encodeURIComponent(window.location.href);
    // const title = encodeURIComponent(blog.title);

    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`;
        break;
      case "instagram":
        shareUrl = "https://instagram.com";
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank");
  };

  return (
    <div className="flex flex-col gap-6 font-manrope pb-10">
      <h1 className="text-textBase text-xl md:text-2xl font-medium text-center">
        {blog.title}
      </h1>

      <Image
        src={blog.image}
        alt={blog.title}
        width={1000}
        height={500}
        className="w-full h-[240px] md:h-[440px] object-cover rounded-lg"
        priority
      />

      <p className="text-elementSecondaryDate text-base font-normal leading-6 text-right">
        {dateString}
      </p>

      <div
        className="text-elementSecondaryDate text-base font-normal leading-6"
        dangerouslySetInnerHTML={{ __html: blog.description }}
      />

      <div className="flex gap-5 items-center justify-end ">
        <p className="text-elementSecondaryDate text-lg font-normal leading-6">
          {t("share")} :
        </p>
        <button
          onClick={() => handleSocialShare("instagram")}
          aria-label="Share on Instagram"
          className="hover:opacity-80 transition-opacity cursor-pointer"
        >
          <LuInstagram className="text-2xl text-neutral-800" />
        </button>
        <button
          onClick={() => handleSocialShare("facebook")}
          aria-label="Share on Facebook"
          className="hover:opacity-80 transition-opacity cursor-pointer"
        >
          <FaFacebookF className="text-2xl text-neutral-800" />
        </button>
        <button
          onClick={() => handleSocialShare("linkedin")}
          aria-label="Share on LinkedIn"
          className="hover:opacity-80 transition-opacity cursor-pointer"
        >
          <FaLinkedinIn className="text-2xl text-neutral-800" />
        </button>
      </div>
    </div>
  );
}

export default BlogDetails;
