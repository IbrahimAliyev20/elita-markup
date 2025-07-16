// src/api/contact.ts
import { ContactFormData, ContactApiResponse } from "@/src/types";
import { API_ENDPOINTS } from "../endpoints";

export async function postContactForm(data: ContactFormData, lang:string = "az"): Promise<ContactApiResponse> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const url = `${base}${API_ENDPOINTS.CONTACT.POST}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Accept-Language": lang,
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });

  if (!res.ok) {
    const txt = await res.text();
    console.error("[postContactForm] submission failed:", res.status, txt);
    throw new Error(`Contact form submission failed (${res.status})`);
  }

  return await res.json() as ContactApiResponse;
}