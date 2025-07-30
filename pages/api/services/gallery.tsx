import { GalleriesApiResponse, GalleryDetailApiResponse } from "@/src/types";
import { API_ENDPOINTS } from "../endpoints";

export async function getGallery(
  lang: string = "az"
): Promise<GalleriesApiResponse> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const url = `${base}${API_ENDPOINTS.GALLERY.LIST}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Accept-Language": lang,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const txt = await res.text();
    console.error("[fetchBreadcrumbs] fetch failed:", res.status, txt);
    throw new Error(`Breadcrumbs fetch failed (${res.status})`);
  }

  const json = (await res.json()) as GalleriesApiResponse;
  return json;
}



export async function getGalleryBySlug(
  slug: string,
  lang: string = "az"
): Promise<GalleryDetailApiResponse> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL!;
  
  const url = `${base}${API_ENDPOINTS.GALLERY.DETAIL(slug)}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Accept-Language": lang,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const txt = await res.text();
    console.error(`[getGalleryBySlug] fetch failed for slug "${slug}":`, res.status, txt);
    throw new Error(`Gallery detail fetch failed (${res.status})`);
  }

  const json = (await res.json()) as GalleryDetailApiResponse;
  return json;
}