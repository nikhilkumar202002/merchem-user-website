"use client";

import React, { useState, useRef } from "react";
import { FiCheckCircle, FiFileText, FiLock, FiSend, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

import { submitPublicTdsRequest } from "@/app/utils/Enquiry";
import GoogleRecaptcha, { GoogleRecaptchaRef } from "@/app/component/common/GoogleRecaptcha";

export type TdsProductItem = string | { id: number | string; name: string };

export interface TdsFormProps {
  /** ID of the product for TDS request */
  productId?: number | string;
  /** Name of the automatically selected product */
  selectedProduct?: string;
  /** Optional list of products if selectable */
  productList?: TdsProductItem[];
  /** Callback fired after successful form submission */
  onSuccess?: () => void;
  /** Callback for modal close button if rendered inside a modal */
  onClose?: () => void;
  /** Optional title override */
  title?: string;
  /** Optional subtitle/description override */
  subtitle?: string;
  /** Custom wrapper styling */
  className?: string;
}

export default function TdsForm({
  productId,
  selectedProduct = "Rubber Specialty Chemical",
  productList = [],
  onSuccess,
  onClose,
  title = "Request Technical Data Sheet (TDS)",
  className = "",
}: TdsFormProps) {
  const [currentProductId, setCurrentProductId] = useState<number | string | undefined>(productId);
  const [formData, setFormData] = useState({
    product: selectedProduct,
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    location: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<GoogleRecaptchaRef>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductSelect = (selectedName: string) => {
    setFormData((prev) => ({ ...prev, product: selectedName }));
    const found = productList.find((p) =>
      typeof p === "string" ? p === selectedName : p.name === selectedName
    );
    if (found && typeof found !== "string" && found.id) {
      setCurrentProductId(found.id);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const parsedProductId = currentProductId
      ? typeof currentProductId === "number"
        ? currentProductId
        : parseInt(String(currentProductId), 10)
      : undefined;

    if (!parsedProductId || isNaN(parsedProductId)) {
      setErrorMessage("A valid product is required to submit a TDS request.");
      return;
    }

    // Required fields verification (Full Name, Company, Email, Phone)
    if (!formData.fullName.trim() || !formData.companyName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMessage("Please fill in all required fields (Full Name, Company Name, Email, Phone).");
      return;
    }

    if (!captchaToken) {
      setErrorMessage("Please complete the reCAPTCHA verification to proceed.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await submitPublicTdsRequest({
        product_id: parsedProductId,
        name: formData.fullName.trim(),
        company_name: formData.companyName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        location: formData.location.trim() || undefined,
        message: formData.message.trim() || undefined,
        recaptcha_token: captchaToken,
        "g-recaptcha-response": captchaToken,
      });

      if (res && res.success === false) {
        const errorList =
          res.errors && typeof res.errors === "object"
            ? Object.values(res.errors).flat().join(" ")
            : "";
        throw new Error(errorList || res.message || "Failed to submit TDS request.");
      }

      setIsSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      let msg = "Failed to submit TDS request. Please check your network and try again.";
      if (err?.response?.data) {
        const data = err.response.data;
        if (data.errors && typeof data.errors === "object") {
          const errorList = Object.values(data.errors).flat().join(" ");
          msg = errorList || data.message || msg;
        } else if (data.message) {
          msg = data.message;
        }
      } else if (err?.message) {
        msg = err.message;
      }
      setErrorMessage(msg);
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setCaptchaToken(null);
    recaptchaRef.current?.reset();
    setFormData({
      product: selectedProduct,
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      location: "",
      message: "",
    });
  };

  return (
    <div
      className={`relative w-full rounded-2xl border border-gray-200 bg-white p-5 sm:p-7 shadow-2xl ${className}`}
    >
      {onClose && (
        <button
          onClick={onClose}
          type="button"
          aria-label="Close form"
          className="absolute right-3.5 top-3.5 rounded-full p-1.5 text-slate-400 hover:bg-gray-100 hover:text-slate-700 transition-colors cursor-pointer"
        >
          <FiX className="h-5 w-5" />
        </button>
      )}

      {/* Header */}
      <div className="mb-3.5 pr-8">
        <div className="flex items-center gap-1.5 text-[#980E27] font-semibold text-[11px] uppercase tracking-wider">
          <FiFileText className="h-3.5 w-3.5" />
          <span>TDS Download Request</span>
        </div>
        <h3 className="mt-0.5 font-manrope text-lg sm:text-xl font-bold text-black leading-tight">
          {title}
        </h3>
      </div>

      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center py-6 text-center"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#fff1f3] text-[#980E27]">
              <FiCheckCircle className="h-8 w-8" />
            </div>
            <h4 className="mt-3 text-lg sm:text-xl font-bold text-black">Request Submitted!</h4>
            <p className="mt-1.5 max-w-md text-xs sm:text-sm text-slate-600">
              Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. Your request for the{" "}
              <strong className="text-[#980E27]">{formData.product}</strong> Technical Data Sheet (TDS) has been received. Our technical team will share the document with <span className="underline font-medium text-slate-800">{formData.email}</span> shortly.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="rounded-md border border-gray-300 px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Submit Another Request
              </button>
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md bg-[#980E27] px-4 py-2 text-xs sm:text-sm font-medium text-white hover:bg-[#7d0a1f] transition-colors cursor-pointer"
                >
                  Close
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-2.5 sm:space-y-3"
          >
            {errorMessage && (
              <div className="rounded-md bg-red-50 p-2.5 text-xs font-medium text-red-700 border border-red-200">
                {errorMessage}
              </div>
            )}

            {/* Field: Product (Auto-selected or selectable) */}
            <div>
              <div className="mb-1 flex items-center justify-between text-xs sm:text-sm font-semibold text-[#202020]">
                <span>
                  Product <em className="not-italic text-[11px] font-normal text-slate-500">(Automatically selected)</em>
                </span>
                <span className="flex items-center gap-1 text-[10px] sm:text-[11px] font-normal text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  <FiLock className="h-2.5 w-2.5" /> Auto-Selected
                </span>
              </div>

              {productList && productList.length > 0 ? (
                <select
                  name="product"
                  value={formData.product}
                  onChange={(e) => handleProductSelect(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-900 outline-none focus:border-[#980E27]"
                >
                  {productList.map((prod) => {
                    const name = typeof prod === "string" ? prod : prod.name;
                    const key = typeof prod === "string" ? prod : prod.id;
                    return (
                      <option key={key} value={name}>
                        {name}
                      </option>
                    );
                  })}
                </select>
              ) : (
                <input
                  type="text"
                  name="product"
                  value={formData.product}
                  readOnly
                  className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-[#980E27] cursor-not-allowed outline-none select-none"
                />
              )}
            </div>

            {/* Field: Full Name & Company Name */}
            <div className="grid gap-2.5 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs sm:text-sm font-semibold text-[#202020]">
                  Full Name <em className="not-italic text-[#d3132d]">*</em>
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-200 px-3 py-1.5 sm:py-2 text-xs sm:text-sm outline-none placeholder:text-gray-400 focus:border-[#980E27] focus:ring-1 focus:ring-[#980E27]"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs sm:text-sm font-semibold text-[#202020]">
                  Company Name <em className="not-italic text-[#d3132d]">*</em>
                </label>
                <input
                  type="text"
                  name="companyName"
                  required
                  placeholder="Enter your company name"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-200 px-3 py-1.5 sm:py-2 text-xs sm:text-sm outline-none placeholder:text-gray-400 focus:border-[#980E27] focus:ring-1 focus:ring-[#980E27]"
                />
              </div>
            </div>

            {/* Field: Email & Phone */}
            <div className="grid gap-2.5 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs sm:text-sm font-semibold text-[#202020]">
                  Email <em className="not-italic text-[#d3132d]">*</em>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-200 px-3 py-1.5 sm:py-2 text-xs sm:text-sm outline-none placeholder:text-gray-400 focus:border-[#980E27] focus:ring-1 focus:ring-[#980E27]"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs sm:text-sm font-semibold text-[#202020]">
                  Phone <em className="not-italic text-[#d3132d]">*</em>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+91-XXXXXXXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-200 px-3 py-1.5 sm:py-2 text-xs sm:text-sm outline-none placeholder:text-gray-400 focus:border-[#980E27] focus:ring-1 focus:ring-[#980E27]"
                />
              </div>
            </div>

            {/* Field: Location & Message */}
            <div className="grid gap-2.5 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs sm:text-sm font-semibold text-[#202020]">
                  Location <span className="text-[11px] font-normal text-slate-500">(Optional)</span>
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="City, Country"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-200 px-3 py-1.5 sm:py-2 text-xs sm:text-sm outline-none placeholder:text-gray-400 focus:border-[#980E27] focus:ring-1 focus:ring-[#980E27]"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs sm:text-sm font-semibold text-[#202020]">
                  Message / Requirement <span className="text-[11px] font-normal text-slate-500">(Optional)</span>
                </label>
                <input
                  type="text"
                  name="message"
                  placeholder="Quantity, requirements..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-200 px-3 py-1.5 sm:py-2 text-xs sm:text-sm outline-none placeholder:text-gray-400 focus:border-[#980E27] focus:ring-1 focus:ring-[#980E27]"
                />
              </div>
            </div>

            {/* Bottom Row: reCAPTCHA & Submit Button side-by-side on sm: */}
            <div className="pt-1.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="shrink-0 flex justify-center sm:justify-start">
                <GoogleRecaptcha
                  ref={recaptchaRef}
                  onVerify={(token) => {
                    setCaptchaToken(token);
                    setErrorMessage((prev) =>
                      prev.includes("reCAPTCHA") ? "" : prev
                    );
                  }}
                  onExpire={() => setCaptchaToken(null)}
                  onError={() => {
                    setCaptchaToken(null);
                    setErrorMessage("reCAPTCHA encountered an issue. Please try again.");
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:flex-1 h-[48px] sm:h-[78px] flex items-center justify-center gap-2 bg-[#980E27] py-2.5 px-4 text-sm font-semibold text-white transition-colors hover:bg-[#7d0a1f] disabled:opacity-75 rounded-md cursor-pointer shadow-sm"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <FiSend className="h-4 w-4 shrink-0" />
                    <span className="text-center font-bold">Request TDS Document</span>
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}