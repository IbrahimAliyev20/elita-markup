import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

interface BreadcrumbProps {
  title?: string; // Optional override for the current page’s title
  parentTitle?: string; // Optional override for the parent crumb’s title
}

function Breadcrumb({ title, parentTitle }: BreadcrumbProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const pathSegments = router.asPath
    .split("/")
    .filter((segment) => segment !== "");

  // If there are no segments at all, don’t render anything
  if (pathSegments.length === 0) {
    return null;
  }

  // Mapping of “normal” top-level segments → display names
  const pathDisplayNames: Record<string, string> = {
    dizayn: t("design"),
    hamam: t("bath_accessories"),
    brendler: t("brands"),
    // …add more mappings if needed
  };

  // If the first segment is “brendler”, we want to force the parent crumb
  // to be “Hamam Aksesuarları” (and link to “/hamam”), even though the URL is /brendler/slug
  const isBrendlerPage = pathSegments[0] === "brendler";

  // Build an explicit array of breadcrumb items:
  // – each item is { displayName, path, isLast }
  //
  // For `/brendler/alcadrain`:
  //   breadcrumbItems === [
  //     { displayName: "Hamam Aksesuarları", path: "/hamam", isLast: false },
  //     { displayName: "alcadrain",       path: "/brendler/alcadrain", isLast: true }
  //   ]
  //
  // Otherwise, fall back to “split-and-map” logic.
  type Crumb = { displayName: string; path: string; isLast: boolean };

  let breadcrumbItems: Crumb[] = [];

  if (isBrendlerPage && pathSegments.length >= 2) {
    // Parent crumb: “Hamam Aksesuarları” → /hamam
    breadcrumbItems.push({
      displayName: parentTitle ?? t("bath_accessories"),
      path: "/hamam",
      isLast: false,
    });

    // Last crumb: show the slug (or use `title` prop if provided)
    const lastSlug = pathSegments[1];
    breadcrumbItems.push({
      displayName: title ?? lastSlug,
      path: "/" + pathSegments.join("/"),
      isLast: true,
    });
  } else {
    // Generic case: split on “/” and map each segment one by one.
    breadcrumbItems = pathSegments.map((segment, index) => {
      const accumulatedPath = "/" + pathSegments.slice(0, index + 1).join("/");
      const isLast = index === pathSegments.length - 1;

      // If this is the very last, and `title` was passed in, use that
      if (isLast && title) {
        return {
          displayName: title,
          path: accumulatedPath,
          isLast: true,
        };
      }

      // Otherwise, look up a friendly name or fall back to the raw segment
      const displayName = pathDisplayNames[segment] || segment;
      return {
        displayName,
        path: accumulatedPath,
        isLast,
      };
    });

    // If someone passed in a `parentTitle` and there is at least two crumbs,
    // override the second-to-last crumb’s name
    if (parentTitle && breadcrumbItems.length > 1) {
      breadcrumbItems[breadcrumbItems.length - 2].displayName = parentTitle;
    }
  }

  return (
    <div className="flex items-center gap-2 py-4 flex-wrap mt-10">
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
              {item.displayName}
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
