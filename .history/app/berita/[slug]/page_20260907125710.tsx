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
  return `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
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

      <main style={{ background: '#FAF7F0', minHeight: '70vh' }}>
        {/* HERO IMAGE */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(240px, 40vw, 420px)',
            background: '#EDE8DE',
            overflow: 'hidden',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={berita.foto_url}
            alt={berita.judul}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(10,22,40,0.1), rgba(10,22,40,0.55))',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 24,
              left: 0,
              right: 0,
              maxWidth: 800,
              margin: '0 auto',
              padding: '0 24px',
            }}
          >
            <div
              style={{
                display: 'inline-block',
                background: KATEGORI_COLOR[berita.kategori] ?? '#0A1628',
                color: 'white',
                padding: '6px 14px',
                borderRadius: 20,
                fontSize: 11,
                fontWeight: 800,
                marginBottom: 14,
              }}
            >
              {berita.kategori}
            </div>
            <h1
              className="font-display"
              style={{
                color: 'white',
                fontSize: 'clamp(24px, 4vw, 38px)',
                lineHeight: 1.3,
                fontWeight: 800,
              }}
            >
              {berita.judul}
            </h1>
          </div>
        </div>

        {/* CONTENT */}
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '36px 24px 80px' }}>
          <Link
            href="/news"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              color: '#92681A',
              fontSize: 13,
              fontWeight: 700,
              textDecoration: 'none',
              marginBottom: 22,
            }}
          >
            <ArrowLeft size={15} />
            Kembali ke Berita
          </Link>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              color: '#9CA3AF',
              fontSize: 13,
              marginBottom: 28,
            }}
          >
            <CalendarDays size={15} />
            {formatTanggal(berita.tanggal)}
          </div>

          <div
            style={{
              background: 'white',
              borderRadius: 16,
              border: '1px solid #F0EBE0',
              padding: 'clamp(20px, 4vw, 36px)',
              color: '#374151',
              fontSize: 15,
              lineHeight: 1.9,
              whiteSpace: 'pre-wrap',
            }}
          >
            {berita.konten}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}