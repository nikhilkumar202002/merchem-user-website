import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiMail } from "react-icons/fi";
import BannerImg from "@/public/banner/product-banner.webp";

const ProductBanner = () => {
  return (
    <section className="relative flex min-h-[65vh] w-full items-center overflow-hidden bg-white lg:min-h-[70vh]">
      <div className="absolute inset-0 z-0">
        <Image
          src={BannerImg}
          alt="Merchem Specialty Chemicals for Industrial Applications"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 w-full bg-gradient-to-r from-white via-white/95 to-transparent sm:via-white/90 md:w-[75%] lg:w-[62%]" />
      </div>

      <div className="site-container relative z-10 w-full py-12 sm:py-16 lg:py-20">
        <div className="max-w-2xl lg:max-w-3xl">
          <p className="text-[20px] font-semibold text-[#980E27]">
            Our Products
          </p>

          <h1 className="font-manrope text-4xl font-bold leading-[1.12] tracking-tight text-[#000000] sm:text-5xl md:text-6xl lg:text-[56px] xl:text-[64px] pb-[20px]">
            Specialty Chemicals for <span className="text-[#980E27]">Industrial Applications</span>
          </h1>

          <p className="max-w-2xl text-sm font-normal leading-relaxed text-[#474747] sm:text-base md:text-base lg:text-lg pb-[40px]">
            Explore Merchem’s portfolio of rubber processing chemicals and specialty chemical solutions developed to serve rubber goods manufacturers and allied industries.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-3">
            <Link
              href="#products-portfolio"
              className="inline-flex items-center gap-2 bg-[#980E27] px-6 py-3.5 text-sm font-medium text-white transition-all hover:bg-[#7d0a1f] sm:text-base"
            >
              <span>Explore Products</span>
              <FiArrowRight className="h-4 w-4 stroke-[2]" />
            </Link>

            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 border border-[#980E27] bg-white px-6 py-3.5 text-sm font-medium text-[#980E27] transition-all hover:bg-[#980E27] hover:text-white sm:text-base"
            >
              <span>Send an Enquiry</span>
              <FiMail className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductBanner;