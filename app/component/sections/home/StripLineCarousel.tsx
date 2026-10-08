"use client";

import React from "react";
import { TbMicroscope } from "react-icons/tb";
import { FaAward, FaHandshake } from "react-icons/fa6";
import { HiOutlineBeaker } from "react-icons/hi";
import { motion } from "framer-motion";

const features = [
  {
    icon: HiOutlineBeaker,
    title: "Specialty Chemicals",
    description: "Performance-focused chemical solutions for industrial applications.",
  },
  {
    icon: TbMicroscope,
    title: "Application Expertise",
    description: "Solutions developed around specific material and process requirements.",
  },
  {
    icon: FaAward,
    title: "Consistent Quality",
    description: "Focus on product consistency, reliability and process control.",
  },
  {
    icon: FaHandshake,
    title: "Customer Partnership",
    description: "Technical understanding and responsive support for industrial customers.",
  },
];

const StripLine = () => {
  return (
    <section className="w-full bg-white py-6 sm:py-8 overflow-hidden">
      <div className="site-container">
        {/* Desktop View: Grid layout */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-gray-200">
          {features.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex items-start gap-4 ${
                  index !== 0 ? "lg:pl-7" : ""
                } ${index !== features.length - 1 ? "lg:pr-6" : ""}`}
              >
                <IconComponent className="w-9 h-9 text-[#980E27] shrink-0 stroke-[1.4]" />
                <div className="space-y-1">
                  <h3 className="font-bold text-[#000000] text-base lg:text-[17px] leading-tight font-manrope">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#474747] leading-[1.3] font-normal">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile View: Infinite Smooth Horizontal Marquee */}
        <div className="block sm:hidden overflow-hidden w-full relative">
          {/* Edge gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-6 items-center w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 18,
              repeat: Infinity,
            }}
          >
            {[...features, ...features].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 shrink-0 pr-6 border-r border-gray-200"
                >
                  <IconComponent className="w-7 h-7 text-[#980E27] shrink-0 stroke-[1.4]" />
                  <div className="space-y-0.5 max-w-[220px]">
                    <h3 className="font-bold text-[#000000] text-sm leading-tight font-manrope">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#474747] leading-tight font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StripLine;