"use client";

import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

export default function BlogCta() {
  return (
    <section className="relative overflow-hidden bg-[#850817] bg-[url('/banner/cta_banner.webp')] bg-cover bg-center py-14 lg:py-16 xl:py-16 2xl:py-[100px]">
      <div className="absolute inset-0 bg-[#850817]/75" />
      <div className="site-container relative z-10 flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-[620px] text-white"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em]">Stay Updated</p>
          <h2 className="!text-white mt-2 text-2xl font-bold leading-[1.12] tracking-[-0.035em] sm:text-4xl lg:text-[34px] xl:text-[36px] 2xl:text-6xl">
            Get the Latest Insights
            from Merchem
          </h2>
          <p className="mt-2 text-xs leading-[1.35] text-white/90 sm:text-sm xl:text-xs 2xl:text-base">
            Subscribe to our newsletter for industry insights, technical
            articles and company updates.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex w-full max-w-[470px] rounded-md bg-white p-1"
          onSubmit={(event) => event.preventDefault()}
        >
          <label htmlFor="newsletter-email" className="sr-only">Your email address</label>
          <input id="newsletter-email" type="email" required placeholder="Your email address" className="min-w-0 flex-1 px-3 text-sm text-gray-700 outline-none" />
          <button type="submit" className="inline-flex items-center gap-2 rounded-md bg-[#c2152f] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#980E27]">
            Subscribe
            <FiArrowRight className="h-4 w-4" />
          </button>
        </motion.form>
      </div>
    </section>
  );
}

