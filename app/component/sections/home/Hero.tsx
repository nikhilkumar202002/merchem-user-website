"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import HeroBannerImg from "@/public/banner/hero-banner-1.png";

const Hero = () => {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).preloaderDone) {
      setStartAnimation(true);
      return;
    }

    const handlePreloaderDone = () => {
      setStartAnimation(true);
    };

    window.addEventListener("preloaderFinished", handlePreloaderDone);
    const fallback = setTimeout(() => {
      setStartAnimation(true);
    }, 1400);

    return () => {
      window.removeEventListener("preloaderFinished", handlePreloaderDone);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <section className="relative w-full min-h-[85vh] lg:min-h-[85vh] flex items-center overflow-hidden bg-white">
      {/* Background Industrial Plant Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={HeroBannerImg}
          alt="Merchem Industrial Chemical Plant"
          fill
          priority
          className="object-cover object-right lg:object-center"
        />
        {/* Left White Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 sm:via-white/90 to-transparent w-full md:w-[75%] lg:w-[62%]" />
      </div>

      {/* Right Side Maroon Curve Overlay */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={startAnimation ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="absolute right-0 top-0 bottom-0 w-full md:w-[50%] lg:w-[42%] xl:w-[38%] pointer-events-none hidden md:block z-10"
      >
        <svg
          viewBox="0 0 500 800"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          {/* Maroon Curved Fill with slight transparency to reveal factory */}
          <path
            d="M 180 0 C 320 220 80 580 0 800 L 500 800 L 500 0 Z"
            fill="#980E27"
            fillOpacity="0.88"
          />
          {/* Thick White Curve Border Line */}
          <path
            d="M 180 0 C 320 220 80 580 0 800"
            fill="none"
            stroke="#ffffff"
            strokeWidth="8"
          />
        </svg>

        {/* Tagline text inside bottom right of maroon curve */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={startAnimation ? { opacity: 0.95, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="absolute bottom-8 right-[95px] text-right text-white space-y-1 font-semibold tracking-wider text-xs sm:text-sm lg:text-base leading-tight uppercase"
        >
          <p>CHEMISTRY</p>
          <p>THAT SUPPORTS</p>
          <p>TOMORROW</p>
          <p>A STRONGER</p>
        </motion.div>
      </motion.div>

      {/* Main Content inside site-container */}
      <div className="site-container relative z-20 w-full py-16 sm:py-20 lg:py-28">
        <div className="max-w-2xl lg:max-w-3xl space-y-6">
          {/* Hero Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[42px] xl:text-[46px] font-bold text-[#000000] leading-[1.18] tracking-tight font-manrope"
          >
            When People Create Wonders With{" "}
            <span className="text-[#980E27]">Rubber</span>, Our{" "}
            <span className="text-[#980E27]">Applause</span> For Them Is LOUD
          </motion.h1>

          {/* Subtitle Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-sm sm:text-base md:text-base lg:text-base xl:text-lg text-[#474747] leading-relaxed max-w-2xl font-normal"
          >
            Merchem develops and supplies specialty chemical solutions
            designed to support performance, consistency and process efficiency
            across Tyre, Rubber, Latex and Other Industrial Applications
          </motion.p>

          {/* Call-to-Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-3 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/products"
              className="bg-[#980E27] text-white px-6 py-3.5 hover:bg-[#7d0a1f] transition-all inline-flex items-center gap-2 font-medium text-sm md:text-base lg:text-sm xl:text-base"
            >
              <span>Explore Products</span>
              <FiArrowRight className="w-4 h-4 stroke-[2]" />
            </Link>

            <Link
              href="/contact-us"
              className="border border-[#980E27] text-[#980E27] bg-white hover:bg-[#980E27] hover:text-white px-6 py-3.5 transition-all inline-flex items-center gap-2 font-medium text-sm md:text-base lg:text-sm xl:text-base"
            >
              <span>Talk to Our Experts</span>
              <FiArrowRight className="w-4 h-4 stroke-[2]" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
