"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FiMail, FiPhone, FiChevronDown, FiArrowRight, FiMenu, FiX } from "react-icons/fi";
import { FaPhoneAlt } from "react-icons/fa";
import { GiRotaryPhone } from "react-icons/gi";
import { IoMdMail } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { getProductCatalogue, CatalogueCategory } from "@/app/utils/ProductService";
import "../styles/Layout.css";
import Logo from "../../../public/Main_logo.png";

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [catalogue, setCatalogue] = useState<CatalogueCategory[]>([]);
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
    const [activeSubcategoryIndex, setActiveSubcategoryIndex] = useState(0);
    const [showHeader, setShowHeader] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileMenuOpen]);

    useEffect(() => {
        const fetchCatalogue = async () => {
            try {
                const res = await getProductCatalogue();
                if (res && res.success && Array.isArray(res.data)) {
                    setCatalogue(res.data);
                }
            } catch (err) {
                console.error("Failed to fetch product catalogue for menu:", err);
            }
        };

        fetchCatalogue();
    }, []);

    useEffect(() => {
        let lastY = window.scrollY;

        const handleScroll = () => {
            const currentY = window.scrollY;

            // Track if scrolled past top bar
            setIsScrolled(currentY > 40);

            if (currentY < 60) {
                // At top of page: always show header
                setShowHeader(true);
            } else if (currentY > lastY + 8) {
                // Scrolling down past threshold: hide header
                setShowHeader(false);
            } else if (currentY < lastY - 8) {
                // Scrolling up past threshold: show header
                setShowHeader(true);
            }

            lastY = currentY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const currentCategory = catalogue[activeCategoryIndex] || catalogue[0];
    const hasSubcategories = currentCategory?.subcategories && currentCategory.subcategories.length > 0;
    const currentSubcategory = hasSubcategories
        ? currentCategory.subcategories[activeSubcategoryIndex] || currentCategory.subcategories[0]
        : null;

    const displayedProducts = hasSubcategories
        ? currentSubcategory?.products || []
        : currentCategory?.products || [];

    const isActive = (href: string) =>
        href === "/" ? pathname === href : pathname.startsWith(href);

    const navClass = (href: string) =>
        `${isActive(href) ? "text-[#980E27] font-semibold" : "text-[#000000]"} hover:text-[#980E27] transition-colors py-1`;

    const mobileNavClass = (href: string) =>
        `block ${isActive(href) ? "text-[#980E27] font-semibold" : "text-gray-800 font-medium"} hover:text-[#980E27] py-1`;

    return (
        <header
            className={`sticky top-0 z-50 w-full bg-white transition-all duration-300 ease-out transform-gpu ${
                isScrolled ? "shadow-[0_8px_30px_rgba(0,0,0,0.08)] border-b border-gray-100" : ""
            } ${
                showHeader
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-full opacity-0 pointer-events-none"
            }`}
        >
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

                            {/* <div className="h-3.5 w-[1px] bg-white/30 shrink-0" /> */}

                            {/* <a
                                href="tel:+914843510629"
                                className="flex items-center gap-2 hover:opacity-90 transition-opacity shrink-0"
                            >
                                <FaPhoneAlt className="w-3.5 h-3.5" />
                                <span>+91-484-3510629</span>
                            </a> */}
                        </div>
                    </div>

                    {/* Bottom Bar - Main Navigation Links */}
                    <div className="py-5 flex items-center justify-end pr-[20px] md:pr-[50px] lg:pr-[95px]">
                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-5 xl:gap-6 2xl:gap-9 text-[15px] xl:text-[15px] 2xl:text-[17px] font-medium text-[#000000]">
                            <Link href="/" className={navClass("/")}>
                                Home
                            </Link>

                            <Link href="/about-us" className={navClass("/about-us")}>
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
                                {catalogue.length > 0 && (
                                    <div className="absolute top-full right-0 mt-3 w-[min(920px,calc(100vw-48px))] bg-white border border-gray-100 rounded-lg shadow-[0_18px_45px_rgba(15,23,42,0.14)] opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 z-50 overflow-hidden">
                                        <div className="grid grid-cols-[1.1fr_1fr_1fr] min-h-[320px]">
                                            {/* Column 1: Main Category Links */}
                                            <div className="p-5 bg-white border-r border-gray-100 flex flex-col justify-between">
                                                <div className="space-y-1">
                                                    {catalogue.map((cat, index) => {
                                                        const active = activeCategoryIndex === index;
                                                        return (
                                                            <Link
                                                                key={cat.id || cat.slug}
                                                                href={`/products/${cat.slug}`}
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
                                                                <span className="flex-1">{cat.name}</span>
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
                                                    {hasSubcategories ? (
                                                        currentCategory.subcategories.map((sub, index) => {
                                                            const active = activeSubcategoryIndex === index;
                                                            return (
                                                                <Link
                                                                    key={sub.id || sub.slug}
                                                                    href={`/products/${currentCategory.slug}/${sub.slug}`}
                                                                    onMouseEnter={() => setActiveSubcategoryIndex(index)}
                                                                    className={`flex items-center justify-between px-3 py-3 text-sm cursor-pointer transition-colors ${
                                                                        active
                                                                            ? "bg-[#fff1f3] text-[#ed1c2e] font-semibold border-l-[3px] border-[#ed1c2e]"
                                                                            : "text-slate-800 hover:text-[#980E27]"
                                                                    }`}
                                                                >
                                                                    <span>{sub.name}</span>
                                                                    <FiChevronDown className="w-4 h-4 -rotate-90" />
                                                                </Link>
                                                            );
                                                        })
                                                    ) : (
                                                        <div className="px-3 py-3 text-sm font-semibold text-[#980E27]">
                                                            All Products ({currentCategory?.products?.length || 0})
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Column 3: Products */}
                                            <div className="p-5">
                                                <div className="divide-y divide-gray-100 border-y border-gray-100">
                                                    {displayedProducts.map((item) => (
                                                        <Link
                                                            key={item.id || item.slug}
                                                            href={`/products?category=${currentCategory?.slug}&product=${item.slug}`}
                                                            className="flex items-center justify-between py-3 px-2 text-sm text-slate-800 hover:text-[#980E27] transition-colors"
                                                        >
                                                            <span>{item.name}</span>
                                                            <FiChevronDown className="w-4 h-4 -rotate-90 opacity-60" />
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Link href="/blog" className={navClass("/blog")}>
                                Blog
                            </Link>

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
                            onClick={() => setMobileMenuOpen(true)}
                            className="lg:hidden p-2 text-gray-700 hover:text-[#980E27] focus:outline-none"
                            aria-label="Open navigation menu"
                        >
                            <FiMenu className="w-6 h-6 stroke-[2]" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Fullscreen Premium Mobile Overlay Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Dark Blurred Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xs lg:hidden"
                        />

                        {/* Slide-over Drawer Panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 28, stiffness: 220 }}
                            className="fixed top-0 right-0 bottom-0 z-[101] w-full max-w-[340px] xs:max-w-[380px] bg-white shadow-2xl flex flex-col justify-between p-6 sm:p-8 lg:hidden overflow-y-auto"
                        >
                            {/* Drawer Header */}
                            <div>
                                <div className="flex items-center justify-between pb-5 border-b border-gray-100">
                                    <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block">
                                        <Image
                                            src={Logo}
                                            alt="Merchem Logo"
                                            width={110}
                                            height={65}
                                            className="object-contain h-auto w-auto max-h-[50px]"
                                        />
                                    </Link>
                                    <button
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="p-2 text-gray-500 hover:text-[#980E27] hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
                                        aria-label="Close menu"
                                    >
                                        <FiX className="w-6 h-6 stroke-[2]" />
                                    </button>
                                </div>

                                {/* Navigation Links */}
                                <nav className="py-6 space-y-1.5">
                                    {[
                                        { label: "Home", href: "/" },
                                        { label: "About Us", href: "/about-us" },
                                        { label: "Products", href: "/products" },
                                        { label: "Blog", href: "/blog" },
                                        { label: "Careers", href: "/careers" },
                                    ].map((item, idx) => {
                                        const active = isActive(item.href);
                                        return (
                                            <motion.div
                                                key={item.href}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.06 * idx + 0.1 }}
                                            >
                                                <Link
                                                    href={item.href}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className={`group flex items-center justify-between px-4 py-3 rounded-lg text-base font-semibold transition-all ${
                                                        active
                                                            ? "bg-[#fff1f3] text-[#980E27]"
                                                            : "text-gray-800 hover:bg-gray-50 hover:text-[#980E27]"
                                                    }`}
                                                >
                                                    <span>{item.label}</span>
                                                    <FiArrowRight
                                                        className={`w-4 h-4 transition-all duration-200 ${
                                                            active
                                                                ? "opacity-100 translate-x-0"
                                                                : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                                                        }`}
                                                    />
                                                </Link>
                                            </motion.div>
                                        );
                                    })}
                                </nav>
                            </div>

                            {/* Contact Details & Action Footer */}
                            <div className="pt-5 border-t border-gray-100 space-y-4">
                                <div className="space-y-2 text-xs text-gray-600">
                                    <a
                                        href="mailto:mail@merchem.com"
                                        className="flex items-center gap-3 p-2.5 rounded-lg bg-gray-50 hover:bg-[#fff1f3] text-gray-700 hover:text-[#980E27] transition-colors"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-white shadow-xs flex items-center justify-center text-[#980E27] shrink-0">
                                            <IoMdMail className="w-4 h-4" />
                                        </div>
                                        <span className="font-medium text-xs sm:text-sm">mail@merchem.com</span>
                                    </a>

                                    <a
                                        href="tel:04843510629"
                                        className="flex items-center gap-3 p-2.5 rounded-lg bg-gray-50 hover:bg-[#fff1f3] text-gray-700 hover:text-[#980E27] transition-colors"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-white shadow-xs flex items-center justify-center text-[#980E27] shrink-0">
                                            <GiRotaryPhone className="w-4.5 h-4.5" />
                                        </div>
                                        <span className="font-medium text-xs sm:text-sm">0484 3510629</span>
                                    </a>
                                </div>

                                <Link
                                    href="/contact-us"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="w-full bg-[#980E27] text-white py-3.5 px-5 rounded-lg hover:bg-[#7d0a1f] transition-all flex items-center justify-center gap-2 font-medium text-sm shadow-md"
                                >
                                    <span>Contact Us</span>
                                    <FiArrowRight className="w-4 h-4 stroke-[2]" />
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
