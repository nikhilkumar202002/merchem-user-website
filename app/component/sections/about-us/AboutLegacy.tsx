"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import LegacyImg from "@/public/banner/about-legacy.webp";

const AboutLegacy = () => {
  return (
    <section className="relative min-h-[460px] xl:min-h-[480px] 2xl:min-h-[680px] w-full overflow-hidden bg-[#08090b]">
      <Image
        src={LegacyImg}
        alt="Colorful rubber-inspired fashion design against rubber textures"
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.98)_0%,rgba(0,0,0,0.78)_24%,rgba(0,0,0,0.28)_36%,rgba(0,0,0,0)_46%)]" />

      <div className="site-container relative z-10 flex min-h-[460px] xl:min-h-[480px] 2xl:min-h-[680px] items-center py-12 sm:py-16 xl:py-16 2xl:py-24">
        <div className="max-w-xl text-white">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.18em] text-[#e21b35] sm:text-sm xl:text-xs 2xl:text-base"
          >
            Our Legacy · Since 1981
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="!text-white mt-3 font-manrope text-3xl font-bold leading-[1.05] tracking-tight sm:text-4xl lg:text-[38px] xl:text-[42px] 2xl:text-[55px]"
          >
            Adding Value to Rubber...{" "}
            <span className="text-[#e21b35]">Since 1981.</span>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="my-4 xl:my-4 2xl:my-6 h-[2px] w-32 bg-[#e21b35] origin-left"
          />

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="!text-white max-w-md text-base font-bold uppercase leading-tight tracking-wide sm:text-lg xl:text-base 2xl:text-2xl"
          >
            Nurturing Nature for Future Generations
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-3 text-xs font-semibold uppercase tracking-wide text-white/90 xl:text-xs 2xl:text-sm"
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
            className="mt-5 max-w-md text-sm font-medium leading-relaxed text-white sm:text-base xl:text-[15px] 2xl:text-lg"
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
