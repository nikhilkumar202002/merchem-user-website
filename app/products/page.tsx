import React from 'react';
import ProductBanner from '../component/sections/products/ProductBanner';
import ProductGrid from '../component/sections/products/ProductGrid';
import ProductCta from '../component/sections/products/ProductCta';

const Page = () => {
  return (
    <main>
      <ProductBanner />
      <ProductGrid />
      <ProductCta />
    </main>
  );
};

export default Page;