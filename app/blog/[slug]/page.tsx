import React from "react";
import BlogDetailClient from "@/app/component/sections/blog/BlogDetailClient";

export async function generateStaticParams() {
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.merchem.com/api";
    const res = await fetch(`${apiBase}/v1/public/blogs`, { next: { revalidate: 60 } });
    const result = await res.json();
    if (result && result.success && Array.isArray(result.data) && result.data.length > 0) {
      return result.data.map((blog: { slug: string }) => ({
        slug: blog.slug,
      }));
    }
  } catch (error) {
    console.error("Error generating static params for blogs:", error);
  }

  // Default fallback slug if API is unreachable at build time
  return [
    { slug: "understanding-rubber-accelerators-in-modern-manufacturing" },
  ];
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
