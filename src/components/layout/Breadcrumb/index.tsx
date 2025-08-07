import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

interface BreadcrumbProps {
  title?: string;
  parentTitle?: string;
}

function Breadcrumb({ title, parentTitle }: BreadcrumbProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const pathSegments = router.asPath
    .split("/")
    .filter((segment) => segment !== "");

  if (pathSegments.length === 0) {
    return null;
  }

  const pathDisplayNames: Record<string, string> = {
    dizayn: t("design"),
    hamam: t("bath_accessories"),
    brendler: t("brands"),
    gallery: t("gallery"),
    blog: t("blog"),
  };

  const isBrendlerPage = pathSegments[0] === "brendler";

  type Crumb = { displayName: string; path: string; isLast: boolean };

  let breadcrumbItems: Crumb[] = [];

  if (isBrendlerPage && pathSegments.length >= 2) {
    breadcrumbItems.push({
      displayName: parentTitle ?? t("bath_accessories"),
      path: "/hamam",
      isLast: false,
    });

    const lastSlug = pathSegments[1];
    breadcrumbItems.push({
      displayName: title ?? lastSlug,
      path: "/" + pathSegments.join("/"),
      isLast: true,
    });
  } else {
    breadcrumbItems = pathSegments.map((segment, index) => {
      const accumulatedPath = "/" + pathSegments.slice(0, index + 1).join("/");
      const isLast = index === pathSegments.length - 1;

      if (isLast && title) {
        return {
          displayName: title,
          path: accumulatedPath,
          isLast: true,
        };
      }

      const displayName = pathDisplayNames[segment] || segment;
      return {
        displayName,
        path: accumulatedPath,
        isLast,
      };
    });

    if (parentTitle && breadcrumbItems.length > 1) {
      breadcrumbItems[breadcrumbItems.length - 2].displayName = parentTitle;
    }
  }

  return (
    <div className="flex items-center gap-2 py-4 flex-wrap mt-20">
      <Link
        href="/"
        className="font-manrope text-base font-normal leading-6 text-textBase hover:text-amber-700 transition-colors"
      >
        {t("contactDetails.home")}
      </Link>
      <ChevronIcon />

      {breadcrumbItems.map((item, idx) => (
        <React.Fragment key={idx}>
          {item.isLast ? (
            <span className="font-manrope text-base font-normal leading-6 text-amber-700">
              {item.displayName &&
                item.displayName.charAt(0).toUpperCase() +
                  item.displayName.slice(1)}
            </span>
          ) : (
            <>
              <Link
                href={item.path}
                className="font-manrope text-base font-normal leading-6 text-textBase hover:text-amber-700 transition-colors"
              >
                {item.displayName}
              </Link>
              <ChevronIcon />
            </>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

const ChevronIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 18L15 12L9 6"
      stroke="#18181B"
      strokeLinecap="square"
      strokeLinejoin="round"
    />
  </svg>
);

export default Breadcrumb;
