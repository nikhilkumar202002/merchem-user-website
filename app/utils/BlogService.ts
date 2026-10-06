import api from './axios';

export interface BlogListItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string | null;
  featured_image_media_id: number | null;
  reading_time: number;
  published_at: string;
  created_at: string;
}

export interface BlogAuthor {
  id: number;
  name: string;
}

export interface BlogDetail {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  author: BlogAuthor;
  reading_time: number;
  published_at: string;
}

export interface BlogPaginationMeta {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}

export interface BlogListResponse {
  success: boolean;
  message: string;
  data: BlogListItem[];
  meta: BlogPaginationMeta;
}

export interface BlogDetailResponse {
  success: boolean;
  message: string;
  data: BlogDetail;
}

/**
 * Fetch all public blogs with optional pagination/filtering
 * @param params - Optional query parameters (e.g., page, per_page, search)
 */
export const getBlogs = async (params: Record<string, any> = {}): Promise<BlogListResponse> => {
  const response = await api.get<BlogListResponse>('/v1/public/blogs', { params });
  return response.data;
};

/**
 * Fetch single public blog by slug
 * @param slug - Blog slug
 */
export const getBlogBySlug = async (slug: string): Promise<BlogDetailResponse> => {
  const response = await api.get<BlogDetailResponse>(`/v1/public/blogs/${slug}`);
  return response.data;
};

const BlogService = {
  getBlogs,
  getBlogBySlug,
};

export default BlogService;