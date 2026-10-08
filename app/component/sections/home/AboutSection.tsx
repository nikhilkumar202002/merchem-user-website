"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import AcceleratorsImg from "@/public/images/Rubber Accelerators_ From Granules to Tyres.webp";
import ProcessingAidsImg from "@/public/images/Rubber Processing Aids_ Smoother Production.webp";
import ProtectionImg from "@/public/images/Rubber Protection for Longer Life.webp";

const aboutImages = [
  {
    src: AcceleratorsImg,
    alt: "Rubber Accelerators - From Granules to Tyres",
  },
  {
    src: ProcessingAidsImg,
    alt: "Rubber Processing Aids - Smoother Production",
  },
  {
    src: ProtectionImg,
    alt: "Rubber Protection - For Longer Life",
  },
];

const AboutSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % aboutImages.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-[120px] overflow-hidden">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[80px] items-center">
          {/* Left Column: Text & Content */}
          <div>
            {/* Category Subhead */}
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-semibold text-[#980E27] text-sm sm:text-base tracking-wide block"
            >
              About Merchem
            </motion.span>

            {/* Main Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] 2xl:text-[52px] font-bold text-[#000000] leading-[1.12] tracking-[-0.035em] font-manrope max-w-[680px] pb-[20px]"
            >
              Chemistry Designed Around Real Industrial Needs.
            </motion.h2>

            {/* Sub-paragraphs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-5 text-base sm:text-[17px] xl:text-[16px] 2xl:text-[18px] text-[#474747] leading-[1.42] font-normal max-w-[680px]"
            >
              <p>
                Merchem is a speciality chemical company delivering high-performance chemical solutions for industrial applications. Our focused portfolio supports the performance, consistency, and process efficiency needs of the Tyre, Rubber, Latex, and other industrial sectors — driven by consistent quality, technical expertise, and strong customer partnerships
              </p>
              <p>
                Our expertise spans chemical solutions supporting Tyre, Rubber, Latex and Other Industrial Applications, with a focus on
                dependable quality, technical understanding and long-term customer
                relationships.
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-[40px]"
            >
              <Link
                href="/about-us"
                className="bg-[#980E27] text-white px-4 py-3 hover:bg-[#7d0a1f] transition-all inline-flex items-center gap-3 font-medium text-sm sm:text-base xl:text-base"
              >
                <span>Discover Merchem</span>
                <FiArrowRight className="w-4 h-4 stroke-[1.5]" />
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Fading 3-Image Slider with Floating Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative overflow-hidden w-full aspect-[700/480] bg-gray-100 shadow-md">
              {aboutImages.map((img, index) => (
                <motion.div
                  key={img.alt}
                  initial={false}
                  animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    priority={index === 0}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>

            {/* Floating Badge at Bottom Left */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="absolute -bottom-[30px] left-[35%] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)] py-3 px-5 border-l-4 border-[#980E27] z-20 flex flex-col justify-center min-w-[220px]"
            >
              <span className="font-bold text-[#000000] text-base xl:text-base 2xl:text-lg tracking-wide uppercase">
                MERCHEM INDIA
              </span>
              <span className="text-sm xl:text-sm 2xl:text-base text-[#474747] font-normal">
                Specialty Chemical Solutions
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
