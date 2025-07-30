import { InstagramLinksApiResponse } from "@/src/types"; 
import { API_ENDPOINTS } from "../endpoints";

export async function getInstagramLinks(
  lang: string = "az"
): Promise<InstagramLinksApiResponse> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const url = `${base}${API_ENDPOINTS.INSTAGRAM.LIST}`;

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
    console.error("[getInstagramLinks] fetch failed:", res.status, txt);
    throw new Error(`Instagram links fetch failed (${res.status})`);
  }

  const json = (await res.json()) as InstagramLinksApiResponse;
  return json;
}