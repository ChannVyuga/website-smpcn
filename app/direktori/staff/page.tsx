"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

type Staff = {
  id: number;
  name: string;
  label: string;
  photo: string;
};

export default function StaffPage() {

    const [staffList, setStaffList] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchStaff() {
      try {
        const response = await fetch("/api/staff");

        if (!response.ok) {
          throw new Error("Gagal memuat data staff.");
        }

        const data: Staff[] = await response.json();
        setStaffList(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Terjadi kesalahan."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchStaff();
  }, []);

  // Scroll reveal untuk card, dijalankan ulang setelah data staff dimuat
  const gridRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const els = gridRef.current?.querySelectorAll<HTMLElement>(".st-card");
    if (!els || els.length === 0) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [staffList]);

  return (
    <>
      <Navbar />

      <main>
        {/* Hero */}
        <section className="hero-gradient st-hero">
          <div className="st-container st-hero-content">
            <h1 className="font-display st-hero-title">Staff</h1>

            <p className="st-hero-desc">
              Mengenal jajaran staff SMP Citra Negara yang mendukung kelancaran
              operasional dan administrasi sekolah setiap harinya.
            </p>
          </div>
        </section>

        {/* Staff */}
        <section className="st-section">
          <div className="st-container">
            <div className="st-heading">
              <div className="gold-line" />

              <h2 className="font-display st-section-title"></h2>

              <p className="st-subtitle">SMP CITRA NEGARA</p>
            </div>


            <div className="st-grid" ref={gridRef}>
              {loading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="st-skeleton" aria-hidden="true" />
                ))
              ) : error ? (
                <p>{error}</p>
              ) : staffList.length === 0 ? (
                <p>Belum ada data staff.</p>
              ) : (
                staffList.map((staff, index) => (
                  <article
                    key={staff.id}
                    className="st-card"
                    style={{ "--d": `${(index % 5) * 90}ms` } as CSSProperties}
                  >
                    <div className="st-photo-frame">
                      <Image
                        loading={index === 0 ? "eager" : "lazy"}
                        src={staff.photo}
                        alt={`Foto ${staff.name}`}
                        fill
                        className="st-photo-img"
                        sizes="(max-width: 600px) 44vw, (max-width: 800px) 30vw, (max-width: 1050px) 23vw, 220px"
                        quality={75}
                        style={{ objectFit: "cover" }}
                      />
                    </div>

                    <div className="st-info">
                      <p className="st-name">{staff.name}</p>
                      <p className="st-label">
                        <span className="st-dot" />
                        {staff.label}
                      </p>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx global>{`
        .st-container {
          width: min(1200px, calc(100% - 32px));
          margin-inline: auto;
        }

        /* HERO */
        .st-hero {
          padding: 72px 0;
        }

        .st-hero-content {
          max-width: 800px;
          text-align: center;
        }

        .st-hero-title {
          margin: 0 0 14px;
          color: white;
          font-size: clamp(30px, 5vw, 48px);
          line-height: 1.15;
        }

        .st-hero-desc {
          max-width: 580px;
          margin: 0 auto;
          color: rgba(255, 255, 255, 0.72);
          font-size: 16px;
          line-height: 1.7;
        }

        /* SECTION */
        .st-section {
          padding: 72px 0;
          background: #fff;
        }

        .st-heading {
          margin-bottom: 48px;
          text-align: center;
        }

        .st-heading .gold-line {
          margin: 0 auto 14px;
        }

        .st-section-title {
          margin: 0;
          color: #0a1628;
          font-size: clamp(28px, 4vw, 38px);
          line-height: 1.2;
        }

        .st-subtitle {
          margin: 7px 0 0;
          color: #c8973a;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        /* GRID (default: desktop, 5 kolom) */
        .st-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 28px 20px;
        }

        /* CARD */
        .st-card {
          min-width: 0;
          background: #fff;
          border: 1px solid #efe9dc;
          border-radius: 20px;
          padding: 7px;
          box-shadow: 0 1px 2px rgba(10, 22, 40, 0.04);
          opacity: 0;
          transition:
            transform 0.45s cubic-bezier(0.2, 0.7, 0.2, 1),
            box-shadow 0.45s ease,
            border-color 0.45s ease;
        }

        .st-card.is-visible {
          opacity: 1;
          animation: st-in 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) var(--d, 0ms) backwards;
        }

        @keyframes st-in {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
        }

        /* Trik menengahkan 3 kartu terakhir (baris ke-2 dari 8 item)
           HANYA berlaku saat grid punya 5 kolom (desktop) */
        .st-card:nth-child(6) {
          grid-column: 2;
        }

        .st-card:nth-child(7) {
          grid-column: 3;
        }

        .st-card:nth-child(8) {
          grid-column: 4;
        }

        .st-photo-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          border-radius: 14px;
          background: #f5f1e8;
        }

        .st-photo-img {
          transition: transform 0.9s cubic-bezier(0.2, 0.7, 0.2, 1);
        }

        .st-info {
          padding: 12px 6px 7px;
          text-align: center;
        }

        .st-name {
          margin: 0;
          color: #0a1628;
          font-size: 14px;
          font-weight: 700;
          line-height: 1.35;
        }

        .st-label {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin: 4px 0 0;
          color: #8c7b5a;
          font-size: 11.5px;
          font-weight: 500;
          line-height: 1.3;
        }

        .st-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #c8973a;
          flex-shrink: 0;
          transition: transform 0.45s ease;
        }

        /* Hover hanya untuk perangkat dengan mouse */
        @media (hover: hover) {
          .st-card:hover {
            transform: translateY(-6px);
            border-color: rgba(200, 151, 58, 0.35);
            box-shadow: 0 18px 40px -12px rgba(10, 22, 40, 0.18);
          }

          .st-card:hover .st-photo-img {
            transform: scale(1.05);
          }

          .st-card:hover .st-dot {
            transform: scale(1.6);
          }
        }

        /* Umpan balik saat card disentuh di layar sentuh */
        @media (hover: none) {
          .st-card:active {
            transform: scale(0.98);
          }
        }

        /* Skeleton saat data dimuat */
        .st-skeleton {
          aspect-ratio: 4 / 5.9;
          border-radius: 20px;
          background: linear-gradient(100deg, #f3eee3 30%, #fbf8f1 50%, #f3eee3 70%);
          background-size: 200% 100%;
          animation: st-shimmer 1.3s linear infinite;
        }

        @keyframes st-shimmer {
          from {
            background-position: 150% 0;
          }
          to {
            background-position: -50% 0;
          }
        }

        /* TABLET: 4 kolom — reset trik centering 5-kolom */
        @media (max-width: 1050px) {
          .st-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }

          .st-card:nth-child(6),
          .st-card:nth-child(7),
          .st-card:nth-child(8) {
            grid-column: auto;
          }
        }

        /* TABLET KECIL: 3 kolom */
        @media (max-width: 800px) {
          .st-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 24px 16px;
          }
        }

        /* MOBILE: 2 kolom */
        @media (max-width: 600px) {
          .st-container {
            width: min(100% - 28px, 520px);
          }

          .st-hero {
            padding: 52px 0;
          }

          .st-hero-desc {
            font-size: 14px;
            line-height: 1.6;
          }

          .st-section {
            padding: 48px 0;
          }

          .st-heading {
            margin-bottom: 36px;
          }

          .st-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 22px 14px;
          }

          .st-card {
            padding: 6px;
            border-radius: 18px;
          }

          .st-photo-frame {
            border-radius: 13px;
          }

          .st-info {
            padding: 10px 4px 6px;
          }

          .st-name {
            font-size: 13px;
          }

          .st-label {
            font-size: 11px;
          }
        }

        /* MOBILE SANGAT KECIL */
        @media (max-width: 380px) {
          .st-container {
            width: calc(100% - 24px);
          }

          .st-grid {
            gap: 18px 10px;
          }

          .st-name {
            font-size: 12px;
          }

          .st-label {
            font-size: 10px;
          }
        }

        /* DEVICE DENGAN REDUCED MOTION */
        @media (prefers-reduced-motion: reduce) {
          .st-card,
          .st-card.is-visible {
            opacity: 1;
            animation: none;
            transition: none;
          }

          .st-photo-img {
            transition: none;
          }

          .st-skeleton {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}