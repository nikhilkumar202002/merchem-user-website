"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import IndustrialImage from "@/public/images/industrial_application.webp";
import QualityImage from "@/public/images/quality_technical.webp";
import PaintImage from "@/public/images/paint_coating.webp";

const posts: { category: string; title: string; image: StaticImageData }[] = [
  { category: "Industry Insights", title: "Understanding changing requirements across chemical and material industries.", image: IndustrialImage },
  { category: "Technical Knowledge", title: "Practical information around chemical applications and processes.", image: QualityImage },
  { category: "Company Updates", title: "News, developments and milestones from Merchem.", image: PaintImage },
];

export default function FeaturedBlog() {
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-[86px]">
      <div className="site-container">
        <div className="mb-10 flex flex-col gap-7 lg:mb-11 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="block text-sm font-semibold tracking-wide text-[#980E27] sm:text-base">Insights &amp; Knowledge</span>
            <h2 className="mt-1 max-w-[650px] text-4xl font-bold leading-[1.08] tracking-[-0.035em] text-black sm:text-5xl lg:text-[46px]">Ideas From the World of<br className="hidden sm:block" /> Specialty Chemistry.</h2>
          </div>
          <Link href="/insights" className="inline-flex w-fit items-center gap-3 bg-[#980E27] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#7d0a1f] sm:text-base"><span>View All Insights</span><FiArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {posts.map((post) => (
            <article key={post.category} className="flex min-h-[450px] flex-col bg-[#f1f1f3] lg:h-[540px]">
              <Image src={post.image} alt={post.title} className="h-[272px] w-full flex-none object-cover lg:h-[310px]" />
              <div className="flex flex-1 flex-col px-6 py-4">
                <span className="text-base font-medium text-[#980E27]">{post.category}</span>
                <h3 className="mt-1 text-xl font-semibold leading-[1.12] tracking-[-0.025em] text-black">{post.title}</h3>
                <Link href="/insights" aria-label={`Read ${post.title}`} className="mt-auto flex h-7 w-7 items-center justify-center bg-[#980E27] text-white transition-colors hover:bg-[#7d0a1f]"><FiArrowRight className="h-4 w-4" /></Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
