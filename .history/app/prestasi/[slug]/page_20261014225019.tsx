import Link from 'next/link';
import { ArrowLeft, Trophy } from 'lucide-react';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ConfettiEffect from '@/components/ConfettiEffect';
import { sqlBerita } from '@/lib/db-berita';

const KATEGORI_COLOR: Record<string, string> = {
  Olahraga: '#1E3A5F',
  'Olahraga Elektronik': '#3a96d0',
  Seni: '#DC2626',
  Akademik: '#024d20',
  Organisasi: '#92681A',
};

function formatTanggal(dateStr: string) {
  const bulan = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
  ];

  const d = new Date(dateStr);
  return `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
}

async function getPrestasi(slug: string) {
  const rows = await sqlBerita`
    SELECT * FROM prestasi WHERE slug = ${slug} LIMIT 1
  `;

  return rows[0] ?? null;
}

export default async function PrestasiDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const prestasi = await getPrestasi(slug);

  if (!prestasi) {
    notFound();
  }

  const tanggalLengkap = formatTanggal(prestasi.created_at);
  const warnaKategori = KATEGORI_COLOR[prestasi.kategori] ?? '#023D17';

  return (
    <>
      <ConfettiEffect />
      <Navbar />

      <main style={{ background: '#FAF7F0', minHeight: '70vh' }}>
        {/* HEADER GELAP */}
        <section
          style={{
            background: 'linear-gradient(135deg, #0A1628, #0F2138)',
            padding: 'clamp(90px, 12vw, 130px) 24px 85px',
          }}
        >
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div
              style={{
                color: 'rgba(255,255,255,0.55)',
                fontSize: 13,
                marginBottom: 18,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              Prestasi <span>•</span> {tanggalLengkap}
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: warnaKategori,
                color: 'white',
                padding: '7px 16px',
                borderRadius: 30,
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 0.5,
                marginBottom: 22,
              }}
            >
              <Trophy size={13} />
              {prestasi.kategori.toUpperCase()}
            </div>

            <h1
              className="font-display"
              style={{
                color: 'white',
                fontSize: 'clamp(28px, 5vw, 46px)',
                lineHeight: 1.25,
                fontWeight: 800,
                margin: 0,
              }}
            >
              {prestasi.nama}
            </h1>

            <div
              style={{
                width: 70,
                height: 4,
                borderRadius: 4,
                background: 'linear-gradient(90deg, #C8973A, #E8B84B)',
                marginTop: 22,
              }}
            />
          </div>
        </section>

        {/* FOTO PORTRAIT - TIDAK DI-CROP */}
        <section
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '0 24px',
            marginTop: -55,
            position: 'relative',
            zIndex: 2,
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 500,
              overflow: 'hidden',
              borderRadius: 20,
              background: 'white',
              padding: 8,
              boxShadow: '0 20px 55px rgba(10,22,40,0.22)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={prestasi.foto_url}
              alt={prestasi.nama}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                borderRadius: 14,
                objectFit: 'contain',
              }}
            />
          </div>
        </section>

        {/* CARD KONTEN */}
        <div
          style={{
            maxWidth: 800,
            margin: '34px auto 0',
            padding: '0 24px 80px',
          }}
        >
          <Link
            href="/prestasi"
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
            Kembali ke Prestasi
          </Link>

          <div
            style={{
              background: 'white',
              borderRadius: 16,
              border: '1px solid #F0EBE0',
              padding: 'clamp(20px, 4vw, 36px)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 20,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: warnaKategori,
                  display: 'inline-block',
                }}
              />
              <span style={{ fontSize: 14, fontWeight: 700, color: '#0A1628' }}>
                Prestasi
              </span>
              <span style={{ color: '#D1D5DB' }}>•</span>
              <span style={{ fontSize: 13, color: '#9CA3AF' }}>
                {tanggalLengkap}
              </span>
            </div>

            <div style={{ height: 1, background: '#F0EBE0', marginBottom: 20 }} />

            <div
              style={{
                color: '#374151',
                fontSize: 15,
                lineHeight: 1.9,
                whiteSpace: 'pre-wrap',
                marginBottom: 24,
              }}
            >
              {prestasi.deskripsi}
            </div>

            <div
              style={{
                background: '#F0FBF4',
                border: '1px solid #D1EFDD',
                borderRadius: 12,
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  flexShrink: 0,
                  background: '#023D17',
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Trophy size={17} color="#E8B84B" />
              </div>

              <div>
                <div
                  style={{
                    fontWeight: 800,
                    color: '#0A1628',
                    fontSize: 14,
                    marginBottom: 4,
                  }}
                >
                  Selamat atas prestasi yang diraih!
                </div>

                <div
                  style={{
                    fontSize: 13,
                    color: '#4B5563',
                    lineHeight: 1.6,
                  }}
                >
                  Semoga pencapaian ini menjadi motivasi untuk terus berkembang dan meraih prestasi lainnya.
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
