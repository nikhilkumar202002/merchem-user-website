import React from "react";
import Image from "next/image";
import TechnicalFoundationImg from "@/public/images/quality_technical.webp";

const TechnicalFoundation = () => {
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-[100px]">
      <div >
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-[80px]">
          <div className="relative overflow-hidden">
            <Image
              src={TechnicalFoundationImg}
              alt="Merchem research and quality control laboratory"
              width={700}
              height={520}
              className="h-auto w-full object-cover"
            />
          </div>

          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#980E27] sm:text-base">
              Our Technical Foundation
            </p>

            <h2 className="pb-5 font-manrope text-3xl font-bold leading-[1.12] tracking-[-0.035em] text-[#000000] sm:text-4xl lg:text-[42px] xl:text-[46px]">
              R&amp;D and Quality Control — The Key to Our Success
            </h2>

            <div className="space-y-5 text-base font-normal leading-[1.5] text-[#474747] sm:text-[17px]">
              <p>
                At Merchem, Research &amp; Development and Quality Control are
                integral to our operations. We continuously invest in advanced
                technology, modern testing equipment and innovative approaches
                to develop and improve products that meet the changing
                requirements of the industry.
              </p>
              <p>
                Our experienced R&amp;D and technical teams are involved in new
                product development, product improvement, process optimization
                and application-oriented technical solutions.
              </p>
              <p>
                The adoption of modern equipment and analytical technologies
                helps us maintain high standards of product consistency,
                reliability and performance.
              </p>
              <p>
                Quality is controlled through well-defined quality parameters
                and systematic procedures at every stage, from raw material
                selection and manufacturing through testing and final product
                dispatch. This disciplined approach enables us to deliver
                consistent and dependable products to our customers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalFoundation;
