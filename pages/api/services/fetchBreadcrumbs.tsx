// src/api/services/brandServices.ts
    import { BreadcrumbsApiResponse } from "@/src/types";
import { API_ENDPOINTS } from "../endpoints";

export async function fetchBreadcrumbs(
  lang: string = "az"
): Promise<BreadcrumbsApiResponse> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const url = `${base}${API_ENDPOINTS.BREADCRUMBS.LIST}`;

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

  const json = (await res.json()) as BreadcrumbsApiResponse;
  return json;
}
