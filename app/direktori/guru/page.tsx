'use client';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

/* ══════════════════════════════════════════
   DATA GURU
══════════════════════════════════════════ */
const GURU = [
  { name: 'Putri Bekti D.N.A',      label: 'Guru Matematika',        photo: '/images/guru1.jpg' },
  { name: 'Yeye Udarya',            label: 'Penjaskes',              photo: '/images/guru2.jpg' },
  { name: 'Minarmi',                label: 'Bahasa Indonesia',       photo: '/images/guru3.jpg' },
  { name: 'Roh Utami',              label: 'Bahasa Indonesia',       photo: '/images/guru4.jpg' },
  { name: 'Didin',                  label: 'Seni Musik',             photo: '/images/guru5.jpg' },
  { name: 'Wining Ulfa Nurulya',    label: 'IPA',                    photo: '/images/guru6.jpg' },
  { name: 'Khanes Setiyo Aji',      label: 'Informatika',            photo: '/images/guru7.jpg' },
  { name: 'Istianah',               label: 'IPA',                    photo: '/images/guru8.jpg' },
  { name: 'Inas Aulia',             label: 'Matematika',             photo: '/images/guru9.jpg' },
  { name: 'Caswadin',               label: 'IPA',                    photo: '/images/guru10.jpg' },
];

export default function GuruPage() {
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

            <div className="gr-grid">
              {GURU.map((g) => (
                <div key={g.name} className="gr-card">
                  <div className="gr-photo-frame">
                    <Image
                      src={g.photo}
                      alt={g.name}
                      fill
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 260px"
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="gr-photo-overlay" />
                    <div className="gr-photo-info">
                      <p className="gr-photo-name">{g.name}</p>
                      <p className="gr-photo-label">{g.label}</p>
                    </div>
                  </div>
                  <div className="gr-photo-accent" />
                </div>
              ))}
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

        .gr-card {
          position: relative;
        }
        .gr-photo-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          border-radius: 16px;
          overflow: hidden;
          border: 4px solid white;
          box-shadow: 0 8px 30px rgba(10, 22, 40, 0.12);
          z-index: 1;
        }
        .gr-photo-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10,22,40,0.85) 0%, rgba(10,22,40,0.35) 35%, rgba(10,22,40,0) 60%);
        }
        .gr-photo-info {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 16px 14px;
        }
        .gr-photo-name {
          font-size: 14px;
          font-weight: 800;
          color: white;
          line-height: 1.3;
          margin: 0;
        }
        .gr-photo-label {
          font-size: 11px;
          font-weight: 600;
          color: #E8B84B;
          margin: 3px 0 0;
        }
        .gr-photo-accent {
          position: absolute;
          bottom: -12px;
          right: -12px;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #c8973a, #e8b84b);
          border-radius: 16px;
          z-index: 0;
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
            font-size: 10px;
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