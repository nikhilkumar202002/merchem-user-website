"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  FiBookOpen,
  FiArrowRight,
  FiClock,
  FiChevronRight,
} from "react-icons/fi";
import BlogService, { BlogListItem } from "@/app/utils/BlogService";

interface BlogSidebarProps {
  currentSlug?: string;
  headingTitle?: string;
}

export default function BlogSidebar({
  currentSlug,
  headingTitle = "Rest of the Blog Headings",
}: BlogSidebarProps) {
  const [blogs, setBlogs] = useState<BlogListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    const fetchArticles = async () => {
      try {
        setLoading(true);
        // Fetch only actual blog posts from database via BlogService
        const res = await BlogService.getBlogs({ per_page: 20 });
        if (isMounted && res.success && Array.isArray(res.data)) {
          setBlogs(res.data);
        }
      } catch (err: unknown) {
        console.error("Failed to fetch blog headings from database:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchArticles();
    return () => {
      isMounted = false;
    };
  }, []);

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

  // When viewing a single blog, filter for the other blogs in the database
  const otherBlogs = currentSlug
    ? blogs.filter((b) => b.slug !== currentSlug)
    : blogs;

  // If there are other blogs, show them. If only 1 blog exists in database, show it with active indicator
  const displayBlogs = otherBlogs.length > 0 ? otherBlogs : blogs;

  return (
    <div className="space-y-6">
      {/* Widget 1: Blog Headings from Database */}
      <div className="bg-white border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
        {/* Card Header */}
        <div className="bg-[#fcfcfd] border-b border-gray-100 p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#fff1f3] text-[#980E27]">
              <FiBookOpen className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-manrope text-base sm:text-lg font-bold text-black leading-tight">
                {headingTitle}
              </h3>
              <p className="text-[11px] text-gray-500 mt-0.5">
                {displayBlogs.length} {displayBlogs.length === 1 ? "article" : "articles"} in database
              </p>
            </div>
          </div>
        </div>

        {/* Headings List */}
        <div className="divide-y divide-gray-100">
          {loading ? (
            <div className="p-4 space-y-4">
              {[1, 2, 3].map((idx) => (
                <div key={idx} className="animate-pulse space-y-2">
                  <div className="h-3 w-1/4 bg-gray-200 rounded-xs" />
                  <div className="h-4 w-5/6 bg-gray-200 rounded-xs" />
                  <div className="h-3 w-1/3 bg-gray-100 rounded-xs" />
                </div>
              ))}
            </div>
          ) : displayBlogs.length > 0 ? (
            displayBlogs.map((item) => {
              const isActive = item.slug === currentSlug;

              return (
                <Link
                  key={item.id}
                  href={`/blog/${item.slug}`}
                  className={`group block p-4 sm:p-5 transition-all ${
                    isActive
                      ? "bg-[#fff1f3]/70 border-l-4 border-[#980E27]"
                      : "hover:bg-[#fff9fa]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <span
                        className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 mb-1.5 rounded-xs ${
                          isActive
                            ? "bg-[#980E27] text-white"
                            : "text-[#980E27] bg-[#fff1f3]"
                        }`}
                      >
                        {isActive ? "Currently Reading" : "Article"}
                      </span>
                      <h4
                        className={`font-manrope text-sm font-bold leading-snug line-clamp-2 ${
                          isActive
                            ? "text-[#980E27]"
                            : "text-gray-900 group-hover:text-[#980E27] transition-colors"
                        }`}
                      >
                        {item.title}
                      </h4>
                      <div className="mt-2 flex items-center gap-3 text-[11px] text-gray-500">
                        {item.published_at && (
                          <span>{formatDate(item.published_at)}</span>
                        )}
                        {item.reading_time > 0 && (
                          <span className="flex items-center gap-1">
                            <FiClock className="h-3 w-3 text-[#980E27]" />
                            {item.reading_time} min read
                          </span>
                        )}
                      </div>
                    </div>
                    <div
                      className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all ${
                        isActive
                          ? "bg-[#980E27] text-white"
                          : "bg-gray-50 text-gray-400 group-hover:bg-[#980E27] group-hover:text-white"
                      }`}
                    >
                      <FiChevronRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="p-6 text-center">
              <p className="text-xs text-gray-500">No blog articles found in the database.</p>
            </div>
          )}
        </div>

        {/* View All Articles Footer Link */}
        <div className="bg-[#fcfcfd] p-3 border-t border-gray-100">
          <Link
            href="/blog"
            className="flex items-center justify-between text-xs font-semibold text-[#980E27] hover:text-[#7d0a1f] px-2 py-1 transition-colors"
          >
            <span>Explore All Blog Articles</span>
            <FiArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
