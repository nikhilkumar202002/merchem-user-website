import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import Header from "./component/layout/Header";
import Footer from "./component/layout/Footer";
import Preloader from "./component/common/Preloader";
import ScrollTop from "./component/common/ScrollTop";
import LenisScroll from "./component/common/LenisScroll";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Merchem India | Rubber Chemicals & Specialty Chemicals",
  description: "Merchem India provides specialty chemical solutions for rubber, latex, tyres, paints and industrial applications, including accelerators, antidegradants and processing aids.",
  icons: {
    icon: "/Main_logo.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LenisScroll />
        <Preloader />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollTop />
      </body>
    </html>
  );
}
