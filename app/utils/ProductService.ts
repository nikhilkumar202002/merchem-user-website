import api from './axios';

export interface Category {
  id: number;
  name: string;
  slug: string;
  short_description: string;
  description: string;
  image: string;
  image_url: string;
  status: string;
  sort_order: number;
  subcategories_count?: number;
  products_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ProductCategoriesResponse {
  success: boolean;
  data: Category[];
  pagination?: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
}

export interface CatalogueProduct {
  id: number;
  name: string;
  slug: string;
  short_description?: string | null;
  description?: string | null;
  image_url?: string | null;
  tds_available: boolean;
}

export interface CatalogueSubcategory {
  id: number;
  name: string;
  slug: string;
  products: CatalogueProduct[];
}

export interface CatalogueCategory {
  id: number;
  name: string;
  slug: string;
  short_description?: string;
  description?: string;
  image_url?: string;
  subcategories: CatalogueSubcategory[];
  products: CatalogueProduct[];
}

export interface ProductCatalogueResponse {
  success: boolean;
  data: CatalogueCategory[];
}

export interface PublicProductCategory {
  id: number;
  name: string;
  slug: string;
}

export interface PublicProductSubcategory {
  id: number;
  name: string;
  slug: string;
}

export interface PublicProduct {
  id: number;
  name: string;
  slug: string;
  short_description?: string | null;
  description?: string | null;
  image_url?: string | null;
  category?: PublicProductCategory;
  subcategory?: PublicProductSubcategory;
  tds_available?: boolean;
  tds?: {
    available?: boolean;
    file_url?: string | null;
  };
}

export interface ProductsResponse {
  success: boolean;
  data: PublicProduct[];
  pagination?: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
}

/**
 * Fetch public product categories
 * @param params - Optional query parameters (e.g. page, per_page)
 * @returns API response with data and pagination
 */
export const getProductCategories = async (params: Record<string, any> = {}): Promise<ProductCategoriesResponse> => {
  const response = await api.get<ProductCategoriesResponse>('/v1/public/product-categories', { params });
  return response.data;
};

/**
 * Fetch public product catalogue (categories with subcategories and products hierarchy)
 * @returns API response containing full product catalogue tree
 */
export const getProductCatalogue = async (): Promise<ProductCatalogueResponse> => {
  const response = await api.get<ProductCatalogueResponse>('/v1/public/product-catalogue');
  return response.data;
};

/**
 * Fetch public products list with full details (descriptions, categories, TDS status)
 * @param params - Optional query parameters (e.g. per_page, page, category_id)
 * @returns API response containing products list and pagination
 */
export const getPublicProducts = async (params: Record<string, any> = {}): Promise<ProductsResponse> => {
  const response = await api.get<ProductsResponse>('/v1/public/products', { params });
  return response.data;
};

const ProductService = {
  getProductCategories,
  getProductCatalogue,
  getPublicProducts,
};

export default ProductService;
