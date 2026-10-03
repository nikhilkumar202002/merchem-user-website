"use client";

import React, { useState } from "react";
import { FiCheckCircle, FiFileText, FiLock, FiSend, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export interface TdsFormProps {
  /** Name of the automatically selected product */
  selectedProduct?: string;
  /** Optional list of products if selectable */
  productList?: string[];
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
  selectedProduct = "Rubber Specialty Chemical",
  productList = [],
  onSuccess,
  onClose,
  title = "Request Technical Data Sheet (TDS)",
  subtitle = "Please complete the details below to receive the technical documentation.",
  className = "",
}: TdsFormProps) {
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Required fields verification (Product auto-selected, Full Name, Company, Email, Phone)
    if (!formData.fullName.trim() || !formData.companyName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMessage("Please fill in all required fields (Full Name, Company Name, Email, Phone).");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API submission or dispatch request
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      setErrorMessage("Failed to submit TDS request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
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
      className={`relative w-full rounded-xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8 ${className}`}
    >
      {onClose && (
        <button
          onClick={onClose}
          type="button"
          aria-label="Close form"
          className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-gray-100 hover:text-slate-700 transition-colors"
        >
          <FiX className="h-5 w-5" />
        </button>
      )}

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-[#980E27] font-semibold text-xs uppercase tracking-wider">
          <FiFileText className="h-4 w-4" />
          <span>TDS Download Request</span>
        </div>
        <h3 className="mt-1 font-manrope text-2xl font-bold text-black sm:text-3xl">
          {title}
        </h3>
        {subtitle && <p className="mt-1 text-sm text-slate-600">{subtitle}</p>}
      </div>

      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center py-8 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fff1f3] text-[#980E27]">
              <FiCheckCircle className="h-10 w-10" />
            </div>
            <h4 className="mt-4 text-xl font-bold text-black">Request Submitted!</h4>
            <p className="mt-2 max-w-md text-sm text-slate-600">
              Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. Your request for the{" "}
              <strong className="text-[#980E27]">{formData.product}</strong> Technical Data Sheet (TDS) has been received. Our technical team will share the document with <span className="underline font-medium text-slate-800">{formData.email}</span> shortly.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-gray-50 transition-colors"
              >
                Submit Another Request
              </button>
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md bg-[#980E27] px-4 py-2 text-sm font-medium text-white hover:bg-[#7d0a1f] transition-colors"
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
            className="space-y-4"
          >
            {errorMessage && (
              <div className="rounded-md bg-red-50 p-3 text-xs font-medium text-red-700 border border-red-200">
                {errorMessage}
              </div>
            )}

            {/* Field: Product (Automatically Selected) */}
            <div>
              <label className="mb-1.5 flex items-center justify-between text-sm font-semibold text-[#202020]">
                <span>
                  Product <em className="not-italic text-xs font-normal text-slate-500">(Automatically selected)</em>
                </span>
                <span className="flex items-center gap-1 text-[11px] font-normal text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <FiLock className="h-3 w-3" /> Auto-Selected
                </span>
              </label>

              {productList && productList.length > 0 ? (
                <select
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-3.5 py-2.5 text-sm font-medium text-slate-900 outline-none focus:border-[#980E27]"
                >
                  {productList.map((prod) => (
                    <option key={prod} value={prod}>
                      {prod}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="relative">
                  <input
                    type="text"
                    name="product"
                    value={formData.product}
                    readOnly
                    className="w-full rounded-md border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-[#980E27] cursor-not-allowed outline-none select-none"
                  />
                </div>
              )}
            </div>

            {/* Field: Full Name (Required) & Company Name (Required) */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-[#202020]">
                  Full Name <em className="not-italic text-[#d3132d]">*</em>
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-200 px-3.5 py-2.5 text-sm outline-none placeholder:text-gray-400 focus:border-[#980E27] focus:ring-1 focus:ring-[#980E27]"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-[#202020]">
                  Company Name <em className="not-italic text-[#d3132d]">*</em>
                </label>
                <input
                  type="text"
                  name="companyName"
                  required
                  placeholder="Enter your company name"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-200 px-3.5 py-2.5 text-sm outline-none placeholder:text-gray-400 focus:border-[#980E27] focus:ring-1 focus:ring-[#980E27]"
                />
              </div>
            </div>

            {/* Field: Email (Required) & Phone (Required) */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-[#202020]">
                  Email <em className="not-italic text-[#d3132d]">*</em>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-200 px-3.5 py-2.5 text-sm outline-none placeholder:text-gray-400 focus:border-[#980E27] focus:ring-1 focus:ring-[#980E27]"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-[#202020]">
                  Phone <em className="not-italic text-[#d3132d]">*</em>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+91-XXXXXXXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-200 px-3.5 py-2.5 text-sm outline-none placeholder:text-gray-400 focus:border-[#980E27] focus:ring-1 focus:ring-[#980E27]"
                />
              </div>
            </div>

            {/* Field: Location (Optional) */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#202020]">
                Location <span className="text-xs font-normal text-slate-500">(Optional)</span>
              </label>
              <input
                type="text"
                name="location"
                placeholder="City, Country or Region"
                value={formData.location}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-200 px-3.5 py-2.5 text-sm outline-none placeholder:text-gray-400 focus:border-[#980E27] focus:ring-1 focus:ring-[#980E27]"
              />
            </div>

            {/* Field: Message / Requirement (Optional) */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#202020]">
                Message / Requirement <span className="text-xs font-normal text-slate-500">(Optional)</span>
              </label>
              <textarea
                name="message"
                rows={3}
                placeholder="Specify any details, application parameters or quantity requirements..."
                value={formData.message}
                onChange={handleChange}
                className="w-full resize-y rounded-md border border-gray-200 px-3.5 py-2.5 text-sm outline-none placeholder:text-gray-400 focus:border-[#980E27] focus:ring-1 focus:ring-[#980E27]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 bg-[#980E27] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#7d0a1f] disabled:opacity-75"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <FiSend className="h-4 w-4" />
                    <span>Request TDS Document</span>
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