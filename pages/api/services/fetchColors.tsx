// src/api/services/colorServices.ts
import { Color, ColorsApiResponse } from "@/src/types";
import { API_ENDPOINTS } from "../endpoints";

export async function fetchColors(lang:string = "az"): Promise<Color[]> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const url = `${base}${API_ENDPOINTS.COLOR.LIST}`;

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
    console.error("[fetchColors] fetch failed:", res.status, txt);
    throw new Error(`Colors fetch failed (${res.status})`);
  }

  const json = (await res.json()) as ColorsApiResponse;
  return json.data;
}