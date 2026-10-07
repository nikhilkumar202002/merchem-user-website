import React from 'react';
import SubcategoryDetailClient from '@/app/component/sections/products/SubcategoryDetailClient';

export async function generateStaticParams() {
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.merchem.com/api";
    const res = await fetch(`${apiBase}/v1/public/product-catalogue`, { next: { revalidate: 60 } });
    const result = await res.json();
    if (result && result.success && Array.isArray(result.data)) {
      const paramsList: { slug: string; subcategorySlug: string }[] = [];
      result.data.forEach((cat: { slug: string; subcategories?: { slug: string }[] }) => {
        if (Array.isArray(cat.subcategories)) {
          cat.subcategories.forEach((sub) => {
            paramsList.push({
              slug: cat.slug,
              subcategorySlug: sub.slug,
            });
          });
        }
      });
      if (paramsList.length > 0) {
        return paramsList;
      }
    }
  } catch (error) {
    console.error("Error generating static params for subcategories:", error);
  }

  return [
    { slug: 'rubber-accelerators', subcategorySlug: 'thiazoles' },
    { slug: 'rubber-accelerators', subcategorySlug: 'sulphenamides' },
    { slug: 'rubber-accelerators', subcategorySlug: 'thiurams' },
    { slug: 'rubber-accelerators', subcategorySlug: 'dithiocarbamates' },
    { slug: 'rubber-accelerators', subcategorySlug: 'special-purpose' },
  ];
}

interface PageProps {
  params: Promise<{ slug: string; subcategorySlug: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return (
    <SubcategoryDetailClient
      slug={resolvedParams?.slug}
      subcategorySlug={resolvedParams?.subcategorySlug}
    />
  );
}