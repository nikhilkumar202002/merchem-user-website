"use client";

import React, { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import AboutImage from "@/public/images/About-image-1.webp";
import LegacyImage from "@/public/images/company-quote.webp";

type ProductCard = { title: string; description: string; image: StaticImageData };

const products: ProductCard[] = [
  { title: "Accelerators", description: "Supporting controlled and efficient vulcanization across rubber applications.", image: LegacyImage },
  { title: "Antioxidants & Antiozonants", description: "Helping protect rubber materials against degradation and environmental effects.", image: LegacyImage },
  { title: "Processing Aids", description: "Supporting improved processing, stability and material handling.", image: AboutImage },
  { title: "Agrochemical Intermediates", description: "Specialty chemical intermediates serving agricultural chemical applications.", image: AboutImage },
  { title: "Water Treatment Chemicals", description: "Chemical solutions supporting industrial water-treatment requirements.", image: AboutImage },
];

export default function ProductPortfolio() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);
  const [slideCount, setSlideCount] = useState(1);

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
    updateSlideCount();
    window.addEventListener("resize", updateSlideCount);
    return () => window.removeEventListener("resize", updateSlideCount);
  }, []);

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
    <section className="w-full bg-white py-16 sm:py-20 lg:py-[86px]">
      <div className="site-container">
        <div className="mb-10 flex flex-col gap-7 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="block text-sm font-semibold tracking-wide text-[#980E27] sm:text-base">Our Products Portfolio</span>
            <h2 className="mt-1 max-w-[650px] text-4xl font-bold leading-[1.16] tracking-[-0.035em] text-black sm:text-5xl lg:text-[46px]">Specialty Chemicals for<br className="hidden sm:block" /> Demanding Applications.</h2>
          </div>
          <Link href="/products" className="inline-flex w-fit items-center gap-3 bg-[#980E27] px-4 py-3 text-sm font-medium text-white sm:text-base"><span>Explore Products</span><FiArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="relative">
          <div ref={sliderRef} onScroll={handleScroll} className="flex snap-x snap-mandatory gap-5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {products.map((product) => (
              <article key={product.title} className="w-full flex-none snap-start bg-[#f1f1f3] sm:w-[calc((100%-20px)/2)] xl:w-[calc((100%-60px)/4)]">
                <Image src={product.image} alt={product.title} className="h-[260px] w-full object-cover xl:h-[280px]" />
                <div className="flex min-h-[220px] flex-col px-6 py-6">
                  <h3 className="text-xl font-semibold leading-tight text-black">{product.title}</h3>
                  <p className="mt-2 text-base leading-[1.3] text-[#474747]">{product.description}</p>
                  <Link href="/products" aria-label={`Explore ${product.title}`} className="mt-auto flex h-7 w-7 items-center justify-center bg-[#980E27] text-white transition-colors hover:bg-[#7d0a1f]"><FiArrowRight className="h-4 w-4" /></Link>
                </div>
              </article>
            ))}
          </div>
          <button type="button" onClick={slidePrevious} aria-label="Previous products" className="absolute -left-5 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] xl:flex"><FiChevronLeft className="h-6 w-6" /></button>
          <button type="button" onClick={slideNext} aria-label="Next products" className="absolute -right-5 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] xl:flex"><FiChevronRight className="h-6 w-6" /></button>
        </div>
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
      </div>
    </section>
  );
}
