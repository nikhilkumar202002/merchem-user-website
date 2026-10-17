"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import TechnicalFoundationImg from "@/public/images/quality_technical.webp";

const TechnicalFoundation = () => {
  return (
    <section className="w-full bg-white py-14 sm:py-16 lg:py-16 xl:py-16 2xl:py-[100px] overflow-hidden">
      <div className="site-container">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-[60px] xl:gap-[70px] 2xl:gap-[80px]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden"
          >
            <Image
              src={TechnicalFoundationImg}
              alt="Merchem research and quality control laboratory"
              width={700}
              height={520}
              className="h-auto w-full object-cover"
            />
          </motion.div>

          <div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-sm font-semibold uppercase tracking-wide text-[#980E27] sm:text-base xl:text-sm 2xl:text-base"
            >
              Our Technical Foundation
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="pb-4 2xl:pb-5 font-manrope text-3xl font-bold leading-[1.14] tracking-[-0.035em] text-[#000000] sm:text-4xl lg:text-[34px] xl:text-[36px] 2xl:text-[46px]"
            >
              Research & Development and Quality Control — The Cornerstones of Our Success
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 xl:space-y-4 2xl:space-y-5 text-sm font-normal leading-[1.45] text-[#474747] sm:text-[16px] lg:text-[15px] xl:text-[15px] 2xl:text-[17px]"
            >
              <p>
                At Merchem, Research & Development (R&D) and Quality Control (QC) are at the heart of our commitment to innovation, quality and customer satisfaction. We continually invest in advanced technologies, modern analytical and testing equipment, and innovative methodologies to develop, enhance and deliver high-performance chemical solutions that meet the evolving needs of the industry.
              </p>
              <p>
                Our experienced R&D and technical teams drive new product development, continuous product improvement, process optimization and application-focused technical solutions. By combining scientific expertise with practical industry knowledge, we strive to improve product performance, manufacturing efficiency and process reliability.
Through the adoption of advanced analytical techniques and modern testing facilities, we ensure stringent quality standards, consistent product characteristics and dependable performance.
              </p>
              <p>
               Quality is embedded at every stage of our operations — from raw material selection and manufacturing to laboratory testing and final product dispatch. Well-defined quality parameters, systematic inspection procedures and rigorous testing protocols enable us to maintain consistency, reliability and confidence in every product we deliver.
              </p>
              <p>
               At Merchem, scientific expertise, continuous innovation and uncompromising quality form the foundation of lasting customer trust and long-term partnerships.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalFoundation;
