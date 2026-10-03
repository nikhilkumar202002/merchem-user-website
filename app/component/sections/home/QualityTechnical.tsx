"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import QualityImage from "@/public/images/quality_technical.webp";

const steps = [
  { number: "01.", title: "Development", description: "Chemical formulation & product understanding" },
  { number: "02.", title: "Quality", description: "Testing, consistency & process control" },
  { number: "03.", title: "Application", description: "Industrial performance & customer requirements" },
];

export default function QualityTechnical() {
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-[120px] overflow-hidden">
      <div className="site-container">
        <div className="grid grid-cols-1 items-center lg:grid-cols-2 gap-12 lg:gap-[80px]">
          {/* Left Column: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative w-full overflow-hidden"
          >
            <Image
              src={QualityImage}
              alt="Quality and technical laboratory testing"
              width={1100}
              height={800}
              className="aspect-[1.23/1] w-full object-cover lg:aspect-auto lg:h-[560px] xl:h-[620px]"
              priority
            />
          </motion.div>

          {/* Right Column: Text & Process Steps */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="block text-sm font-semibold tracking-wide text-[#980E27] sm:text-base xl:text-base"
            >
              Quality &amp; Technical Excellence
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-1 max-w-[680px] text-4xl font-bold leading-[1.04] tracking-[-0.035em] text-black sm:text-5xl lg:text-[46px] xl:text-[48px] 2xl:text-[54px]"
            >
              Precision in Chemistry.<br />Confidence in Every<br />Batch.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-5 max-w-[680px] text-base leading-[1.4] text-[#5b5b5b] sm:text-lg xl:text-lg 2xl:text-xl"
            >
              From product development to quality control, our approach is built around consistency, technical discipline and the requirements of industrial customers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-8 flex flex-nowrap items-start gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-4"
            >
              {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-semibold leading-tight text-[#980E27] sm:text-lg xl:text-lg">{step.number} {step.title}</p>
                    <p className="mt-1 text-sm leading-[1.2] text-[#686868] sm:text-base xl:text-base">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && <span className="shrink-0 pt-1 text-2xl text-[#333]">→</span>}
                </React.Fragment>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
