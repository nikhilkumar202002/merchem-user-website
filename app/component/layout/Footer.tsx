"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiMapPin, FiArrowRight } from "react-icons/fi";
import { IoMdMail } from "react-icons/io";
import { GiRotaryPhone } from "react-icons/gi";
import { getProductCategories, Category } from "@/app/utils/ProductService";
import "../styles/Layout.css";

const Footer = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getProductCategories();
        if (res && res.success && Array.isArray(res.data)) {
          setCategories(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch categories for footer:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <footer className="w-full bg-white text-gray-800 border-t border-gray-100 font-sans">
      {/* Main Footer Section */}
      <div className="site-container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Column 1: Company Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-[18px] text-[#000000]">Company</h4>
            <ul className="space-y-2 text-[17px] text-[#474747]">
              <li>
                <Link href="/about" className="hover:text-[#980E27] transition-colors">
                  About Merchem
                </Link>
              </li>
              <li>
                <Link href="/expertise" className="hover:text-[#980E27] transition-colors">
                  Our Expertise
                </Link>
              </li>
              <li>
                <Link href="/quality" className="hover:text-[#980E27] transition-colors">
                  Quality
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-[#980E27] transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#980E27] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-[#980E27] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Products Links & View All Button */}
          <div className="space-y-3">
            <h4 className="font-bold text-[18px] text-[#000000]">Products</h4>
            <ul className="space-y-2 text-[17px] text-[#474747]">
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <li key={cat.id || cat.slug}>
                    <Link href={`/products/${cat.slug}`} className="hover:text-[#980E27] transition-colors">
                      {cat.name}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li>
                    <Link href="/products/rubber-accelerators" className="hover:text-[#980E27] transition-colors">
                      Accelerators
                    </Link>
                  </li>
                  <li>
                    <Link href="/products/rubber-antioxidants-antiozonants" className="hover:text-[#980E27] transition-colors">
                      Antioxidants & Antiozonants
                    </Link>
                  </li>
                  <li>
                    <Link href="/products/rubber-processing-aids" className="hover:text-[#980E27] transition-colors">
                      Processing Aids
                    </Link>
                  </li>
                  <li>
                    <Link href="/products/agrochemicals" className="hover:text-[#980E27] transition-colors">
                      Agrochemical Intermediates
                    </Link>
                  </li>
                  <li>
                    <Link href="/products/water-treatment-chemicals" className="hover:text-[#980E27] transition-colors">
                      Water Treatment Chemicals
                    </Link>
                  </li>
                </>
              )}
            </ul>

            <div className="pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-[#980E27] text-white text-xs sm:text-sm px-4 py-2 hover:bg-[#7d0a1f] transition-colors font-medium"
              >
                <span>View All Products</span>
                <FiArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Column 3: Contact Details */}
          <div className="space-y-4 text-xs sm:text-sm text-[#474747]">
            <h4 className="font-bold text-[18px] text-[#000000]">Contact</h4>

            {/* Address */}
            <div className="flex items-start gap-2.5">
              <FiMapPin className="w-4 h-4 text-[#980E27] shrink-0 mt-0.5" />
              <a
                href="https://maps.app.goo.gl/XL3iRPWm8YS6ufQY6"
                target="_blank"
                rel="noopener noreferrer"
                className="space-y-0.5 hover:text-[#980E27] transition-colors"
                aria-label="View Merchem India Private Limited on Google Maps"
              >
                <p className="font-bold text-[#000000] uppercase text-[17px]">
                  MERCHEM INDIA PRIVATE LIMITED
                </p>
                <p>45A Development Plot, Kalamassery</p>
                <p>Ernakulam - 683104, Kerala, India</p>
              </a>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-2.5">
              <GiRotaryPhone className="w-4 h-4 text-[#980E27] shrink-0" />
              <a
                href="tel:04843510629"
                className="font-bold text-[#000000] hover:text-[#980E27] transition-colors"
              >
                0484 3510629
              </a>
            </div>

            {/* Email */}
            <div className="flex items-center gap-2.5">
              <IoMdMail className="w-4 h-4 text-[#980E27] shrink-0" />
              <a
                href="mailto:mail@merchem.com"
                className="font-bold text-[#000000] hover:text-[#980E27] transition-colors"
              >
                mail@merchem.com
              </a>
            </div>

            <div className="pt-1 space-y-0.5">
              <p className="font-bold text-[#000000]">GSTIN/UIN:</p>
              <p className="tracking-wider text-xs sm:text-sm">32AACCM2015Q1ZL</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Strip */}
      <div className="w-full bg-[#980E27] text-white text-xs sm:text-sm py-3">
        <div className="site-container flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left font-normal">
          <p>© 2026 Merchem India Private Limited. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:underline transition-all">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:underline transition-all">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
