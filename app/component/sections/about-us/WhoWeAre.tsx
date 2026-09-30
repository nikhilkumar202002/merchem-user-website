"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import AboutImg from "@/public/images/who-we-are.webp";

const WhoWeAre = () => {
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-[100px]">
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[80px] items-center">
          {/* Left Column: Text & Content (6 cols) */}
          <div className="px-5 sm:px-10 lg:pl-[95px] lg:pr-0">
            {/* Category Subhead */}
            <span className="font-semibold text-[#980E27] text-sm sm:text-base tracking-wide block">
              Who We Are
            </span>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] 2xl:text-[45px] font-bold text-[#000000] leading-[1.12] tracking-[-0.035em] font-manrope max-w-[680px] pb-[20px]">
              Four Decades of Chemical Expertise. A Commitment to Quality.
            </h2>

            {/* Sub-paragraphs */}
            <div className="space-y-5 text-base sm:text-[17px] xl:text-[16px] 2xl:text-[18px] text-[#474747] leading-[1.42] font-normal max-w-[680px]">
              <p>
                Over more than four decades, Merchem has established a strong
                reputation for quality, innovation, technical expertise and
                customer-focused service.
              </p>
              <p>
                Our product portfolio includes rubber accelerators,
                antioxidants, processing aids, water treatment chemicals and
                agrochemicals, catering to diverse industrial requirements
                across India and international markets.
              </p>
              <p>
                Backed by a wide distribution network and a team of experienced
                technocrats, professionals, researchers and chemists, Merchem
                combines technical expertise, industry experience and a
                customer-oriented approach.
              </p>
              <p>
                Our continuous focus on research, product development and
                technological advancement enables us to respond effectively to
                evolving market and application requirements.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-[40px]">
              <Link
                href="/about-us"
                className="bg-[#980E27] text-white px-4 py-3 hover:bg-[#7d0a1f] transition-all inline-flex items-center gap-3 font-medium text-sm sm:text-base xl:text-base"
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
                alt="Merchem chemical manufacturing facility"
                width={700}
                height={480}
                className="w-full h-auto object-cover"
                priority
              />
            </div>

      
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
