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

const ProductService = {
  getProductCategories,
  getProductCatalogue,
};

export default ProductService;
