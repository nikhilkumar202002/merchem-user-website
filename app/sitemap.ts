import type { MetadataRoute } from 'next';
import ProductService from './utils/ProductService';
import { getBlogs } from './utils/BlogService';

export const revalidate = 86400; // Revalidate daily

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.merchem.com').replace(/\/+$/, '');
  const now = new Date();

  // 1. Core static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // 2. Dynamic Product Categories and Subcategories
  const productRoutes: MetadataRoute.Sitemap = [];
  try {
    const catalogueResponse = await ProductService.getProductCatalogue();
    if (catalogueResponse?.success && Array.isArray(catalogueResponse.data)) {
      for (const category of catalogueResponse.data) {
        if (!category.slug) continue;

        // Category page
        productRoutes.push({
          url: `${baseUrl}/products/${category.slug}`,
          lastModified: now,
          changeFrequency: 'weekly',
          priority: 0.8,
        });

        // Subcategory pages
        if (Array.isArray(category.subcategories)) {
          for (const subcategory of category.subcategories) {
            if (!subcategory.slug) continue;
            productRoutes.push({
              url: `${baseUrl}/products/${category.slug}/${subcategory.slug}`,
              lastModified: now,
              changeFrequency: 'weekly',
              priority: 0.7,
            });
          }
        }
      }
    }
  } catch (error) {
    console.error('Failed to load catalogue for sitemap, falling back to static defaults:', error);
    // Fallback static categories
    const fallbackCategories = [
      {
        slug: 'rubber-accelerators',
        subcategories: ['thiazoles', 'sulphenamides', 'thiurams', 'dithiocarbamates', 'special-purpose'],
      },
      {
        slug: 'rubber-antioxidants-antidegredants',
        subcategories: [],
      },
      {
        slug: 'rubber-processing-aids',
        subcategories: [],
      },
      {
        slug: 'water-treatment-chemicals',
        subcategories: [],
      },
      {
        slug: 'agrochemicals',
        subcategories: [],
      },
    ];

    for (const cat of fallbackCategories) {
      productRoutes.push({
        url: `${baseUrl}/products/${cat.slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
      for (const sub of cat.subcategories) {
        productRoutes.push({
          url: `${baseUrl}/products/${cat.slug}/${sub}`,
          lastModified: now,
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      }
    }
  }

  // 3. Dynamic Blogs
  const blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const blogsResponse = await getBlogs({ per_page: 100 });
    if (blogsResponse?.success && Array.isArray(blogsResponse.data)) {
      for (const blog of blogsResponse.data) {
        if (!blog.slug) continue;
        blogRoutes.push({
          url: `${baseUrl}/blog/${blog.slug}`,
          lastModified: blog.published_at ? new Date(blog.published_at) : now,
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      }
    }
  } catch (error) {
    console.error('Failed to load blogs for sitemap, falling back to static defaults:', error);
    blogRoutes.push({
      url: `${baseUrl}/blog/role-of-accelarators-in-rubber-vulcanisation`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  }

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
