"use client";

import React, { useState, useEffect } from "react";
import { FiChevronUp } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const ScrollTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          key="scroll-top"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 bg-[#980E27] text-white  shadow-lg hover:bg-[#7d0a1f] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-[#980E27] focus:ring-offset-2 cursor-pointer"
        >
          <FiChevronUp className="w-6 h-6 stroke-[2.5] transition-transform duration-300 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollTop;