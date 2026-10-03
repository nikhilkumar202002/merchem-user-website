import React from 'react';
import SubcategoryDetailClient from '@/app/component/sections/products/SubcategoryDetailClient';

export async function generateStaticParams() {
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