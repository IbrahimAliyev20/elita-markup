// src/pages/hamam/index.tsx
import Hero from "@/src/components/ProjectDetailed/Hero.tsx";
import Container from "@/src/components/layout/Container";
import Header from "@/src/components/layout/Header";
import React, { useCallback, useState, useEffect, useRef } from "react";
import Footer from "@/src/components/layout/Footer";
import Breadcrumb from "@/src/components/layout/Breadcrumb";
import Filter from "@/src/components/Bathroom/Filter";
import Products from "@/src/components/Bathroom/Products";
import { BannerItem, Brand, Category, Color, Product } from "@/src/types";
import { getBanner } from "../api/services/fetchBanner";
import Partners from "@/src/components/Bathroom/Partners";
import { fetchBrands } from "../api/services/fetchBrands";
import { fetchCategories } from "../api/services/fetchCategories";
import { fetchColors } from "../api/services/fetchColors";
import {
  fetchProducts,
  fetchFilteredProducts,
  fetchSearchProducts,
  FilterParams,
} from "../api/services/fetchProducts";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

interface BathroomProps {
  bannerData: BannerItem | null;
  brands: Brand[];
  categories: Category[];
  colors: Color[];
  initialProducts: Product[];
}

export interface FilterState {
  categories: string[];
  brands: string[];
  colors: string[];
  search: string;
}

function Bathroom({
  bannerData,
  brands,
  categories,
  colors,
  initialProducts,
}: BathroomProps) {

  const { t } = useTranslation();
  const router = useRouter();
  const currentLang = router.locale || "az";
  
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    brands: [],
    colors: [],
    search: "",
  });

  // Use ref to track if we're currently processing to prevent multiple simultaneous calls
  const isProcessingRef = useRef(false);
  
  // Add debounce timer ref for search
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Track last applied filters to prevent unnecessary API calls
  const lastAppliedFiltersRef = useRef<FilterState | null>(null);

  const applyFilters = useCallback(async (newFilters: FilterState) => {
    // Check if filters have actually changed
    const lastFilters = lastAppliedFiltersRef.current;
    if (lastFilters && 
        JSON.stringify(lastFilters) === JSON.stringify(newFilters)) {
      console.log("Filters unchanged, skipping API call");
      return;
    }

    // Prevent multiple simultaneous calls
    if (isProcessingRef.current) {
      console.log("Already processing, skipping...");
      return;
    }

    isProcessingRef.current = true;
    setLoading(true);
    lastAppliedFiltersRef.current = newFilters;

    console.log("Applying filters:", newFilters);

    try {
      if (
        newFilters.categories.length === 0 &&
        newFilters.brands.length === 0 &&
        newFilters.colors.length === 0 &&
        !newFilters.search.trim()
      ) {
        setHasSearched(false);
        const allProducts = await fetchProducts(currentLang);
        setProducts(allProducts);
        return;
      }

      const isSearchOnly =
        newFilters.search.trim() &&
        newFilters.categories.length === 0 &&
        newFilters.brands.length === 0 &&
        newFilters.colors.length === 0;

      if (isSearchOnly) {
        setHasSearched(true);
        const response = await fetchSearchProducts(newFilters.search.trim(), undefined, currentLang);
        setProducts(response.data);
      } else {
        if (newFilters.search.trim()) {
          setHasSearched(true);
        }

        const filterParams: FilterParams = {
          categories:
            newFilters.categories.length > 0
              ? newFilters.categories
              : undefined,
          brands: newFilters.brands.length > 0 ? newFilters.brands : undefined,
          colors: newFilters.colors.length > 0 ? newFilters.colors : undefined,
          search: newFilters.search.trim() || undefined,
        };

        const response = await fetchFilteredProducts(filterParams, currentLang);
        setProducts(response.data);
      }
    } catch (error) {
      console.error("Error applying filters:", error);
      // Reset last applied filters on error so retry is possible
      lastAppliedFiltersRef.current = null;
    } finally {
      setLoading(false);
      isProcessingRef.current = false;
    }
  }, [currentLang]);

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    console.log("Filter change triggered:", newFilters);
    setFilters(newFilters);
    applyFilters(newFilters);
  }, [applyFilters]);

  const clearAllFilters = useCallback(() => {
    const emptyFilters: FilterState = {
      categories: [],
      brands: [],
      colors: [],
      search: "",
    };
    console.log("Clearing all filters");
    
    // Clear any pending search timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    setFilters(emptyFilters);
    setHasSearched(false);
    lastAppliedFiltersRef.current = null; // Reset tracking
    applyFilters(emptyFilters);
  }, [applyFilters]);

  const onSearchChange = useCallback((term: string) => {
    console.log("Search change triggered:", term);
    
    // Clear existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    // Debounce the API call
    searchTimeoutRef.current = setTimeout(() => {
      const updatedFilters: FilterState = {
        ...filters,
        search: term,
      };
      
      // Update filters and apply them
      setFilters(updatedFilters);
      applyFilters(updatedFilters);
    }, 100); // 300ms debounce
  }, [applyFilters, filters]);

  // Handle language changes by redirecting to reload the page with new data
  const prevLangRef = useRef(currentLang);
  useEffect(() => {
    if (prevLangRef.current !== currentLang) {
      prevLangRef.current = currentLang;
      // When language changes, reload the page to get fresh SSR data
      router.reload();
    }
  }, [currentLang, router]);

  // Debug: Log when component re-renders
  useEffect(() => {
    console.log("Component re-rendered. Products count:", products.length, "Loading:", loading);
  });

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  console.log(products);

  return (
    <>
      <Head>
        <meta name="author" content="https://markup.az/" />
        <title>{"Elita Group | " + t("contactDetails.bath_accessories")}</title>
      </Head>
      <Container>
        <Header activeItem="hamam" />
      </Container>

      <Container>
        <Breadcrumb />
      </Container>

      <Hero
        title={bannerData?.title || ""}
        image={bannerData?.image || ""}
        short_description={bannerData?.description || ""}
      />

      <Partners brands={brands} />

      <Container>
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
  try {
    const slug = "hamam";
    const [bannerData, brands, categories, colors, products] =
      await Promise.all([
        getBanner(slug, lang),
        fetchBrands(lang),
        fetchCategories(lang),
        fetchColors(lang),
        fetchProducts(lang),
      ]);

    return {
      props: {
        bannerData,
        brands,
        categories,
        colors,
        initialProducts: products,
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
      },
    };
  }
}

export default Bathroom;