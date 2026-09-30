import React from "react";
import Image, { type StaticImageData } from "next/image";
import { FiArrowRight, FiCalendar, FiSearch } from "react-icons/fi";
import RubberImg from "@/public/images/tyers_rubber.webp";
import LatexImg from "@/public/images/latex.webp";
import PaintImg from "@/public/images/paint_coating.webp";
import IndustryImg from "@/public/images/industrial_application.webp";
import QualityImg from "@/public/images/quality_technical.webp";
import AboutImg from "@/public/images/who-we-are.webp";

type Article = {
  image: StaticImageData;
  category: string;
  title: string;
  excerpt: string;
  date: string;
};

const articles: Article[] = [
  { image: RubberImg, category: "Rubber Chemicals", title: "Role of Accelerators in Rubber Vulcanization", excerpt: "Understanding how rubber accelerators improve curing efficiency, processing safety and final product performance.", date: "Sep 28, 2026" },
  { image: RubberImg, category: "Technical Insights", title: "Antidegradants in Rubber Compounds", excerpt: "How antioxidants and antiozonants help protect rubber materials against heat, oxygen and ozone-related degradation.", date: "Sep 15, 2026" },
  { image: LatexImg, category: "Industrial Applications", title: "Chemical Solutions for Latex Processing", excerpt: "Key chemicals utilised in latex applications to improve stability, processing and product quality.", date: "Aug 30, 2026" },
  { image: PaintImg, category: "Industrial Applications", title: "Specialty Chemicals for Paints & Coatings", excerpt: "How specialty chemicals support formulation, performance and application requirements in coating systems.", date: "Sep 12, 2026" },
  { image: IndustryImg, category: "Agrochemicals", title: "Agrochemical Intermediates: Supporting Agricultural Solutions", excerpt: "An overview of key intermediates and their role in agrochemical applications.", date: "Jul 28, 2026" },
  { image: IndustryImg, category: "Water Treatment", title: "Water Treatment Chemicals for Industrial Applications", excerpt: "Chemical solutions designed for effective water treatment and process water management in industrial operations.", date: "Jul 10, 2026" },
  { image: QualityImg, category: "Company News", title: "Our Commitment to Quality and Innovation", excerpt: "How our focus on research, quality control and customer support continues to drive progress at Merchem.", date: "Jun 25, 2026" },
  { image: RubberImg, category: "Rubber Chemicals", title: "Trends in the Tyre and Rubber Industry", excerpt: "Key trends shaping the rubber industry and the growing role of specialty chemicals in higher performance applications.", date: "Jun 10, 2026" },
  { image: AboutImg, category: "Technical Insights", title: "Research & Development at Merchem", excerpt: "A look at how our R&D capabilities support product development, process optimization and application-oriented solutions.", date: "May 28, 2026" },
];

const GridBlog = () => {
  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-20">
      <div className="site-container">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {["All Articles", "Rubber Chemicals", "Industrial Applications", "Technical Insights", "Company News"].map((category, index) => (
              <button key={category} type="button" className={`px-4 py-2 text-xs font-semibold ${index === 0 ? "bg-[#d3132d] text-white" : "text-[#333333] hover:text-[#980E27]"}`}>
                {category}
              </button>
            ))}
          </div>

          <label className="flex w-full items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-400 lg:max-w-[260px]">
            <FiSearch className="h-4 w-4" />
            <span className="sr-only">Search articles</span>
            <input placeholder="Search articles..." className="min-w-0 flex-1 outline-none placeholder:text-gray-400" />
          </label>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article key={article.title} className="overflow-hidden rounded-md border border-gray-100 bg-white shadow-[0_3px_12px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_8px_22px_rgba(152,14,39,0.12)]">
              <Image src={article.image} alt={article.title} width={600} height={320} className="h-44 w-full object-cover" />
              <div className="flex min-h-[220px] flex-col p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#d3132d]">{article.category}</p>
                <h2 className="mt-2 font-manrope text-base font-bold leading-tight text-[#000000]">{article.title}</h2>
                <p className="mt-2 text-sm leading-[1.4] text-[#777777]">{article.excerpt}</p>
                <div className="mt-auto flex items-center justify-between pt-5 text-xs text-gray-400">
                  <span className="inline-flex items-center gap-1"><FiCalendar className="h-3.5 w-3.5" />{article.date}</span>
                  <button type="button" className="inline-flex items-center gap-1 font-semibold text-[#d3132d]">Read More <FiArrowRight className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-sm">
          <button type="button" className="rounded-full border border-gray-200 px-3 py-1 text-gray-400">‹</button>
          <button type="button" className="rounded-md bg-[#d3132d] px-3 py-1 text-white">1</button>
          <button type="button" className="px-2 py-1 text-gray-600">2</button>
          <button type="button" className="px-2 py-1 text-gray-600">3</button>
          <span className="px-1 text-gray-400">…</span>
          <button type="button" className="px-2 py-1 text-gray-600">8</button>
          <button type="button" className="rounded-full border border-gray-200 px-3 py-1 text-gray-600">›</button>
        </div>
      </div>
    </section>
  );
};

export default GridBlog;
