import api from './axios';

export interface PublicTdsRequestPayload {
  product_id?: number | string;
  name: string;
  company_name: string;
  email: string;
  phone: string;
  location?: string;
  message?: string;
}

export interface PublicEnquiryPayload {
  name: string;
  company_name?: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  category_id?: number | string;
  category_name?: string;
  enquiry_type?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

/**
 * Submit Public TDS Request
 * POST /v1/public/tds-requests
 * @param payload - Public TDS request form payload
 */
export const submitPublicTdsRequest = async (
  payload: PublicTdsRequestPayload
): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>('/v1/public/tds-requests', payload);
  return response.data;
};

/**
 * Submit General Public Contact / Product Enquiry
 * POST /v1/public/enquiries
 * @param payload - Public enquiry form payload
 */
export const submitPublicEnquiry = async (
  payload: PublicEnquiryPayload
): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>('/v1/public/enquiries', payload);
  return response.data;
};

const EnquiryService = {
  submitPublicTdsRequest,
  submitPublicEnquiry,
};

export default EnquiryService;