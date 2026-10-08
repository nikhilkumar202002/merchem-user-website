import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiMail } from "react-icons/fi";
import BannerImg from "@/public/banner/product-banner.webp";

const ProductBanner = () => {
  return (
    <section className="relative flex min-h-[50vh] lg:min-h-[55vh] 2xl:min-h-[70vh] w-full items-center overflow-hidden bg-white">
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

      <div className="site-container relative z-10 w-full py-10 sm:py-12 lg:py-14 xl:py-14 2xl:py-20">
        <div className="max-w-2xl lg:max-w-3xl">
          <p className="text-base xl:text-base 2xl:text-[20px] font-semibold text-[#980E27]">
            Our Products
          </p>

          <h1 className="font-manrope text-3xl font-bold leading-[1.12] tracking-tight text-[#000000] sm:text-4xl md:text-5xl lg:text-[38px] xl:text-[42px] 2xl:text-[64px] pb-[16px] 2xl:pb-[20px]">
            Specialty Chemicals for <span className="text-[#980E27]">Industrial Applications</span>
          </h1>

          <p className="max-w-2xl text-sm font-normal leading-relaxed text-[#474747] sm:text-base md:text-base lg:text-sm xl:text-[15px] 2xl:text-lg pb-[24px] 2xl:pb-[40px]">
            Explore Merchem’s portfolio of rubber processing chemicals and specialty chemical solutions developed to serve rubber goods manufacturers and allied industries.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="#products-portfolio"
              className="inline-flex items-center gap-2 bg-[#980E27] px-5 py-3 text-sm font-medium text-white transition-all hover:bg-[#7d0a1f] sm:text-base xl:text-sm 2xl:text-base"
            >
              <span>Explore Products</span>
              <FiArrowRight className="h-4 w-4 stroke-[2]" />
            </Link>

            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 border border-[#980E27] bg-white px-5 py-3 text-sm font-medium text-[#980E27] transition-all hover:bg-[#980E27] hover:text-white sm:text-base xl:text-sm 2xl:text-base"
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