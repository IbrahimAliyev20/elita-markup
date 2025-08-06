import { SocialMedia, SocialMediaApiResponse } from "@/src/types";
import { API_ENDPOINTS } from "../endpoints";

export async function getSocialMedia(lang:string = "az"): Promise<SocialMedia[]> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const url = `${base}${API_ENDPOINTS.SOCIAL_MEDIA.LIST}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Accept-Language": lang,
    },
    cache: "no-store",
  });

 
  const json = (await res.json()) as SocialMediaApiResponse;
  return json.data;
}