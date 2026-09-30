"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import LegacyImg from "@/public/images/company-quote.webp";

const Legacy = () => {
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-[79px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
        <div className="relative w-full overflow-hidden">
          <Image src={LegacyImg} alt="Rubber products and applications" width={1500} height={1200} className="w-full aspect-[4/3] object-cover" priority />
        </div>
        <div className="px-5 py-10 sm:px-10 lg:py-0 lg:pl-[95px] lg:pr-12">
          <span className="block text-sm font-semibold tracking-wide text-[#980E27] sm:text-base xl:text-lg">Our Legacy</span>
          <h2 className="mt-1 max-w-[680px] text-3xl font-bold leading-[1.12] tracking-[-0.035em] text-black font-manrope sm:text-4xl lg:text-[42px] xl:text-[46px] 2xl:text-[52px]">
            Adding Value to <span className="text-[#980E27]">Rubber...</span><br />Since <span className="text-[#980E27]">1981</span>
          </h2>
          <p className="mt-4 max-w-[680px] text-lg leading-[1.35] text-[#474747] sm:text-xl xl:text-xl 2xl:text-[22px]">When people create wonders with Rubber, our applause for them is LOUD.</p>
          <div className="mt-6 space-y-1">
            <p className="text-lg font-semibold leading-tight text-black sm:text-xl xl:text-xl">NURTURING NATURE FOR FUTURE GENERATIONS</p>
            <p className="text-sm font-medium text-[#980E27] sm:text-base xl:text-base">ACCELERATORS · ANTIOXIDANT · PROCESSING AIDS</p>
          </div>
          <Link href="/products" className="mt-12 inline-flex items-center gap-3 bg-[#980E27] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#7d0a1f] sm:text-base xl:text-base"><span>Explore Our Products</span><FiArrowRight className="h-4 w-4 stroke-[1.5]" /></Link>
        </div>
      </div>
    </section>
  );
};

export default Legacy;
