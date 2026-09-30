import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import AboutBannerImg from "@/public/banner/about-banner.webp";

const AboutBanner = () => {
  return (
    <section className="relative flex min-h-[85vh] w-full items-center overflow-hidden bg-white">
      <div className="absolute inset-0 z-0">
        <Image
          src={AboutBannerImg}
          alt="Rubber manufacturing machinery at Merchem"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 w-full bg-gradient-to-r from-white via-white/95 to-transparent sm:via-white/90 md:w-[75%] lg:w-[62%]" />
      </div>

      <div className="site-container relative z-10 w-full py-16 sm:py-20 lg:py-28">
        <div className="max-w-2xl lg:max-w-3xl">
          <p className="text-[20px] font-semibold text-[#980E27]">
            About Merchem India
          </p>

          <h1 className="font-manrope text-4xl font-bold leading-[1.12] tracking-tight text-[#000000] sm:text-5xl md:text-6xl lg:text-[56px] xl:text-[64px] pb-[20px]">
            Chemistry. Innovation. <span className="text-[#980E27]">Quality. Since 1981.</span>
        
          </h1>

          <p className="max-w-2xl text-sm font-normal leading-relaxed text-[#474747] sm:text-base md:text-base lg:text-lg pb-[40px]">
            Merchem has been serving rubber goods manufacturers and allied
            industries since 1981, offering quality rubber processing chemicals
            and specialty chemical solutions.
          </p>

          <div className="pt-3">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-[#980E27] px-6 py-3.5 text-sm font-medium text-white transition-all hover:bg-[#7d0a1f] sm:text-base"
            >
              <span>Explore Our Products</span>
              <FiArrowRight className="h-4 w-4 stroke-[2]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBanner;
