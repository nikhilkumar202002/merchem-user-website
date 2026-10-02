"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import IsoLogo from "@/public/images/ISO_9001-2015.png";

const ISOCertificate = () => {
  return (
    <section className="w-full bg-white overflow-hidden">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid items-center gap-7 bg-[#fff5f6] px-6 py-7 sm:px-10 sm:py-8 lg:grid-cols-[1fr_1px_1.35fr] lg:gap-10 lg:px-10"
        >
          <div className="flex items-center gap-5">
            <Image
              src={IsoLogo}
              alt="ISO 9001:2015 certification logo"
              width={82}
              height={82}
              className="h-[62px] w-[62px] shrink-0 object-contain sm:h-[76px] sm:w-[76px]"
            />

            <div>
              <h2 className="font-manrope text-xl font-bold leading-tight text-[#111827] sm:text-2xl">
                ISO 9001:2015 Certified
              </h2>
              <p className="mt-1 text-sm leading-tight text-[#606060] sm:text-base">
                Certified Quality Management System
              </p>
            </div>
          </div>

          <div className="hidden h-16 bg-[#e9d9db] lg:block" />

          <div className="max-w-2xl">
            <p className="text-sm leading-[1.55] text-[#474747] sm:text-base lg:text-[17px]">
              Merchem&apos;s Quality Management System is certified to ISO
              9001:2015, reflecting its commitment to effective quality
              management, customer satisfaction and continual improvement.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ISOCertificate;
