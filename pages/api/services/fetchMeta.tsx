// src/api/services/metaServices.ts
import { MetaTag, MetaTagsApiResponse } from "@/src/types";
import { API_ENDPOINTS } from "../endpoints";

export async function fetchMetaTags(lang: string = "az"): Promise<MetaTag[]> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const url = `${base}${API_ENDPOINTS.META_TAGS.LIST}`;

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
    console.error("[fetchMetaTags] fetch failed:", res.status, txt);
    throw new Error(`Meta tags fetch failed (${res.status})`);
  }

  const json = (await res.json()) as MetaTagsApiResponse;
  return json.data;
}

export async function getMetaByTitle(title: string, lang: string = "az"): Promise<MetaTag | null> {
  try {
    const metas = await fetchMetaTags(lang);
    
    // Normalize the search title and find matching meta tag
    const normalizedTitle = title.toLowerCase().trim();
    
    const foundMeta = metas.find(meta => 
      meta.title.toLowerCase().trim() === normalizedTitle
    );
    
    if (!foundMeta) {
      console.warn(`[getMetaByTitle] No meta tag found for title: "${title}"`);
      return null;
    }
    
    return foundMeta;
  } catch (error) {
    console.error("[getMetaByTitle] Error fetching meta tags:", error);
    return null;
  }
}