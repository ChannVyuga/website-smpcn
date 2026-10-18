import type { Metadata } from "next";
import {
  Barlow,
  Barlow_Condensed,
  Bebas_Neue,
  Playfair_Display,
  Plus_Jakarta_Sans,
} from "next/font/google";

import "./globals.css";
import ScrollToTop from "./ScrollToTop";

// Font di-host sendiri oleh Next (tanpa request ke Google saat halaman dibuka)
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

// Font khusus halaman eskul: tidak di-preload, file font baru diunduh saat dipakai
const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  preload: false,
});
const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
  preload: false,
});
const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-barlow-condensed",
  preload: false,
});

export const metadata: Metadata = {
  title: "SMP Citra Negara - Sekolah Menengah Kejuruan Unggulan",
  description:
    "SMP Citra Negara - Mencetak generasi profesional dan berkarakter.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      className={[
        jakarta.variable,
        playfair.variable,
        bebas.variable,
        barlow.variable,
        barlowCondensed.variable,
      ].join(" ")}
    >
      <body>
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
