"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { getProductCategories, Category } from "@/app/utils/ProductService";
import FallbackImage from "@/public/images/About-image-1.webp";

function CategoryCardImage({
  src,
  alt,
  fallback,
}: {
  src?: string | null;
  alt: string;
  fallback: any;
}) {
  const [imgSrc, setImgSrc] = useState<any>(src || fallback);

  useEffect(() => {
    setImgSrc(src || fallback);
  }, [src, fallback]);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={600}
      height={400}
      unoptimized
      onError={() => setImgSrc(fallback)}
      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
    />
  );
}

export default function ProductGrid() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await getProductCategories();
        if (res && res.success && Array.isArray(res.data)) {
          setCategories(res.data);
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
    <section className="w-full bg-[#fcfcfd] py-16 sm:py-20 lg:py-24">
      <div className="site-container">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-12">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="block text-sm font-semibold tracking-wider text-[#980E27] uppercase sm:text-base xl:text-sm 2xl:text-base"
          >
            Our Main Product Categories
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-2 text-2xl font-bold leading-tight tracking-tight text-black sm:text-3xl lg:text-[34px] xl:text-[36px] 2xl:text-5xl"
          >
            Specialty Chemical Solutions Built for Performance.
          </motion.h2>
        </div>

        {/* 3-Column Card Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-6 2xl:gap-8">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div
                key={idx}
                className="animate-pulse bg-white p-4 shadow-xs border border-gray-100"
              >
                <div className="h-48 w-full bg-gray-200" />
                <div className="mt-4 h-6 w-3/4 bg-gray-200" />
                <div className="mt-2 h-4 w-full bg-gray-200" />
                <div className="mt-1 h-4 w-5/6 bg-gray-200" />
                <div className="mt-6 h-10 w-full bg-gray-200" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-6 2xl:gap-8">
            {categories.map((category, index) => (
              <motion.article
                key={category.id || category.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col bg-white border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-300 hover:shadow-[0_12px_32px_rgba(152,14,39,0.12)] hover:-translate-y-1"
              >
                {/* Card Image Header */}
                <div className="relative w-full overflow-hidden bg-gray-100">
                  <CategoryCardImage
                    src={category.image_url}
                    alt={category.name}
                    fallback={FallbackImage}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col p-5 sm:p-6 xl:p-5 2xl:p-7">
                  <h3 className="text-lg sm:text-xl xl:text-lg 2xl:text-2xl font-bold tracking-tight text-black group-hover:text-[#980E27] transition-colors leading-snug">
                    {category.name}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm xl:text-xs 2xl:text-sm text-[#474747] leading-relaxed line-clamp-3">
                    {category.short_description || category.description}
                  </p>

                  {/* Card Action Link */}
                  <div className="mt-5 pt-3 border-t border-gray-100">
                    <Link
                      href={`/products/${category.slug}`}
                      className="inline-flex w-full items-center justify-between font-semibold text-xs sm:text-sm xl:text-xs 2xl:text-sm text-[#980E27] group-hover:text-[#7d0a1f] transition-colors"
                    >
                      <span>Explore Products</span>
                      <div className="flex h-7 w-7 xl:h-7 xl:w-7 2xl:h-8 2xl:w-8 items-center justify-center rounded-full bg-[#fff1f3] text-[#980E27] group-hover:bg-[#980E27] group-hover:text-white transition-all duration-300">
                        <FiArrowRight className="h-3.5 w-3.5" />
                      </div>
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