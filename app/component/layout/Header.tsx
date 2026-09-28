"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMail, FiPhone, FiChevronDown, FiArrowRight, FiMenu, FiX } from "react-icons/fi";
import { FaPhoneAlt } from "react-icons/fa";
import { GiRotaryPhone } from "react-icons/gi";
import { IoMdMail } from "react-icons/io";
import "../styles/Layout.css";
import Logo from "../../../public/Main_logo.png";

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="w-full bg-white ">
            <div className="flex">
                {/* Left: Logo spanning both top and bottom rows */}
                <div className="flex items-center justify-center py-2 pr-6 shrink-0 pl-[20px] md:pl-[50px] lg:pl-[95px]">
                    <Link href="/" className="block">
                        <Image
                            src={Logo}
                            alt="Merchem Logo"
                            width={110}
                            height={70}
                            className="object-contain h-auto w-auto max-h-[60px] sm:max-h-[85px]"
                            priority
                        />
                    </Link>
                </div>

                {/* Right: Top Red Contact Bar + Bottom Navigation Menu */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                    {/* Top Bar - Primary Red (#980E27) */}
                    <div className="hidden md:flex bg-[#980E27] text-white text-xs sm:text-sm py-2 items-center justify-end gap-3 sm:gap-5 font-normal tracking-wide">
                        <div className="flex items-center justify-end gap-3 sm:gap-5 font-normal tracking-wide flex-wrap sm:flex-nowrap pr-[20px] md:pr-[50px] lg:pr-[95px]">
                       
                        <a
                            href="mailto:mail@merchem.com"
                            className="flex items-center gap-2 hover:opacity-90 transition-opacity shrink-0"
                        >
                            <IoMdMail className="w-4 h-4 " />
                            <span>mail@merchem.com</span>
                        </a>

                        <div className="h-3.5 w-[1px] bg-white/30 shrink-0" />

                        <a
                            href="tel:04843510629"
                            className="flex items-center gap-2 hover:opacity-90 transition-opacity shrink-0"
                        >
                            <GiRotaryPhone className="w-5 h-5" />
                            <span>0484 3510629</span>
                        </a>

                        <div className="h-3.5 w-[1px] bg-white/30 shrink-0" />

                        <a
                            href="tel:+914843510629"
                            className="flex items-center gap-2 hover:opacity-90 transition-opacity shrink-0"
                        >
                            <FaPhoneAlt className="w-3.5 h-3.5" />
                            <span>+91-484-3510629</span>
                        </a>
                             
                        </div>
                    </div>

                    {/* Bottom Bar - Main Navigation Links */}
                    <div className="py-5 flex items-center justify-end pr-[20px] md:pr-[50px] lg:pr-[95px]">
                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-7 xl:gap-9 text-[17px] font-medium text-[#000000]">
                            <Link
                                href="/"
                                className="hover:text-[#980E27] transition-colors py-1"
                            >
                                Home
                            </Link>

                            <Link
                                href="/about"
                                className="hover:text-[#980E27] transition-colors py-1"
                            >
                                About
                            </Link>

                            {/* Products Dropdown */}
                            <div className="relative group py-1 cursor-pointer">
                                <Link
                                    href="/products"
                                    className="flex items-center gap-1 hover:text-[#980E27] transition-colors"
                                >
                                    <span>Products</span>
                                    <FiChevronDown className="w-4 h-4 stroke-[2] transition-transform duration-200 group-hover:rotate-180" />
                                </Link>

                                {/* Dropdown Menu */}
                                <div className="absolute top-full right-0 mt-1 w-52 bg-white shadow-lg rounded-sm py-2 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <Link
                                        href="/products/accelerators"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#980E27]"
                                    >
                                        Accelerators
                                    </Link>
                                    <Link
                                        href="/products/antidegradants"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#980E27]"
                                    >
                                        Antidegradants
                                    </Link>
                                    <Link
                                        href="/products/specialty-chemicals"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#980E27]"
                                    >
                                        Specialty Chemicals
                                    </Link>
                                </div>
                            </div>

                            <Link
                                href="/blog"
                                className="hover:text-[#980E27] transition-colors py-1"
                            >
                                Blog
                            </Link>

                            <Link
                                href="/careers"
                                className="hover:text-[#980E27] transition-colors py-1"
                            >
                                Careers
                            </Link>

                            {/* Contact Us Button */}
                            <Link
                                href="/contact"
                                className="bg-[#980E27] text-white px-6 py-2.5 hover:bg-[#7d0a1f] transition-colors inline-flex items-center gap-2 font-medium text-sm ml-3"
                            >
                                <span>Contact Us</span>
                                <FiArrowRight className="w-4 h-4 stroke-[2]" />
                            </Link>
                        </nav>

                        {/* Mobile Menu Toggle Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-2 text-gray-700 hover:text-[#980E27] focus:outline-hidden"
                            aria-label="Toggle navigation menu"
                        >
                            {mobileMenuOpen ? (
                                <FiX className="w-6 h-6" />
                            ) : (
                                <FiMenu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Drawer Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden border-t border-gray-100 bg-white py-4 px-6 space-y-3 shadow-md">
                    <Link
                        href="/"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-gray-800 hover:text-[#980E27] font-medium py-1"
                    >
                        Home
                    </Link>
                    <Link
                        href="/about"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-gray-800 hover:text-[#980E27] font-medium py-1"
                    >
                        About
                    </Link>
                    <Link
                        href="/products"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-gray-800 hover:text-[#980E27] font-medium py-1"
                    >
                        Products
                    </Link>
                    <Link
                        href="/blog"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-gray-800 hover:text-[#980E27] font-medium py-1"
                    >
                        Blog
                    </Link>
                    <Link
                        href="/careers"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-gray-800 hover:text-[#980E27] font-medium py-1"
                    >
                        Careers
                    </Link>

                    {/* Contact Details on Mobile */}
                    <div className="pt-3 border-t border-gray-100 text-xs text-gray-600 space-y-2">
                        <div className="flex items-center gap-2">
                            <FiMail className="text-[#980E27]" />
                            <span>mail@merchem.com</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FiPhone className="text-[#980E27]" />
                            <span>0484 3510629</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaPhoneAlt className="text-[#980E27]" />
                            <span>+91-484-3510629</span>
                        </div>
                    </div>

                    <Link
                        href="/contact"
                        onClick={() => setMobileMenuOpen(false)}
                        className="inline-flex items-center justify-center gap-2 bg-[#980E27] text-white w-full py-2.5 font-medium text-sm mt-3"
                    >
                        <span>Contact Us</span>
                        <FiArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            )}
        </header>
    );
};

export default Header;