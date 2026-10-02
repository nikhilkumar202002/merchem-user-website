"use client";

import React from "react";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";

const ContactForm = () => (
  <section className="w-full bg-white py-14 sm:py-20 lg:py-[81px]">
    <div className="site-container">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
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
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-[0_5px_24px_rgba(0,0,0,0.07)] sm:p-8">
          <p className="text-[20px] font-semibold text-[#980E27]">
            Enquiry Form
          </p>
          <h2 className="font-manrope text-3xl font-bold leading-tight text-[#000000] sm:text-4xl">
            How Can We Assist You?
          </h2>
         
          <form
            className="mt-7 grid gap-5 sm:grid-cols-2"
            onSubmit={(event) => event.preventDefault()}
          >
            <Field label="Full Name" required placeholder="Your name" />
            <Field
              label="Company Name"
              required
              placeholder="Your company name"
            />
            <Field
              label="Business Email"
              required
              type="email"
              placeholder="Your email address"
            />
            <Field
              label="Phone Number"
              required
              type="tel"
              placeholder="Your phone number"
            />
            <SelectField
              label="Enquiry Type"
              required
              options={[
                "Product Enquiry",
                "Technical Information",
                "Business Partnership",
                "Career Enquiry",
                "Other",
              ]}
            />
            <SelectField
              label="Product Category"
              options={[
                "Rubber Chemicals",
                "Latex Chemicals",
                "Specialty Chemicals",
                "Water Treatment Chemicals",
                "Agrochemicals",
              ]}
            />
            <Field
              label="Subject"
              required
              placeholder="Subject"
              className="sm:col-span-2"
            />
            <label className="sm:col-span-2">
              <span className="mb-2 block text-sm font-semibold text-[#202020]">
                Message <em className="not-italic text-[#d3132d]">*</em>
              </span>
              <textarea
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
              className="inline-flex w-fit items-center gap-2 bg-[#d3132d] px-5 py-3 text-sm font-semibold text-white hover:bg-[#980E27]"
            >
              Submit Enquiry <span aria-hidden="true">→</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

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

type SelectFieldProps = {
  label: string;
  required?: boolean;
  options: string[];
};
const SelectField = ({ label, required, options }: SelectFieldProps) => (
  <label>
    <span className="mb-2 block text-sm font-semibold text-[#202020]">
      {label} {required && <em className="not-italic text-[#d3132d]">*</em>}
    </span>
    <select
      required={required}
      className="w-full rounded-md border border-gray-200 px-3 py-3 text-sm text-gray-500 outline-none focus:border-[#980E27]"
    >
      <option value="">Select a category</option>
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  </label>
);

export default ContactForm;
