"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ContactBannerImg from "@/public/banner/blog-banner.webp";

const ContactBanner = () => {
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
    <section className="relative flex min-h-[45vh] lg:min-h-[50vh] 2xl:min-h-[60vh] w-full items-center overflow-hidden bg-white">
      <div className="absolute inset-0 z-0">
        <Image
          src={ContactBannerImg}
          alt="Contact Merchem for industrial chemical solutions"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 w-full bg-gradient-to-r from-white via-white/95 to-transparent sm:via-white/90 md:w-[75%] lg:w-[62%]" />
      </div>

      <div className="site-container relative z-10 w-full py-10 sm:py-14 lg:py-16 xl:py-16 2xl:py-24">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.5 }}
            className="text-base xl:text-base 2xl:text-[20px] font-semibold text-[#980E27]"
          >
            Contact Merchem
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-2 max-w-2xl font-manrope text-3xl font-bold leading-[1.12] tracking-tight text-[#000000] sm:text-4xl md:text-5xl lg:text-[38px] xl:text-[42px] 2xl:text-[56px]"
          >
            Let&apos;s Start a Conversation.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-4 max-w-2xl text-sm font-normal leading-relaxed text-[#474747] sm:text-base lg:text-sm xl:text-[15px] 2xl:text-lg"
          >
            Looking for product information, technical assistance or chemical
            solutions for your industrial requirements? Connect with our team
            to discuss your needs.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default ContactBanner;

