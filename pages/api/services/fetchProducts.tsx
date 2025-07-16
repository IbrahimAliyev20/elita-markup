// src/api/services/fetchProducts.ts
import { Product, ProductsApiResponse, ProductSingleApiResponse } from "@/src/types";
import { API_ENDPOINTS } from "../endpoints";

export interface FilterParams {
  categories?: string[];
  brands?: string[];
  colors?: string[];
  search?: string;
  page?: number;
}

export async function fetchProducts(lang: string = "az"): Promise<Product[]> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const url = `${base}${API_ENDPOINTS.PRODUCTS.LIST}`;

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
    const text = await res.text();
    console.error("[fetchProducts] fetch failed:", res.status, text);
    throw new Error(`Products fetch failed (${res.status})`);
  }

  const json = (await res.json()) as ProductsApiResponse;
  return json.data;
}

export async function fetchFilteredProducts(
  filters: FilterParams,
  lang: string = "az"
): Promise<ProductsApiResponse> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const url = new URL(`${base}${API_ENDPOINTS.PRODUCTS.FILTER}`);

  // Build query parameters
  if (filters.categories && filters.categories.length > 0) {
    filters.categories.forEach((category) => {
      url.searchParams.append("category[]", category);
    });
  }

  if (filters.brands && filters.brands.length > 0) {
    filters.brands.forEach((brand) => {
      url.searchParams.append("brand[]", brand);
    });
  }

  if (filters.colors && filters.colors.length > 0) {
    filters.colors.forEach((color) => {
      url.searchParams.append("color[]", color);
    });
  }

  if (filters.search && filters.search.trim()) {
    url.searchParams.append("search", filters.search.trim());
  }

  if (filters.page) {
    url.searchParams.append("page", filters.page.toString());
  }

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Accept-Language": lang,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("[fetchFilteredProducts] fetch failed:", res.status, text);
    throw new Error(`Filtered products fetch failed (${res.status})`);
  }

  return (await res.json()) as ProductsApiResponse;
}

export async function fetchProductBySlug(slug: string, lang: string = "az"): Promise<Product> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const url = `${base}${API_ENDPOINTS.PRODUCTS.DETAIL(slug)}`;

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
    const text = await res.text();
    console.error(
      `[fetchProductBySlug] fetch failed for slug=${slug}:`,
      res.status,
      text
    );
    throw new Error(`Product fetch failed (${res.status})`);
  }

  const json = (await res.json()) as ProductSingleApiResponse;
  return json.data;
}

/**
 * Fetch products by a free‐text query string (e.g.  /products/query?q=hamam).
 * Returns the full ProductsApiResponse (data[], links, meta).
 */
export async function fetchSearchProducts(
  q: string,
  page?: number,
  lang: string = "az"
): Promise<ProductsApiResponse> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL!;
  // Build the URL: /products/query?q=<q>&page=<page>
  const url = new URL(`${base}${API_ENDPOINTS.PRODUCTS.QUERY}`);
  url.searchParams.append("q", q.trim());
  if (page && page > 1) {
    url.searchParams.append("page", page.toString());
  }

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Accept-Language": lang,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(
      `[fetchSearchProducts] fetch failed for q=${q}, page=${page}:`,
      res.status,
      text
    );
    throw new Error(`Search products fetch failed (${res.status})`);
  }

  return (await res.json()) as ProductsApiResponse;
}
