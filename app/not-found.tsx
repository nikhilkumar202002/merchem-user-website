"use client";

import React from "react";
import Link from "next/link";
import { FiHome, FiGrid, FiBookOpen, FiMail, FiArrowLeft } from "react-icons/fi";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main className="flex min-h-[75vh] flex-col items-center justify-center bg-white px-4 py-16 text-center">
      <div className="site-container max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-manrope text-7xl font-extrabold text-[#d3132d] sm:text-9xl tracking-tight">
            404
          </span>
          <h1 className="mt-4 font-manrope text-3xl font-bold text-gray-900 sm:text-4xl">
            Page Not Found
          </h1>
          <p className="mt-3 text-base text-gray-600 sm:text-lg">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-md bg-[#d3132d] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#980e27]"
            >
              <FiHome className="h-4 w-4" /> Go to Homepage
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              <FiGrid className="h-4 w-4 text-[#d3132d]" /> Explore Products
            </Link>
          </div>

          <div className="mt-12 border-t border-gray-100 pt-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Quick Navigation
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-gray-600">
              <Link href="/about-us" className="hover:text-[#d3132d] transition-colors">
                About Us
              </Link>
              <Link href="/blog" className="inline-flex items-center gap-1 hover:text-[#d3132d] transition-colors">
                <FiBookOpen className="h-3.5 w-3.5" /> Blog & Articles
              </Link>
              <Link href="/contact-us" className="inline-flex items-center gap-1 hover:text-[#d3132d] transition-colors">
                <FiMail className="h-3.5 w-3.5" /> Contact Us
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
