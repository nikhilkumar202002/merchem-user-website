"use client";

import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

const AboutCta = () => {
  return (
    <section className="w-full bg-[#f6f6f6] py-10 sm:py-14 lg:py-16 overflow-hidden">
      <div className="site-container">
        <div className="px-5 py-7 text-[#000000] sm:px-8 sm:py-9 lg:px-5 lg:py-6">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-base xl:text-base 2xl:text-[20px] font-semibold text-[#980E27]"
          >
            Connect with Merchem
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-4xl font-manrope text-2xl font-bold leading-[1.14] text-[#000000] sm:text-3xl lg:text-[32px] xl:text-[34px] 2xl:text-[38px]"
          >
            Let&apos;s Explore the Right Chemical Solutions
            <br className="hidden sm:block" /> For Your Needs.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-xs leading-relaxed text-[#474747] sm:text-sm xl:text-[15px] 2xl:text-base"
          >
            Connect with our team to discuss your product requirements and
            industrial applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-4"
          >
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-3 bg-[#980E27] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#7d0a1f] sm:text-base xl:text-sm 2xl:text-base"
            >
              <span>Contact Our Team</span>
              <FiArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutCta;
