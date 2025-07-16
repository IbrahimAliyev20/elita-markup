const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const apiConfig = {
  baseUrl: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};
