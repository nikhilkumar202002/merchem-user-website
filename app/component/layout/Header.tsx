"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FiMail, FiPhone, FiChevronDown, FiArrowRight, FiMenu, FiX } from "react-icons/fi";
import { FaPhoneAlt } from "react-icons/fa";
import { GiRotaryPhone } from "react-icons/gi";
import { IoMdMail } from "react-icons/io";
import "../styles/Layout.css";
import Logo from "../../../public/Main_logo.png";

const PRODUCT_DATA = [
    {
        id: "accelerators",
        label: "Accelerators",
        href: "/products/accelerators",
        subcategories: [
            {
                name: "Thiazoles",
                slug: "thiazoles",
                products: ["VULCURE MBT", "VULCURE MBTS", "VULCURE ZMBT", "VULCURE F"]
            },
            {
                name: "Sulphenamides",
                slug: "sulphenamides",
                products: ["VULCURE CBS", "VULCURE MOR", "VULCURE NS", "VULCURE TBBS"]
            },
            {
                name: "Thiurams",
                slug: "thiurams",
                products: ["VULCURE TMTM", "VULCURE TMTD", "VULCURE TETD", "VULCURE DPTT"]
            },
            {
                name: "Dithiocarbamates",
                slug: "dithiocarbamates",
                products: ["VULCURE ZDEC", "VULCURE ZDBC", "VULCURE ZDMC"]
            },
            {
                name: "Special Purpose",
                slug: "special-purpose",
                products: ["VULCURE HMT", "VULCURE HEXA"]
            }
        ]
    },
    {
        id: "antioxidants",
        label: "Antioxidants & Antidegradants",
        href: "/products/antioxidants-antiozonants",
        subcategories: [
            {
                name: "Amine Based",
                slug: "amine-based",
                products: ["MERNOX 6PPD", "MERNOX IPPD", "MERNOX TMQ"]
            },
            {
                name: "Phenolic Based",
                slug: "phenolic-based",
                products: ["MERNOX BHT", "MERNOX SP"]
            },
            {
                name: "Phosphite Based",
                slug: "phosphite-based",
                products: ["MERNOX TNPP"]
            }
        ]
    },
    {
        id: "processing-aids",
        label: "Processing Aids",
        href: "/products/processing-aids",
        subcategories: [
            {
                name: "Peptizers",
                slug: "peptizers",
                products: ["MERPEPT DBD", "MERPEPT 60"]
            },
            {
                name: "Homogenizers",
                slug: "homogenizers",
                products: ["MERHOMO 40", "MERHOMO 60"]
            },
            {
                name: "Dispersing Aids",
                slug: "dispersing-aids",
                products: ["MERDISP 100", "MERDISP 200"]
            },
            {
                name: "Tackifiers",
                slug: "tackifiers",
                products: ["MERTACK 10", "MERTACK 20"]
            }
        ]
    },
    {
        id: "agrochemical-intermediates",
        label: "Agrochemical Intermediates",
        href: "/products/agrochemical-intermediates",
        subcategories: [
            {
                name: "Synthesis Intermediates",
                slug: "synthesis-intermediates",
                products: ["MERAGRO INT-1", "MERAGRO INT-2"]
            },
            {
                name: "Active Ingredients",
                slug: "active-ingredients",
                products: ["MERAGRO AI-1", "MERAGRO AI-2"]
            }
        ]
    },
    {
        id: "water-treatment",
        label: "Water Treatment Chemicals",
        href: "/products/water-treatment-chemicals",
        subcategories: [
            {
                name: "Coagulants & Flocculants",
                slug: "coagulants-flocculants",
                products: ["MERWATER CF-100", "MERWATER CF-200"]
            },
            {
                name: "Biocides",
                slug: "biocides",
                products: ["MERWATER BIO-10", "MERWATER BIO-20"]
            },
            {
                name: "Scale Inhibitors",
                slug: "scale-inhibitors",
                products: ["MERWATER SCALE-50"]
            }
        ]
    }
];

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
    const [activeSubcategoryIndex, setActiveSubcategoryIndex] = useState(0);
    const pathname = usePathname();

    const currentCategory = PRODUCT_DATA[activeCategoryIndex] || PRODUCT_DATA[0];
    const currentSubcategory = currentCategory.subcategories[activeSubcategoryIndex] || currentCategory.subcategories[0];

    const isActive = (href: string) =>
        href === "/" ? pathname === href : pathname.startsWith(href);

    const navClass = (href: string) =>
        `${isActive(href) ? "text-[#980E27] font-semibold" : "text-[#000000]"} hover:text-[#980E27] transition-colors py-1`;

    const mobileNavClass = (href: string) =>
        `block ${isActive(href) ? "text-[#980E27] font-semibold" : "text-gray-800 font-medium"} hover:text-[#980E27] py-1`;

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
                                className={navClass("/")}
                            >
                                Home
                            </Link>

                            <Link
                                href="/about-us"
                                className={navClass("/about-us")}
                            >
                                About
                            </Link>

                            {/* Products Dropdown */}
                            <div className="relative group py-1 cursor-pointer">
                                <Link
                                    href="/products"
                                    className={`flex items-center gap-1 ${isActive("/products") ? "text-[#980E27] font-semibold" : "text-[#000000]"} hover:text-[#980E27] transition-colors`}
                                >
                                    <span>Products</span>
                                    <FiChevronDown className="w-4 h-4 stroke-[2] transition-transform duration-200 group-hover:rotate-180" />
                                </Link>

                                {/* Product mega menu */}
                                <div className="absolute top-full right-0 mt-3 w-[min(920px,calc(100vw-48px))] bg-white border border-gray-100 rounded-lg shadow-[0_18px_45px_rgba(15,23,42,0.14)] opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 z-50 overflow-hidden">
                                    <div className="grid grid-cols-[1.1fr_1fr_1fr] min-h-[320px]">
                                        {/* Column 1: Main Category Links */}
                                        <div className="p-5 bg-white border-r border-gray-100 flex flex-col justify-between">
                                            <div className="space-y-1">
                                                {PRODUCT_DATA.map((cat, index) => {
                                                    const active = activeCategoryIndex === index;
                                                    return (
                                                        <Link
                                                            key={cat.id}
                                                            href={cat.href}
                                                            onMouseEnter={() => {
                                                                setActiveCategoryIndex(index);
                                                                setActiveSubcategoryIndex(0);
                                                            }}
                                                            className={`flex items-center justify-between px-3.5 py-2.5 text-[13.5px] font-medium rounded-md transition-colors ${
                                                                active
                                                                    ? "bg-[#fff1f3] text-[#980E27] font-semibold"
                                                                    : "text-slate-800 hover:bg-gray-50 hover:text-[#980E27]"
                                                            }`}
                                                        >
                                                            <span className="flex-1">{cat.label}</span>
                                                            <FiChevronDown className="w-3.5 h-3.5 -rotate-90" />
                                                        </Link>
                                                    );
                                                })}
                                            </div>

                                            <Link
                                                href="/products"
                                                className="mt-4 bg-[#980E27] text-white py-2.5 px-4 hover:bg-[#7d0a1f] transition-colors flex items-center justify-center gap-2 font-medium text-sm"
                                            >
                                                <span>View All Products</span>
                                                <FiArrowRight className="w-4 h-4 stroke-[2]" />
                                            </Link>
                                        </div>

                                        {/* Column 2: Subcategories */}
                                        <div className="p-5 border-r border-gray-100">
                                            <div className="divide-y divide-gray-100 border-y border-gray-100">
                                                {currentCategory.subcategories.map((sub, index) => {
                                                    const active = activeSubcategoryIndex === index;
                                                    return (
                                                        <div
                                                            key={sub.slug}
                                                            onMouseEnter={() => setActiveSubcategoryIndex(index)}
                                                            className={`flex items-center justify-between px-3 py-3 text-sm cursor-pointer transition-colors ${
                                                                active
                                                                    ? "bg-[#fff1f3] text-[#ed1c2e] font-semibold border-l-[3px] border-[#ed1c2e]"
                                                                    : "text-slate-800 hover:text-[#980E27]"
                                                            }`}
                                                        >
                                                            <span>{sub.name}</span>
                                                            <FiChevronDown className="w-4 h-4 -rotate-90" />
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Column 3: Products */}
                                        <div className="p-5">
                                            <div className="divide-y divide-gray-100 border-y border-gray-100">
                                                {currentSubcategory?.products.map((item) => (
                                                    <Link
                                                        key={item}
                                                        href={`${currentCategory.href}#${item.toLowerCase().replaceAll(" ", "-")}`}
                                                        className="flex items-center justify-between py-3 px-2 text-sm text-slate-800 hover:text-[#980E27] transition-colors"
                                                    >
                                                        <span>{item}</span>
                                                        <FiChevronDown className="w-4 h-4 -rotate-90 opacity-60" />
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Link
                                href="/blog"
                                className={navClass("/blog")}
                            >
                                Blog
                            </Link>

                            {/* <Link
                                href="/careers"
                                className={navClass("/careers")}
                            >
                                Careers
                            </Link> */}

                            {/* Contact Us Button */}
                            <Link
                                href="/contact-us"
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
                        className={mobileNavClass("/")}
                    >
                        Home
                    </Link>
                    <Link
                        href="/about-us"
                        onClick={() => setMobileMenuOpen(false)}
                        className={mobileNavClass("/about-us")}
                    >
                        About
                    </Link>
                    <Link
                        href="/products"
                        onClick={() => setMobileMenuOpen(false)}
                        className={mobileNavClass("/products")}
                    >
                        Products
                    </Link>
                    <Link
                        href="/blog"
                        onClick={() => setMobileMenuOpen(false)}
                        className={mobileNavClass("/blog")}
                    >
                        Blog
                    </Link>
                    <Link
                        href="/careers"
                        onClick={() => setMobileMenuOpen(false)}
                        className={mobileNavClass("/careers")}
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
                        href="/contact-us"
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
