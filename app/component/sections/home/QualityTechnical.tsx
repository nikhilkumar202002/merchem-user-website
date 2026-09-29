"use client";

import React from "react";
import Image from "next/image";
import QualityImage from "@/public/images/quality_technical.webp";

const steps = [
  { number: "01.", title: "Development", description: "Chemical formulation & product understanding" },
  { number: "02.", title: "Quality", description: "Testing, consistency & process control" },
  { number: "03.", title: "Application", description: "Industrial performance & customer requirements" },
];

export default function QualityTechnical() {
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-[58px]">
      <div className="grid grid-cols-1 items-center lg:grid-cols-2">
        <div className="relative w-full overflow-hidden">
          <Image src={QualityImage} alt="Quality and technical laboratory testing" width={1100} height={800} className="aspect-[1.23/1] w-full object-cover lg:aspect-auto lg:h-[560px] xl:h-[620px]" priority />
        </div>
        <div className="px-5 py-10 sm:px-10 lg:py-0 lg:pl-[55px] lg:pr-[95px]">
          <span className="block text-sm font-semibold tracking-wide text-[#980E27] sm:text-base xl:text-base">Quality &amp; Technical Excellence</span>
          <h2 className="mt-1 max-w-[680px] text-4xl font-bold leading-[1.04] tracking-[-0.035em] text-black sm:text-5xl lg:text-[46px] xl:text-[48px] 2xl:text-[54px]">Precision in Chemistry.<br />Confidence in Every<br />Batch.</h2>
          <p className="mt-5 max-w-[680px] text-base leading-[1.4] text-[#5b5b5b] sm:text-lg xl:text-lg 2xl:text-xl">From product development to quality control, our approach is built around consistency, technical discipline and the requirements of industrial customers.</p>
          <div className="mt-8 flex flex-nowrap items-start gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-4">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="min-w-0 flex-1">
                  <p className="text-base font-semibold leading-tight text-[#980E27] sm:text-lg xl:text-lg">{step.number} {step.title}</p>
                  <p className="mt-1 text-sm leading-[1.2] text-[#686868] sm:text-base xl:text-base">{step.description}</p>
                </div>
                {index < steps.length - 1 && <span className="shrink-0 pt-1 text-2xl text-[#333]">→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
