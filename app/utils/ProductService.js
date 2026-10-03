import api from './axios';

/**
 * Fetch public product categories
 * @param {Object} params - Optional query parameters (e.g. page, per_page)
 * @returns {Promise<Object>} API response with data and pagination
 */
export const getProductCategories = async (params = {}) => {
  const response = await api.get('/v1/public/product-categories', { params });
  return response.data;
};

const ProductService = {
  getProductCategories,
};

export default ProductService;