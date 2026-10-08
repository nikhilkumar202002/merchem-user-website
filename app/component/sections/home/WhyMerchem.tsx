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
    <section className="w-full bg-white py-16 sm:py-20 lg:py-[120px] overflow-hidden">
      <div className="site-container">
        <div className="mx-auto max-w-[620px] text-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold tracking-wide text-[#980E27] sm:text-base block"
          >
            Why Merchem
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-2 text-4xl font-bold leading-[1.12] tracking-[-0.035em] text-black sm:text-5xl lg:text-[46px]"
          >
            More Than Chemicals. A<br className="hidden sm:block" /> Technical Partnership.
          </motion.h2>
        </div>

        <div className="mt-12 grid grid-cols-1 divide-y divide-[#e5e5e5] sm:grid-cols-2 sm:divide-y-0 lg:mt-14 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
          {reasons.map(({ title, description, icon: Icon }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="flex gap-4 px-0 py-6 sm:px-6 lg:py-0 first:lg:pl-0 last:lg:pr-0"
            >
              <Icon className="mt-1 h-9 w-9 flex-none stroke-[1.3] text-[#980E27]" />
              <div>
                <h3 className="text-lg font-semibold leading-tight tracking-[-0.02em] text-black">{title}</h3>
                <p className="mt-2 text-base leading-[1.3] text-[#858585]">{description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
