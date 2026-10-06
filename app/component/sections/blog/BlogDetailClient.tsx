"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiCalendar, FiClock, FiUser } from "react-icons/fi";
import RubberImg from "@/public/images/tyers_rubber.webp";
import BlogService, { BlogDetail } from "@/app/utils/BlogService";
import BlogCta from "@/app/component/sections/blog/BlogCta";

interface BlogDetailClientProps {
  slug: string;
}

export default function BlogDetailClient({ slug }: BlogDetailClientProps) {
  const [blog, setBlog] = useState<BlogDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await BlogService.getBlogBySlug(slug);
        if (response.success && response.data) {
          setBlog(response.data);
        } else {
          setError(response.message || "Blog not found");
        }
      } catch (err: any) {
        console.error("Error fetching blog details:", err);
        setError("Failed to load blog details.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlog();
    }
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

  return (
    <main className="flex-1 bg-white">
      <section className="w-full bg-[#f8f9fa] py-10 lg:py-14 border-b border-gray-200">
        <div className="site-container">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#d3132d] hover:underline mb-6"
          >
            <FiArrowLeft className="h-4 w-4" /> Back to Articles
          </Link>

          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-8 w-3/4 rounded bg-gray-200" />
              <div className="h-4 w-1/3 rounded bg-gray-200" />
            </div>
          ) : error || !blog ? (
            <div className="py-8">
              <h1 className="text-2xl font-bold text-gray-800">{error || "Blog Post Not Found"}</h1>
            </div>
          ) : (
            <div>
              <h1 className="font-manrope text-3xl font-extrabold text-gray-900 md:text-4xl lg:text-5xl leading-tight">
                {blog.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                {blog.author && (
                  <span className="inline-flex items-center gap-1.5 font-medium">
                    <FiUser className="h-4 w-4 text-[#d3132d]" />
                    {blog.author.name}
                  </span>
                )}
                {blog.published_at && (
                  <span className="inline-flex items-center gap-1.5">
                    <FiCalendar className="h-4 w-4 text-[#d3132d]" />
                    {formatDate(blog.published_at)}
                  </span>
                )}
                {blog.reading_time > 0 && (
                  <span className="inline-flex items-center gap-1.5">
                    <FiClock className="h-4 w-4 text-[#d3132d]" />
                    {blog.reading_time} min read
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {!loading && blog && (
        <section className="py-12 lg:py-16">
          <div className="site-container max-w-4xl">
            {blog.featured_image && (
              <div className="mb-8 overflow-hidden rounded-lg shadow-md">
                <Image
                  src={blog.featured_image || RubberImg}
                  alt={blog.title}
                  width={1200}
                  height={600}
                  className="w-full max-h-[480px] object-cover"
                />
              </div>
            )}

            {blog.excerpt && (
              <p className="mb-8 text-xl font-medium leading-relaxed text-gray-700 italic border-l-4 border-[#d3132d] pl-4 bg-gray-50 py-3">
                {blog.excerpt}
              </p>
            )}

            <article
              className="prose prose-lg max-w-none prose-headings:font-manrope prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-[#d3132d]"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </section>
      )}

      <BlogCta />
    </main>
  );
}
