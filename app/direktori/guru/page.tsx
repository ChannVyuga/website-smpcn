'use client';
import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

/* ══════════════════════════════════════════
   DATA GURU
══════════════════════════════════════════ */
type Guru = {
  id: number;
  name: string;
  label: string;
  photo: string;
};

export default function GuruPage() {

    const [guru, setGuru] = useState<Guru[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchGuru() {
      try {
        const response = await fetch("/api/guru");

        if (!response.ok) {
          throw new Error("Gagal memuat data guru.");
        }

        const data: Guru[] = await response.json();
        setGuru(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Terjadi kesalahan."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchGuru();
  }, []);

  // Scroll reveal untuk card, dijalankan ulang setelah data guru dimuat
  const gridRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const els = gridRef.current?.querySelectorAll<HTMLElement>('.gr-card');
    if (!els || els.length === 0) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [guru]);

  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section className="hero-gradient gr-hero-section">
          <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
            <h1 className="font-display gr-hero-title" style={{ color: 'white' }}>Guru</h1>
            <p className="gr-hero-desc" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, maxWidth: 580, margin: '0 auto' }}>
              Mengenal para pendidik SMP Citra Negara yang berdedikasi membimbing dan mengembangkan potensi setiap siswa.
            </p>
          </div>
        </section>

        {/* Grid Foto Guru */}
        <section className="gr-grid-section" style={{ background: 'white' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div className="gold-line" style={{ margin: '0 auto 16px' }} />
              <h2 className="font-display gr-section-heading" style={{ color: '#0A1628' }}>Guru</h2>
              <p style={{ color: '#C8973A', fontWeight: 700, marginTop: 6, fontSize: 14, letterSpacing: 1 }}>SMP CITRA NEGARA</p>
            </div>

            <div className="gr-grid" ref={gridRef}>
                {loading ? (
                    Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="gr-skeleton" aria-hidden="true" />
                    ))
                  ) : error ? (
                    <p>{error}</p>
                  ) : guru.length === 0 ? (
                    <p>Belum ada data guru.</p>
                  ) : (
                    guru.map((g, i) => (
                      <div
                        key={g.id}
                        className="gr-card"
                        style={{ '--d': `${(i % 4) * 90}ms` } as CSSProperties}
                      >
                        <div className="gr-photo-frame">
                          <Image
                            src={g.photo}
                            alt={g.name}
                            fill
                            className="gr-photo-img"
                            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 260px"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <div className="gr-photo-info">
                          <p className="gr-photo-name">{g.name}</p>
                          <p className="gr-photo-label">
                            <span className="gr-photo-dot" />
                            {g.label}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
            </div>
          </div>
        </section>

      </main>
      <Footer />

      <style jsx global>{`
        .gr-hero-section {
          padding: 80px 24px;
        }
        .gr-hero-title {
          font-size: 48px;
          margin-bottom: 16px;
        }
        .gr-hero-desc {
          font-size: 17px;
        }

        .gr-grid-section {
          padding: 80px 24px;
        }
        .gr-section-heading {
          font-size: 38px;
        }

        .gr-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px 24px;
        }

        /* ===== Card ===== */
        .gr-card {
          background: white;
          border: 1px solid #EFE9DC;
          border-radius: 22px;
          padding: 8px;
          box-shadow: 0 1px 2px rgba(10, 22, 40, 0.04);
          opacity: 0;
          transition:
            transform 0.45s cubic-bezier(0.2, 0.7, 0.2, 1),
            box-shadow 0.45s ease,
            border-color 0.45s ease;
        }
        .gr-card.is-visible {
          opacity: 1;
          animation: gr-in 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) var(--d, 0ms) backwards;
        }
        @keyframes gr-in {
          from { opacity: 0; transform: translateY(24px); }
        }

        .gr-photo-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          border-radius: 16px;
          overflow: hidden;
          background: #F5F1E8;
        }
        .gr-photo-img {
          transition: transform 0.9s cubic-bezier(0.2, 0.7, 0.2, 1);
        }

        .gr-photo-info {
          padding: 14px 8px 8px;
          text-align: center;
        }
        .gr-photo-name {
          font-size: 15px;
          font-weight: 700;
          color: #0A1628;
          line-height: 1.35;
          margin: 0;
        }
        .gr-photo-label {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 500;
          color: #8C7B5A;
          margin: 4px 0 0;
        }
        .gr-photo-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #C8973A;
          flex-shrink: 0;
          transition: transform 0.45s ease;
        }

        /* Hover hanya untuk perangkat dengan mouse */
        @media (hover: hover) {
          .gr-card:hover {
            transform: translateY(-6px);
            border-color: rgba(200, 151, 58, 0.35);
            box-shadow: 0 18px 40px -12px rgba(10, 22, 40, 0.18);
          }
          .gr-card:hover .gr-photo-img { transform: scale(1.05); }
          .gr-card:hover .gr-photo-dot { transform: scale(1.6); }
        }
        /* Umpan balik saat card disentuh di layar sentuh */
        @media (hover: none) {
          .gr-card:active { transform: scale(0.98); }
        }

        /* Skeleton saat data dimuat */
        .gr-skeleton {
          aspect-ratio: 4 / 5.9;
          border-radius: 22px;
          background: linear-gradient(100deg, #F3EEE3 30%, #FBF8F1 50%, #F3EEE3 70%);
          background-size: 200% 100%;
          animation: gr-shimmer 1.3s linear infinite;
        }
        @keyframes gr-shimmer {
          from { background-position: 150% 0; }
          to { background-position: -50% 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .gr-card, .gr-card.is-visible { opacity: 1; animation: none; }
          .gr-skeleton { animation: none; }
        }

        @media (max-width: 900px) {
          .gr-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 28px 20px;
          }
        }

        @media (max-width: 640px) {
          .gr-hero-section {
            padding: 56px 20px;
          }
          .gr-hero-title {
            font-size: 30px;
          }
          .gr-hero-desc {
            font-size: 15px;
          }
          .gr-section-heading {
            font-size: 28px;
          }
          .gr-grid-section {
            padding: 48px 16px;
          }
          .gr-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px 16px;
          }
          .gr-photo-name {
            font-size: 12px;
          }
          .gr-photo-label {
            font-size: 11px;
          }
          .gr-card {
            padding: 6px;
            border-radius: 18px;
          }
          .gr-photo-frame {
            border-radius: 13px;
          }
          .gr-photo-info {
            padding: 10px 4px 6px;
          }
        }

        @media (max-width: 380px) {
          .gr-hero-title {
            font-size: 25px;
          }
          .gr-section-heading {
            font-size: 22px;
          }
        }
      `}</style>
    </>
  );
}