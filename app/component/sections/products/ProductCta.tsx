"use client";

import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

export default function ProductCta() {
  return (
    <section className="relative min-h-[480px] overflow-hidden bg-[#650817] bg-[url('/banner/cta_banner.webp')] bg-cover bg-center">
      <div className="absolute inset-0 bg-[#650817]/65" />
      <div className="site-container relative z-10 flex min-h-[480px] items-center py-16 sm:py-20">
        <div className="max-w-[640px] text-white">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.18em] font-semibold text-white/80 sm:text-sm"
          >
            LOOKING FOR A SPECIFIC PRODUCT?
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="!text-white mt-3 text-4xl font-bold leading-[1.15] tracking-[-0.035em] sm:text-5xl lg:text-[46px]"
          >
            Let’s Discuss Your Requirement
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 max-w-[570px] text-base leading-[1.4] text-white/90 sm:text-lg"
          >
            Tell us about your product, application or chemical requirement and connect with the Merchem team.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-3 bg-white px-6 py-3.5 text-sm font-medium text-black transition-colors hover:bg-gray-100 sm:text-base"
            >
              <span>Send an Enquiry</span>
              <FiArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-3 border border-white px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white hover:text-[#650817] sm:text-base"
            >
              <span>Contact Merchem</span>
              <FiArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

