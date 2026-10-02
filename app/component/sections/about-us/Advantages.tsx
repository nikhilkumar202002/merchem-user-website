"use client";

import React from "react";
import {
  FiLayers,
  FiSettings,
  FiShield,
  FiSun,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import { motion } from "framer-motion";

const advantages = [
  {
    icon: FiSettings,
    title: "Strong Technical Expertise",
    description:
      "A highly experienced team of technocrats, professionals, researchers and chemists forms the backbone of our technical capabilities, product development and customer support.",
  },
  {
    icon: FiSun,
    title: "Research & Innovation",
    description:
      "Our R&D capabilities support continuous product development, process improvement and application-oriented innovation, enabling us to address changing industry requirements and develop value-added solutions.",
  },
  {
    icon: FiShield,
    title: "Quality-Driven Operations",
    description:
      "Strict quality-control procedures, modern testing facilities and clearly defined quality parameters help ensure consistent product quality, reliability and performance.",
  },
  {
    icon: FiLayers,
    title: "Comprehensive Product Portfolio",
    description:
      "Our extensive portfolio of rubber accelerators, antioxidants, processing aids, water treatment chemicals and agrochemicals enables us to serve a broad range of industrial applications and customer requirements.",
  },
  {
    icon: FiTrendingUp,
    title: "Strong Industry Experience",
    description:
      "With more than four decades of experience since 1981, Merchem has developed extensive knowledge and understanding of the requirements of rubber goods manufacturers and allied industries.",
  },
  {
    icon: FiUsers,
    title: "Reliable Customer Support & Distribution",
    description:
      "Our wide distribution network, technical expertise and application-oriented support enable us to provide dependable products and responsive service to customers across domestic and international markets.",
  },
];

const Advantages = () => {
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-[100px] overflow-hidden">
      <div className="site-container">
        <div className="mb-10 flex flex-col gap-4 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[20px] font-semibold text-[#980E27] sm:text-base"
            >
              The Merchem Advantage
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-manrope text-3xl font-bold leading-tight tracking-[-0.035em] text-[#000000] sm:text-4xl lg:text-[46px]"
            >
              Our Strengths
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {advantages.map((advantage, index) => {
            const IconComponent = advantage.icon;

            return (
              <motion.article
                key={advantage.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="min-h-[245px] border border-gray-100 bg-white p-6 shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_8px_24px_rgba(152,14,39,0.1)] sm:p-7"
              >
                <IconComponent className="mb-5 h-9 w-9 text-[#980E27] stroke-[1.4]" />
                <h3 className="font-manrope text-[22px] font-bold text-[#000000]">
                  {advantage.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.45] text-[#777777]">
                  {advantage.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
