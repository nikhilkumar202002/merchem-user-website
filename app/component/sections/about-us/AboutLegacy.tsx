"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import LegacyImg from "@/public/banner/about-legacy.webp";

const AboutLegacy = () => {
  return (
    <section className="relative min-h-[620px] w-full overflow-hidden bg-[#08090b] sm:min-h-[680px] lg:min-h-[720px]">
      <Image
        src={LegacyImg}
        alt="Colorful rubber-inspired fashion design against rubber textures"
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.98)_0%,rgba(0,0,0,0.78)_24%,rgba(0,0,0,0.28)_36%,rgba(0,0,0,0)_46%)]" />

      <div className="site-container relative z-10 flex min-h-[620px] items-center py-16 sm:min-h-[680px] sm:py-20 lg:min-h-[720px] lg:py-24">
        <div className="max-w-xl text-white">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold uppercase tracking-[0.18em] text-[#e21b35] sm:text-base"
          >
            Our Legacy · Since 1981
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="!text-white mt-4 font-manrope text-5xl font-bold leading-[0.98] tracking-tight sm:text-6xl lg:text-[55px]"
          >
            Adding Value to Rubber...{" "}
            <span className="text-[#e21b35]">Since 1981.</span>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="my-6 h-[2px] w-36 bg-[#e21b35] origin-left"
          />

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="!text-white max-w-md text-xl font-bold uppercase leading-tight tracking-wide sm:text-2xl"
          >
            Nurturing Nature for Future Generations
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-5 text-xs font-semibold uppercase tracking-wide text-white/90 sm:text-sm"
          >
            Accelerators <span className="px-2 text-[#e21b35]">·</span>
            Antidegradants <span className="px-2 text-[#e21b35]">·</span>
            Processing Aids
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-8 max-w-md text-base font-medium leading-relaxed text-white sm:text-lg"
          >
            “When people create wonders with Rubber, our applause for them is
            LOUD.”
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default AboutLegacy;
