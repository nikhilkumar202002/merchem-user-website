import api from './axios';

export interface PublicTdsRequestPayload {
  product_id: number | string;
  name: string;
  company_name: string;
  email: string;
  phone: string;
  location?: string;
  message?: string;
  product_name?: string;
  product?: string;
  full_name?: string;
  recaptcha_token?: string;
  'g-recaptcha-response'?: string;
}

export interface PublicEnquiryPayload {
  full_name: string;
  company_name?: string;
  email: string;
  phone?: string;
  enquiry_type?: string;
  product_category_id?: number | string;
  subject?: string;
  message: string;
  recaptcha_token?: string;
  'g-recaptcha-response'?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
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