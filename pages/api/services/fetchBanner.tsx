import { BannerApiResponse, BannerItem } from "@/src/types";
import { API_ENDPOINTS } from "../endpoints";

// api/banner.ts
export async function getBanner(slug: string, lang:string = "az"): Promise<BannerItem> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const url = `${base}${API_ENDPOINTS.BANNER.DETAIL(slug)}`;

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
    console.error("[getBanner] fetch failed:", res.status, txt);
    throw new Error(`Banner data fetch failed (${res.status})`);
  }

  const json = (await res.json()) as BannerApiResponse;
  return json.data;
}
