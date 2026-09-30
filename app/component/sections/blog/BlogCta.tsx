"use client";

import React from "react";
import { FiArrowRight } from "react-icons/fi";

export default function BlogCta() {
  return (
    <section className="relative overflow-hidden bg-[#850817] bg-[url('/banner/cta_banner.webp')] bg-cover bg-center py-[100px]">
      <div className="absolute inset-0 bg-[#850817]/75" />
      <div className="site-container relative z-10 flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
        <div className="max-w-[620px] text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.18em]">Stay Updated</p>
          <h2 className="!text-white mt-2 text-3xl font-bold leading-[1.05] tracking-[-0.035em] sm:text-6xl">
            Get the Latest Insights
            from Merchem
          </h2>
          <p className="mt-3 text-sm leading-[1.35] text-white/90 sm:text-base">
            Subscribe to our newsletter for industry insights, technical
            articles and company updates.
          </p>
        </div>

        <form className="flex w-full max-w-[470px] rounded-md bg-white p-1" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="newsletter-email" className="sr-only">Your email address</label>
          <input id="newsletter-email" type="email" required placeholder="Your email address" className="min-w-0 flex-1 px-3 text-sm text-gray-700 outline-none" />
          <button type="submit" className="inline-flex items-center gap-2 rounded-md bg-[#c2152f] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#980E27]">
            Subscribe
            <FiArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </section>
  );
}
