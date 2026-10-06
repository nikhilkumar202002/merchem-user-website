"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
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
      className="object-cover"
    />
  );
}

export default function ProductPortfolio() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeDot, setActiveDot] = useState(0);
  const [slideCount, setSlideCount] = useState(1);

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

  const updateSlideCount = () => {
    const slider = sliderRef.current;
    const firstCard = slider?.querySelector<HTMLElement>("article");

    if (!slider || !firstCard) return;

    const step = firstCard.offsetWidth + 20;
    const count = Math.max(1, Math.ceil((slider.scrollWidth - slider.clientWidth) / step) + 1);
    setSlideCount(count);
    setActiveDot((current) => Math.min(current, count - 1));
  };

  useEffect(() => {
    if (categories.length > 0) {
      updateSlideCount();
    }
    window.addEventListener("resize", updateSlideCount);
    return () => window.removeEventListener("resize", updateSlideCount);
  }, [categories]);

  const handleScroll = () => {
    const slider = sliderRef.current;
    const firstCard = slider?.querySelector<HTMLElement>("article");

    if (!slider || !firstCard) return;

    const step = firstCard.offsetWidth + 20;
    setActiveDot(Math.min(slideCount - 1, Math.round(slider.scrollLeft / step)));
  };

  const goToSlide = (index: number) => {
    const slider = sliderRef.current;
    const firstCard = slider?.querySelector<HTMLElement>("article");

    if (!slider || !firstCard) return;

    slider.scrollTo({ left: index * (firstCard.offsetWidth + 20), behavior: "smooth" });
    setActiveDot(index);
  };

  const slideNext = () => {
    const slider = sliderRef.current;
    const firstCard = slider?.querySelector<HTMLElement>("article");

    if (!slider || !firstCard) return;

    slider.scrollBy({
      left: firstCard.offsetWidth + 20,
      behavior: "smooth",
    });
  };

  const slidePrevious = () => {
    const slider = sliderRef.current;
    const firstCard = slider?.querySelector<HTMLElement>("article");

    if (!slider || !firstCard) return;

    slider.scrollBy({
      left: -(firstCard.offsetWidth + 20),
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-[120px] overflow-hidden">
      <div className="site-container">
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
              className="mt-1 max-w-[650px] text-4xl font-bold leading-[1.16] tracking-[-0.035em] text-black sm:text-5xl lg:text-[46px]"
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
            <Link href="/products" className="inline-flex w-fit items-center gap-3 bg-[#980E27] px-4 py-3 text-sm font-medium text-white sm:text-base">
              <span>Explore Products</span>
              <FiArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#980E27] border-t-transparent"></div>
          </div>
        ) : (
          <div className="relative">
            <div ref={sliderRef} onScroll={handleScroll} className="flex snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-hidden py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {categories.map((category, index) => (
                <motion.article
                  key={category.id || category.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="w-full flex-none snap-start bg-[#f1f1f3] sm:w-[calc((100%-20px)/2)] xl:w-[calc((100%-60px)/4)]"
                >
                  <div className="relative h-[260px] w-full xl:h-[280px]">
                    <CategoryCardImage
                      src={category.image_url}
                      alt={category.name}
                      fallback={AboutImage}
                    />
                  </div>
                  <div className="flex min-h-[220px] flex-col px-6 py-6">
                    <h3 className="text-xl font-semibold leading-tight text-black">{category.name}</h3>
                    <p className="mt-2 text-base leading-[1.3] text-[#474747] line-clamp-3">{category.short_description}</p>
                    <Link href={`/products/${category.slug}`} aria-label={`Explore ${category.name}`} className="mt-auto flex h-7 w-7 items-center justify-center bg-[#980E27] text-white transition-colors hover:bg-[#7d0a1f]">
                      <FiArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>

            <button
              type="button"
              onClick={slidePrevious}
              aria-label="Previous products"
              className="absolute left-1 sm:-left-5 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center bg-white shadow-[0_2px_12px_rgba(0,0,0,0.12)] text-slate-900 hover:bg-[#980E27] hover:text-white transition-colors"
            >
              <FiChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={slideNext}
              aria-label="Next products"
              className="absolute right-1 sm:-right-5 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center bg-white shadow-[0_2px_12px_rgba(0,0,0,0.12)] text-slate-900 hover:bg-[#980E27] hover:text-white transition-colors"
            >
              <FiChevronRight className="h-6 w-6" />
            </button>
          </div>
        )}

        {!loading && slideCount > 1 && (
          <div className="mt-7 flex justify-center gap-2" aria-label="Product slides">
            {Array.from({ length: slideCount }, (_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Go to product slide ${index + 1}`}
                aria-current={activeDot === index ? "true" : undefined}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${activeDot === index ? "bg-[#980E27]" : "bg-[#d6d6d6] hover:bg-[#980E27]/60"}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

