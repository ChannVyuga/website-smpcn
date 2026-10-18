import Link from 'next/link';
import { CalendarDays, ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { sqlBerita } from '@/lib/db-berita';

const KATEGORI_COLOR: Record<string, string> = {
  Prestasi: '#92400E',
  Kegiatan: '#1E3A5F',
  Akademik: '#024D20',
  Pengumuman: '#7C3AED',
};

function formatTanggal(dateStr: string) {
  const bulan = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
  ];

  const d = new Date(dateStr);
  return `${d.getUTCDate()} ${bulan[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

async function getBerita(slug: string) {
  const rows = await sqlBerita`
    SELECT * FROM berita WHERE slug = ${slug} LIMIT 1
  `;
  return rows[0] ?? null;
}

export default async function BeritaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const berita = await getBerita(slug);

  if (!berita) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main
        style={{
          background: '#FAF7F0',
          minHeight: '70vh',
          color: '#1F2937',
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: '0 auto',
            padding: 'clamp(24px, 5vw, 52px) 20px 80px',
          }}
        >
          <Link
            href="/news"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              color: '#92681A',
              fontSize: 13,
              fontWeight: 700,
              textDecoration: 'none',
              marginBottom: 28,
            }}
          >
            <ArrowLeft size={16} />
            Kembali ke Berita
          </Link>

          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: KATEGORI_COLOR[berita.kategori] ?? '#0A1628',
                color: '#FFFFFF',
                padding: '6px 13px',
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: '0.04em',
                marginBottom: 16,
              }}
            >
              {berita.kategori}
            </div>

            <h1
              className="font-display"
              style={{
                color: '#173A2B',
                fontSize: 'clamp(26px, 4vw, 42px)',
                lineHeight: 1.2,
                fontWeight: 800,
                letterSpacing: '-0.025em',
                margin: '0 0 20px',
                overflowWrap: 'anywhere',
              }}
            >
              {berita.judul}
            </h1>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                color: '#77786F',
                fontSize: 13,
                marginBottom: 30,
              }}
            >
              <CalendarDays size={16} />
              <span>{formatTanggal(String(berita.tanggal))}</span>
            </div>

            {/* FOTO BERITA DALAM FRAME */}
            <figure
              style={{
                  display: 'table',
                  width: 'fit-content',
                  maxWidth: '100%',
                  margin: '0 auto 36px',
                  padding: 'clamp(7px, 1.5vw, 12px)',
                  background: '#FFFFFF',
                  border: '1px solid #E6E0D4',
                  borderRadius: 20,
                  boxShadow: '0 12px 32px rgba(35, 48, 34, 0.09)',
                  boxSizing: 'border-box',
              }}
            >
              <div
                style={{
                  width: '100%',
                  aspectRatio: '16 / 9',
                  overflow: 'hidden',
                  borderRadius: 13,
                  background: '#EDE8DE',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={berita.foto_url}
                  alt={berita.judul}
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </div>
            </figure>

            {/* ISI BERITA */}
            <article
              style={{
                background: '#FFFFFF',
                border: '1px solid #EEE8DC',
                borderRadius: 18,
                padding: 'clamp(20px, 4vw, 38px)',
                color: '#374151',
                fontSize: 15,
                lineHeight: 1.95,
                whiteSpace: 'pre-wrap',
                overflowWrap: 'anywhere',
                boxShadow: '0 4px 18px rgba(35, 48, 34, 0.035)',
              }}
            >
              {berita.konten || 'Belum ada isi berita.'}
            </article>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}