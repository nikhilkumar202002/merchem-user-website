"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import LegacyImg from "@/public/images/company-quote.webp";

const Legacy = () => {
  return (
    <section className="w-full bg-white py-14 sm:py-16 lg:py-20 xl:py-20 2xl:py-[100px] overflow-hidden">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[60px] xl:gap-[70px] 2xl:gap-[80px] items-center">
          {/* Left Column: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative w-full overflow-hidden order-2 lg:order-1"
          >
            <Image
              src={LegacyImg}
              alt="Rubber products and applications"
              width={1500}
              height={1200}
              className="w-full aspect-[4/3] object-cover"
              priority
            />
          </motion.div>

          {/* Right Column: Text Content */}
          <div className="order-1 lg:order-2">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="block text-sm font-semibold tracking-wide text-[#980E27] sm:text-base xl:text-sm 2xl:text-base"
          >
            Our Legacy
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-1 max-w-[680px] text-3xl font-bold leading-[1.14] tracking-[-0.035em] text-black font-manrope sm:text-4xl lg:text-[34px] xl:text-[36px] 2xl:text-[48px]"
          >
            Adding Value to <span className="text-[#980E27]">Rubber...</span>
            <br />
            Since <span className="text-[#980E27]">1981</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 xl:mt-3 2xl:mt-4 max-w-[680px] text-base leading-[1.35] text-[#474747] sm:text-lg lg:text-base xl:text-[16px] 2xl:text-[20px]"
          >
            When people create wonders with Rubber, our applause for them is LOUD.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-5 xl:mt-5 2xl:mt-6 space-y-1"
          >
            <p className="text-base font-semibold leading-tight text-black sm:text-lg lg:text-base xl:text-base 2xl:text-lg">
              NURTURING NATURE FOR FUTURE GENERATIONS
            </p>
            <p className="text-xs font-medium text-[#980E27] sm:text-sm lg:text-xs xl:text-xs 2xl:text-sm">
              ACCELERATORS · ANTIOXIDANT · PROCESSING AIDS
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 xl:mt-8 2xl:mt-12"
          >
            <Link
              href="/products"
              className="inline-flex items-center gap-3 bg-[#980E27] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#7d0a1f] sm:text-base xl:text-sm 2xl:text-base"
            >
              <span>Explore Our Products</span>
              <FiArrowRight className="h-4 w-4 stroke-[1.5]" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default Legacy;
