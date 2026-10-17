"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiImage } from "react-icons/fi";
import { motion } from "framer-motion";
import { getProductCategories, Category, resolveProductImageUrl } from "@/app/utils/ProductService";

function CategoryCardImage({
  src,
  imagePath,
  alt,
}: {
  src?: string | null;
  imagePath?: string | null;
  alt: string;
}) {
  const [loadedUrl, setLoadedUrl] = useState<string | null>(null);
  const [errorUrl, setErrorUrl] = useState<string | null>(null);

  const cleanUrl = resolveProductImageUrl(src, imagePath);

  const isLoaded = Boolean(cleanUrl && loadedUrl === cleanUrl);
  const hasError = Boolean(!cleanUrl || errorUrl === cleanUrl);

  return (
    <div className="relative h-[280px] md:h-[320px] w-full overflow-hidden bg-[#f1f1f3]">
      {/* Lazyload Shimmer Placeholder - Shown before and during image fetch */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
          <div className="h-6 w-6 rounded-full border-2 border-gray-300 border-t-[#980E27] animate-spin opacity-40" />
        </div>
      )}

      {/* Fallback if image fails or is missing - No dummy image */}
      {hasError ? (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-100 p-4 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fff1f3] text-[#980E27] mb-2 shadow-xs">
            <FiImage className="h-6 w-6" />
          </div>
          <span className="text-xs font-medium text-gray-500 max-w-[200px] truncate">{alt}</span>
        </div>
      ) : (
        <Image
          src={cleanUrl!}
          alt={alt}
          fill
          unoptimized
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onLoad={() => setLoadedUrl(cleanUrl)}
          onError={() => setErrorUrl(cleanUrl)}
          className={`object-cover object-center transition-all duration-500 group-hover:scale-105 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}


export default function ProductPortfolio2() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await getProductCategories();
        if (res && res.success && Array.isArray(res.data)) {
          // Filter categories that are marked as featured, limit to top 3
          const featured = res.data.filter((cat) => Boolean(cat.is_featured));
          const displayList = featured.length > 0 ? featured.slice(0, 3) : res.data.slice(0, 3);
          setCategories(displayList);
        }
      } catch (err) {
        console.error("Failed to fetch product categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-[120px] overflow-hidden">
      <div className="site-container">
        {/* Section Header */}
        <div className="mb-10 flex flex-col gap-7 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="block text-sm font-semibold tracking-wide text-[#980E27] sm:text-base"
            >
              Our Products Portfolio
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-1 max-w-[650px] text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-bold leading-[1.16] tracking-[-0.035em] text-black font-manrope"
            >
              Specialty Chemicals for<br className="hidden sm:block" /> Demanding Applications.
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/products"
              className="inline-flex w-fit items-center gap-3 bg-[#980E27] px-5 py-3.5 text-sm font-medium text-white transition-all hover:bg-[#7d0a1f] sm:text-base"
            >
              <span>Explore All Products</span>
              <FiArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        {/* 3 Featured Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((idx) => (
              <div key={idx} className="flex flex-col bg-[#f1f1f3] overflow-hidden animate-pulse">
                <div className="h-[280px] md:h-[320px] w-full bg-gray-200" />
                <div className="flex flex-1 flex-col p-6 sm:p-7 space-y-3">
                  <div className="h-6 w-3/4 bg-gray-200" />
                  <div className="h-4 w-full bg-gray-200" />
                  <div className="h-4 w-5/6 bg-gray-200" />
                  <div className="mt-auto pt-4 flex justify-end">
                    <div className="h-9 w-9 bg-gray-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.article
                key={category.id || category.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="group flex flex-col bg-[#f1f1f3] overflow-hidden transition-all duration-300 hover:shadow-[0_12px_32px_rgba(152,14,39,0.12)] hover:-translate-y-1"
              >
                {/* Image Header with Fixed Height on Mobile & Desktop and Cover Position */}
                <CategoryCardImage
                  src={category.image_url}
                  imagePath={category.image}
                  alt={category.name}
                />

                {/* Card Body */}
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="text-xl sm:text-2xl font-bold leading-tight text-black group-hover:text-[#980E27] transition-colors font-manrope">
                    {category.name}
                  </h3>


                  <p className="mt-3 text-sm text-[#474747] leading-relaxed line-clamp-3">
                    {category.short_description || category.description}
                  </p>

                  <div className="mt-auto pt-5 flex items-center justify-end">
                    <Link
                      href={`/products/${category.slug}`}
                      aria-label={`Explore ${category.name}`}
                      className="flex h-9 w-9 items-center justify-center bg-[#980E27] text-white hover:bg-[#7d0a1f] transition-colors"
                    >
                      <FiArrowRight className="h-4.5 w-4.5" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
