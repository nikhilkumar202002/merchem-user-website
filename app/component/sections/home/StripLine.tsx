import React from "react";
import {  TbMicroscope } from "react-icons/tb";
import { FaAward, FaHandshake } from "react-icons/fa6";
import { HiOutlineBeaker } from "react-icons/hi";

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
    <section className="w-full bg-white border-y border-gray-100 py-8 lg:py-8">
      <div className="site-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-gray-200">
          {features.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StripLine;