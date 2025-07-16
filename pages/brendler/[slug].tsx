// ./pages/brendler/[slug].tsx

import Container from "@/src/components/layout/Container";
import Header from "@/src/components/layout/Header";
import React, { useState, useEffect, useCallback } from "react";
import Footer from "@/src/components/layout/Footer";
import Breadcrumb from "@/src/components/layout/Breadcrumb";
import Filter from "@/src/components/Bathroom/Filter";
import Products from "@/src/components/Bathroom/Products";
import { GetServerSidePropsContext } from "next";
import { BannerItem, Brand, Category, Color, Product } from "@/src/types";
import {
  fetchFilteredProducts,
  FilterParams,
} from "../api/services/fetchProducts";
import { getBanner } from "../api/services/fetchBanner";
import { fetchBrands } from "../api/services/fetchBrands";
import { fetchCategories } from "../api/services/fetchCategories";
import { fetchColors } from "../api/services/fetchColors";
import Head from "next/head";

interface BrandPageProps {
  bannerData: BannerItem | null;
  brands: Brand[];
  categories: Category[];
  colors: Color[];
  initialProducts: Product[];
  selectedBrand: Brand | null;
  brandSlug: string;
}

export interface FilterState {
  categories: string[];
  brands: string[];
  colors: string[];
  search: string;
}

function BrandPage({
  brands,
  categories,
  colors,
  initialProducts,
  selectedBrand,
}: BrandPageProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // We no longer keep a separate `searchTerm` state; instead, we store search directly in `filters`.
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    brands: selectedBrand ? [selectedBrand.slug] : [],
    colors: [],
    search: "",
  });

  // Whenever the user types into the search field, update filters.search and re‐apply filters.
  const onSearchChange = useCallback(
    (term: string) => {
      const newFilters: FilterState = {
        ...filters,
        search: term,
      };
      setFilters(newFilters);
      applyFilters(newFilters);
    },
    [filters]
  );

  const applyFilters = async (newFilters: FilterState) => {
    setLoading(true);

    try {
      const filterParams: FilterParams = {
        categories:
          newFilters.categories.length > 0 ? newFilters.categories : undefined,
        brands: newFilters.brands.length > 0 ? newFilters.brands : undefined,
        colors: newFilters.colors.length > 0 ? newFilters.colors : undefined,
        search: newFilters.search.trim() || undefined,
      };

      if (newFilters.search.trim()) {
        setHasSearched(true);
      }

      const response = await fetchFilteredProducts(filterParams);
      setProducts(response.data);
    } catch (error) {
      console.error("Error applying filters:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: FilterState) => {
    // Always keep `selectedBrand` in the brand list if provided
    const filtersWithBrand: FilterState = selectedBrand
      ? {
          ...newFilters,
          brands: Array.from(new Set([selectedBrand.slug, ...newFilters.brands])),
        }
      : newFilters;


    setFilters(filtersWithBrand);
    applyFilters(filtersWithBrand);
  };

  const clearAllFilters = () => {
    const emptyFilters: FilterState = {
      categories: [],
      brands: selectedBrand ? [selectedBrand.slug] : [],
      colors: [],
      search: "",
    };
    setFilters(emptyFilters);
    setHasSearched(false);
    applyFilters(emptyFilters);
  };

  // When the route’s brand slug changes, reset filters to “brand only”
  useEffect(() => {
    if (selectedBrand) {
      const brandOnlyFilters: FilterState = {
        categories: [],
        brands: [selectedBrand.slug],
        colors: [],
        search: "",
      };
      setFilters(brandOnlyFilters);
      applyFilters(brandOnlyFilters);
    }
  }, [selectedBrand]);

  const brandTitle = selectedBrand ? `${selectedBrand.name}` : "Brend Məhsulları";

  return (
    <>
      <Head>
        <meta name="author" content="https://markup.az/" />
        <title>{"Elita Group | " + brandTitle}</title>
        </Head>

      <Container>
        <Header />
      </Container>

      <Container>
        <Breadcrumb />
      </Container>

      <Container>
        <h1 className="text-2xl md:text-4xl text-neutral-700 font-medium font-archivo">
          {brandTitle}
        </h1>
        <Filter
          categories={categories}
          brands={brands}
          colors={colors}
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearchChange={onSearchChange}
          onClearFilters={clearAllFilters}
        />
        <Products
          products={products}
          loading={loading}
          searchTerm={filters.search}
          hasSearched={hasSearched}
        />
      </Container>

      <Footer />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const lang = context.locale || "az";
  const { slug } = context.params!;
  const brandSlug = slug as string;

  try {
    const [bannerData, brands, categories, colors] = await Promise.all([
      getBanner("hamam", lang),
      fetchBrands(lang),
      fetchCategories(lang),
      fetchColors(lang),
    ]);

    const selectedBrand =
      brands.find((brand) => brand.slug === brandSlug) || null;

    let initialProducts: Product[] = [];
    if (selectedBrand) {
      const filterParams: FilterParams = { brands: [selectedBrand.slug] };
      const response = await fetchFilteredProducts(filterParams, lang);
      initialProducts = response.data;
    }

    return {
      props: {
        bannerData,
        brands,
        categories,
        colors,
        initialProducts,
        selectedBrand,
        brandSlug,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        bannerData: null,
        brands: [],
        categories: [],
        colors: [],
        initialProducts: [],
        selectedBrand: null,
        brandSlug,
      },
    };
  }
}

export default BrandPage;
