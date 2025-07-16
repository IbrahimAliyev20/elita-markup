export interface IntroItem {
  title: string;
  description: string;
  image: string;
  video?: string;
}

export interface ImageCardProps {
  src: string;
  alt: string;
  className?: string;
}
export interface Attribute {
  key: string;
  value: string;
}


export interface HeroItem {
  button_url: string;
  image: string;
}

export type HeroData = HeroItem[];

export interface HeroProps {
  data: HeroData;
}

export interface ServiceFeature {
  title: string;
  description: string;
  icon: string;
  image: string;
  image_redirect_url: string | null;
}

export type ServiceFeatureData = ServiceFeature[];
export interface ServicesProps {
  data: ServiceFeatureData;
}



export interface ProductCategory {
  title: string;
  products: Product[];
}

export type ProductsData = ProductCategory[];
export interface ProductsProps {
  products: Product[];
}

export interface OfferedProductsProps {
  data: ProductCategory[];
}

export interface CategoryNavigationProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export interface CartContextType {
  cartCount: number;
  favoritesCount: number;
  cartItems: Product[];
  favoriteItems: Product[];
  addToCart: (product: Product) => void;
  addToFavorites: (product: Product) => void;
  removeFromCart: (productId: string | number) => void;
  removeFromFavorites: (productId: string | number) => void;
}

export interface CustomToastProps {
  show: boolean;
  onClose: () => void;
  product: { image: string; name: string };
  message?: string;
  linkText?: string;
  linkHref?: string;
}

export interface HomeProps {
  heroData: HeroData;
  serviceFeatures: ServiceFeatureData;
  products: ProductsData;
}

export interface TopToolBarProps {
  isFixed?: boolean;
}

export type AboutData = {
  title: string;
  description: string;
  image_1: string;
  thumb_image_1: string;
  image_2: string;
  thumb_image_2: string;
};

export type AboutApiResponse = {
  data: AboutData;
};

export interface MissionData {
  title: string;
  description: string;
}

export interface MissionApiResponse {
  data: MissionData[];
}

export interface FaqData {
  question: string;
  answer: string;
}

export interface FaqApiResponse {
  data: FaqData[];
}

export interface ContactData {
  phone: string;
  map: string; 
  email: string;
}

export interface ContactApiResponse {
  data: ContactData;
}

export interface ContactFormData {
  name: string;
  surname: string;
  phone: string;
}

export interface BlogItem {
  title: string;
  description: string;
  image: string;
  thumb_image: string;
  slug: string;
}

export interface PaginationLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface BlogApiResponse {
  data: BlogItem[];
  links: PaginationLinks;
  meta: PaginationMeta;
}

export type ServiceData = {
  title: string;
  image: string;
  thumb_image: string;
  tag: string | null;
  short_description: string;
  description: string;
  slug: string;
  video: string;
  images: ServiceImage[];
};

export type ServicesApiResponse = {
  data: ServiceData[];
};

export interface ServiceImage {
  image: string;
  thumb_image: string;
}

export interface ServiceItem {
  title: string;
  image: string;
  thumb_image: string;
  tag: string | null;
  short_description: string;
  description: string;
  slug: string;
  video: string;
  images: ServiceImage[];
}

export interface SingleServiceApiResponse {
  data: ServiceItem;
}

export interface IntroServiceInformation {
  title: string;
  description: string;
  image_1: string;
  image_2: string;
  image_3: string;
  thumb_image_1: string;
  thumb_image_2: string;
  thumb_image_3: string;
}

export interface IntroServiceData {
  title: string;
  slug: string;
  description: string;
  video_intro: string;
  video: string;
  image: string;
  thumb_image: string;
  information: IntroServiceInformation[];
}

export interface IntroServicesApiResponse {
  data: IntroServiceData[];
}

export interface InformationItem {
  // Define the actual structure based on your data
  id?: string | number;
  title?: string;
  description?: string;
  // Add other properties as needed
}

// types.ts (add these types)
export interface BannerItem {
  title: string;
  slug: string;
  description: string;
  video_intro: string;
  video: string;
  image: string;
  thumb_image: string;
  information: InformationItem[]; // Replace any[] with proper type
}

export interface BannerApiResponse {
  timestamp: string;
  status: boolean;
  message: string;
  lang: string;
  data: BannerItem;
}

export interface Brand {
  name: string;
  image: string;
  thumb_image: string;
  slug: string;
}

export interface BrandsApiResponse {
  data: Brand[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image?: string; 
  description?: string; 
  service_description?: string;
 
}

export interface CategoriesApiResponse {
  success: boolean;
  data: Category[];
  message?: string;
  // Add any other response metadata your API returns
}

// Color type definition
export interface Color {
  id: number;
  name: string;
  color: string;
  slug: string;
  created_at?: string;
  updated_at?: string;
}

// API response structure for colors
export interface ColorsApiResponse {
  success: boolean;
  message: string;
  data: Color[];
  // Optional fields that might come from your API
  meta?: {
    current_page: number;
    total_pages: number;
    per_page: number;
    total_items: number;
  };
}

// @/src/types.ts

export interface Product {
  title: string;
  slug: string;
  description: string;
  category: string;
  brand: string;
  attribute: Array<{
    key: string;
    value: string;
  }>;
  image: {
    color_name: string;
    hex: string;
    image: string;
    thumb_image: string;
  };
  images: Array<{
    color_name: string;
    hex: string;
    image: string;
    thumb_image: string;
  }>;
}


export interface ProductsApiResponse {
  data: Product[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number | null;
    last_page: number;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    path: string;
    per_page: number;
    to: number | null;
    total: number;
  };
}


export interface ProductSingleApiResponse {
  timestamp: string;
  status: boolean;
  message: string;
  lang: string;
  data: Product;
}


export interface ImageVariant {
  color_name: string;
  hex: string;
  image: string;
  thumb_image: string;
}


// src/types/index.ts (add this to your existing types)
export interface MetaTag {
  title: string;
  meta_title: string;
  meta_description: string;
  meta_keyword: string;
}

export interface MetaTagsApiResponse {
  data: MetaTag[];
}


export interface BreadcrumbItem {
  title: string;
  image: string;
  thumb_image: string;
  name: string;
}

export interface BreadcrumbsApiResponse {
  data: BreadcrumbItem[];
}