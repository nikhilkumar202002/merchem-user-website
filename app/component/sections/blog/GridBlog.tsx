"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCalendar, FiClock, FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";
import RubberImg from "@/public/images/tyers_rubber.webp";
import BlogService, { BlogListItem, BlogPaginationMeta } from "@/app/utils/BlogService";

const GridBlog = () => {
  const [blogs, setBlogs] = useState<BlogListItem[]>([]);
  const [meta, setMeta] = useState<BlogPaginationMeta | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [activeCategory, setActiveCategory] = useState<string>("All Articles");

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
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBlogs(page, search);
    }, 400);

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
    <section className="w-full bg-white py-12 sm:py-16 lg:py-20">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="flex flex-wrap gap-2">
            {["All Articles", "Rubber Chemicals", "Industrial Applications", "Technical Insights", "Company News"].map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-[17px] font-semibold transition-colors ${
                  activeCategory === category ? "bg-[#d3132d] text-white" : "text-[#333333] hover:text-[#980E27]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <label className="flex w-full items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-400 lg:max-w-[260px]">
            <FiSearch className="h-4 w-4" />
            <span className="sr-only">Search articles</span>
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search articles..."
              className="min-w-0 flex-1 outline-none placeholder:text-gray-400 text-gray-800"
            />
          </label>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div key={idx} className="animate-pulse rounded-md border border-gray-100 bg-white p-4 shadow-[0_3px_12px_rgba(0,0,0,0.06)]">
                <div className="h-64 w-full rounded bg-gray-200" />
                <div className="mt-4 h-4 w-1/4 rounded bg-gray-200" />
                <div className="mt-3 h-6 w-3/4 rounded bg-gray-200" />
                <div className="mt-2 h-4 w-full rounded bg-gray-200" />
                <div className="mt-4 h-4 w-1/2 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-lg font-medium text-gray-500">No blog articles found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.15 }}
                className="overflow-hidden rounded-md border border-gray-100 bg-white shadow-[0_3px_12px_rgba(0,0,0,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_8px_22px_rgba(152,14,39,0.12)]"
              >
                <Link href={`/blog/${article.slug}`}>
                  <Image
                    src={article.featured_image || RubberImg}
                    alt={article.title}
                    width={600}
                    height={320}
                    className="h-64 w-full object-cover"
                  />
                  <div className="flex min-h-[220px] flex-col p-4">
                    <p className="text-[14px] font-bold text-[#d3132d]">Rubber Chemicals</p>
                    <h2 className="mt-2 font-manrope text-[22px] font-bold leading-tight text-[#000000]">{article.title}</h2>
                    <p className="mt-2 text-[17px] leading-[1.4] text-[#777777]">{article.excerpt}</p>
                    <div className="mt-auto flex items-center justify-between pt-5 text-xs text-gray-400">
                      <span className="inline-flex items-center gap-1">
                        <FiCalendar className="h-3.5 w-3.5" />
                        {formatDate(article.published_at || article.created_at)}
                      </span>
                      {article.reading_time > 0 && (
                        <span className="inline-flex items-center gap-1">
                          <FiClock className="h-3.5 w-3.5" />
                          {article.reading_time} min read
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 font-semibold text-[#d3132d]">
                        Read More <FiArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}

        {meta && meta.last_page > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex items-center justify-center gap-2 text-sm"
          >
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className="rounded-full border border-gray-200 px-3 py-1 text-gray-600 disabled:opacity-40"
            >
              ‹
            </button>
            {Array.from({ length: meta.last_page }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                type="button"
                onClick={() => setPage(pageNum)}
                className={`px-3 py-1 rounded-md ${
                  page === pageNum ? "bg-[#d3132d] text-white font-semibold" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {pageNum}
              </button>
            ))}
            <button
              type="button"
              disabled={page >= meta.last_page}
              onClick={() => setPage((p) => Math.min(p + 1, meta.last_page))}
              className="rounded-full border border-gray-200 px-3 py-1 text-gray-600 disabled:opacity-40"
            >
              ›
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default GridBlog;
