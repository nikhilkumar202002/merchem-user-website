"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCalendar, FiClock, FiSearch, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import BlogService, { BlogListItem, BlogPaginationMeta } from "@/app/utils/BlogService";
import { resolveProductImageUrl } from "@/app/utils/ProductService";

export default function GridBlog() {
  const [blogs, setBlogs] = useState<BlogListItem[]>([]);
  const [meta, setMeta] = useState<BlogPaginationMeta | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const fetchBlogs = useCallback(async (currentPage: number, searchQuery: string) => {
    setLoading(true);
    try {
      const response = await BlogService.getBlogs({
        page: currentPage,
        per_page: 9,
        search: searchQuery || undefined,
      });
      if (response.success) {
        setBlogs(response.data || []);
        setMeta(response.meta || null);
      }
    } catch (error: unknown) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBlogs(page, search);
    }, 350);

    return () => clearTimeout(timer);
  }, [page, search, fetchBlogs]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <section className="w-full bg-[#fcfcfd] py-12 sm:py-16 lg:py-20">
      <div className="site-container">
        
        {/* Header & Search Control */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-5 border-b border-gray-200/80 pb-6">
          <div>
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#980E27]">
              Technical Library &amp; Articles
            </span>
            <h2 className="mt-1 font-manrope text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              Latest Insights &amp; Updates
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-gray-500 max-w-xl">
              In-depth chemical engineering, vulcanisation guides, and industry reports from Merchem specialists.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-auto">
            <label className="flex w-full sm:w-80 items-center gap-2.5 rounded-sm border border-gray-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-gray-400 focus-within:border-[#980E27] focus-within:ring-1 focus-within:ring-[#980E27]/20 shadow-xs transition-all">
              <FiSearch className="h-4 w-4 text-gray-400 shrink-0" />
              <span className="sr-only">Search articles</span>
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search articles..."
                className="min-w-0 flex-1 outline-none placeholder:text-gray-400 text-gray-800 bg-transparent text-xs sm:text-sm"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FiX className="h-4 w-4" />
                </button>
              )}
            </label>
          </div>
        </div>

        {/* Card Grid Stream */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div
                key={idx}
                className="animate-pulse bg-white border border-gray-200 overflow-hidden shadow-xs flex flex-col"
              >
                <div className="h-56 sm:h-64 w-full bg-gray-200 shrink-0" />
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="h-3 w-1/3 bg-gray-200 rounded-xs" />
                    <div className="h-6 w-5/6 bg-gray-200 rounded-xs" />
                    <div className="h-4 w-full bg-gray-200 rounded-xs" />
                    <div className="h-4 w-4/5 bg-gray-200 rounded-xs" />
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="h-4 w-1/4 bg-gray-200 rounded-xs" />
                    <div className="h-4 w-1/4 bg-gray-200 rounded-xs" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="bg-white border border-gray-200 p-12 sm:p-16 text-center shadow-xs max-w-xl mx-auto my-8">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#fff1f3] text-[#980E27] mb-4">
              <FiSearch className="h-5 w-5" />
            </div>
            <h3 className="font-manrope text-base sm:text-lg font-bold text-gray-900">
              No articles found
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-gray-500 leading-relaxed">
              {search
                ? `We couldn't find any articles matching "${search}". Try searching with different keywords.`
                : "There are currently no blog articles available in the database."}
            </p>
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="mt-5 inline-flex items-center gap-1.5 bg-[#980E27] text-white px-4 py-2 text-xs font-semibold hover:bg-[#7d0a1f] transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
            {blogs.map((article, index) => {
              const cleanImageUrl = resolveProductImageUrl(article.featured_image);

              return (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.45, delay: (index % 3) * 0.1 }}
                  className="group flex flex-col bg-white border border-gray-200 shadow-xs hover:shadow-lg hover:border-[#980E27]/40 transition-all duration-300 overflow-hidden"
                >
                  {/* Fixed Height Image with Cover Position */}
                  <Link
                    href={`/blog/${article.slug}`}
                    className="relative block w-full h-56 sm:h-64 overflow-hidden bg-gray-100 shrink-0"
                  >
                    {cleanImageUrl ? (
                      <Image
                        src={cleanImageUrl}
                        alt={article.title}
                        fill
                        unoptimized
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-[#980E27]/10 via-[#980E27]/5 to-gray-100 p-6 text-center">
                        <span className="font-manrope text-sm font-semibold text-[#980E27]/80 line-clamp-2">
                          {article.title}
                        </span>
                      </div>
                    )}
                  </Link>

                  {/* Card Body */}
                  <div className="flex flex-1 flex-col p-5 sm:p-6 justify-between">
                    <div>
                      {/* Top Meta Tag */}
                      <div className="flex items-center gap-2.5 text-[11px] mb-3">
                        <span className="font-bold text-[#980E27] uppercase tracking-wider bg-[#fff1f3] px-2 py-0.5 rounded-xs">
                          Technical Article
                        </span>
                        {article.reading_time > 0 && (
                          <span className="flex items-center gap-1 text-gray-500 font-medium">
                            <FiClock className="h-3 w-3 text-[#980E27]" />
                            {article.reading_time} min read
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <Link href={`/blog/${article.slug}`} className="block group-hover:text-[#980E27] transition-colors">
                        <h3 className="font-manrope text-base sm:text-lg font-bold leading-snug text-gray-900 group-hover:text-[#980E27] transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                      </Link>

                      {/* Excerpt */}
                      <p className="mt-2.5 text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">
                        {article.excerpt ||
                          "Explore detailed technical formulations, industrial elastomer vulcanisation insights, and application analysis."}
                      </p>
                    </div>

                    {/* Bottom Footer Info */}
                    <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-gray-500">
                        <FiCalendar className="h-3.5 w-3.5 text-[#980E27]" />
                        {formatDate(article.published_at || article.created_at)}
                      </span>

                      <Link
                        href={`/blog/${article.slug}`}
                        className="inline-flex items-center gap-1.5 font-bold text-[#980E27] hover:text-[#7d0a1f] transition-colors"
                      >
                        <span>Read More</span>
                        <FiArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}

        {/* Pagination Controls */}
        {meta && meta.last_page > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => {
                setPage((p) => Math.max(p - 1, 1));
                window.scrollTo({ top: 300, behavior: "smooth" });
              }}
              className="rounded-sm border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-40 transition-colors"
            >
              Previous
            </button>
            {Array.from({ length: meta.last_page }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                type="button"
                onClick={() => {
                  setPage(pageNum);
                  window.scrollTo({ top: 300, behavior: "smooth" });
                }}
                className={`h-8 w-8 rounded-sm text-xs font-semibold transition-colors ${
                  page === pageNum
                    ? "bg-[#980E27] text-white"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {pageNum}
              </button>
            ))}
            <button
              type="button"
              disabled={page >= meta.last_page}
              onClick={() => {
                setPage((p) => Math.min(p + 1, meta.last_page));
                window.scrollTo({ top: 300, behavior: "smooth" });
              }}
              className="rounded-sm border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-40 transition-colors"
            >
              Next
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
