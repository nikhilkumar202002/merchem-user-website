import React from 'react';
import CategoryDetailClient from '@/app/component/sections/products/CategoryDetailClient';

export async function generateStaticParams() {
  return [
    { slug: 'rubber-accelerators' },
    { slug: 'rubber-antioxidants-antiozonants' },
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