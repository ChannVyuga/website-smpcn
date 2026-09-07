"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Kasih sedikit waktu supaya halaman baru selesai render
    const timer = window.setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 30);

    return () => {
      window.clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}