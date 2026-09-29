"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import IndustrialImage from "@/public/images/industrial_application.webp";
import LatexImage from "@/public/images/latex.webp";
import PaintCoatingImage from "@/public/images/paint_coating.webp";
import TyresRubberImage from "@/public/images/tyers_rubber.webp";

type IndustryCard = {
  title: string;
  description: string;
  image: StaticImageData;
};

const industries: IndustryCard[] = [
  {
    title: "Latex",
    description:
      "Chemical solutions supporting the processing and performance requirements of latex-based applications.",
    image: LatexImage,
  },
  {
    title: "Tyres & Rubber",
    description:
      "Performance-oriented chemicals supporting rubber compounding, processing and finished-product performance.",
    image: TyresRubberImage,
  },
  {
    title: "Paints & Coatings",
    description:
      "Specialty chemical solutions supporting formulation and application requirements across coating systems.",
    image: PaintCoatingImage,
  },
  {
    title: "Industrial Applications",
    description:
      "Specialty chemistry supporting diverse industrial processing and material requirements.",
    image: IndustrialImage,
  },
];

export default function Industry() {
  return (
    <section className="relative overflow-hidden bg-[#980E27] py-16 sm:py-20 lg:py-[100px]">
      <div className="absolute inset-0 bg-[url('/banner/industry-banner.webp')] bg-cover bg-center bg-fixed" />
      <div className="absolute inset-0 bg-[#980E27]/75" />
      <div className="site-container relative z-10">
        <div className="flex flex-col gap-10 lg:gap-12">
          <div className="text-center text-white">
            <span className="block text-sm font-medium sm:text-base">
              Where our Chemistry Works
            </span>
            <h2 className="!text-white mx-auto mt-2 max-w-[700px] text-[38px] font-bold leading-[1.05] tracking-[-0.035em] sm:text-5xl">
              Solutions Across Materials, Processes &amp; Industries.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {industries.map((industry) => (
              <article
                key={industry.title}
                className="flex min-h-[317px] flex-col bg-white"
              >
                <Image
                  src={industry.image}
                  alt={industry.title}
                  className="h-[220px] w-full object-cover"
                />
                <div className="flex flex-1 flex-col px-4 py-3">
                  <h3 className="text-[20px] font-bold leading-[1.05] text-black">
                    {industry.title}
                  </h3>
                  <p className="mt-2 text-[17px] leading-[1.28] text-[#474747]">
                    {industry.description}
                  </p>
                  <Link
                    href="/industries"
                    aria-label={`Explore ${industry.title}`}
                    className="mt-[30px] flex h-7 w-7 items-center justify-center bg-[#980E27] text-white transition-colors hover:bg-[#7d0a1f]"
                  >
                    <FiArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
