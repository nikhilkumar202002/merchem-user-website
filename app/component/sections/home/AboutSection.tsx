"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import AboutImg from "@/public/images/About-image-1.webp";

const AboutSection = () => {
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text & Content (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Category Subhead */}
            <span className="font-bold text-[#980E27] text-sm sm:text-base tracking-wide block">
              About Merchem
            </span>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#000000] leading-[1.2] tracking-tight font-manrope">
              Chemistry Designed Around Real Industrial Needs.
            </h2>

            {/* Sub-paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-[#474747] leading-relaxed font-normal">
              <p>
                Merchem India (P) Limited is a specialty chemical company based in
                Kalamassery, Ernakulam, Kerala, serving industrial requirements
                through a focused portfolio of chemical products and
                application-oriented solutions.
              </p>
              <p>
                Our expertise spans chemical solutions supporting latex, tyre and
                rubber, paints and other industrial applications, with a focus on
                dependable quality, technical understanding and long-term customer
                relationships.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                href="/about"
                className="bg-[#980E27] text-white px-6 py-3.5 hover:bg-[#7d0a1f] transition-all inline-flex items-center gap-2 font-medium text-sm sm:text-base"
              >
                <span>Discover Merchem</span>
                <FiArrowRight className="w-4 h-4 stroke-[2]" />
              </Link>
            </div>
          </div>

          {/* Right Column: Image with Floating Card (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-md overflow-hidden shadow-xs">
              <Image
                src={AboutImg}
                alt="Merchem Laboratory Scientists"
                width={700}
                height={480}
                className="w-full h-auto object-cover rounded-md"
                priority
              />
            </div>

            {/* Floating Badge at Bottom Left */}
            <div className="absolute -bottom-5 left-6 sm:left-8 bg-white shadow-xl py-3 px-5 border-l-4 border-[#980E27] z-10 flex flex-col justify-center">
              <span className="font-bold text-[#000000] text-xs sm:text-sm tracking-wide uppercase">
                MERCHEM INDIA
              </span>
              <span className="text-xs text-[#474747] font-normal">
                Specialty Chemical Solutions
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;