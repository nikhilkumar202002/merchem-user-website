"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FiArrowRight, FiFileText, FiGrid, FiDownload } from "react-icons/fi";
import Breadcrumbs from "@/app/component/common/Breadcrumbs";
import TdsForm from "@/app/component/common/TdsForm";
import { getProductCatalogue, getPublicProducts, CatalogueCategory, CatalogueSubcategory, PublicProduct } from "@/app/utils/ProductService";

interface SubcategoryDetailClientProps {
  slug?: string;
  subcategorySlug?: string;
}

export default function SubcategoryDetailClient({
  slug: propSlug,
  subcategorySlug: propSubSlug,
}: SubcategoryDetailClientProps) {
  const routeParams = useParams();

  const rawSlug = propSlug || routeParams?.slug;
  const currentSlug = typeof rawSlug === "string" ? rawSlug : Array.isArray(rawSlug) ? rawSlug[0] : "";

  const rawSubSlug = propSubSlug || routeParams?.subcategorySlug;
  const currentSubSlug = typeof rawSubSlug === "string" ? rawSubSlug : Array.isArray(rawSubSlug) ? rawSubSlug[0] : "";

  const [catalogue, setCatalogue] = useState<CatalogueCategory[]>([]);
  const [category, setCategory] = useState<CatalogueCategory | null>(null);
  const [subcategory, setSubcategory] = useState<CatalogueSubcategory | null>(null);
  const [productsDetailsMap, setProductsDetailsMap] = useState<Record<string, PublicProduct>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTdsProduct, setSelectedTdsProduct] = useState<{ id: number; name: string } | null>(null);

  useEffect(() => {
    const fetchSubcategoryData = async () => {
      try {
        setLoading(true);
        const [catalogueRes, productsRes] = await Promise.allSettled([
          getProductCatalogue(),
          getPublicProducts({ per_page: 100 }),
        ]);

        if (catalogueRes.status === "fulfilled" && catalogueRes.value?.success && Array.isArray(catalogueRes.value.data)) {
          const resData = catalogueRes.value.data;
          setCatalogue(resData);
          const foundCat = resData.find(
            (cat) => cat.slug.toLowerCase() === currentSlug.toLowerCase()
          ) || resData[0];

          setCategory(foundCat || null);

          if (foundCat && foundCat.subcategories) {
            const foundSub = foundCat.subcategories.find(
              (sub) => sub.slug.toLowerCase() === currentSubSlug.toLowerCase()
            );
            setSubcategory(foundSub || foundCat.subcategories[0] || null);
          }
        }

        if (productsRes.status === "fulfilled" && productsRes.value?.success && Array.isArray(productsRes.value.data)) {
          const map: Record<string, PublicProduct> = {};
          productsRes.value.data.forEach((p) => {
            if (p.slug) map[p.slug.toLowerCase()] = p;
            if (p.name) map[p.name.toLowerCase()] = p;
            if (p.id) map[p.id.toString()] = p;
          });
          setProductsDetailsMap(map);
        }
      } catch (err) {
        console.error("Error fetching subcategory details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategoryData();
  }, [currentSlug, currentSubSlug]);

  if (loading) {
    return (
      <main className="w-full bg-[#fcfcfd] min-h-screen py-12">
        <div className="site-container">
          <div className="h-6 w-64 bg-gray-200 animate-pulse mb-6" />
          <div className="h-10 w-96 bg-gray-200 animate-pulse mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
              <div key={idx} className="h-48 bg-gray-200 animate-pulse" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (!subcategory || !category) {
    return (
      <main className="w-full bg-[#fcfcfd] min-h-screen py-20">
        <div className="site-container text-center">
          <h1 className="text-3xl font-bold text-black">Subcategory Not Found</h1>
          <p className="mt-2 text-slate-600">The requested subcategory could not be found.</p>
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
    { label: category.name, href: `/products/${category.slug}` },
    { label: subcategory.name },
  ];

  return (
    <main className="w-full bg-[#fcfcfd] min-h-screen py-8 sm:py-12 lg:py-16">
      <div className="site-container">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Subcategory Header */}
        <div className="mt-4 mb-8 pb-5 border-b border-gray-200">
          <div className="mt-1 flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[36px] 2xl:text-5xl font-bold text-black tracking-tight">
              {subcategory.name}
            </h1>
            <span className="text-xs font-semibold px-3 py-1.5 bg-[#fff1f3] text-[#980E27] flex items-center gap-1.5 border border-[#980E27]/20">
              <FiGrid className="h-4 w-4" />
              {subcategory.products.length} Products
            </span>
          </div>
        </div>

        {/* Main Product Grid (Full Width, 3-4 Cols) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl xl:text-lg 2xl:text-xl font-bold text-black border-l-4 border-[#980E27] pl-3">
              Product Range ({subcategory.products.length})
            </h2>
          </div>

          {subcategory.products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 xl:gap-5 2xl:gap-6">
              {subcategory.products.map((product) => {
                const prodDetail =
                  productsDetailsMap[product.slug?.toLowerCase() || ""] ||
                  productsDetailsMap[product.name?.toLowerCase() || ""] ||
                  (product.id ? productsDetailsMap[product.id.toString()] : undefined);

                const desc =
                  prodDetail?.description ||
                  prodDetail?.short_description ||
                  product.description ||
                  product.short_description ||
                  "";

                return (
                  <div
                    key={product.id || product.slug}
                    className="group flex flex-col justify-between bg-white border border-gray-200 p-5 transition-all duration-300 hover:border-[#980E27] hover:shadow-lg"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-xs font-semibold px-2 py-0.5 bg-gray-100 text-slate-700">
                          {subcategory.name}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
                          <FiFileText className="h-3.5 w-3.5 text-[#980E27]" />
                          <span>{product.tds_available ? "TDS Ready" : "TDS on Request"}</span>
                        </div>
                      </div>

                      <h3 className="text-base sm:text-lg xl:text-[16px] 2xl:text-xl font-bold text-black group-hover:text-[#980E27] transition-colors leading-snug">
                        {product.name}
                      </h3>

                      {desc && (
                        <p className="mt-2 text-xs sm:text-sm xl:text-xs 2xl:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                          {desc}
                        </p>
                      )}
                    </div>

                    <div className="mt-5 pt-3 border-t border-gray-100 space-y-2">
                      <button
                        type="button"
                        onClick={() => setSelectedTdsProduct({ id: product.id, name: product.name })}
                        className="flex items-center justify-center gap-2 bg-[#980E27] text-white w-full py-2 text-xs sm:text-sm font-semibold hover:bg-[#7d0a1f] transition-colors"
                      >
                        <FiDownload className="h-3.5 w-3.5" />
                        <span>Request TDS</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 p-8 text-center text-slate-500">
              No products currently listed under this subcategory.
            </div>
          )}
        </div>
      </div>

      {/* TDS Request Modal */}
      {selectedTdsProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <TdsForm
              productId={selectedTdsProduct.id}
              selectedProduct={selectedTdsProduct.name}
              productList={subcategory.products.map((p) => p.name)}
              onClose={() => setSelectedTdsProduct(null)}
            />
          </div>
        </div>
      )}
    </main>
  );
}
