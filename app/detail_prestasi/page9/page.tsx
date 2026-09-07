"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useEffect, useState } from "react";

const CSS = `
  .detail-hero-title {
    font-size: 32px;
  }
  .detail-foto-wrap {
    width: 100%;
    max-width: 320px;
  }
  .detail-article {
    padding: 24px;
  }

  @media (min-width: 640px) {
    .detail-hero-title { font-size: 40px; }
    .detail-foto-wrap { max-width: 360px; }
    .detail-article { padding: 32px; }
  }

  @media (min-width: 900px) {
    .detail-hero-title { font-size: 48px; }
    .detail-foto-wrap { max-width: 400px; }
    .detail-article { padding: 40px; }
  }

  @keyframes confetti-fall {
    0% {
      transform: translate(0, -10vh) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translate(var(--drift), 110vh) rotate(720deg);
      opacity: 0.9;
    }
  }
`;

const CONFETTI_COLORS = [
  "#22c55e",
  "#15803d",
  "#facc15",
  "#f97316",
  "#ef4444",
  "#3b82f6",
  "#a855f7",
  "#ffffff",
];

type ConfettiPiece = {
  id: number;
  left: string;
  color: string;
  width: number;
  height: number;
  delay: number;
  duration: number;
  drift: number;
};

function generateConfetti(count: number): ConfettiPiece[] {
  const pieces: ConfettiPiece[] = [];
  for (let i = 0; i < count; i++) {
    const fromLeft = i % 2 === 0;
    pieces.push({
      id: i,
      // separo nembak dari pinggir kiri, separo dari pinggir kanan
      left: fromLeft ? `${Math.random() * 15}%` : `${85 + Math.random() * 15}%`,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      width: 6 + Math.random() * 6,
      height: 10 + Math.random() * 8,
      delay: Math.random() * 0.8,
      duration: 2.8 + Math.random() * 2,
      // drift ke arah tengah biar keliatan "meletus" dari kanan-kiri
      drift: fromLeft ? 60 + Math.random() * 160 : -(60 + Math.random() * 160),
    });
  }
  return pieces;
}

function Confetti({ active }: { active: boolean }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    setPieces(generateConfetti(100));
  }, []);

  if (!active || pieces.length === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      {pieces.map((p) => (
        <span
          key={p.id}
          style={
            {
              position: "absolute",
              top: 0,
              left: p.left,
              width: p.width,
              height: p.height,
              background: p.color,
              borderRadius: 2,
              opacity: 0,
              "--drift": `${p.drift}px`,
              animation: `confetti-fall ${p.duration}s ease-in ${p.delay}s forwards`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

export default function PrestasiDetailPage() {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);
  const judul =
    "SISWI SMP CITRA Negara meraih juara 1 kompetisi Tari Tradisonal Tingkat Kota Depok";

  const foto = "/images/prestasi9.jpg";
  const kategori = "Prestasi";
  const tanggal = "25 Desember 2023";

  const deskripsi = (
    <>
        Selamat kepada Nadira Oktaviana 9 PLUS 2, Gerina Syahla K. 7 PLUS 1, dan Fujiana Sari 8 PLUS 3 yang 
        baru saja meraih juara 1 pada kompetisi Tari Tradisional Tingkat Kota Depok.
    </>
  );

  return (
    <>
      <style>{CSS}</style>
      <Confetti active={showConfetti} />
      <Navbar />

      <main style={{ minHeight: "100vh", background: "#F8FAF9" }}>
        {/* HERO */}
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            background: "#0A1628",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -96,
              right: -96,
              width: 288,
              height: 288,
              borderRadius: "50%",
              background: "rgba(21,128,61,0.2)",
              filter: "blur(80px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -128,
              left: -80,
              width: 288,
              height: 288,
              borderRadius: "50%",
              background: "rgba(21,128,61,0.1)",
              filter: "blur(80px)",
            }}
          />

          <div
            style={{
              position: "relative",
              maxWidth: 1000,
              margin: "0 auto",
              padding: "48px 24px 56px",
            }}
          >
            {/* breadcrumb */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 24,
                fontSize: 13,
                color: "rgba(255,255,255,0.6)",
              }}
            >
              <span>Prestasi</span>
              <span>•</span>
              <span>{tanggal}</span>
            </div>

            {/* badge */}
            <div style={{ marginBottom: 20 }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  borderRadius: 20,
                  background: "#15803d",
                  padding: "8px 16px",
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  color: "white",
                }}
              >
                🏆 {kategori}
              </span>
            </div>

            {/* judul */}
            <h1
              className="font-display detail-hero-title"
              style={{
                maxWidth: 800,
                lineHeight: 1.15,
                fontWeight: 800,
                color: "white",
                letterSpacing: -0.5,
              }}
            >
              {judul}
            </h1>

            {/* accent */}
            <div
              style={{
                marginTop: 28,
                height: 6,
                width: 80,
                borderRadius: 20,
                background: "#22c55e",
              }}
            />
          </div>
        </section>

        {/* CONTENT */}
        <section
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            padding: "32px 24px 64px",
          }}
        >
          {/* FOTO */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              className="detail-foto-wrap"
              style={{
                overflow: "hidden",
                borderRadius: 24,
                background: "white",
                padding: 8,
                boxShadow: "0 15px 45px rgba(10,22,40,0.1)",
              }}
            >
              <div
                style={{
                  overflow: "hidden",
                  borderRadius: 16,
                  background: "#F0EBE0",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={foto}
                  alt={judul}
                  style={{ display: "block", width: "100%", height: "auto" }}
                />
              </div>
            </div>
          </div>

          {/* ARTICLE */}
          <div
            className="detail-article"
            style={{
              margin: "32px auto 0",
              maxWidth: 800,
              borderRadius: 24,
              border: "1px solid #E8EEE9",
              background: "white",
              boxShadow: "0 10px 40px rgba(10,22,40,0.05)",
            }}
          >
            {/* info */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 12,
                marginBottom: 28,
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  borderRadius: 20,
                  background: "#EAF7EE",
                  padding: "8px 16px",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#15803d",
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#15803d",
                  }}
                />
                {kategori}
              </span>

              <span style={{ fontSize: 13, color: "#9CA3AF" }}>{tanggal}</span>
            </div>

            {/* garis */}
            <div
              style={{
                marginBottom: 28,
                height: 1,
                width: "100%",
                background:
                  "linear-gradient(to right, rgba(21,128,61,0.3), #F3F4F6, transparent)",
              }}
            />

            {/* isi */}
            <article
              style={{ fontSize: 15, lineHeight: 1.9, color: "#374151" }}
            >
              <p>{deskripsi}</p>
            </article>

            {/* closing */}
            <div
              style={{
                marginTop: 36,
                borderRadius: 16,
                background: "#F3F8F4",
                padding: 20,
              }}
            >
              <div style={{ display: "flex", gap: 16 }}>
                <div
                  style={{
                    display: "flex",
                    flexShrink: 0,
                    alignItems: "center",
                    justifyContent: "center",
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: "#15803d",
                    fontSize: 18,
                  }}
                >
                  🏆
                </div>

                <div>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 700,
                      color: "#0A1628",
                    }}
                  >
                    Selamat atas prestasi yang diraih!
                  </p>

                  <p
                    style={{
                      margin: "4px 0 0",
                      fontSize: 13,
                      lineHeight: 1.6,
                      color: "#6B7280",
                    }}
                  >
                    Semoga pencapaian ini menjadi motivasi untuk terus
                    berkembang dan meraih prestasi lainnya.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* BACK BUTTON */}
          <div
            style={{
              marginTop: 32,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <a
              href="/prestasi"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                borderRadius: 30,
                border: "1px solid #E5E7EB",
                background: "white",
                padding: "12px 20px",
                fontSize: 13,
                fontWeight: 600,
                color: "#0A1628",
                textDecoration: "none",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "#15803d";
                el.style.color = "#15803d";
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "#E5E7EB";
                el.style.color = "#0A1628";
                el.style.transform = "none";
              }}
            >
              <span>←</span>
              Kembali ke Prestasi
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
