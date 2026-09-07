"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import {
  CheckCircle,
  Users,
  Clock,
  Award,
  Moon,
  Palette,
  Flag,
} from "lucide-react";
import { useEffect } from "react";

const ORGANISASI = [
  {
    id: "rohis",
    icon: Moon,
    kode: "ROHIS",
    nama: "Rohis",
    deskripsi:
      "Apa itu Rohis? Rohis itu singkatan dari Kerohanian Islam, semacam 'geng seru' buat belajar agama sambil having fun. Bukan cuma ngaji doang, tapi juga bikin acara, diskusi, sampai baksos bareng-bareng!",
    materi: [
      "Kajian Islam Rutin",
      "Peringatan Hari Besar Islam (PHBI)",
      "Pelatihan Dakwah dan Public Speaking",
      "Bakti Sosial dan Kepedulian Umat",
      "Mentoring Keagamaan",
      "Pengelolaan Kegiatan Ramadhan",
    ],
    manfaat: [
      "Wawasan Keislaman Bertambah",
      "Jiwa Sosial dan Kepedulian Terasah",
      "Kemampuan Berorganisasi",
      "Relasi Pertemanan yang Positif",
    ],
    colorFrom: "#0b3d2e",
    colorTo: "#1f7a4d",
  },
  {
    id: "tim-kreatif",
    icon: Palette,
    kode: "TIM KREATIF",
    nama: "Tim Kreatif",
    deskripsi:
      "Apa itu Tim Kreatif? Ini tempat buat kamu yang suka desain, foto, video, atau bikin konten kece. Tim Kreatif yang bikin sekolah keliatan estetik di media sosial, dari poster acara sampai video dokumentasi!",
    materi: [
      "Desain Grafis Dasar (Canva/Photoshop)",
      "Fotografi dan Videografi",
      "Editing Video dan Konten Media Sosial",
      "Manajemen Konten Instagram/TikTok Sekolah",
      "Branding dan Publikasi Acara",
      "Kolaborasi Proyek Kreatif",
    ],
    manfaat: [
      "Portofolio Karya Kreatif",
      "Skill Desain dan Editing",
      "Pengalaman Kerja Tim Produksi",
      "Peluang Jadi Content Creator",
    ],
    colorFrom: "#6b21a8",
    colorTo: "#c026d3",
  },
  {
    id: "osis",
    icon: Flag,
    kode: "OSIS",
    nama: "OSIS",
    deskripsi:
      "Apa itu OSIS? OSIS itu Organisasi Siswa Intra Sekolah, alias 'pemerintahan kecil' di sekolah. Di sini kamu belajar mimpin acara, bikin program kerja, sampai jadi jembatan aspirasi antara siswa dan sekolah.",
    materi: [
      "Kepemimpinan dan Manajemen Organisasi",
      "Perencanaan Program Kerja",
      "Pelaksanaan Acara dan Event Sekolah",
      "Rapat dan Pengambilan Keputusan",
      "Advokasi dan Aspirasi Siswa",
      "Kerja Sama Lintas Ekstrakurikuler",
    ],
    manfaat: [
      "Jiwa Kepemimpinan Terasah",
      "Pengalaman Organisasi Nyata",
      "Kemampuan Public Speaking",
      "Jaringan Relasi yang Luas",
    ],
    colorFrom: "#1E3A5F",
    colorTo: "#3a96d0",
  },
];

// Offset scroll agar tidak tertutup sticky navbar (tinggi navbar ~70px + sedikit jarak)
const SCROLL_OFFSET = 86;

function ScrollToHash() {
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const timer = setTimeout(() => {
      const el = document.getElementById(hash);
      if (el) {
        const top =
          el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  return null;
}

export default function OrganisasiPage() {
  return (
    <>
      <Navbar />
      <ScrollToHash />
      <main>
        {/* Hero */}
        <section className="hero-gradient org-hero-section">
          <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
            <div className="gold-line" style={{ margin: "0 auto 20px" }} />
            <h1 className="font-display org-hero-title" style={{ color: "white" }}>
              Organisasi
            </h1>
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: 17,
                lineHeight: 1.7,
                maxWidth: 560,
                margin: "0 auto",
              }}
            >
              3 organisasi siswa yang jadi wadah pengembangan diri, mulai dari
              spiritual, kreativitas, sampai kepemimpinan.
            </p>
          </div>
        </section>

        {/* Total info */}
        <section
          style={{
            background: "#023d17",
            padding: "28px 24px",
            borderBottom: "2px solid #C8973A",
          }}
        >
          <div className="org-stats-row">
            {[
              { icon: Award, label: "Organisasi Siswa", val: "3 Organisasi" },
              { icon: Users, label: "Diikuti Oleh", val: "Siswa Terpilih" },
              { icon: Clock, label: "Pelaksanaan", val: "Rutin Mingguan" },
              { icon: CheckCircle, label: "Fokus", val: "Karakter & Kepemimpinan" },
            ].map((item) => (
              <div
                key={item.label}
                style={{ display: "flex", alignItems: "center", gap: 12 }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    background: "rgba(200,151,58,0.15)",
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <item.icon size={18} color="#C8973A" />
                </div>
                <div>
                  <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>
                    {item.label}
                  </div>
                  <div
                    style={{ color: "white", fontWeight: 700, fontSize: 15 }}
                  >
                    {item.val}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Organisasi Cards */}
        <section className="org-cards-section" style={{ background: "#FAF7F0" }}>
          <div
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              gap: 32,
            }}
          >
            {ORGANISASI.map((j) => (
              <div
                key={j.kode}
                id={j.id}
                className="org-card"
                style={{
                  scrollMarginTop: SCROLL_OFFSET,
                  background: "white",
                  borderRadius: 20,
                  overflow: "hidden",
                  border: "1px solid #F0EBE0",
                  boxShadow: "0 2px 20px rgba(10,22,40,0.06)",
                }}
              >
                {/* Left panel */}
                <div
                  className="gradient-animated org-card-left"
                  style={{
                    background: `linear-gradient(130deg, ${j.colorFrom}, ${j.colorTo}, ${j.colorFrom})`,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div
                      style={{
                        width: 80,
                        height: 80,
                        background: "rgba(255,255,255,0.15)",
                        borderRadius: 18,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 20,
                        border: "1.5px solid rgba(255,255,255,0.2)",
                      }}
                    >
                      <j.icon size={36} color="white" />
                    </div>

                    <div
                      style={{
                        background: "black",
                        color: "#ffff",
                        fontSize: 11,
                        fontWeight: 800,
                        padding: "4px 12px",
                        borderRadius: 6,
                        display: "inline-block",
                        marginBottom: 12,
                      }}
                    >
                      {j.kode}
                    </div>

                    <h3
                      className="font-display"
                      style={{
                        fontSize: 24,
                        color: "white",
                        lineHeight: 1.3,
                        marginBottom: 14,
                      }}
                    >
                      {j.nama}
                    </h3>
                    <p
                      style={{
                        fontSize: 13,
                        color: "rgba(255,255,255,0.85)",
                        lineHeight: 1.7,
                      }}
                    >
                      {j.deskripsi}
                    </p>
                  </div>

                  <div style={{ marginTop: 28 }}>
                    <Link
                      href="/register"
                      style={{
                        display: "block",
                        textAlign: "center",
                        background: "linear-gradient(135deg, #232526 0%, #0f0f0f 100%)",
                        color: "white",
                        fontWeight: 700,
                        padding: "11px",
                        borderRadius: 10,
                        textDecoration: "none",
                        fontSize: 14,
                      }}
                    >
                      Daftar Sekarang →
                    </Link>
                  </div>
                </div>

                {/* Right panel */}
                <div className="org-card-right">
                  <div className="org-card-grid">
                    <div>
                      <h4
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: "#C8973A",
                          letterSpacing: 0.8,
                          marginBottom: 16,
                        }}
                      >
                        KEGIATAN YANG DIJALANI
                      </h4>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 10,
                        }}
                      >
                        {j.materi.map((k, i) => (
                          <div
                            key={i}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 10,
                            }}
                          >
                            <CheckCircle
                              size={16}
                              color="#C8973A"
                              style={{ flexShrink: 0, marginTop: 1 }}
                            />
                            <span
                              style={{
                                fontSize: 13,
                                color: "#374151",
                                lineHeight: 1.4,
                              }}
                            >
                              {k}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: "#C8973A",
                          letterSpacing: 0.8,
                          marginBottom: 16,
                        }}
                      >
                        MANFAAT BAGI SISWA
                      </h4>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 8,
                        }}
                      >
                        {j.manfaat.map((p, i) => (
                          <div
                            key={i}
                            style={{
                              background: "#FAF7F0",
                              borderRadius: 8,
                              padding: "9px 14px",
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                            }}
                          >
                            <div
                              style={{
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                background: j.colorFrom,
                                flexShrink: 0,
                              }}
                            />
                            <span
                              style={{
                                fontSize: 13,
                                color: "#374151",
                                fontWeight: 500,
                              }}
                            >
                              {p}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section
          className="org-cta-section"
          style={{
            background: "#023d17",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <h2
              className="font-display org-cta-title"
              style={{ color: "white", marginBottom: 16 }}
            >
              Tertarik Bergabung?
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: 16,
                lineHeight: 1.7,
                marginBottom: 32,
              }}
            >
              Daftar sekarang dan rasakan pengalaman berorganisasi bersama SMP
              Citra Negara.
            </p>
            <div
              style={{
                display: "flex",
                gap: 16,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link
                href="/#" /*direct ke WA pembina/ketua organisasi*/
                className="btn-primary"
                style={{ fontSize: 16 }}
              >
                Daftar SPMB Sekarang
              </Link>
              <Link
                href="/spmb"
                className="btn-outline"
                style={{ fontSize: 16 }}
              >
                Info Lebih Lanjut
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <style jsx global>{`
        .gradient-animated {
          background-size: 300% 300% !important;
          animation: gradientMove 6s ease infinite;
        }
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        /* ── Responsive layout ── */
        .org-hero-section {
          padding: 80px 24px;
        }
        .org-hero-title {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .org-stats-row {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          gap: 40px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .org-cards-section {
          padding: 70px 24px;
        }

        .org-card {
          display: grid;
          grid-template-columns: 300px 1fr;
        }
        .org-card-left {
          padding: 36px;
        }
        .org-card-right {
          padding: 36px;
        }
        .org-card-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }

        .org-cta-section {
          padding: 70px 24px;
        }
        .org-cta-title {
          font-size: 38px;
        }

        @media (max-width: 768px) {
          .org-card {
            grid-template-columns: 1fr;
          }
          .org-card-left,
          .org-card-right {
            padding: 28px;
          }
        }

        @media (max-width: 640px) {
          .org-hero-section {
            padding: 56px 20px;
          }
          .org-hero-title {
            font-size: 32px;
          }
          .org-stats-row {
            gap: 20px 28px;
            justify-content: flex-start;
          }
          .org-cards-section {
            padding: 48px 16px;
          }
          .org-card-left,
          .org-card-right {
            padding: 22px;
          }
          .org-card-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .org-cta-section {
            padding: 48px 20px;
          }
          .org-cta-title {
            font-size: 28px;
          }
        }
      `}</style>
    </>
  );
}