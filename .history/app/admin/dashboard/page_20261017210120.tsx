```tsx
'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutDashboard,
  Newspaper,
  Trophy,
  Globe,
  LogOut,
  User,
  ArrowUpRight,
  Plus,
  RefreshCw,
  ExternalLink,
  FileText,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

type Session = {
  namaLengkap?: string;
  email?: string;
  role?: string;
};

type Berita = {
  id: number;
  judul: string;
  kategori: string;
  slug: string;
  tanggal: string;
};

type Prestasi = {
  id: number;
  nama: string;
  kategori: string;
  slug: string;
  tahun: string;
};

const GREEN = '#123524';
const DARK = '#0B2A1C';
const LIME = '#8fd13f';
const GOLD = '#C8973A';

const menu = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/berita', label: 'Kelola Berita', icon: Newspaper },
  { href: '/admin/prestasi', label: 'Kelola Prestasi', icon: Trophy },
];

export default function AdminDashboard() {
  const router = useRouter();

  const [session, setSession] = useState<Session | null>(null);
  const [berita, setBerita] = useState<Berita[]>([]);
  const [prestasi, setPrestasi] = useState<Prestasi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [loggingOut, setLoggingOut] = useState(false);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const meResponse = await fetch('/api/auth/me', {
        cache: 'no-store',
      });

      if (!meResponse.ok) {
        router.replace('/admin/login');
        return;
      }

      const meData = await meResponse.json();

      if (!meData.user || meData.user.role !== 'admin') {
        router.replace('/admin/login');
        return;
      }

      setSession(meData.user);

      const [beritaResponse, prestasiResponse] = await Promise.all([
        fetch('/api/admin/berita', { cache: 'no-store' }),
        fetch('/api/admin/prestasi', { cache: 'no-store' }),
      ]);

      if (
        beritaResponse.status === 401 ||
        beritaResponse.status === 403 ||
        prestasiResponse.status === 401 ||
        prestasiResponse.status === 403
      ) {
        router.replace('/admin/login');
        return;
      }

      if (!beritaResponse.ok || !prestasiResponse.ok) {
        throw new Error('Data CMS gagal dimuat. Coba muat ulang.');
      }

      const [beritaData, prestasiData] = await Promise.all([
        beritaResponse.json(),
        prestasiResponse.json(),
      ]);

      setBerita(Array.isArray(beritaData.data) ? beritaData.data : []);
      setPrestasi(
        Array.isArray(prestasiData.data) ? prestasiData.data : [],
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Terjadi kesalahan saat memuat dashboard.',
      );
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Logout gagal. Silakan coba lagi.');
      }

      router.replace('/admin/login');
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Logout gagal.',
      );
      setLoggingOut(false);
    }
  };

  const formatDate = (value?: string) => {
    if (!value) return '-';

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return value;

    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const firstName =
    session?.namaLengkap?.trim().split(/\s+/)[0] || 'Admin';

  const stats = [
    {
      label: 'Total Berita',
      value: berita.length,
      icon: Newspaper,
      description: 'Konten berita sekolah',
      href: '/admin/berita',
    },
    {
      label: 'Total Prestasi',
      value: prestasi.length,
      icon: Trophy,
      description: 'Pencapaian yang tercatat',
      href: '/admin/prestasi',
    },
  ];

  return (
    <div className="cms-shell">
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        .cms-shell {
          min-height: 100vh;
          background: #f6f7f2;
          color: #20251f;
          font-family: Arial, Helvetica, sans-serif;
        }

        .cms-sidebar {
          width: 250px;
          flex-shrink: 0;
          background: linear-gradient(180deg, ${GREEN}, ${DARK});
          color: white;
          display: flex;
          flex-direction: column;
          padding: 25px 16px 18px;
        }

        .cms-main {
          flex: 1;
          min-width: 0;
        }

        .cms-menu {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 12px 13px;
          border-radius: 10px;
          color: rgba(255,255,255,.68);
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          transition: .2s ease;
        }

        .cms-menu:hover,
        .cms-menu-active {
          background: rgba(143,209,63,.13);
          color: ${LIME};
        }

        .cms-header {
          min-height: 94px;
          padding: 20px 34px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          background: #fff;
          border-bottom: 1px solid #e8eae3;
        }

        .cms-content {
          max-width: 1450px;
          margin: 0 auto;
          padding: 30px 34px 48px;
        }

        .cms-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .cms-card {
          background: white;
          border: 1px solid #e9ebe4;
          border-radius: 16px;
          padding: 23px;
          min-width: 0;
          box-shadow: 0 3px 12px rgba(20,40,20,.025);
        }

        .cms-action {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-radius: 9px;
          padding: 11px 14px;
          text-decoration: none;
          font-size: 12px;
          font-weight: 700;
          transition: .2s ease;
        }

        .cms-action-primary {
          background: ${GREEN};
          color: white;
        }

        .cms-action-primary:hover {
          background: #20543a;
          transform: translateY(-1px);
        }

        .cms-action-secondary {
          background: #f0f5e9;
          color: ${GREEN};
        }

        .cms-action-secondary:hover {
          background: #e5efd9;
        }

        .cms-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 15px 0;
          border-bottom: 1px solid #eff0eb;
        }

        .cms-row:last-child {
          border-bottom: 0;
        }

        .cms-logout {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px;
          color: rgba(255,255,255,.65);
          background: transparent;
          border: 0;
          border-radius: 9px;
          font-size: 12px;
          cursor: pointer;
          text-align: left;
        }

        .cms-logout:hover {
          background: rgba(255,255,255,.07);
          color: white;
        }

        .cms-mobile-brand {
          display: none;
        }

        @media (max-width: 900px) {
          .cms-sidebar {
            width: 210px;
          }

          .cms-header {
            padding: 20px 24px;
          }

          .cms-content {
            padding: 25px 24px 40px;
          }
        }

        @media (max-width: 640px) {
          .cms-shell {
            display: block !important;
          }

          .cms-sidebar {
            width: 100%;
            padding: 12px 14px;
          }

          .cms-sidebar-brand {
            display: none !important;
          }

          .cms-nav-label,
          .cms-profile,
          .cms-sidebar-footer {
            display: none !important;
          }

          .cms-nav {
            display: flex;
            gap: 7px;
            padding: 0 !important;
            overflow-x: auto;
          }

          .cms-menu {
            white-space: nowrap;
            flex-shrink: 0;
            padding: 10px 12px;
          }

          .cms-mobile-brand {
            display: flex;
            align-items: center;
            gap: 9px;
            padding: 0 2px 12px;
          }

          .cms-header {
            min-height: auto;
            padding: 20px 17px;
            align-items: flex-start;
          }

          .cms-header h1 {
            font-size: 19px !important;
          }

          .cms-header p {
            line-height: 1.6;
          }

          .cms-header-date {
            display: none;
          }

          .cms-content {
            padding: 19px 14px 32px;
          }

          .cms-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .cms-card {
            padding: 18px;
          }

          .cms-quick-actions {
            display: grid !important;
            grid-template-columns: 1fr;
          }

          .cms-quick-actions .cms-action {
            width: 100%;
          }

          .cms-row {
            align-items: flex-start;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cms-menu,
          .cms-action {
            transition: none !important;
          }
        }
      `}</style>

      <div style={{ minHeight: '100vh', display: 'flex' }}>
        <aside className="cms-sidebar">
          <Link
            href="/"
            className="cms-sidebar-brand"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 11,
              padding: '0 8px 25px',
              borderBottom: '1px solid rgba(255,255,255,.1)',
              textDecoration: 'none',
              color: 'white',
              marginBottom: 24,
            }}
          >
            <Image
              src="/images/smpcn.png"
              alt="Logo SMP Citra Negara"
              width={42}
              height={42}
              style={{
                objectFit: 'cover',
                borderRadius: 10,
              }}
            />
            <div>
              <div style={{ fontSize: 13, fontWeight: 800 }}>
                SMP Citra Negara
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: LIME,
                  marginTop: 4,
                  letterSpacing: '.5px',
                }}
              >
                CONTENT STUDIO
              </div>
            </div>
          </Link>

          <div
            className="cms-mobile-brand"
            style={{ textDecoration: 'none' }}
          >
            <Image
              src="/images/smpcn.png"
              alt="Logo SMP Citra Negara"
              width={34}
              height={34}
              style={{ objectFit: 'cover', borderRadius: 8 }}
            />
            <div>
              <div style={{ fontSize: 12, fontWeight: 800 }}>
                CN Content Studio
              </div>
              <div style={{ fontSize: 10, color: LIME }}>
                Admin Panel
              </div>
            </div>
          </div>

          <div
            className="cms-nav-label"
            style={{
              padding: '0 12px',
              marginBottom: 10,
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: '1.2px',
              color: 'rgba(255,255,255,.36)',
            }}
          >
            WORKSPACE
          </div>

          <nav className="cms-nav" style={{ display: 'grid', gap: 5 }}>
            {menu.map((item) => {
              const Icon = item.icon;
              const active = item.href === '/admin/dashboard';

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`cms-menu ${active ? 'cms-menu-active' : ''}`}
                >
                  <Icon size={17} />
                  <span>{item.label}</span>
                  {active && (
                    <span
                      style={{
                        marginLeft: 'auto',
                        width: 5,
                        height: 5,
                        borderRadius: '50%',
                        background: LIME,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div style={{ flex: 1, minHeight: 20 }} />

          <div
            className="cms-profile"
            style={{
              padding: '13px 11px',
              borderTop: '1px solid rgba(255,255,255,.1)',
              borderBottom: '1px solid rgba(255,255,255,.1)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 8,
            }}
          >
            <div
              style={{
                width: 35,
                height: 35,
                borderRadius: 11,
                background: 'rgba(143,209,63,.15)',
                display: 'grid',
                placeItems: 'center',
                color: LIME,
              }}
            >
              <User size={17} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  color: 'white',
                  fontSize: 12,
                  fontWeight: 700,
                  overflowWrap: 'anywhere',
                }}
              >
                {session?.namaLengkap || 'Administrator'}
              </div>
              <div
                style={{
                  color: 'rgba(255,255,255,.48)',
                  fontSize: 10,
                  marginTop: 4,
                }}
              >
                Administrator
              </div>
            </div>
          </div>

          <div className="cms-sidebar-footer">
            <Link
              href="/"
              target="_blank"
              className="cms-menu"
              style={{ marginBottom: 5 }}
            >
              <Globe size={16} />
              Lihat Website
              <ExternalLink size={13} style={{ marginLeft: 'auto' }} />
            </Link>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="cms-logout"
              style={{ opacity: loggingOut ? 0.6 : 1 }}
            >
              <LogOut size={16} />
              {loggingOut ? 'Keluar...' : 'Keluar dari Admin'}
            </button>
          </div>
        </aside>

        <div className="cms-main">
          <header className="cms-header">
            <div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  color: '#77816e',
                  letterSpacing: '1.3px',
                  marginBottom: 8,
                }}
              >
                CONTENT MANAGEMENT
              </div>
              <h1
                style={{
                  fontSize: 23,
                  fontWeight: 800,
                  color: GREEN,
                  margin: 0,
                  letterSpacing: '-.5px',
                }}
              >
                Dashboard Admin
              </h1>
              <p
                style={{
                  fontSize: 12,
                  color: '#777e73',
                  margin: '7px 0 0',
                }}
              >
                Halo, {firstName}! Kelola konten website sekolahmu.
              </p>
            </div>

            <div
              className="cms-header-date"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 11,
                color: '#72796e',
                background: '#f6f7f2',
                border: '1px solid #e8eae3',
                padding: '11px 14px',
                borderRadius: 10,
              }}
            >
              <Globe size={15} color={GREEN} />
              SMP Citra Negara
            </div>
          </header>

          <main className="cms-content">
            <section
              style={{
                background: `linear-gradient(120deg, ${GREEN}, ${DARK})`,
                color: 'white',
                borderRadius: 18,
                padding: '27px 27px',
                marginBottom: 23,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  width: 190,
                  height: 190,
                  border: '1px solid rgba(255,255,255,.1)',
                  borderRadius: '50%',
                  right: -35,
                  top: -95,
                  pointerEvents: 'none',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  width: 130,
                  height: 130,
                  border: '1px solid rgba(255,255,255,.08)',
                  borderRadius: '50%',
                  right: 30,
                  bottom: -95,
                  pointerEvents: 'none',
                }}
              />

              <div
                style={{
                  fontSize: 10,
                  color: LIME,
                  letterSpacing: '1.5px',
                  fontWeight: 800,
                  marginBottom: 12,
                }}
              >
                YOUR SCHOOL, YOUR STORY
              </div>
              <h2
                style={{
                  fontSize: 23,
                  lineHeight: 1.35,
                  margin: '0 0 9px',
                  fontWeight: 800,
                  position: 'relative',
                }}
              >
                Semua konten sekolah,
                <br />
                satu tempat.
              </h2>
              <p
                style={{
                  fontSize: 12,
                  color: 'rgba(255,255,255,.67)',
                  lineHeight: 1.8,
                  maxWidth: 440,
                  margin: '0 0 20px',
                  position: 'relative',
                }}
              >
                Publikasikan kabar terbaru dan dokumentasikan prestasi
                siswa SMP Citra Negara langsung dari dashboard ini.
              </p>

              <div
                className="cms-quick-actions"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 9,
                  position: 'relative',
                }}
              >
                <Link
                  href="/admin/berita"
                  className="cms-action"
                  style={{
                    background: LIME,
                    color: DARK,
                  }}
                >
                  <Plus size={15} />
                  Buat Berita
                </Link>
                <Link
                  href="/admin/prestasi"
                  className="cms-action"
                  style={{
                    background: 'rgba(255,255,255,.09)',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,.15)',
                  }}
                >
                  <Trophy size={15} />
                  Tambah Prestasi
                </Link>
              </div>
            </section>

            {error && (
              <div
                role="alert"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                  background: '#fff7ed',
                  color: '#9a3412',
                  border: '1px solid #fed7aa',
                  borderRadius: 12,
                  padding: 14,
                  marginBottom: 20,
                  fontSize: 12,
                  lineHeight: 1.6,
                }}
              >
                <AlertCircle size={17} style={{ flexShrink: 0 }} />
                <div style={{ flex: 1 }}>{error}</div>
                <button
                  onClick={() => void loadDashboard()}
                  style={{
                    border: 0,
                    background: 'transparent',
                    color: '#9a3412',
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: 12,
                  }}
                >
                  Coba lagi
                </button>
              </div>
            )}

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
                marginBottom: 13,
              }}
            >
              <div>
                <h2
                  style={{
                    fontSize: 15,
                    fontWeight: 800,
                    margin: 0,
                    color: '#263326',
                  }}
                >
                  Ringkasan Konten
                </h2>
                <p
                  style={{
                    fontSize: 11,
                    color: '#858b7f',
                    margin: '5px 0 0',
                  }}
                >
                  Statistik konten yang dikelola melalui CMS.
                </p>
              </div>

              <button
                onClick={() => void loadDashboard()}
                disabled={loading}
                title="Muat ulang data"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                  padding: '9px 11px',
                  background: 'white',
                  border: '1px solid #e6e9df',
                  borderRadius: 9,
                  color: GREEN,
                  cursor: loading ? 'wait' : 'pointer',
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                <RefreshCw
                  size={14}
                  style={{
                    animation: loading ? 'cms-spin 1s linear infinite' : 'none',
                  }}
                />
                Muat ulang
              </button>
            </div>

            <style jsx global>{`
              @keyframes cms-spin {
                to { transform: rotate(360deg); }
              }
            `}</style>

            <div className="cms-grid" style={{ marginBottom: 25 }}>
              {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <Link
                    href={stat.href}
                    key={stat.label}
                    className="cms-card"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: 12,
                      }}
                    >
                      <div
                        style={{
                          width: 43,
                          height: 43,
                          borderRadius: 12,
                          display: 'grid',
                          placeItems: 'center',
                          background: '#eef5e7',
                          color: GREEN,
                        }}
                      >
                        <Icon size={21} />
                      </div>
                      <ArrowUpRight size={17} color="#9ba391" />
                    </div>

                    <div
                      style={{
                        fontSize: 34,
                        fontWeight: 800,
                        color: GREEN,
                        letterSpacing: '-1px',
                        marginTop: 20,
                      }}
                    >
                      {loading ? '—' : stat.value}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 800,
                        marginTop: 4,
                      }}
                    >
                      {stat.label}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: '#858b7f',
                        marginTop: 5,
                      }}
                    >
                      {stat.description}
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="cms-grid">
              <section className="cms-card">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 12,
                    marginBottom: 6,
                  }}
                >
                  <div>
                    <h2
                      style={{
                        margin: 0,
                        fontSize: 14,
                        fontWeight: 800,
                      }}
                    >
                      Berita Terbaru
                    </h2>
                    <p
                      style={{
                        margin: '5px 0 0',
                        color: '#858b7f',
                        fontSize: 11,
                      }}
                    >
                      Publikasi sekolah
                    </p>
                  </div>
                  <Newspaper size={20} color={GREEN} />
                </div>

                {loading ? (
                  <p
                    style={{
                      color: '#858b7f',
                      fontSize: 12,
                      padding: '20px 0',
                    }}
                  >
                    Memuat berita...
                  </p>
                ) : berita.length === 0 ? (
                  <div
                    style={{
                      padding: '24px 0',
                      textAlign: 'center',
                    }}
                  >
                    <FileText
                      size={27}
                      color="#a2aa98"
                      style={{ margin: '0 auto 10px' }}
                    />
                    <p
                      style={{
                        color: '#858b7f',
                        fontSize: 12,
                        margin: '0 0 13px',
                      }}
                    >
                      Belum ada berita.
                    </p>
                    <Link
                      href="/admin/berita"
                      className="cms-action cms-action-secondary"
                    >
                      <Plus size={14} />
                      Tambah berita
                    </Link>
                  </div>
                ) : (
                  berita.slice(0, 4).map((item) => (
                    <div className="cms-row" key={item.id}>
                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            lineHeight: 1.6,
                            overflowWrap: 'anywhere',
                          }}
                        >
                          {item.judul}
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 7,
                            marginTop: 6,
                            fontSize: 10,
                            color: '#858b7f',
                          }}
                        >
                          <span>{item.kategori}</span>
                          <span>·</span>
                          <span>{formatDate(item.tanggal)}</span>
                        </div>
                      </div>
                      <Link
                        href="/admin/berita"
                        aria-label={`Kelola berita ${item.judul}`}
                        style={{ color: GREEN, flexShrink: 0 }}
                      >
                        <ArrowUpRight size={17} />
                      </Link>
                    </div>
                  ))
                )}

                <Link
                  href="/admin/berita"
                  className="cms-action cms-action-secondary"
                  style={{ marginTop: 14, width: '100%' }}
                >
                  Kelola Semua Berita
                  <ArrowUpRight size={14} />
                </Link>
              </section>

              <section className="cms-card">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 12,
                    marginBottom: 6,
                  }}
                >
                  <div>
                    <h2
                      style={{
                        margin: 0,
                        fontSize: 14,
                        fontWeight: 800,
                      }}
                    >
                      Prestasi Terbaru
                    </h2>
                    <p
                      style={{
                        margin: '5px 0 0',
                        color: '#858b7f',
                        fontSize: 11,
                      }}
                    >
                      Pencapaian sekolah
                    </p>
                  </div>
                  <Trophy size={20} color={GREEN} />
                </div>

                {loading ? (
                  <p
                    style={{
                      color: '#858b7f',
                      fontSize: 12,
                      padding: '20px 0',
                    }}
                  >
                    Memuat prestasi...
                  </p>
                ) : prestasi.length === 0 ? (
                  <div
                    style={{
                      padding: '24px 0',
                      textAlign: 'center',
                    }}
                  >
                    <Trophy
                      size={27}
                      color="#a2aa98"
                      style={{ margin: '0 auto 10px' }}
                    />
                    <p
                      style={{
                        color: '#858b7f',
                        fontSize: 12,
                        margin: '0 0 13px',
                      }}
                    >
                      Belum ada prestasi.
                    </p>
                    <Link
                      href="/admin/prestasi"
                      className="cms-action cms-action-secondary"
                    >
                      <Plus size={14} />
                      Tambah prestasi
                    </Link>
                  </div>
                ) : (
                  prestasi.slice(0, 4).map((item) => (
                    <div className="cms-row" key={item.id}>
                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            lineHeight: 1.6,
                            overflowWrap: 'anywhere',
                          }}
                        >
                          {item.nama}
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 7,
                            marginTop: 6,
                            fontSize: 10,
                            color: '#858b7f',
                          }}
                        >
                          <span>{item.kategori}</span>
                          <span>·</span>
                          <span>{item.tahun}</span>
                        </div>
                      </div>
                      <Link
                        href="/admin/prestasi"
                        aria-label={`Kelola prestasi ${item.nama}`}
                        style={{ color: GREEN, flexShrink: 0 }}
                      >
                        <ArrowUpRight size={17} />
                      </Link>
                    </div>
                  ))
                )}

                <Link
                  href="/admin/prestasi"
                  className="cms-action cms-action-secondary"
                  style={{ marginTop: 14, width: '100%' }}
                >
                  Kelola Semua Prestasi
                  <ArrowUpRight size={14} />
                </Link>
              </section>
            </div>

            <footer
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 10,
                paddingTop: 24,
                marginTop: 8,
                color: '#92988b',
                fontSize: 10,
              }}
            >
              <span>© {new Date().getFullYear()} SMP Citra Negara</span>
              <span>Content Management System</span>
            </footer>

            <div style={{ marginTop: 14 }}>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="cms-logout"
                style={{
                  display: 'none',
                }}
              >
                <CheckCircle2 size={14} />
                {loggingOut ? 'Keluar...' : 'Keluar'}
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
```