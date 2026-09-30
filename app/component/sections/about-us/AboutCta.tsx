import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const AboutCta = () => {
  return (
    <section className="w-full bg-[#f6f6f6] py-10 sm:py-14 lg:py-16">
      <div className="site-container">
        <div className="px-5 py-7 text-[#000000] sm:px-8 sm:py-9 lg:px-5 lg:py-6">
          <p className="text-[20px] font-semibold text-[#980E27] sm:text-base">
            Connect with Merchem
          </p>

          <h2 className="max-w-4xl font-manrope text-3xl font-bold leading-[1.12] text-[#000000] sm:text-4xl lg:text-[38px]">
            Let&apos;s Explore the Right Chemical Solutions
            <br className="hidden sm:block" /> For Your Needs.
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-[#474747] sm:text-base">
            Connect with our team to discuss your product requirements and
            industrial applications.
          </p>

          <Link
            href="/contact"
            className="mt-4 inline-flex items-center gap-3 bg-[#980E27] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#7d0a1f] sm:text-base"
          >
            <span>Contact Our Team</span>
            <FiArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutCta;
