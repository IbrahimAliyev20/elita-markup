// src/api/services/contactServices.ts
import { ContactApiResponse, ContactData } from "@/src/types";
import { API_ENDPOINTS } from "../endpoints";

export async function getContactInfo(lang:string = "az"): Promise<ContactData> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const url = `${base}${API_ENDPOINTS.CONTACT.LIST}`;

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
    console.error("[getContactInfo] fetch failed:", res.status, txt);
    throw new Error(`Contact info fetch failed (${res.status})`);
  }

  const json = (await res.json()) as ContactApiResponse;
  return json.data;
}