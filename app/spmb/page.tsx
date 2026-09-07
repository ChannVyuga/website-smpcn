'use client';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CheckCircle, AlertCircle, ChevronRight } from 'lucide-react';

const PERSYARATAN = [
  'Ijazah/Surat Keterangan Lulus (SKL) SD/MI (fotokopi)',
  'Kartu Keluarga (fotokopi)',
  'Akte Kelahiran (fotokopi)',
  'KTP orang tua/wali (fotokopi)',
  'Pas foto 3×4 berwarna (3 lembar)',
  'Surat keterangan sehat dari dokter',
  'Rapor SD/MI kelas 4, 5, dan 6 semester ganjil (fotokopi)',
];

const ALUR = [
  { no: 1, title: 'Buat Akun', desc: 'Daftarkan email Anda untuk membuat akun PPDB Online' },
  { no: 2, title: 'Isi Formulir', desc: 'Lengkapi data pribadi, data orang tua, dan pilih jalur pendaftaran' },
  { no: 3, title: 'Upload Berkas', desc: 'Upload dokumen persyaratan dalam format PDF/JPG' },
  { no: 4, title: 'Submit', desc: 'Kirim formulir dan tunggu verifikasi dari panitia PPDB' },
  { no: 5, title: 'Verifikasi', desc: 'Panitia akan memverifikasi data dan berkas Anda' },
  { no: 6, title: 'Pengumuman', desc: 'Cek status kelulusan/penerimaan di dashboard akun Anda' },
];

export default function SPMBPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="hero-gradient spmb-hero">
          <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(200,151,58,0.15)', border: '1px solid rgba(200,151,58,0.3)', borderRadius: 20, padding: '6px 16px', color: '#E8B84B', fontSize: 12, fontWeight: 600, marginBottom: 20 }}>
              SPMB 2026/2027
            </div>
            <h1 className="font-display spmb-hero-title" style={{ color: 'white' }}>
              Sistem Penerimaan<br />Peserta Didik Baru
            </h1>
            <p className="spmb-hero-desc" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, maxWidth: 560, margin: '0 auto 36px' }}>
              Pendaftaran online SMP Citra Negara tahun ajaran 2026/2027.
              Proses mudah, transparan, dan dapat dipantau secara real-time.
            </p>
            <div className="spmb-hero-btns">
              <Link href="/register" className="btn-primary spmb-hero-btn">Daftar Sekarang</Link>
              <Link href="/login" className="btn-outline spmb-hero-btn">Sudah Punya Akun</Link>
            </div>
          </div>
        </section>

        {/* Alur */}
        <section className="spmb-alur-section" style={{ background: '#FAF7F0' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div className="gold-line" style={{ margin: '0 auto 16px' }} />
              <h2 className="font-display spmb-section-heading" style={{ color: '#0A1628' }}>Alur Pendaftaran</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {ALUR.map((step, i) => (
                <div key={step.no} className="spmb-alur-row">
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="spmb-alur-circle" style={{ borderRadius: '50%', background: 'linear-gradient(135deg,#C8973A,#E8B84B)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#0A1628', flexShrink: 0 }}>{step.no}</div>
                    {i < ALUR.length - 1 && <div style={{ width: 2, height: 36, background: '#E5E7EB', margin: '4px 0' }} />}
                  </div>
                  <div className="spmb-alur-card" style={{ background: 'white', borderRadius: 12, flex: 1, border: '1px solid #F0EBE0', marginBottom: 4 }}>
                    <h4 style={{ fontSize: 15, fontWeight: 700, color: '#0A1628', marginBottom: 4 }}>{step.title}</h4>
                    <p style={{ fontSize: 13, color: '#6B7280' }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Persyaratan */}
        <section className="spmb-persyaratan-section" style={{ background: 'white' }}>
          <div className="spmb-persyaratan-grid" style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div>
              <div className="gold-line" style={{ marginBottom: 16 }} />
              <h2 className="font-display spmb-section-heading" style={{ color: '#0A1628', marginBottom: 16 }}>Persyaratan Dokumen</h2>
              <p style={{ color: '#6B7280', marginBottom: 28, fontSize: 15, lineHeight: 1.7 }}>
                Berikut adalah berkas persyaratan yang wajib diserahkan ke sekolah untuk proses verifikasi pendaftaran.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {PERSYARATAN.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <CheckCircle size={18} color="#C8973A" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: 14, color: '#374151' }}>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: 10, padding: 16, marginTop: 24, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <AlertCircle size={16} color="#92400E" style={{ flexShrink: 0, marginTop: 2 }} />
                <p style={{ fontSize: 13, color: '#92400E', lineHeight: 1.5 }}>
                  Setelah mengirimkan formulir pendaftaran secara online, calon peserta didik wajib menyerahkan fotokopi berkas persyaratan ke sekolah paling lambat 3 (tiga) hari kerja.
                </p>
              </div>
            </div>
            <div className="spmb-cta-box" style={{ background: '#02513b', borderRadius: 20, color: 'white' }}>
              <h3 className="font-display" style={{ fontSize: 26, color: 'white', marginBottom: 8 }}>Mulai Daftar Sekarang</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 1.7, marginBottom: 28 }}>
                Proses pendaftaran 100% online. Buat akun, isi formulir, dan upload berkas dari rumah.
              </p>
              {['Buat akun gratis', 'Isi formulir online', 'Upload dokumen digital', 'Pantau status real-time'].map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 14, alignItems: 'center' }}>
                  <div style={{ width: 24, height: 24, background: 'rgba(200,151,58,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ChevronRight size={14} color="#C8973A" />
                  </div>
                  <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>{f}</span>
                </div>
              ))}
              <Link href="/register" className="btn-primary" style={{ display: 'block', textAlign: 'center', marginTop: 28, fontSize: 15 }}>
                Daftar Sekarang →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        /* ── Hero ── */
        .spmb-hero {
          padding: 80px 24px;
        }
        .spmb-hero-title {
          font-size: 48px;
          margin: 0 0 16px 0;
        }
        .spmb-hero-desc {
          font-size: 17px;
          margin: 0 auto 36px;
        }
        .spmb-hero-btns {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .spmb-hero-btn {
          font-size: 16px;
        }

        /* ── Heading umum tiap section ── */
        .spmb-section-heading {
          font-size: 36px;
        }

        /* ── Alur ── */
        .spmb-alur-section {
          padding: 70px 24px;
        }
        .spmb-alur-row {
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }
        .spmb-alur-circle {
          width: 44px;
          height: 44px;
          font-size: 16px;
        }
        .spmb-alur-card {
          padding: 16px 20px;
        }

        /* ── Persyaratan ── */
        .spmb-persyaratan-section {
          padding: 70px 24px;
        }
        .spmb-persyaratan-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }
        .spmb-cta-box {
          padding: 36px;
        }

        /* ══════════════════════════════════
           BREAKPOINT: TABLET (≤900px)
        ══════════════════════════════════ */
        @media (max-width: 900px) {
          .spmb-persyaratan-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }

        /* ══════════════════════════════════
           BREAKPOINT: MOBILE (≤640px)
        ══════════════════════════════════ */
        @media (max-width: 640px) {
          .spmb-hero {
            padding: 56px 20px;
          }
          .spmb-hero-title {
            font-size: 30px;
          }
          .spmb-hero-desc {
            font-size: 15px;
            margin: 0 auto 28px;
          }
          .spmb-hero-btns {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }
          .spmb-hero-btn {
            text-align: center;
            font-size: 15px;
          }

          .spmb-section-heading {
            font-size: 26px;
          }

          .spmb-alur-section {
            padding: 48px 16px;
          }
          .spmb-alur-row {
            gap: 12px;
          }
          .spmb-alur-circle {
            width: 36px;
            height: 36px;
            font-size: 14px;
          }
          .spmb-alur-card {
            padding: 14px 16px;
          }

          .spmb-persyaratan-section {
            padding: 48px 16px;
          }
          .spmb-cta-box {
            padding: 24px;
          }
        }

        @media (max-width: 380px) {
          .spmb-hero-title {
            font-size: 25px;
          }
          .spmb-section-heading {
            font-size: 22px;
          }
        }
      `}</style>
    </>
  );
}