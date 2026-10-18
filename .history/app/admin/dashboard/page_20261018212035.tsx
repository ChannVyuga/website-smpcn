'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Session = {
  namaLengkap?: string;
  email?: string;
  role?: string;
};

const GREEN = '#123524';
const LIME = '#8fd13f';

export default function AdminDashboard() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    let active = true;

    async function checkSession() {
      try {
        const response = await fetch('/api/auth/me', {
          cache: 'no-store',
        });

        if (!response.ok) {
          router.replace('/admin/login');
          return;
        }

        const result = await response.json();

        if (!result.user || result.user.role !== 'admin') {
          router.replace('/admin/login');
          return;
        }

        if (active) setSession(result.user);
      } catch {
        if (active) {
          router.replace('/admin/login');
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void checkSession();

    return () => {
      active = false;
    };
  }, [router]);

  async function handleLogout() {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Logout gagal. Coba lagi.');
      }

      router.replace('/admin/login');
      router.refresh();
    } catch {
      setLoggingOut(false);
      alert('Logout gagal. Silakan coba lagi.');
    }
  }

  if (loading) {
    return (
      <main style={styles.center}>
        Memeriksa sesi admin...
      </main>
    );
  }

  if (!session || session.role !== 'admin') {
    return (
      <main style={styles.center}>
        Mengalihkan ke halaman login...
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div>
          <p style={styles.eyebrow}>SMP CITRA NEGARA</p>
          <h1 style={styles.title}>Dashboard Admin</h1>
          <p style={styles.muted}>
            Halo, {session.namaLengkap?.trim() || 'Admin'}.
            Kelola konten website sekolah di sini.
          </p>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          style={styles.logout}
        >
          {loggingOut ? 'Keluar...' : 'Keluar'}
        </button>
      </header>

      <section style={styles.welcome}>
        <p style={styles.eyebrow}>CONTENT MANAGEMENT</p>
        <h2 style={styles.welcomeTitle}>
          Semua konten, satu tempat.
        </h2>
        <p style={styles.welcomeText}>
          Pilih menu untuk mengelola berita dan prestasi
          SMP Citra Negara.
        </p>
      </section>


      <section style={styles.grid}>
        <Link href="/admin/berita" style={styles.card}>
          <span style={styles.icon}>▤</span>
          <h2 style={styles.cardTitle}>Kelola Berita</h2>
          <p style={styles.muted}>
            Tambah, edit, dan hapus berita sekolah.
          </p>
          <span style={styles.linkText}>Buka berita →</span>
        </Link>

        <Link href="/admin/prestasi" style={styles.card}>
          <span style={styles.icon}>🏆</span>
          <h2 style={styles.cardTitle}>Kelola Prestasi</h2>
          <p style={styles.muted}>
            Dokumentasikan pencapaian siswa dan sekolah.
          </p>
          <span style={styles.linkText}>Buka prestasi →</span>
        </Link>

        <Link href="/admin/guru" style={styles.card}>
          <span style={styles.icon}>👨‍🏫</span>
          <h2 style={styles.cardTitle}>Kelola Guru</h2>
          <p style={styles.muted}>
            Kelola profil dan foto guru sekolah.
          </p>
          <span style={styles.linkText}>Buka direktori guru →</span>
        </Link>

        <Link href="/admin/staff" style={styles.card}>
          <span style={styles.icon}>👥</span>
          <h2 style={styles.cardTitle}>Kelola Staff</h2>
          <p style={styles.muted}>
            Kelola profil dan foto staff sekolah.
          </p>
          <span style={styles.linkText}>Buka direktori staff →</span>
        </Link>
      </section>


      <footer style={styles.footer}>
        © {new Date().getFullYear()} SMP Citra Negara
      </footer>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    padding: 'clamp(20px, 5vw, 48px)',
    background: '#f6f7f2',
    color: '#20251f',
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
  center: {
    minHeight: '100vh',
    display: 'grid',
    placeItems: 'center',
    background: '#f6f7f2',
    color: GREEN,
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 32,
  },
  eyebrow: {
    margin: '0 0 10px',
    color: GREEN,
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: 1.5,
  },
  title: {
    margin: 0,
    color: GREEN,
    fontSize: 'clamp(24px, 4vw, 34px)',
  },
  muted: {
    color: '#737a70',
    fontSize: 13,
    lineHeight: 1.7,
  },
  logout: {
    padding: '10px 16px',
    border: '1px solid #d9dfd3',
    borderRadius: 8,
    background: '#fff',
    color: GREEN,
    fontWeight: 700,
    cursor: 'pointer',
  },
  welcome: {
    padding: 'clamp(22px, 4vw, 36px)',
    borderRadius: 14,
    background: GREEN,
    color: '#fff',
    marginBottom: 24,
  },
  welcomeTitle: {
    margin: '0 0 10px',
    fontSize: 'clamp(22px, 4vw, 30px)',
  },
  welcomeText: {
    maxWidth: 500,
    color: '#d8e3d8',
    fontSize: 13,
    lineHeight: 1.8,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
    gap: 18,
  },
  card: {
    display: 'block',
    padding: 24,
    border: '1px solid #e5e9df',
    borderRadius: 12,
    background: '#fff',
    color: '#20251f',
    textDecoration: 'none',
  },
  icon: {
    fontSize: 26,
    color: GREEN,
  },
  cardTitle: {
    margin: '18px 0 8px',
    fontSize: 18,
    color: GREEN,
  },
  linkText: {
    display: 'inline-block',
    marginTop: 12,
    color: GREEN,
    fontSize: 13,
    fontWeight: 800,
  },
  footer: {
    marginTop: 36,
    paddingTop: 20,
    borderTop: '1px solid #e1e5dc',
    color: '#737a70',
    fontSize: 12,
  },
};