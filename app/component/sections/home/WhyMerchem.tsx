"use client";

import React from "react";
import { FiActivity, FiCheckCircle, FiShare2, FiUsers } from "react-icons/fi";
import { motion } from "framer-motion";

const reasons = [
  { title: "Application Understanding", description: "Solutions developed with the end-use and process requirements in mind.", icon: FiShare2 },
  { title: "Product Consistency", description: "A strong focus on dependable and repeatable product performance.", icon: FiActivity },
  { title: "Technical Approach", description: "Understanding chemistry from formulation through industrial application.", icon: FiCheckCircle },
  { title: "Responsive Partnership", description: "Working closely with customers to understand requirements and support their processes.", icon: FiUsers },
];

export default function WhyMerchem() {
  return (
    <section className="w-full bg-white py-14 sm:py-16 lg:py-20 xl:py-20 2xl:py-[100px] overflow-hidden">
      <div className="site-container">
        <div className="mx-auto max-w-[620px] text-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold tracking-wide text-[#980E27] sm:text-base xl:text-sm 2xl:text-base block"
          >
            Why Merchem
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-[34px] xl:text-[36px] 2xl:text-[44px] font-bold leading-[1.14] tracking-[-0.035em] text-black font-manrope"
          >
            More Than Chemicals. A<br className="hidden sm:block" /> Technical Partnership.
          </motion.h2>
        </div>

        <div className="mt-8 xl:mt-10 2xl:mt-14 grid grid-cols-1 divide-y divide-[#e5e5e5] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
          {reasons.map(({ title, description, icon: Icon }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="flex gap-4 px-0 py-6 sm:px-5 lg:px-4 xl:px-4 2xl:px-6 lg:py-0 first:lg:pl-0 last:lg:pr-0"
            >
              <Icon className="mt-1 h-7 w-7 xl:h-7 xl:w-7 2xl:h-9 2xl:w-9 flex-none stroke-[1.3] text-[#980E27]" />
              <div>
                <h3 className="text-base xl:text-[15px] 2xl:text-lg font-semibold leading-tight tracking-[-0.02em] text-black font-manrope">{title}</h3>
                <p className="mt-1.5 text-xs xl:text-xs 2xl:text-sm leading-[1.35] text-[#858585]">{description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
