"use client";

import React from "react";
import { FiCalendar, FiGlobe, FiUsers } from "react-icons/fi";
import { HiOutlineBeaker } from "react-icons/hi";
import { motion } from "framer-motion";

const milestones = [
  { icon: FiCalendar, value: "1981", label: "Serving Since" },
  { icon: FiUsers, value: "4+", label: "Decades of Experience" },
  { icon: HiOutlineBeaker, value: "Wide", label: "Product Portfolio" },
  { icon: FiGlobe, value: "India & Global", label: "Presence" },
];

const TimeLine = () => {
  return (
    <section className="w-full bg-white pb-10 sm:pb-12 lg:pb-16 overflow-hidden">
      <div className="site-container">
        <div className="px-5 py-7 sm:px-8 lg:px-10 lg:py-8">
          <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:gap-y-0">
            {milestones.map((item, index) => {
              const IconComponent = item.icon;

              return (
                <motion.div
                  key={item.value}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center sm:border-r sm:border-gray-200 sm:px-5 first:sm:pl-0 last:sm:border-r-0 last:sm:pr-0"
                >
                  <IconComponent className="mb-3 h-9 w-9 text-[#980E27] stroke-[1.4]" />
                  <p className="font-manrope text-2xl font-bold leading-none text-[#000000] sm:text-[27px]">
                    {item.value}
                  </p>
                  <p className="mt-2 max-w-[130px] text-sm leading-tight text-[#9b9b9b] sm:text-[15px]">
                    {item.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimeLine;
