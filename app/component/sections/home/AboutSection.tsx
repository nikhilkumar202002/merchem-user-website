"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import AboutImg from "@/public/images/About-image-1.webp";

const AboutSection = () => {
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-[81px]">
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[80px] items-center">
          {/* Left Column: Text & Content (6 cols) */}
          <div className="pl-[95px]">
            {/* Category Subhead */}
            <span className="font-semibold text-[#980E27] text-sm sm:text-base tracking-wide block">
              About Merchem
            </span>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-[45px] font-bold text-[#000000] leading-[1.17] tracking-[-0.03em] font-manrope max-w-[680px] pb-[20px]">
              Chemistry Designed Around Real Industrial Needs.
            </h2>

            {/* Sub-paragraphs */}
            <div className="space-y-5 text-[17px] text-[#474747] leading-[1.42] font-normal max-w-[680px]">
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
            <div className="pt-[40px]">
              <Link
                href="/about"
                className="bg-[#980E27] text-white px-4 py-3 hover:bg-[#7d0a1f] transition-all inline-flex items-center gap-3 font-medium text-sm sm:text-base"
              >
                <span>Discover Merchem</span>
                <FiArrowRight className="w-4 h-4 stroke-[1.5]" />
              </Link>
            </div>
          </div>

          {/* Right Column: Image with Floating Card (6 cols) */}
          <div className="relative">
            <div className="relative overflow-hidden">
              <Image
                src={AboutImg}
                alt="Merchem Laboratory Scientists"
                width={700}
                height={480}
                className="w-full h-auto object-cover"
                priority
              />
            </div>

            {/* Floating Badge at Bottom Left */}
            <div className="absolute -bottom-[30px] left-[35%] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)] py-3 px-5 border-l-4 border-[#980E27] z-10 flex flex-col justify-center min-w-[220px]">
              <span className="font-bold text-[#000000] text-[20] tracking-wide uppercase">
                MERCHEM INDIA
              </span>
              <span className="text-[17px] text-[#474747] font-normal">
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
