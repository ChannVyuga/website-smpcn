import type { Metadata } from "next";

import "./globals.css";
import ScrollToTop from "./ScrollToTop";

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
    <html lang="id">
      <body>
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}