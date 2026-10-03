"use client";

import React, { useEffect, useState } from "react";
import { FiCheckCircle, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { motion } from "framer-motion";
import { getProductCategories, Category } from "@/app/utils/ProductService";
import { submitPublicEnquiry } from "@/app/utils/Enquiry";

const ContactForm = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    enquiryType: "",
    productCategory: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const res = await getProductCategories();
        if (res && res.success && Array.isArray(res.data)) {
          setCategories(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch product categories:", err);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage("Please fill in all required fields (Full Name, Email, Message).");
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedCategoryObj = categories.find(
        (c) => c.name === formData.productCategory || String(c.id) === formData.productCategory
      );

      await submitPublicEnquiry({
        name: formData.fullName,
        company_name: formData.companyName || undefined,
        email: formData.email,
        phone: formData.phone || undefined,
        subject: formData.subject || undefined,
        message: formData.message,
        category_id: selectedCategoryObj?.id,
        category_name: selectedCategoryObj?.name || formData.productCategory || undefined,
        enquiry_type: formData.enquiryType || undefined,
      });

      setIsSuccess(true);
    } catch (err: any) {
      console.error("Enquiry submission error:", err);
      setErrorMessage(
        err?.message || err?.error || "Failed to submit enquiry. Please check your details and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData({
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      enquiryType: "",
      productCategory: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section className="w-full bg-white py-14 sm:py-20 lg:py-[81px]">
      <div className="site-container">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-[20px] font-semibold text-[#980E27] sm:text-base">
              Get In Touch
            </p>
            <h2 className="max-w-md font-manrope text-3xl font-bold leading-[1.08] text-[#000000] sm:text-4xl lg:text-[46px]">
              We&apos;re Here to Help.
            </h2>
            <p className="mt-5 max-w-md text-base leading-[1.5] text-[#474747]">
              Whether you have a product enquiry, need additional information or
              want to discuss your application requirements, our team is ready to
              assist.
            </p>
            <div className="mt-9 space-y-7">
              <ContactItem icon={FiMapPin} title="Our Office">
                <strong className="block text-[#202020]">
                  MERCHEM INDIA (P) LIMITED
                </strong>
                <span>
                  45A Development Plot, Kalamassery, Ernakulam – 683104, Kerala,
                  India.
                </span>
              </ContactItem>
              <ContactItem icon={FiPhone} title="Call Us">
                <strong className="block text-[#202020]">0484 3510629</strong>
                <span>For general and product enquiries.</span>
              </ContactItem>
              <ContactItem icon={FiMail} title="Email Us">
                <strong className="block text-[#202020]">mail@merchem.com</strong>
                <span>Send us your questions and product requirements.</span>
              </ContactItem>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="rounded-xl border border-gray-100 bg-white p-6 shadow-[0_5px_24px_rgba(0,0,0,0.07)] sm:p-8"
          >
            <p className="text-[20px] font-semibold text-[#980E27]">
              Enquiry Form
            </p>
            <h2 className="font-manrope text-3xl font-bold leading-tight text-[#000000] sm:text-4xl">
              How Can We Assist You?
            </h2>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 flex flex-col items-center justify-center py-10 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fff1f3] text-[#980E27]">
                  <FiCheckCircle className="h-10 w-10" />
                </div>
                <h3 className="mt-4 text-2xl font-bold text-black">Enquiry Submitted!</h3>
                <p className="mt-2 max-w-md text-sm text-slate-600">
                  Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. Your message has been received. Our team will get back to you at <span className="underline font-medium text-slate-800">{formData.email}</span> shortly.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-6 rounded-md bg-[#980E27] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#7d0a1f]"
                >
                  Submit Another Enquiry
                </button>
              </motion.div>
            ) : (
              <form className="mt-7 grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit}>
                {errorMessage && (
                  <div className="rounded-md bg-red-50 p-3.5 text-xs font-medium text-red-700 border border-red-200 sm:col-span-2">
                    {errorMessage}
                  </div>
                )}

                <Field
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
                <Field
                  label="Company Name"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  placeholder="Your company name"
                />
                <Field
                  label="Business Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  type="email"
                  placeholder="Your email address"
                />
                <Field
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  type="tel"
                  placeholder="Your phone number"
                />
                <SelectField
                  label="Enquiry Type"
                  name="enquiryType"
                  value={formData.enquiryType}
                  onChange={handleChange}
                  required
                  options={[
                    "Product Enquiry",
                    "Technical Information",
                    "Business Partnership",
                    "Career Enquiry",
                    "Other",
                  ]}
                  placeholder="Select enquiry type"
                />
                <SelectField
                  label="Product Category"
                  name="productCategory"
                  value={formData.productCategory}
                  onChange={handleChange}
                  options={categories.map((c) => ({
                    id: c.id,
                    label: c.name,
                    value: c.name,
                  }))}
                  placeholder={
                    loadingCategories ? "Loading categories..." : "Select a category"
                  }
                />
                <Field
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Subject"
                  className="sm:col-span-2"
                />
                <label className="sm:col-span-2">
                  <span className="mb-2 block text-sm font-semibold text-[#202020]">
                    Message <em className="not-italic text-[#d3132d]">*</em>
                  </span>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Please share your requirements, application details or any specific queries..."
                    className="w-full resize-y rounded-md border border-gray-200 px-3 py-3 text-sm outline-none placeholder:text-gray-400 focus:border-[#980E27]"
                  />
                </label>
                <p className="text-xs leading-relaxed text-gray-500 sm:col-span-2">
                  By submitting this form, you agree that Merchem may use your
                  information to respond to your enquiry.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-fit items-center gap-2 bg-[#d3132d] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#980E27] disabled:opacity-75 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Enquiry</span>
                      <span aria-hidden="true">→</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

type ContactItemProps = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
};
const ContactItem = ({ icon: Icon, title, children }: ContactItemProps) => (
  <div className="flex gap-4">
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#fff1f2] text-[#d3132d]">
      <Icon className="h-5 w-5" />
    </div>
    <div className="text-sm leading-[1.5] text-[#666666]">
      <h3 className="mb-1 font-bold text-[#202020]">{title}</h3>
      {children}
    </div>
  </div>
);

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  required?: boolean;
};
const Field = ({ label, required, className = "", ...props }: FieldProps) => (
  <label className={className}>
    <span className="mb-2 block text-sm font-semibold text-[#202020]">
      {label} {required && <em className="not-italic text-[#d3132d]">*</em>}
    </span>
    <input
      {...props}
      required={required}
      className="w-full rounded-md border border-gray-200 px-3 py-3 text-sm outline-none placeholder:text-gray-400 focus:border-[#980E27]"
    />
  </label>
);

type SelectOption = { id?: number | string; label: string; value: string };
type SelectFieldProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  required?: boolean;
  options: (string | SelectOption)[];
  placeholder?: string;
};
const SelectField = ({
  label,
  required,
  options,
  placeholder = "Select an option",
  ...props
}: SelectFieldProps) => (
  <label>
    <span className="mb-2 block text-sm font-semibold text-[#202020]">
      {label} {required && <em className="not-italic text-[#d3132d]">*</em>}
    </span>
    <select
      {...props}
      required={required}
      className="w-full rounded-md border border-gray-200 px-3 py-3 text-sm text-gray-700 outline-none focus:border-[#980E27] bg-white"
    >
      <option value="">{placeholder}</option>
      {options.map((option) => {
        const value = typeof option === "string" ? option : option.value;
        const labelText = typeof option === "string" ? option : option.label;
        const key = typeof option === "string" ? option : option.id || option.value;
        return (
          <option key={key} value={value}>
            {labelText}
          </option>
        );
      })}
    </select>
  </label>
);

export default ContactForm;
