import React from "react";
import Image from "next/image";
import BlogBannerImg from "@/public/banner/blog-banner.webp";

const BlogBanner = () => {
  return (
    <section className="relative flex min-h-[55vh] w-full items-center overflow-hidden bg-white lg:min-h-[60vh]">
      <div className="absolute inset-0 z-0">
        <Image
          src={BlogBannerImg}
          alt="Merchem insights and industrial chemical knowledge"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 w-full bg-gradient-to-r from-white via-white/95 to-transparent sm:via-white/90 md:w-[75%] lg:w-[62%]" />
      </div>

      <div className="site-container relative z-10 w-full py-14 sm:py-18 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-[20px] font-semibold uppercase tracking-wide text-[#980E27]">
            Insights &amp; Updates
          </p>

          <h1 className="mt-3 max-w-2xl font-manrope text-4xl font-bold leading-[1.12] tracking-tight text-[#000000] sm:text-5xl md:text-6xl lg:text-[56px]">
            Insights &amp; Updates From Merchem
          </h1>

          <p className="mt-6 max-w-2xl text-sm font-normal leading-relaxed text-[#474747] sm:text-base lg:text-lg">
            Explore industry insights, technical knowledge, product information
            and company updates from Merchem India. Discover perspectives on
            rubber chemicals, latex processing, specialty chemicals and
            evolving industrial applications.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlogBanner;
