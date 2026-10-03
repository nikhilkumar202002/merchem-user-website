"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiFileText, FiChevronRight, FiMail, FiPhone, FiGrid } from "react-icons/fi";
import Breadcrumbs from "@/app/component/common/Breadcrumbs";
import { getProductCatalogue, CatalogueCategory } from "@/app/utils/ProductService";
import FallbackImage from "@/public/images/About-image-1.webp";

interface CategoryDetailClientProps {
  slug?: string;
}

export default function CategoryDetailClient({ slug: propSlug }: CategoryDetailClientProps) {
  const routeParams = useParams();
  const rawSlug = propSlug || routeParams?.slug;
  const currentSlug = typeof rawSlug === "string" ? rawSlug : Array.isArray(rawSlug) ? rawSlug[0] : "";

  const [catalogue, setCatalogue] = useState<CatalogueCategory[]>([]);
  const [category, setCategory] = useState<CatalogueCategory | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        const res = await getProductCatalogue();
        if (res && res.success && Array.isArray(res.data)) {
          setCatalogue(res.data);
          if (currentSlug) {
            const found = res.data.find(
              (cat) => cat.slug.toLowerCase() === currentSlug.toLowerCase()
            );
            setCategory(found || res.data[0] || null);
          } else {
            setCategory(res.data[0] || null);
          }
        }
      } catch (err) {
        console.error("Error fetching category details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [currentSlug]);

  if (loading) {
    return (
      <main className="w-full bg-[#fcfcfd] min-h-screen py-12">
        <div className="site-container">
          <div className="h-6 w-48 bg-gray-200 animate-pulse mb-6" />
          <div className="h-10 w-96 bg-gray-200 animate-pulse mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-6">
              <div className="h-80 w-full bg-gray-200 animate-pulse" />
              <div className="h-20 w-full bg-gray-200 animate-pulse" />
            </div>
            <div className="lg:col-span-4 h-96 bg-gray-200 animate-pulse" />
          </div>
        </div>
      </main>
    );
  }

  if (!category) {
    return (
      <main className="w-full bg-[#fcfcfd] min-h-screen py-20">
        <div className="site-container text-center">
     
          <p className="mt-2 text-slate-600">The requested product category could not be found.</p>
          <Link
            href="/products"
            className="mt-6 inline-flex items-center gap-2 bg-[#980E27] text-white px-6 py-2.5 text-sm font-semibold"
          >
            <span>Back to All Products</span>
            <FiArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
    );
  }

  const breadcrumbItems = [
    { label: "Products", href: "/products" },
    { label: category.name },
  ];

  const descriptionParagraphs = (category.description || category.short_description || "")
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0);

  return (
    <main className="w-full bg-[#fcfcfd] min-h-screen py-8 sm:py-12 lg:py-16">
      <div className="site-container">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Category Header */}
        <div className="mt-4 mb-8">
    
          <h1 className="mt-1 text-3xl sm:text-4xl lg:text-5xl font-bold text-black tracking-tight">
            {category.name}
          </h1>
          {category.short_description && (
            <p className="mt-3 max-w-3xl text-base sm:text-lg text-[#474747] leading-relaxed">
              {category.short_description}
            </p>
          )}
        </div>

        {/* 2-Column Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Main Content Area (8 Cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Category Banner Image */}
            <div className="relative w-full overflow-hidden bg-gray-100 border border-gray-200">
              <Image
                src={category.image_url || FallbackImage}
                alt={category.name}
                width={900}
                height={500}
                unoptimized
                priority
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Category Description */}
            <div className="bg-white border border-gray-200 p-6 sm:p-8 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-black border-l-4 border-[#980E27] pl-3">
                About {category.name}
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-[#474747] leading-relaxed">
                {descriptionParagraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Subcategories & Product Listing */}
            <div className="space-y-8">
              {category.subcategories && category.subcategories.length > 0 ? (
                category.subcategories.map((sub) => (
                  <div key={sub.id || sub.slug} className="bg-white border border-gray-200 p-6 sm:p-8 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3">
                      <div className="flex items-center gap-3 border-l-4 border-[#980E27] pl-3">
                        <h3 className="text-xl sm:text-2xl font-bold text-black uppercase tracking-wide">
                          {sub.name}
                        </h3>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 bg-[#fff1f3] text-[#980E27] flex items-center gap-1">
                        <FiGrid className="h-3.5 w-3.5" />
                        {sub.products.length} Products
                      </span>
                    </div>

                    {sub.products.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        {sub.products.map((prod) => (
                          <div
                            key={prod.id || prod.slug}
                            className="group flex flex-col justify-between bg-[#fcfcfd] border border-gray-200 p-5 transition-all duration-300 hover:border-[#980E27] hover:bg-white hover:shadow-md"
                          >
                            <div>
                              <h4 className="text-base font-bold text-black group-hover:text-[#980E27] transition-colors">
                                {prod.name}
                              </h4>
                              <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                                <FiFileText className="h-3.5 w-3.5 text-[#980E27]" />
                                <span>{prod.tds_available ? "Technical Data Sheet Available" : "TDS Available on Request"}</span>
                              </div>
                            </div>

                            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#980E27]">
                              <Link
                                href={`/contact-us?product=${encodeURIComponent(prod.name)}`}
                                className="hover:underline flex items-center gap-1"
                              >
                                <span>Inquire Product</span>
                                <FiArrowRight className="h-3.5 w-3.5" />
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500 italic">No products listed under this subcategory yet.</p>
                    )}
                  </div>
                ))
              ) : category.products && category.products.length > 0 ? (
                <div className="bg-white border border-gray-200 p-6 sm:p-8 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-3 border-l-4 border-[#980E27] pl-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-black uppercase tracking-wide">
                        Products in {category.name}
                      </h3>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-[#fff1f3] text-[#980E27] flex items-center gap-1">
                      <FiGrid className="h-3.5 w-3.5" />
                      {category.products.length} Products
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {category.products.map((prod) => (
                      <div
                        key={prod.id || prod.slug}
                        className="group flex flex-col justify-between bg-[#fcfcfd] border border-gray-200 p-5 transition-all duration-300 hover:border-[#980E27] hover:bg-white hover:shadow-md"
                      >
                        <div>
                          <h4 className="text-base font-bold text-black group-hover:text-[#980E27] transition-colors">
                            {prod.name}
                          </h4>
                          <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                            <FiFileText className="h-3.5 w-3.5 text-[#980E27]" />
                            <span>{prod.tds_available ? "Technical Data Sheet Available" : "TDS Available on Request"}</span>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#980E27]">
                          <Link
                            href={`/contact-us?product=${encodeURIComponent(prod.name)}`}
                            className="hover:underline flex items-center gap-1"
                          >
                            <span>Inquire Product</span>
                            <FiArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {/* Sidebar Area (4 Cols) */}
          <aside className="lg:col-span-4 space-y-8 sticky top-24 self-start">
            {/* Category Navigation Links */}
            <div className="bg-white border border-gray-200 p-6 shadow-xs">
              <h3 className="text-lg font-bold text-black mb-4 border-b border-gray-100 pb-3 flex items-center justify-between">
                <span>Product Categories</span>
                <span className="text-xs font-normal text-slate-500">{catalogue.length} Categories</span>
              </h3>
              <ul className="space-y-1.5">
                {catalogue.map((cat) => {
                  const isActive = cat.slug.toLowerCase() === currentSlug.toLowerCase();
                  return (
                    <li key={cat.id || cat.slug}>
                      <Link
                        href={`/products/${cat.slug}`}
                        className={`flex items-center justify-between px-3.5 py-2.5 text-sm font-medium transition-all ${
                          isActive
                            ? "bg-[#980E27] text-white font-semibold"
                            : "text-slate-700 hover:bg-gray-50 hover:text-[#980E27]"
                        }`}
                      >
                        <span>{cat.name}</span>
                        <FiChevronRight className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Call To Action (CTA) Widget */}
            <div className="bg-[#980E27] text-white p-6 shadow-md space-y-4">
              <h4 className="text-xl font-bold leading-tight text-white">Need Technical Data or Custom Grades?</h4>
              <p className="text-xs sm:text-sm text-white leading-relaxed">
                Our application development team provides technical support, material safety datasheets (MSDS), and custom formulation solutions.
              </p>
              <div className="pt-2 space-y-2.5">
                <Link
                  href="/contact-us"
                  className="flex items-center justify-center gap-2 bg-white text-[#980E27] w-full py-2.5 text-xs sm:text-sm font-semibold hover:bg-gray-100 transition-colors"
                >
                  <FiMail className="h-4 w-4" />
                  <span>Contact Technical Team</span>
                </Link>
                <a
                  href="tel:+914843510629"
                  className="flex items-center justify-center gap-2 border border-white/30 text-white w-full py-2.5 text-xs sm:text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  <FiPhone className="h-4 w-4" />
                  <span>+91-484-3510629</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
