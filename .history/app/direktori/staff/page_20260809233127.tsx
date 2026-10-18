"use client";

import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const STAFF = [
  {
    name: "Hanifah Fauziah",
    label: "Assisten Tata Usaha",
    photo: "/images/staff1.jpeg",
  },
  {
    name: "Ade Susanti, S.Pdi",
    label: "Pembina Rohis",
    photo: "/images/staff2.jpeg",
  },
  {
    name: "Neneng Rosiana, S.Pd",
    label: "Bendahara",
    photo: "/images/staff3.jpeg",
  },
  {
    name: "Sukaryani, A.Md",
    label: "Tata Usaha",
    photo: "/images/staff5.jpeg",
  },
  {
    name: "Iin Inayah",
    label: "Waka Kurikulum",
    photo: "/images/staff4.jpeg",
  },
  {
    name: "Lanna Suryani, S.Pd",
    label: "Bimbingan Konseling",
    photo: "/images/staff6.jpeg",
  },
  {
    name: "Irma Anggraeni, M.Pd",
    label: "Waka Humas",
    photo: "/images/staff7.jpeg",
  },
  {
    name: "Decky Ryansyah, M.Kom",
    label: "Kepala IT",
    photo: "/images/staff8.jpeg",
  },
];

export default function StaffPage() {
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

            <div className="st-grid">
              {STAFF.map((staff) => (
                <article key={staff.name} className="st-card">
                  <div className="st-photo-frame">
                    <Image
                      src={staff.photo}
                      alt={`Foto ${staff.name}`}
                      fill
                      sizes="
                        (max-width: 600px) 44vw,
                        (max-width: 800px) 30vw,
                        (max-width: 1050px) 23vw,
                        220px
                      "
                      quality={75}
                      style={{ objectFit: "cover" }}
                    />

                    <div className="st-overlay" />

                    <div className="st-info">
                      <p className="st-name">{staff.name}</p>
                      <p className="st-label">{staff.label}</p>
                    </div>
                  </div>

                  <div className="st-accent" />
                </article>
              ))}
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
          position: relative;
          min-width: 0;
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
          z-index: 1;
          width: 100%;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          border: 3px solid #fff;
          border-radius: 14px;
          background: #eee;
          box-shadow: 0 5px 18px rgba(10, 22, 40, 0.1);
        }

        .st-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(10, 22, 40, 0.82),
            rgba(10, 22, 40, 0.18) 45%,
            transparent 70%
          );
          pointer-events: none;
        }

        .st-info {
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          padding: 14px 12px;
        }

        .st-name {
          margin: 0;
          color: #fff;
          font-size: 13px;
          font-weight: 800;
          line-height: 1.3;
        }

        .st-label {
          margin: 3px 0 0;
          color: #e8b84b;
          font-size: 10px;
          font-weight: 600;
          line-height: 1.3;
        }

        .st-accent {
          position: absolute;
          right: -7px;
          bottom: -7px;
          z-index: 0;
          width: 100%;
          height: 100%;
          border-radius: 14px;
          background: linear-gradient(135deg, #c8973a, #e8b84b);
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

          .st-photo-frame {
            border-radius: 12px;
          }

          .st-accent {
            right: -5px;
            bottom: -5px;
            border-radius: 12px;
          }

          .st-info {
            padding: 11px 9px;
          }

          .st-name {
            font-size: 11px;
          }

          .st-label {
            font-size: 9px;
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
            font-size: 10px;
          }

          .st-label {
            font-size: 8px;
          }
        }

        /* DEVICE DENGAN REDUCED MOTION */
        @media (prefers-reduced-motion: reduce) {
          .st-card,
          .st-photo-frame {
            transition: none;
          }
        }
      `}</style>
    </>
  );
}