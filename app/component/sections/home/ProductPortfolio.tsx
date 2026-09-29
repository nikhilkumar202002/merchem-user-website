"use client";

import React, { useRef } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { FiArrowRight, FiChevronRight } from "react-icons/fi";
import AboutImage from "@/public/images/About-image-1.webp";
import LegacyImage from "@/public/images/company-quote.webp";

type ProductCard = { title: string; description: string; image: StaticImageData };

const products: ProductCard[] = [
  { title: "Accelerators", description: "Supporting controlled and efficient vulcanization across rubber applications.", image: LegacyImage },
  { title: "Antioxidants & Antiozonants", description: "Helping protect rubber materials against degradation and environmental effects.", image: LegacyImage },
  { title: "Processing Aids", description: "Supporting improved processing, stability and material handling.", image: AboutImage },
  { title: "Agrochemical Intermediates", description: "Specialty chemical intermediates serving agricultural chemical applications.", image: AboutImage },
];

export default function ProductPortfolio() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const slideNext = () => {
    const slider = sliderRef.current;
    const firstCard = slider?.querySelector<HTMLElement>("article");

    if (!slider || !firstCard) return;

    slider.scrollBy({
      left: firstCard.offsetWidth + 20,
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
          <div ref={sliderRef} className="flex snap-x snap-mandatory gap-5 overflow-x-auto scrollbar-hide">
            {products.map((product) => (
              <article key={product.title} className="w-full flex-none snap-start bg-[#f1f1f3] sm:w-[calc((100%-20px)/2)] xl:w-[calc((100%-60px)/4)]">
                <Image src={product.image} alt={product.title} className="h-[220px] w-full object-cover" />
                <div className="flex min-h-[185px] flex-col px-6 py-5">
                  <h3 className="text-xl font-semibold leading-tight text-black">{product.title}</h3>
                  <p className="mt-2 text-base leading-[1.3] text-[#474747]">{product.description}</p>
                  <Link href="/products" aria-label={`View ${product.title}`} className="mt-auto flex h-7 w-7 items-center justify-center bg-[#980E27] text-white"><FiArrowRight className="h-4 w-4" /></Link>
                </div>
              </article>
            ))}
          </div>
          <button type="button" onClick={slideNext} aria-label="Next products" className="absolute -right-5 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] xl:flex"><FiChevronRight className="h-6 w-6" /></button>
        </div>
      </div>
    </section>
  );
}
