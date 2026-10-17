import React from "react";
import BlogDetailClient from "@/app/component/sections/blog/BlogDetailClient";
import BlogService from "@/app/utils/BlogService";

export async function generateStaticParams() {
  try {
    const result = await BlogService.getBlogs();
    if (result && result.success && Array.isArray(result.data) && result.data.length > 0) {
      return result.data.map((blog: { slug: string }) => ({
        slug: blog.slug,
      }));
    }
  } catch (error) {
    console.error("Error generating static params for blogs:", error);
  }

  return [];
}


interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPage({ params }: PageProps) {
  const resolvedParams = await params;
  return <BlogDetailClient slug={resolvedParams.slug} />;
}
