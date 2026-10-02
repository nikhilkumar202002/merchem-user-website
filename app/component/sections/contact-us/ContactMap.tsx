"use client";

import React from "react";
import { motion } from "framer-motion";

const ContactMap = () => {
  return (
    <section className="w-full bg-[#f8f8f8] py-14 sm:py-20 lg:py-[81px]">
      <div className="site-container">
        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#980E27] sm:text-base">
              Our Location
            </p>
            <h2 className="mt-2 font-manrope text-3xl font-bold leading-[1.1] text-[#000000] sm:text-4xl lg:text-[46px]">
              Visit Merchem India.
            </h2>
            <p className="mt-5 max-w-md text-base leading-[1.55] text-[#474747]">
              Our office is located at Development Plot, Kalamassery,
              Ernakulam, Kerala.
            </p>

            <div className="mt-8 border-l-2 border-[#980E27] pl-5 text-base leading-[1.6] text-[#474747]">
              <p className="font-bold text-[#202020]">Merchem India (P) Limited</p>
              <p className="mt-1">
                45A Development Plot, Kalamassery, Ernakulam – 683104, Kerala
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="h-[320px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm sm:h-[400px]"
          >
            <iframe
              title="Merchem India office location"
              src="https://www.google.com/maps?q=45A+Development+Plot,+Kalamassery,+Ernakulam,+Kerala+683104&output=embed"
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactMap;

