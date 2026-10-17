"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiUser,
  FiShare2,
  FiCheck,
  FiCheckCircle,
} from "react-icons/fi";
import Breadcrumbs from "@/app/component/common/Breadcrumbs";
import BlogService, { BlogDetail } from "@/app/utils/BlogService";
import { resolveProductImageUrl } from "@/app/utils/ProductService";
import BlogSidebar from "@/app/component/sections/blog/BlogSidebar";
import BlogCta from "@/app/component/sections/blog/BlogCta";

interface BlogDetailClientProps {
  slug: string;
}

export default function BlogDetailClient({ slug }: BlogDetailClientProps) {
  const [blog, setBlog] = useState<BlogDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const fetchBlog = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await BlogService.getBlogBySlug(slug);
        if (isMounted) {
          if (response.success && response.data) {
            setBlog(response.data);
          } else {
            setError(response.message || "Article not found.");
          }
        }
      } catch (err: unknown) {
        console.error("Error fetching blog details:", err);
        if (isMounted) setError("Failed to load article details.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (slug) {
      fetchBlog();
    }

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Render plain text or HTML formatted article content with rich typography
  const renderContent = (content?: string) => {
    if (!content) return null;

    const hasHtml = /<[a-z][\s\S]*>/i.test(content);
    if (hasHtml) {
      return (
        <article
          className="prose prose-base sm:prose-lg max-w-none prose-headings:font-manrope prose-headings:font-bold prose-headings:text-black prose-p:text-[#374151] prose-p:leading-[1.8] prose-a:text-[#980E27]"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      );
    }

    // Split plain text by newlines
    const rawLines = content.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

    // Filter out redundant repetition of title on first line if present
    const lines =
      rawLines.length > 0 &&
      blog &&
      rawLines[0].toLowerCase() === blog.title.trim().toLowerCase()
        ? rawLines.slice(1)
        : rawLines;

    return (
      <div className="space-y-5 text-[#374151] text-base sm:text-[17px] leading-[1.8]">
        {lines.map((line, idx) => {
          // Detect bullet points
          if (line.startsWith("•") || line.startsWith("- ") || line.startsWith("* ")) {
            const cleanBullet = line.replace(/^[•\-*]\s*/, "");
            return (
              <div key={idx} className="flex items-start gap-3 pl-2 sm:pl-4">
                <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-[#980E27] shrink-0" />
                <span className="text-gray-700">{cleanBullet}</span>
              </div>
            );
          }

          // Detect Section Headings (short lines without sentence-ending punctuation or capitalized)
          const isHeading =
            (line.length < 80 && !line.endsWith(".") && !line.endsWith(",")) ||
            (line === line.toUpperCase() && line.length < 100);

          if (isHeading) {
            return (
              <h3
                key={idx}
                className="font-manrope text-xl sm:text-2xl font-bold text-gray-900 pt-6 pb-2 border-l-4 border-[#980E27] pl-3.5 tracking-tight"
              >
                {line}
              </h3>
            );
          }

          // Regular paragraph
          return (
            <p key={idx} className="text-[#374151]">
              {line}
            </p>
          );
        })}
      </div>
    );
  };

  const cleanImageUrl = resolveProductImageUrl(blog?.featured_image);

  return (
    <main className="flex-1 bg-[#fcfcfd] min-h-screen">
      {/* Top Breadcrumb Bar */}
      <section className="w-full bg-white border-b border-gray-200 py-3 sm:py-4">
        <div className="site-container">
          <Breadcrumbs
            items={[
              { label: "Blog", href: "/blog" },
              { label: blog?.title || "Article" },
            ]}
          />
        </div>
      </section>

      {/* Main 2-Column Content Section */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="site-container">
          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Left Skeleton */}
              <div className="lg:col-span-8 space-y-6 animate-pulse">
                <div className="h-10 w-3/4 bg-gray-200" />
                <div className="h-4 w-1/3 bg-gray-200" />
                <div className="h-[340px] w-full bg-gray-200" />
                <div className="space-y-3 pt-4">
                  <div className="h-4 w-full bg-gray-200" />
                  <div className="h-4 w-full bg-gray-200" />
                  <div className="h-4 w-2/3 bg-gray-200" />
                </div>
              </div>
              {/* Right Skeleton */}
              <div className="lg:col-span-4 space-y-6 animate-pulse">
                <div className="h-64 w-full bg-gray-200" />
                <div className="h-64 w-full bg-gray-200" />
              </div>
            </div>
          ) : error || !blog ? (
            <div className="bg-white border border-gray-200 p-8 sm:p-12 text-center max-w-xl mx-auto shadow-xs">
              <h1 className="text-2xl font-bold text-gray-900">{error || "Article Not Found"}</h1>
              <p className="mt-2 text-sm text-gray-600">
                The requested technical article could not be loaded.
              </p>
              <Link
                href="/blog"
                className="mt-6 inline-flex items-center gap-2 bg-[#980E27] text-white px-6 py-2.5 text-sm font-semibold hover:bg-[#7d0a1f] transition-colors"
              >
                <FiArrowLeft className="h-4 w-4" />
                <span>Back to Articles</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12">
              {/* Left Side Content - Scrolls Naturally as the Reader Scrolls Down (8 Cols) */}
              <div className="lg:col-span-8 space-y-8">
                {/* Article Header & Title Block */}
                <article className="bg-white border border-gray-200 p-6 sm:p-8 xl:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
                  {/* Category & Read Time */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-100">
                    <span className="px-3 py-1 bg-[#fff1f3] text-[#980E27] text-xs font-bold uppercase tracking-wider">
                      Technical Article
                    </span>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      {blog.reading_time > 0 && (
                        <span className="flex items-center gap-1.5 font-medium">
                          <FiClock className="h-3.5 w-3.5 text-[#980E27]" />
                          {blog.reading_time} min read
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={handleShare}
                        className="flex items-center gap-1 text-gray-600 hover:text-[#980E27] transition-colors font-medium cursor-pointer"
                        title="Copy article link"
                      >
                        {copied ? (
                          <>
                            <FiCheck className="h-3.5 w-3.5 text-green-600" />
                            <span className="text-green-600">Copied!</span>
                          </>
                        ) : (
                          <>
                            <FiShare2 className="h-3.5 w-3.5" />
                            <span>Share</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Title */}
                  <h1 className="mt-5 font-manrope text-2xl sm:text-3xl md:text-4xl xl:text-[38px] font-extrabold text-black leading-[1.22] tracking-tight">
                    {blog.title}
                  </h1>

                  {/* Author & Published Info */}
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-600">
                    {blog.author && (
                      <span className="inline-flex items-center gap-1.5 font-medium text-gray-900">
                        <FiUser className="h-4 w-4 text-[#980E27]" />
                        {blog.author.name}
                      </span>
                    )}
                    {blog.published_at && (
                      <span className="inline-flex items-center gap-1.5 text-gray-500">
                        <FiCalendar className="h-4 w-4 text-[#980E27]" />
                        {formatDate(blog.published_at)}
                      </span>
                    )}
                  </div>
                </article>

                {/* Featured Image with Fixed Height & Cover Position */}
                {cleanImageUrl && (
                  <div className="relative w-full h-[260px] sm:h-[340px] md:h-[420px] overflow-hidden bg-gray-100 border border-gray-200 shadow-xs">
                    {!imgLoaded && (
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
                    )}
                    <Image
                      src={cleanImageUrl}
                      alt={blog.title}
                      fill
                      unoptimized
                      loading="lazy"
                      onLoad={() => setImgLoaded(true)}
                      className={`object-cover object-center transition-opacity duration-500 ${
                        imgLoaded ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </div>
                )}

                {/* Excerpt Callout (if available) */}
                {blog.excerpt && (
                  <div className="bg-[#fff8f9] border-l-4 border-[#980E27] p-5 sm:p-6 text-gray-800 text-base sm:text-lg font-medium leading-relaxed italic">
                    {blog.excerpt}
                  </div>
                )}

                {/* Full Article Content */}
                <div className="bg-white border border-gray-200 p-6 sm:p-8 xl:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
                  {renderContent(blog.content)}

                  {/* Bottom Footer Action */}
                  <div className="mt-10 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                    <Link
                      href="/blog"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#980E27] hover:text-[#7d0a1f] transition-colors"
                    >
                      <FiArrowLeft className="h-4 w-4" />
                      <span>Back to All Articles</span>
                    </Link>

                    <button
                      type="button"
                      onClick={handleShare}
                      className="inline-flex items-center gap-2 border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-700 hover:border-[#980E27] hover:text-[#980E27] transition-colors"
                    >
                      {copied ? (
                        <>
                          <FiCheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-green-600">Article Link Copied</span>
                        </>
                      ) : (
                        <>
                          <FiShare2 className="h-4 w-4" />
                          <span>Share Article</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Side - Static / Sticky Sidebar with Rest of Blog Headings (4 Cols) */}
              <aside className="lg:col-span-4 relative">
                <div className="lg:sticky lg:top-28 space-y-6 max-h-[calc(100vh-8rem)] overflow-y-auto pr-1 [scrollbar-width:thin] [scrollbar-color:#e5e7eb_transparent]">
                  <BlogSidebar
                    currentSlug={slug}
                    headingTitle="Rest of the Blog Headings"
                  />
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <BlogCta />
    </main>
  );
}
