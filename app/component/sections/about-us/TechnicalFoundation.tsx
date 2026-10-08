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
              R&amp;D and Quality Control — The Key to Our Success
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 xl:space-y-4 2xl:space-y-5 text-sm font-normal leading-[1.45] text-[#474747] sm:text-[16px] lg:text-[15px] xl:text-[15px] 2xl:text-[17px]"
            >
              <p>
                At Merchem, Research &amp; Development and Quality Control are
                integral to our operations. We continuously invest in advanced
                technology, modern testing equipment and innovative approaches
                to develop and improve products that meet the changing
                requirements of the industry.
              </p>
              <p>
                Our experienced R&amp;D and technical teams are involved in new
                product development, product improvement, process optimization
                and application-oriented technical solutions.
              </p>
              <p>
                The adoption of modern equipment and analytical technologies
                helps us maintain high standards of product consistency,
                reliability and performance.
              </p>
              <p>
                Quality is controlled through well-defined quality parameters
                and systematic procedures at every stage, from raw material
                selection and manufacturing through testing and final product
                dispatch. This disciplined approach enables us to deliver
                consistent and dependable products to our customers.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalFoundation;
