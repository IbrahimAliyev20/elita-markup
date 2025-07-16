import { AboutApiResponse, AboutData } from "@/src/types";
import { API_ENDPOINTS } from "../endpoints";

export async function getAboutData(lang: string = "az"): Promise<AboutData> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const url = `${base}${API_ENDPOINTS.ABOUT.LIST}`;

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
    console.error("[getAboutData] fetch failed:", res.status, txt);
    throw new Error(`About data fetch failed (${res.status})`);
  }

  const json = (await res.json()) as AboutApiResponse;
  return json.data;
}