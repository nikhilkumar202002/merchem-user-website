"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { getProductCategories, Category } from "@/app/utils/ProductService";
import AboutImage from "@/public/images/About-image-1.webp";

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
      fill
      unoptimized
      onError={() => setImgSrc(fallback)}
      className="object-cover transition-transform duration-500 group-hover:scale-105"
    />
  );
}

export default function ProductPortfolio() {
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
    <section className="w-full bg-white py-14 sm:py-16 lg:py-20 xl:py-20 2xl:py-[100px] overflow-hidden">
      <div className="site-container">
        {/* Section Header */}
        <div className="mb-8 xl:mb-8 2xl:mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="block text-sm font-semibold tracking-wide text-[#980E27] sm:text-base xl:text-sm 2xl:text-base"
            >
              Our Products Portfolio
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-1 max-w-[650px] text-3xl sm:text-4xl md:text-5xl lg:text-[34px] xl:text-[36px] 2xl:text-[44px] font-bold leading-[1.16] tracking-[-0.035em] text-black font-manrope"
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
              className="inline-flex w-fit items-center gap-3 bg-[#980E27] px-4 py-3 xl:px-4 xl:py-3 2xl:px-5 2xl:py-3.5 text-sm font-medium text-white transition-all hover:bg-[#7d0a1f] sm:text-base xl:text-sm 2xl:text-base"
            >
              <span>Explore All Products</span>
              <FiArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        {/* 3 Featured Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-6 2xl:gap-8">
            {[1, 2, 3].map((idx) => (
              <div key={idx} className="animate-pulse bg-[#f1f1f3] p-6 h-[400px]" />
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
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="group flex flex-col bg-[#f1f1f3] overflow-hidden transition-all duration-300 hover:shadow-[0_12px_32px_rgba(152,14,39,0.12)] hover:-translate-y-1"
              >
                {/* Image Header */}
                <div className="relative h-[260px] sm:h-[300px] xl:h-[280px] 2xl:h-[340px] w-full overflow-hidden bg-gray-200">
                  <CategoryCardImage
                    src={category.image_url}
                    alt={category.name}
                    fallback={AboutImage}
                  />
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col p-5 sm:p-6 xl:p-5 2xl:p-7">
                  <h3 className="text-lg sm:text-xl xl:text-lg 2xl:text-2xl font-bold leading-tight text-black group-hover:text-[#980E27] transition-colors font-manrope">
                    {category.name}
                  </h3>

                  <p className="mt-2 xl:mt-2 2xl:mt-3 text-xs sm:text-sm xl:text-xs 2xl:text-sm text-[#474747] leading-relaxed line-clamp-3">
                    {category.short_description || category.description}
                  </p>

                  <div className="mt-auto pt-4 flex items-center justify-end">
                    <Link
                      href={`/products/${category.slug}`}
                      aria-label={`Explore ${category.name}`}
                      className="flex h-8 w-8 xl:h-8 xl:w-8 2xl:h-9 2xl:w-9 items-center justify-center bg-[#980E27] text-white hover:bg-[#7d0a1f] transition-colors"
                    >
                      <FiArrowRight className="h-4 w-4" />
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
