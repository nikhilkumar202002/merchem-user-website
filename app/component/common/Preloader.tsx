"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "@/public/Main_logo.png";

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Hide preloader after initial load
    const timer = setTimeout(() => {
      setLoading(false);
      if (typeof window !== "undefined") {
        (window as any).preloaderDone = true;
        window.dispatchEvent(new Event("preloaderFinished"));
      }
    }, 1200);

    const unmountTimer = setTimeout(() => {
      setShouldRender(false);
    }, 1700);

    return () => {
      clearTimeout(timer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-500 ease-in-out ${
        loading ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex flex-col items-center justify-center gap-6 px-4">
        {/* Centered Logo */}
        <div className="relative">
          <Image
            src={Logo}
            alt="Merchem Logo"
            width={160}
            height={90}
            priority
            className="h-auto w-auto max-h-[80px] object-contain sm:max-h-[95px]"
          />
        </div>

        {/* Loader below */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative h-[3px] w-36 overflow-hidden rounded-full bg-gray-100 sm:w-44">
            <div className="absolute inset-y-0 left-0 w-full animate-loader-bar rounded-full bg-[#980E27]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;