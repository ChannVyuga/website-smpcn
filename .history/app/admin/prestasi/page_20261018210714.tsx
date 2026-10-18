'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Plus,
  Search,
  Pencil,
  Trash2,
  RefreshCw,
  X,
  Award,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

type Prestasi = {
  id: number;
  tahun: string;
  nama: string;
  kategori: string;
  foto_url: string;
  slug: string;
  deskripsi: string | null;
  created_at?: string;
};

type FormPrestasi = {
  tahun: string;
  nama: string;
  kategori: string;
  foto_url: string;
  slug: string;
  deskripsi: string;
};

const EMPTY_FORM: FormPrestasi = {
  tahun: String(new Date().getFullYear()),
  nama: '',
  kategori: '',
  foto_url: '',
  slug: '',
  deskripsi: '',
};

const C = {
  bg: '#F7F7F2',
  card: '#FFFFFF',
  text: '#20251F',
  muted: '#777D73',
  border: '#E5E7DF',
  green: '#173A2B',
  lime: '#B8F34A',
  red: '#B42318',
};

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  border: `1px solid ${C.border}`,
  borderRadius: 10,
  background: '#FFFFFF',
  color: C.text,
  fontSize: 14,
  outline: 'none',
  boxSizing: 'border-box' as const,
};

function makeSlug(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function AdminPrestasiPage() {
  const router = useRouter();

  const [items, setItems] = useState<Prestasi[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormPrestasi>(EMPTY_FORM);
  const [slugManual, setSlugManual] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadPrestasi = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/prestasi', {
        cache: 'no-store',
      });

      if (res.status === 401 || res.status === 403) {
        router.replace('/admin/login');
        return;
      }

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Gagal memuat prestasi.');
      }

      setItems(Array.isArray(result.data) ? result.data : []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Terjadi kesalahan saat memuat data.'
      );
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void loadPrestasi();
  }, [loadPrestasi]);

  const filtered = items.filter((item) => {
    const keyword = search.toLowerCase();

    return (
      item.nama.toLowerCase().includes(keyword) ||
      item.kategori.toLowerCase().includes(keyword) ||
      String(item.tahun).toLowerCase().includes(keyword)
    );
  });

  function openCreate() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setSlugManual(false);
    setError('');
    setSuccess('');
    setFormOpen(true);
  }

  function openEdit(item: Prestasi) {
    setEditingId(item.id);
    setForm({
      tahun: String(item.tahun ?? ''),
      nama: item.nama ?? '',
      kategori: item.kategori ?? '',
      foto_url: item.foto_url ?? '',
      slug: item.slug ?? '',
      deskripsi: item.deskripsi ?? '',
    });
    setSlugManual(true);
    setError('');
    setSuccess('');
    setFormOpen(true);
  }

  function updateField(field: keyof FormPrestasi, value: string) {
    setForm((current) => {
      const next = { ...current, [field]: value };

      if (field === 'nama' && !slugManual) {
        next.slug = makeSlug(value);
      }

      return next;
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const endpoint = editingId
        ? `/api/admin/prestasi/${editingId}`
        : '/api/admin/prestasi';

      const res = await fetch(endpoint, {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (res.status === 401 || res.status === 403) {
        router.replace('/admin/login');
        return;
      }

      if (!res.ok) {
        throw new Error(result.error || 'Gagal menyimpan prestasi.');
      }

      setSuccess(editingId ? 'Prestasi berhasil diperbarui.' : 'Prestasi berhasil ditambahkan.');
      setFormOpen(false);
      setForm(EMPTY_FORM);
      setEditingId(null);

      await loadPrestasi();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Terjadi kesalahan saat menyimpan.'
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(item: Prestasi) {
    const confirmed = window.confirm(
      `Hapus prestasi "${item.nama}"?\n\nData yang dihapus tidak bisa dipulihkan melalui halaman ini.`
    );

    if (!confirmed) return;

    setError('');
    setSuccess('');

    try {
      const res = await fetch(`/api/admin/prestasi/${item.id}`, {
        method: 'DELETE',
      });

      const result = await res.json();

      if (res.status === 401 || res.status === 403) {
        router.replace('/admin/login');
        return;
      }

      if (!res.ok) {
        throw new Error(result.error || 'Gagal menghapus prestasi.');
      }

      setSuccess('Prestasi berhasil dihapus.');
      await loadPrestasi();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Terjadi kesalahan saat menghapus.'
      );
    }
  }

  const labelStyle = {
    display: 'block',
    fontSize: 13,
    fontWeight: 700,
    marginBottom: 7,
    color: C.text,
  } as const;

  return (
    <main
      style={{
        minHeight: '100vh',
        background: ,
        color: C.text,
        padding: 'clamp(16px, 4vw, 36px)',
      }}
    >
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <Link
          href="/admin/dashboard"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            color: C.muted,
            textDecoration: 'none',
            fontSize: 13,
            fontWeight: 700,
            marginBottom: 26,
          }}
        >
          <ArrowLeft size={16} />
          Kembali ke Dashboard
        </Link>

        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 18,
            marginBottom: 28,
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 9,
                color: C.green,
                marginBottom: 8,
              }}
            >
              <Award size={22} />
              <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.1em' }}>
                CONTENT MANAGEMENT
              </span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(28px, 4vw, 38px)',
                fontWeight: 850,
                letterSpacing: '-0.04em',
                margin: 0,
              }}
            >
              Kelola Prestasi
            </h1>

            <p style={{ color: C.muted, fontSize: 14, margin: '8px 0 0' }}>
              Kelola publikasi pencapaian dan prestasi sekolah.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreate}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              border: 'none',
              borderRadius: 11,
              padding: '13px 18px',
              background: C.lime,
              color: C.text,
              fontWeight: 800,
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            <Plus size={18} />
            Tambah Prestasi
          </button>
        </header>

        {error && !formOpen && (
          <div
            role="alert"
            style={{
              display: 'flex',
              gap: 9,
              alignItems: 'center',
              padding: 14,
              borderRadius: 10,
              background: '#FEF3F2',
              color: C.red,
              marginBottom: 16,
              fontSize: 13,
            }}
          >
            <AlertCircle size={17} />
            {error}
            <button
              type="button"
              onClick={() => void loadPrestasi()}
              style={{ marginLeft: 'auto', cursor: 'pointer' }}
            >
              Coba lagi
            </button>
          </div>
        )}

        {success && (
          <div
            role="status"
            style={{
              display: 'flex',
              gap: 9,
              alignItems: 'center',
              padding: 14,
              borderRadius: 10,
              background: '#ECFDF3',
              color: '#166534',
              marginBottom: 16,
              fontSize: 13,
            }}
          >
            <CheckCircle2 size={17} />
            {success}
            <button
              type="button"
              onClick={() => setSuccess('')}
              style={{ marginLeft: 'auto', border: 0, background: 'none', cursor: 'pointer' }}
              aria-label="Tutup notifikasi"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <section
          style={{
            background: C.card,
            border: `1px solid ${C.border}`,
            borderRadius: 16,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: 18,
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 12,
              borderBottom: `1px solid ${C.border}`,
            }}
          >
            <div style={{ position: 'relative', flex: '1 1 240px' }}>
              <Search
                size={17}
                style={{
                  position: 'absolute',
                  left: 13,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: C.muted,
                }}
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cari nama, kategori, atau tahun..."
                aria-label="Cari prestasi"
                style={{ ...inputStyle, paddingLeft: 40 }}
              />
            </div>

            <button
              type="button"
              onClick={() => void loadPrestasi()}
              disabled={loading}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                border: `1px solid ${C.border}`,
                background: '#FFFFFF',
                borderRadius: 10,
                padding: '11px 13px',
                cursor: loading ? 'wait' : 'pointer',
                color: C.text,
              }}
            >
              <RefreshCw size={15} />
              Refresh
            </button>
          </div>

          <div style={{ padding: '0 18px', overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                minWidth: 720,
                borderCollapse: 'collapse',
                textAlign: 'left',
              }}
            >
              <thead>
                <tr style={{ color: C.muted, fontSize: 11, letterSpacing: '0.07em' }}>
                  {['PRESTASI', 'KATEGORI', 'TAHUN', 'SLUG', 'AKSI'].map((heading) => (
                    <th
                      key={heading}
                      style={{
                        padding: '16px 12px',
                        fontWeight: 800,
                        borderBottom: `1px solid ${C.border}`,
                      }}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: 44, color: C.muted }}>
                      Memuat data prestasi...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: 44 }}>
                      <Award size={28} style={{ color: C.muted, margin: '0 auto 10px' }} />
                      <p style={{ fontWeight: 700, margin: 0 }}>
                        {search ? 'Prestasi tidak ditemukan.' : 'Belum ada data prestasi.'}
                      </p>
                      <p style={{ fontSize: 13, color: C.muted, marginTop: 6 }}>
                        {search ? 'Coba kata kunci lain.' : 'Klik Tambah Prestasi untuk memulai.'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filtered.map((item) => (
                    <tr key={item.id}>
                      <td style={{ padding: '16px 12px', borderBottom: `1px solid ${C.border}` }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div
                            style={{
                              width: 42,
                              height: 42,
                              flexShrink: 0,
                              borderRadius: 10,
                              background: '#F0F5E6',
                              display: 'grid',
                              placeItems: 'center',
                              overflow: 'hidden',
                            }}
                          >
                            {item.foto_url ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={item.foto_url}
                                alt=""
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                            ) : (
                              <Award size={19} color={C.green} />
                            )}
                          </div>

                          <div>
                            <div style={{ fontSize: 13, fontWeight: 800, maxWidth: 290 }}>
                              {item.nama}
                            </div>
                            <a
                              href={`/prestasi/${encodeURIComponent(item.slug)}`}
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 4,
                                color: '#64748B',
                                textDecoration: 'none',
                                fontSize: 11,
                                marginTop: 5,
                              }}
                            >
                              Lihat halaman <ExternalLink size={11} />
                            </a>
                          </div>
                        </div>
                      </td>

                      <td style={{ padding: '16px 12px', borderBottom: `1px solid ${C.border}` }}>
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '5px 9px',
                            borderRadius: 7,
                            background: '#F0F5E6',
                            color: C.green,
                            fontSize: 11,
                            fontWeight: 700,
                          }}
                        >
                          {item.kategori}
                        </span>
                      </td>

                      <td style={{ padding: '16px 12px', borderBottom: `1px solid ${C.border}`, fontSize: 13 }}>
                        {item.tahun}
                      </td>

                      <td style={{ padding: '16px 12px', borderBottom: `1px solid ${C.border}`, color: C.muted, fontSize: 12 }}>
                        {item.slug}
                      </td>

                      <td style={{ padding: '16px 12px', borderBottom: `1px solid ${C.border}` }}>
                        <div style={{ display: 'flex', gap: 7 }}>
                          <button
                            type="button"
                            onClick={() => openEdit(item)}
                            aria-label={`Edit ${item.nama}`}
                            title="Edit prestasi"
                            style={{
                              display: 'grid',
                              placeItems: 'center',
                              width: 34,
                              height: 34,
                              borderRadius: 8,
                              border: `1px solid ${C.border}`,
                              background: '#FFFFFF',
                              cursor: 'pointer',
                            }}
                          >
                            <Pencil size={15} />
                          </button>

                          <button
                            type="button"
                            onClick={() => void handleDelete(item)}
                            aria-label={`Hapus ${item.nama}`}
                            title="Hapus prestasi"
                            style={{
                              display: 'grid',
                              placeItems: 'center',
                              width: 34,
                              height: 34,
                              borderRadius: 8,
                              border: '1px solid #FECACA',
                              background: '#FFF7F7',
                              color: C.red,
                              cursor: 'pointer',
                            }}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div
            style={{
              padding: '15px 20px',
              color: C.muted,
              fontSize: 12,
              borderTop: `1px solid ${C.border}`,
            }}
          >
            Menampilkan {filtered.length} dari {items.length} prestasi
          </div>
        </section>

        {formOpen && (
          <div
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget && !saving) {
                setFormOpen(false);
              }
            }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100,
              background: 'rgba(15, 23, 18, 0.55)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 16,
              overflowY: 'auto',
            }}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="prestasi-form-title"
              style={{
                width: '100%',
                maxWidth: 620,
                maxHeight: '92vh',
                overflowY: 'auto',
                background: '#FFFFFF',
                borderRadius: 18,
                padding: 'clamp(20px, 4vw, 30px)',
                boxSizing: 'border-box',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 24,
                }}
              >
                <div>
                  <h2 id="prestasi-form-title" style={{ fontSize: 22, fontWeight: 850, margin: 0 }}>
                    {editingId ? 'Edit Prestasi' : 'Tambah Prestasi'}
                  </h2>
                  <p style={{ fontSize: 13, color: C.muted, margin: '6px 0 0' }}>
                    Lengkapi informasi prestasi sekolah.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  disabled={saving}
                  aria-label="Tutup form"
                  style={{
                    width: 36,
                    height: 36,
                    border: `1px solid ${C.border}`,
                    borderRadius: 9,
                    background: '#FFFFFF',
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                >
                  <X size={17} />
                </button>
              </div>

              {error && (
                <div
                  role="alert"
                  style={{
                    padding: 12,
                    borderRadius: 9,
                    background: '#FEF3F2',
                    color: C.red,
                    fontSize: 13,
                    marginBottom: 16,
                  }}
                >
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 16 }}>
                  <label>
                    <span style={labelStyle}>Nama Prestasi *</span>
                    <input
                      required
                      value={form.nama}
                      onChange={(event) => updateField('nama', event.target.value)}
                      placeholder="Contoh: Juara 1 Olimpiade"
                      style={inputStyle}
                    />
                  </label>

                  <label>
                    <span style={labelStyle}>Tahun *</span>
                    <input
                      required
                      value={form.tahun}
                      onChange={(event) => updateField('tahun', event.target.value)}
                      placeholder="2026"
                      style={inputStyle}
                    />
                  </label>

                  <label>
                    <span style={labelStyle}>Kategori *</span>
                    <input
                      required
                      list="kategori-prestasi"
                      value={form.kategori}
                      onChange={(event) => updateField('kategori', event.target.value)}
                      placeholder="Pilih atau ketik kategori"
                      style={inputStyle}
                    />
                    <datalist id="kategori-prestasi">
                      <option value="Akademik" />
                      <option value="Olahraga" />
                      <option value="Olahraga Elektronik" />
                      <option value="Seni" />
                      <option value="Organisasi" />
                    </datalist>
                  </label>

                  <label>
                    <span style={labelStyle}>URL Foto *</span>
                    <input
                      required
                      type="url"
                      value={form.foto_url}
                      onChange={(event) => updateField('foto_url', event.target.value)}
                      placeholder="https://..."
                      style={inputStyle}
                    />
                  </label>
                </div>

                {form.foto_url && (
                  <div
                    style={{
                      marginTop: 16,
                      padding: 10,
                      border: `1px solid ${C.border}`,
                      borderRadius: 11,
                      background: C.bg,
                    }}
                  >
                    <p style={{ fontSize: 12, color: C.muted, margin: '0 0 8px' }}>
                      Preview foto
                    </p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={form.foto_url}
                      alt="Preview prestasi"
                      onError={(event) => {
                        event.currentTarget.style.display = 'none';
                      }}
                      onLoad={(event) => {
                        event.currentTarget.style.display = 'block';
                      }}
                      style={{
                        maxWidth: '100%',
                        maxHeight: 190,
                        objectFit: 'contain',
                        borderRadius: 8,
                      }}
                    />
                  </div>
                )}

                <label style={{ display: 'block', marginTop: 16 }}>
                  <span style={labelStyle}>Slug URL *</span>
                  <input
                    required
                    value={form.slug}
                    onChange={(event) => {
                      setSlugManual(true);
                      updateField('slug', event.target.value);
                    }}
                    placeholder="juara-olimpiade-2026"
                    pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                    title="Gunakan huruf kecil, angka, dan tanda hubung."
                    style={inputStyle}
                  />
                  <span style={{ display: 'block', marginTop: 6, color: C.muted, fontSize: 11 }}>
                    Alamat halaman: /prestasi/{form.slug || 'slug-prestasi'}
                  </span>
                </label>

                <label style={{ display: 'block', marginTop: 16 }}>
                  <span style={labelStyle}>Deskripsi</span>
                  <textarea
                    value={form.deskripsi}
                    onChange={(event) => updateField('deskripsi', event.target.value)}
                    placeholder="Ceritakan pencapaian ini..."
                    rows={5}
                    style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }}
                  />
                </label>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 10,
                    flexWrap: 'wrap',
                    marginTop: 24,
                    paddingTop: 18,
                    borderTop: `1px solid ${C.border}`,
                  }}
                >
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => setFormOpen(false)}
                    style={{
                      border: `1px solid ${C.border}`,
                      borderRadius: 10,
                      background: '#FFFFFF',
                      padding: '12px 16px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Batal
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      border: 'none',
                      borderRadius: 10,
                      background: C.green,
                      color: '#FFFFFF',
                      padding: '12px 18px',
                      fontWeight: 800,
                      cursor: saving ? 'wait' : 'pointer',
                      opacity: saving ? 0.7 : 1,
                    }}
                  >
                    {saving && <RefreshCw size={15} />}
                    {saving ? 'Menyimpan...' : editingId ? 'Simpan Perubahan' : 'Simpan Prestasi'}
                  </button>
                </div>
              </form>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}