import React from 'react';
import CategoryDetailClient from '@/app/component/sections/products/CategoryDetailClient';

export async function generateStaticParams() {
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.merchem.com/api";
    const res = await fetch(`${apiBase}/v1/public/product-catalogue`, { next: { revalidate: 60 } });
    const result = await res.json();
    if (result && result.success && Array.isArray(result.data) && result.data.length > 0) {
      return result.data.map((cat: { slug: string }) => ({
        slug: cat.slug,
      }));
    }
  } catch (error) {
    console.error("Error generating static params for product categories:", error);
  }

  return [
    { slug: 'rubber-accelerators' },
    { slug: 'rubber-antioxidants-antidegradants' },
    { slug: 'rubber-processing-aids' },
    { slug: 'water-treatment-chemicals' },
    { slug: 'agrochemicals' },
  ];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return <CategoryDetailClient slug={resolvedParams?.slug} />;
}