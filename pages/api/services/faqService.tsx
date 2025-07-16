import { FaqApiResponse, FaqData } from "@/src/types";
import { API_ENDPOINTS } from "../endpoints";

export async function getFaqData(lang:string = "az"): Promise<FaqData[]> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const url = `${base}${API_ENDPOINTS.FAQ.LIST}`;

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
    console.error("[getFaqData] fetch failed:", res.status, txt);
    throw new Error(`FAQ data fetch failed (${res.status})`);
  }

  const json = (await res.json()) as FaqApiResponse;
  return json.data;
}
