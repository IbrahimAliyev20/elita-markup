import { MissionApiResponse, MissionData } from "@/src/types";
import { API_ENDPOINTS } from "../endpoints";

export async function getMissionData(lang:string = "az"): Promise<MissionData[]> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const url = `${base}${API_ENDPOINTS.MISSION.LIST}`;

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
    console.error("[getMissionData] fetch failed:", res.status, txt);
    throw new Error(`Mission data fetch failed (${res.status})`);
  }

  const json = (await res.json()) as MissionApiResponse;
  return json.data;
}
