'use client';

import Link from 'next/link';
import { CalendarDays, ArrowRight, Newspaper } from 'lucide-react';
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const NEWS = [
  {
    tanggal: '28 Agustus 2025',
    tahun: '2025',
    judul: 'SMP Citra Negara Raih Prestasi Membanggakan di Tingkat Nasional',
    kategori: 'Prestasi',
    foto: '/images/news1.jpg',
    excerpt:
      'Siswa-siswi SMP Citra Negara kembali mengharumkan nama sekolah melalui berbagai kompetisi tingkat nasional.',
    href: '/detail_news/page1',
    featured: true,
  },
  {
    tanggal: '25 Agustus 2025',
    tahun: '2025',
    judul: 'Kegiatan Masa Pengenalan Lingkungan Sekolah Tahun Ajaran Baru',
    kategori: 'Kegiatan',
    foto: '/images/news2.jpg',
    excerpt:
      'Rangkaian kegiatan pengenalan lingkungan sekolah berlangsung dengan penuh semangat dan antusiasme.',
    href: '/detail_news/page2',
  },
  {
    tanggal: '20 Agustus 2025',
    tahun: '2025',
    judul: 'SMP Citra Negara Gelar Kegiatan Literasi Bersama',
    kategori: 'Akademik',
    foto: '/images/news3.jpg',
    excerpt:
      'Kegiatan literasi menjadi salah satu upaya sekolah dalam meningkatkan minat baca dan kemampuan siswa.',
    href: '/detail_news/page3',
  },
  {
    tanggal: '15 Agustus 2025',
    tahun: '2025',
    judul: 'Pengumuman Jadwal Kegiatan Sekolah Bulan Agustus',
    kategori: 'Pengumuman',
    foto: '/images/news4.jpg',
    excerpt:
      'Berikut informasi mengenai jadwal berbagai kegiatan sekolah yang akan dilaksanakan selama bulan Agustus.',
    href: '/detail_news/page4',
  },
  {
    tanggal: '10 Agustus 2025',
    tahun: '2025',
    judul: 'Siswa SMP Citra Negara Ikuti Kompetisi Olahraga Antar Sekolah',
    kategori: 'Kegiatan',
    foto: '/images/news5.jpg',
    excerpt:
      'Para siswa berpartisipasi dalam kompetisi olahraga antar sekolah dengan membawa semangat sportivitas.',
    href: '/detail_news/page5',
  },
  {
    tanggal: '5 Agustus 2025',
    tahun: '2025',
    judul: 'Pembinaan Akademik Siswa untuk Menghadapi Kompetisi',
    kategori: 'Akademik',
    foto: '/images/news6.jpg',
    excerpt:
      'Sekolah mengadakan pembinaan khusus bagi siswa yang akan mengikuti berbagai kompetisi akademik.',
    href: '/detail_news/page6',
  },
  {
    tanggal: '30 Juli 2025',
    tahun: '2025',
    judul: 'Perayaan Hari Kemerdekaan di Lingkungan SMP Citra Negara',
    kategori: 'Kegiatan',
    foto: '/images/news7.jpg',
    excerpt:
      'Berbagai perlombaan dan kegiatan menarik digelar untuk memperingati Hari Kemerdekaan Republik Indonesia.',
    href: '/detail_news/page7',
  },
  {
    tanggal: '25 Juli 2025',
    tahun: '2025',
    judul: 'Informasi Pendaftaran Ekstrakurikuler Tahun Ajaran 2025/2026',
    kategori: 'Pengumuman',
    foto: '/images/news8.jpg',
    excerpt:
      'Siswa dapat memilih berbagai kegiatan ekstrakurikuler sesuai dengan minat dan bakat masing-masing.',
    href: '/detail_news/page8',
  },
];

const KATEGORI_COLOR: Record<string, string> = {
  Prestasi: '#92400E',
  Kegiatan: '#1E3A5F',
  Akademik: '#024D20',
  Pengumuman: '#7C3AED',
};

const ALL_KATEGORI = [
  'Semua',
  ...Array.from(new Set(NEWS.map((n) => n.kategori))),
];

export default function NewsPage() {
  const [aktif, setAktif] = useState('Semua');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const filtered =
    aktif === 'Semua'
      ? NEWS
      : NEWS.filter((n) => n.kategori === aktif);

  const featuredNews = NEWS.find((n) => n.featured);

  const regularNews = filtered.filter(
    (n) => n.href !== featuredNews?.href
  );

  return (
    <>
      <Navbar />

      <main>
        {/* =========================
            HERO
        ========================== */}
        <section
          className="hero-gradient"
          style={{
            padding: 'clamp(55px, 9vw, 90px) 24px',
          }}
        >
          <div
            style={{
              maxWidth: 800,
              margin: '0 auto',
              textAlign: 'center',
            }}
          >
            <div
              className="gold-line"
              style={{
                margin: '0 auto 20px',
              }}
            />

            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(32px, 6vw, 50px)',
                color: 'white',
                marginBottom: 16,
                lineHeight: 1.2,
              }}
            >
              Berita & Informasi
            </h1>

            <p
              style={{
                color: 'rgba(255,255,255,0.72)',
                fontSize: 'clamp(14px, 2vw, 17px)',
                lineHeight: 1.7,
                maxWidth: 600,
                margin: '0 auto',
              }}
            >
              Informasi terbaru seputar kegiatan, prestasi, akademik,
              dan berbagai kabar dari SMP Citra Negara.
            </p>
          </div>
        </section>

        {/* =========================
            STATS BAR
        ========================== */}
        <section
          style={{
            background: '#023D17',
            padding: '22px 24px',
            borderBottom: '2px solid #C8973A',
          }}
        >
          <div
            style={{
              maxWidth: 1100,
              margin: '0 auto',
              display: 'flex',
              gap: isMobile ? 22 : 40,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {[
              {
                label: 'Total Berita',
                val: `${NEWS.length}+`,
              },
              {
                label: 'Prestasi',
                val: NEWS.filter((n) => n.kategori === 'Prestasi').length,
              },
              {
                label: 'Kegiatan',
                val: NEWS.filter((n) => n.kategori === 'Kegiatan').length,
              },
              {
                label: 'Akademik',
                val: NEWS.filter((n) => n.kategori === 'Akademik').length,
              },
              {
                label: 'Pengumuman',
                val: NEWS.filter((n) => n.kategori === 'Pengumuman').length,
              },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    color: '#E8B84B',
                    fontWeight: 800,
                    fontSize: 22,
                  }}
                >
                  {s.val}
                </div>

                <div
                  style={{
                    color: 'rgba(255,255,255,0.55)',
                    fontSize: 11,
                    marginTop: 2,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================
            FEATURED NEWS
        ========================== */}
        {featuredNews && aktif === 'Semua' && (
          <section
            style={{
              background: '#FAF7F0',
              padding: '50px 24px 20px',
            }}
          >
            <div
              style={{
                maxWidth: 1100,
                margin: '0 auto',
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  color: '#C8973A',
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  marginBottom: 14,
                }}
              >
                Berita Utama
              </div>

              <Link
                href={featuredNews.href}
                style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile
                    ? '1fr'
                    : 'minmax(0, 1.35fr) minmax(280px, 0.9fr)',
                  background: 'white',
                  borderRadius: 20,
                  overflow: 'hidden',
                  border: '1px solid #F0EBE0',
                  boxShadow:
                    '0 4px 20px rgba(10,22,40,0.07)',
                  textDecoration: 'none',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;

                  el.style.transform = 'translateY(-4px)';
                  el.style.boxShadow =
                    '0 12px 35px rgba(200,151,58,0.18)';
                  el.style.borderColor = '#C8973A';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;

                  el.style.transform = 'none';
                  el.style.boxShadow =
                    '0 4px 20px rgba(10,22,40,0.07)';
                  el.style.borderColor = '#F0EBE0';
                }}
              >
                {/* Featured Image */}
                <div
                  style={{
                    minHeight: isMobile ? 200 : 340,
                    position: 'relative',
                    overflow: 'hidden',
                    background: '#EDE8DE',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featuredNews.foto}
                    alt={featuredNews.judul}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />

                  <div
                    style={{
                      position: 'absolute',
                      top: 18,
                      left: 18,
                      background:
                        KATEGORI_COLOR[
                          featuredNews.kategori
                        ] ?? '#0A1628',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: 20,
                      fontSize: 10,
                      fontWeight: 800,
                    }}
                  >
                    {featuredNews.kategori}
                  </div>
                </div>

                {/* Featured Content */}
                <div
                  style={{
                    padding: 'clamp(25px, 4vw, 40px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 7,
                      color: '#9CA3AF',
                      fontSize: 12,
                      marginBottom: 15,
                    }}
                  >
                    <CalendarDays size={14} />

                    {featuredNews.tanggal}
                  </div>

                  <h2
                    style={{
                      color: '#0A1628',
                      fontSize:
                        'clamp(21px, 3vw, 30px)',
                      lineHeight: 1.35,
                      margin: '0 0 15px',
                      fontWeight: 800,
                    }}
                  >
                    {featuredNews.judul}
                  </h2>

                  <p
                    style={{
                      color: '#6B7280',
                      fontSize: 14,
                      lineHeight: 1.7,
                      margin: '0 0 25px',
                    }}
                  >
                    {featuredNews.excerpt}
                  </p>

                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      color: '#92681A',
                      fontSize: 13,
                      fontWeight: 800,
                    }}
                  >
                    Baca selengkapnya
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* =========================
            FILTER
        ========================== */}
        <section
          style={{
            background: '#FAF7F0',
            padding: '35px 24px 0',
          }}
        >
          <div
            style={{
              maxWidth: 1100,
              margin: '0 auto',
              display: 'flex',
              gap: 8,
              flexWrap: 'wrap',
              overflowX: 'auto',
              paddingBottom: 4,
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {ALL_KATEGORI.map((k) => (
              <button
                key={k}
                onClick={() => setAktif(k)}
                style={{
                  padding: '8px 20px',
                  borderRadius: 30,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: '1.5px solid',
                  borderColor:
                    aktif === k ? '#C8973A' : '#E2D9C8',
                  background:
                    aktif === k ? '#C8973A' : 'white',
                  color:
                    aktif === k ? '#0A1628' : '#6B7280',
                  transition: 'all 0.18s',
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                }}
              >
                {k}
              </button>
            ))}
          </div>
        </section>

        {/* =========================
            NEWS GRID
        ========================== */}
        <section
          style={{
            padding: '30px 24px 75px',
            background: '#FAF7F0',
          }}
        >
          <div
            style={{
              maxWidth: 1100,
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
              gap: 24,
            }}
          >
            {regularNews.map((news, index) => (
              <Link
                key={`${news.href}-${index}`}
                href={news.href}
                style={{
                  background: 'white',
                  borderRadius: 16,
                  overflow: 'hidden',
                  border: '1px solid #F0EBE0',
                  boxShadow:
                    '0 2px 12px rgba(10,22,40,0.06)',
                  transition: 'all 0.25s',
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;

                  el.style.borderColor = '#C8973A';
                  el.style.transform = 'translateY(-4px)';
                  el.style.boxShadow =
                    '0 8px 28px rgba(200,151,58,0.18)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;

                  el.style.borderColor = '#F0EBE0';
                  el.style.transform = 'none';
                  el.style.boxShadow =
                    '0 2px 12px rgba(10,22,40,0.06)';
                }}
              >
                {/* Image */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '16 / 10',
                    overflow: 'hidden',
                    background: '#F0EBE0',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={news.foto}
                    alt={news.judul}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition:
                        'transform 0.35s ease',
                    }}
                  />

                  {/* Category */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 12,
                      left: 12,
                      background:
                        KATEGORI_COLOR[news.kategori] ??
                        'rgba(10,22,40,0.8)',
                      color: 'white',
                      fontSize: 10,
                      fontWeight: 800,
                      padding: '5px 10px',
                      borderRadius: 20,
                      letterSpacing: 0.3,
                    }}
                  >
                    {news.kategori}
                  </div>

                  {/* Year */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      background:
                        'linear-gradient(135deg,#C8973A,#E8B84B)',
                      color: '#0A1628',
                      fontSize: 10,
                      fontWeight: 800,
                      padding: '5px 10px',
                      borderRadius: 20,
                    }}
                  >
                    {news.tahun}
                  </div>
                </div>

                {/* Content */}
                <div
                  style={{
                    padding: '18px 20px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                  }}
                >
                  {/* Date */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      color: '#9CA3AF',
                      fontSize: 11,
                      marginBottom: 10,
                    }}
                  >
                    <CalendarDays size={13} />

                    {news.tanggal}
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 800,
                      color: '#0A1628',
                      lineHeight: 1.45,
                      margin: '0 0 9px',
                    }}
                  >
                    {news.judul}
                  </h3>

                  {/* Excerpt */}
                  <p
                    style={{
                      fontSize: 12.5,
                      color: '#6B7280',
                      lineHeight: 1.65,
                      margin: 0,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {news.excerpt}
                  </p>

                  {/* Read More */}
                  <div
                    style={{
                      marginTop: 'auto',
                      paddingTop: 18,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      color: '#92681A',
                      fontSize: 12,
                      fontWeight: 800,
                    }}
                  >
                    Baca berita
                    <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {regularNews.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '70px 0',
                color: '#9CA3AF',
              }}
            >
              <Newspaper
                size={42}
                strokeWidth={1.5}
                style={{
                  margin: '0 auto 15px',
                }}
              />

              <div
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                Belum ada berita di kategori ini.
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}