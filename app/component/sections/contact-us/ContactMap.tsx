import React from "react";

const ContactMap = () => {
  return (
    <section className="w-full bg-[#f8f8f8] py-14 sm:py-20 lg:py-[81px]">
      <div className="site-container">
        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#980E27] sm:text-base">
              Our Location
            </p>
            <h2 className="mt-2 font-manrope text-3xl font-bold leading-[1.1] text-[#000000] sm:text-4xl lg:text-[46px]">
              Visit Merchem India.
            </h2>
            <p className="mt-5 max-w-md text-base leading-[1.55] text-[#474747]">
              Our office is located at Development Plot, Kalamassery,
              Ernakulam, Kerala.
            </p>

            <div className="mt-8 border-l-2 border-[#980E27] pl-5 text-base leading-[1.6] text-[#474747]">
              <p className="font-bold text-[#202020]">Merchem India (P) Limited</p>
              <p className="mt-1">
                45A Development Plot, Kalamassery, Ernakulam – 683104, Kerala
              </p>
            </div>
          </div>

          <div className="h-[320px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm sm:h-[400px]">
            <iframe
              title="Merchem India office location"
              src="https://www.google.com/maps?q=45A+Development+Plot,+Kalamassery,+Ernakulam,+Kerala+683104&output=embed"
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMap;
