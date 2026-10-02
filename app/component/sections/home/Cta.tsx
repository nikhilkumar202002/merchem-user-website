"use client";

import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Cta() {
  return (
    <section className="relative min-h-[480px] overflow-hidden bg-[#650817] bg-[url('/banner/cta_banner.webp')] bg-cover bg-center">
      <div className="absolute inset-0 bg-[#650817]/65" />
      <div className="site-container relative z-10 flex min-h-[480px] items-center py-16 sm:py-20">
        <div className="max-w-[610px] text-white">
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="!text-white text-4xl font-bold leading-[1.15] tracking-[-0.035em] sm:text-5xl lg:text-[46px]"
          >
            Looking for the<br />Right Chemical Solution?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 max-w-[570px] text-base leading-[1.35] sm:text-lg"
          >
            Tell us about your product, process or application requirements.<br className="hidden sm:block" /> Our team will help you explore the right solution for your needs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-5"
          >
            <Link href="/blog" className="inline-flex items-center gap-3 bg-white px-4 py-3 text-sm font-medium text-black transition-colors hover:bg-gray-100 sm:text-base">
              <span>View All Insights</span>
              <FiArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/products" className="inline-flex items-center gap-3 border border-white px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white hover:text-[#650817] sm:text-base">
              <span>Explore Products</span>
              <FiArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
