"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { FiHome, FiRefreshCw, FiAlertTriangle } from "react-icons/fi";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="flex min-h-[75vh] flex-col items-center justify-center bg-white px-4 py-16 text-center">
      <div className="site-container max-w-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-[#d3132d]">
          <FiAlertTriangle className="h-8 w-8" />
        </div>
        <h1 className="mt-6 font-manrope text-3xl font-bold text-gray-900 sm:text-4xl">
          Something went wrong
        </h1>
        <p className="mt-3 text-base text-gray-600">
          An unexpected error occurred while loading this page. Please try refreshing or return to the homepage.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 rounded-md bg-[#d3132d] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#980e27]"
          >
            <FiRefreshCw className="h-4 w-4" /> Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            <FiHome className="h-4 w-4 text-[#d3132d]" /> Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
