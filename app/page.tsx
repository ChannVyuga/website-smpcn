"use client";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  GraduationCap,
  CheckCircle,
  ArrowRight,
  Star,
  Monitor,
  Code2,
  BookOpen,
  Rocket,
  MessageCircle,
} from "lucide-react";

const PROGRAM_UNGGULAN = [
  {
    icon: Code2,
    kode: "WEB PROGRAMMING",
    nama: "Web Programming",
    desc: "Pembelajaran pengembangan website dari dasar hingga proyek nyata, membekali siswa dengan skill coding yang relevan dengan industri.",
    href: "/program_unggulan/WP",
  },
  {
    icon: BookOpen,
    kode: "HOLAQOH AL-QUR'AN",
    nama: "Holaqoh Al-Qur'an",
    desc: "Pembinaan akhlak dan spiritual melalui kajian serta hafalan Al-Qur'an secara rutin sebagai pondasi karakter siswa.",
    href: "/program_unggulan/HQ",
  },
  {
    icon: Rocket,
    kode: "ENTREPRENEURSHIP",
    nama: "Entrepreneurship",
    desc: "Melatih jiwa wirausaha siswa melalui praktik langsung, mulai dari ide bisnis, produksi, hingga strategi pemasaran.",
    href: "/program_unggulan/EPS",
  },
  {
    icon: MessageCircle,
    kode: "CONVERSATION",
    nama: "Conversation",
    desc: "Penguatan kemampuan berbicara bahasa asing (Inggris/Arab) agar siswa lebih percaya diri berkomunikasi secara global.",
    href: "/program_unggulan/CVS",
  },
];

const STATS = [
  { value: "1.200+", label: "Siswa Aktif" },
  { value: "98%", label: "Tingkat Kelulusan" },
  { value: "15+", label: "Tahun Berdiri" },
];

const CSS = `
  .home-hero-section {
    padding: 100px 24px 120px;
  }
  .home-hero-grid {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
  }
  .home-hero-title {
    font-size: 56px;
    line-height: 1.15;
    margin-bottom: 24px;
    font-weight: 700;
  }
  .home-hero-stats {
    display: flex;
    gap: 32px;
    margin-top: 48px;
    flex-wrap: wrap;
  }
  .home-timeline-wrap {
    display: flex;
    justify-content: center;
  }
  .home-timeline-card {
    width: 100%;
    max-width: 380px;
    padding: 36px;
  }

  .home-program-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 20px;
  }

  .home-fasilitas-grid {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
  }
  .home-fasilitas-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .home-section-heading {
    font-size: 38px;
  }

  .home-cta-heading {
    font-size: 40px;
  }

  @media (max-width: 900px) {
    .home-hero-section { padding: 72px 20px 64px; }
    .home-hero-grid {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    .home-hero-title { font-size: 38px; }
    .home-timeline-wrap { order: -1; }
    .home-timeline-card { max-width: 100%; padding: 28px; }
    .home-fasilitas-grid {
      grid-template-columns: 1fr;
      gap: 32px;
    }
    .home-section-heading { font-size: 30px; }
    .home-cta-heading { font-size: 30px; }
  }

  @media (max-width: 640px) {
    .home-hero-section { padding: 56px 16px 48px; }
    .home-hero-title { font-size: 30px; }
    .home-hero-stats { gap: 20px; }
    .home-fasilitas-stats { grid-template-columns: 1fr 1fr; gap: 12px; }
    .home-program-grid { grid-template-columns: 1fr 1fr; gap: 14px; }
  }

  @media (max-width: 420px) {
    .home-program-grid { grid-template-columns: 1fr; }
    .home-fasilitas-stats { grid-template-columns: 1fr; }
  }
`;

export default function HomePage() {
  return (
    <>
      <style>{CSS}</style>
      <Navbar />
      <main>
        {/* HERO */}
        <section className="hero-gradient home-hero-section">
          <div className="home-hero-grid">
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(200,151,58,0.15)",
                  border: "1px solid rgba(200,151,58,0.3)",
                  borderRadius: 20,
                  padding: "6px 16px",
                  color: "#E8B84B",
                  fontSize: 12,
                  fontWeight: 600,
                  marginBottom: 24,
                }}
              >
                <Star size={12} fill="#E8B84B" /> PENERIMAAN PESERTA DIDIK BARU
              </div>
              <h1
                className="font-display home-hero-title"
                style={{ color: "white" }}
              >
                Raih Masa Depan{" "}
                <span style={{ color: "#E8B84B" }}>Cerah Bersama</span> SMP
                Citra Negara
              </h1>
              <p
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: 17,
                  lineHeight: 1.7,
                  marginBottom: 36,
                  maxWidth: 480,
                }}
              >
                Bergabunglah dengan ribuan alumni sukses. Pendidikan kejuruan
                berkualitas tinggi dengan kurikulum industri terkini.
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <Link
                  href="/spmb"
                  className="btn-primary"
                  style={{ fontSize: 15 }}
                >
                  Daftar SPMB Sekarang →
                </Link>
                <Link
                  href="/tentang"
                  className="btn-outline"
                  style={{ fontSize: 15 }}
                >
                  Pelajari Lebih Lanjut
                </Link>
              </div>
              <div className="home-hero-stats">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <div
                      className="font-display"
                      style={{
                        color: "#E8B84B",
                        fontSize: 28,
                        fontWeight: 700,
                      }}
                    >
                      {s.value}
                    </div>
                    <div
                      style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline Card */}
            <div className="home-timeline-wrap">
              <div
                className="home-timeline-card"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(200,151,58,0.3)",
                  borderRadius: 20,
                }}
              >
                <h3
                  className="font-display"
                  style={{ color: "white", fontSize: 22, marginBottom: 6 }}
                >
                  Jadwal SPMB
                </h3>
                <p
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: 13,
                    marginBottom: 24,
                  }}
                >
                </p>
                {[
                  {
                    fase: "Pembukaan Pendaftaran",
                    aktif: true,
                  },
                  {
                    fase: "Verifikasi Berkas",
                    aktif: false,
                  },
                  {
                    fase: "Seleksi & Pengumuman",
                    aktif: false,
                  },
                  {
                    fase: "Daftar Ulang",
                    aktif: false,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 14,
                      padding: "12px 0",
                      borderBottom:
                        i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none",
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: item.aktif
                          ? "linear-gradient(135deg,#C8973A,#E8B84B)"
                          : "rgba(255,255,255,0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        fontSize: 13,
                        fontWeight: 700,
                        color: item.aktif ? "#0A1628" : "rgba(255,255,255,0.3)",
                      }}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <div
                        style={{
                          color: item.aktif ? "white" : "rgba(255,255,255,0.5)",
                          fontSize: 13,
                          fontWeight: 600,
                        }}
                      >
                        {item.fase}
                      </div>
                      <div
                        style={{
                          color: item.aktif
                            ? "#E8B84B"
                            : "rgba(255,255,255,0.3)",
                          fontSize: 12,
                          marginTop: 2,
                        }}
                      >
                      </div>
                    </div>
                  </div>
                ))}
                <Link
                  href="/register"
                  className="btn-primary"
                  style={{
                    display: "block",
                    textAlign: "center",
                    marginTop: 24,
                    fontSize: 14,
                  }}
                >
                  Mulai Pendaftaran
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Program Unggulan */}
        <section style={{ padding: "80px 24px", background: "white" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div className="gold-line" style={{ margin: "0 auto 16px" }} />
              <h2
                className="font-display home-section-heading"
                style={{ color: "#0A1628", marginBottom: 12 }}
              >
                Program Unggulan
              </h2>
              <p
                style={{
                  color: "#6B7280",
                  maxWidth: 500,
                  margin: "0 auto",
                  fontSize: 16,
                }}
              >
                Pilih program sesuai dengan minat dan bakat.
              </p>
            </div>
            <div className="home-program-grid">
              {PROGRAM_UNGGULAN.map((j) => (
                <Link
                  key={j.kode}
                  href={j.href}
                  style={{
                    background: "white",
                    border: "1.5px solid #F0EBE0",
                    borderRadius: 14,
                    padding: 24,
                    transition: "all 0.2s",
                    cursor: "pointer",
                    textDecoration: "none",
                    display: "block",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "#C8973A";
                    el.style.transform = "translateY(-4px)";
                    el.style.boxShadow = "0 8px 30px rgba(200,151,58,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "#F0EBE0";
                    el.style.transform = "none";
                    el.style.boxShadow = "none";
                  }}
                  >

                  <div
                    style={{
                      marginBottom: 16,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <div
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: "50%",
                        background: "rgba(200,151,58,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <j.icon size={30} color="#C8973A" />
                    </div>
                    <div
                      style={{
                        background: "#C8973A",
                        color: "white",
                        fontSize: 10,
                        fontWeight: 700,
                        padding: "2px 8px",
                        borderRadius: 4,
                      }}
                    >
                      {j.kode}
                    </div>
                  </div>
                  <h3
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#0A1628",
                      marginBottom: 8,
                      lineHeight: 1.3,
                      textAlign: "center",
                    }}
                  >
                    {j.nama}
                  </h3>
                  <p
                    style={{
                      fontSize: 12,
                      color: "#6B7280",
                      lineHeight: 1.5,
                      textAlign: "center",
                    }}
                  >
                    {j.desc}
                  </p>
                  </Link>
              ))}
              </div>
                </div>
        </section>

        {/* FASILITAS */}
        <section style={{ padding: "80px 24px", background: "#FAF7F0" }}>
          <div className="home-fasilitas-grid">
            <div>
              <div className="gold-line" style={{ marginBottom: 16 }} />
              <h2
                className="font-display home-section-heading"
                style={{ color: "#0A1628", marginBottom: 16 }}
              >
                Fasilitas Sekolah
              </h2>
              <p
                style={{
                  color: "#6B7280",
                  lineHeight: 1.8,
                  marginBottom: 32,
                  fontSize: 16,
                }}
              >
                Lingkungan belajar terbaik dengan fasilitas modern yang
                mendukung proses pembelajaran berkualitas tinggi.
              </p>
              {[
                "Tersedia Lab Untuk Siswa/i SMP Citra Negara",
                "Tersedia WiFi Untuk Siswa/i di Setiap Gedung & Lantai",
                "Ruang Perpustakaan",
                "Auditorium",
                "Kantin",
                "2 Lapangan (Gedung A & Gedung E)",   
              ].map((f, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 12,
                  }}
                >
                  <CheckCircle
                    size={18}
                    color="#C8973A"
                    style={{ flexShrink: 0 }}
                  />
                  <span style={{ fontSize: 14, color: "#374151" }}>{f}</span>
                </div>
              ))}
            </div>
            <div className="home-fasilitas-stats">
              {[
                {
                  label: "2 Lab Komputer",
                  val: "80+",
                  sub: "Unit Komputer",
                  bg: "#17713b",
                },
                {
                  label: "Internet",
                  val: "1 Gbps",
                  sub: "Starlink",
                  bg: "#cf962b",
                },
                {
                  label: "Akreditasi",
                  val: "A",
                  sub: "BAN-S/M",
                  bg: "#0f4c35",
                },
                {
                  label: "Alumni",
                  val: "5000+",
                  sub: "Tersebar Nasional",
                  bg: "#093b1e",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: item.bg,
                    borderRadius: 16,
                    padding: 28,
                    color: "white",
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      color: "rgba(255,255,255,0.6)",
                      marginBottom: 8,
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    className="font-display"
                    style={{
                      fontSize: 36,
                      fontWeight: 700,
                      color: item.bg === "#C8973A" ? "#0A1628" : "#E8B84B",
                    }}
                  >
                    {item.val}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color:
                        item.bg === "#C8973A"
                          ? "rgba(10,22,40,0.6)"
                          : "rgba(255,255,255,0.5)",
                      marginTop: 4,
                    }}
                  >
                    {item.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: "80px 24px", background: "#15803d" }}>
          <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
            <h2
              className="font-display home-cta-heading"
              style={{ color: "white", marginBottom: 16 }}
            >
              Siap Bergabung?
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: 16,
                lineHeight: 1.7,
                marginBottom: 36,
              }}
            >
              Pendaftaran Peserta Didik Baru sudah
              dibuka. Jangan lewatkan kesempatan ini!
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
                href="/register"
                className="btn-primary"
                style={{ fontSize: 16 }}
              >
                Daftar Sekarang
              </Link>
              <Link
                href="/spmb"
                className="btn-outline"
                style={{ fontSize: 16 }}
              >
                Info SPMB
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
