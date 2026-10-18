'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Plus,
  Search,
  Pencil,
  Trash2,
  RefreshCw,
  X,
  Newspaper,
  Star,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

type Berita = {
  id: number;
  tanggal: string;
  judul: string;
  kategori: string;
  foto_url: string;
  slug: string;
  excerpt: string | null;
  konten: string | null;
  featured: boolean | null;
  created_at: string | null;
};

type FormBerita = {
  tanggal: string;
  judul: string;
  kategori: string;
  foto_url: string;
  slug: string;
  excerpt: string;
  konten: string;
  featured: boolean;
};

const EMPTY_FORM: FormBerita = {
  tanggal: new Date().toLocaleDateString('en-CA'),
  judul: '',
  kategori: '',
  foto_url: '',
  slug: '',
  excerpt: '',
  konten: '',
  featured: false,
};

const inputStyle = {
  width: '100%',
  padding: '11px 13px',
  border: '1px solid #DDE2E8',
  borderRadius: 9,
  background: '#FFFFFF',
  color: '#172033',
  fontSize: 14,
  outline: 'none',
  boxSizing: 'border-box' as const,
};

const labelStyle = {
  display: 'block',
  fontSize: 13,
  fontWeight: 600,
  color: '#344054',
  marginBottom: 7,
};

function makeSlug(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function formatDate(value: string) {
  if (!value) return '-';

  const date = new Date(`${value.slice(0, 10)}T00:00:00`);

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function AdminBeritaPage() {
  const router = useRouter();

  const [items, setItems] = useState<Berita[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormBerita>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadBerita = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/berita', {
        cache: 'no-store',
      });

      if (res.status === 401 || res.status === 403) {
        router.replace('/admin/login');
        return;
      }

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Gagal memuat berita.');
      }

      setItems(Array.isArray(result.data) ? result.data : []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Terjadi kesalahan jaringan.'
      );
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void loadBerita();
  }, [loadBerita]);

  const filteredItems = items.filter((item) => {
    const keyword = search.toLowerCase().trim();

    return (
      item.judul.toLowerCase().includes(keyword) ||
      item.kategori.toLowerCase().includes(keyword) ||
      item.slug.toLowerCase().includes(keyword)
    );
  });

  function openCreateForm() {
    setEditingId(null);
    setForm({ ...EMPTY_FORM });
    setError('');
    setSuccess('');
    setFormOpen(true);
  }

  function openEditForm(item: Berita) {
    setEditingId(item.id);
    setForm({
      tanggal: item.tanggal?.slice(0, 10) || '',
      judul: item.judul,
      kategori: item.kategori,
      foto_url: item.foto_url,
      slug: item.slug,
      excerpt: item.excerpt || '',
      konten: item.konten || '',
      featured: item.featured === true,
    });
    setError('');
    setSuccess('');
    setFormOpen(true);
  }

  function updateField<K extends keyof FormBerita>(
    key: K,
    value: FormBerita[K]
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const endpoint = editingId
        ? `/api/admin/berita/${editingId}`
        : '/api/admin/berita';

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
        throw new Error(result.error || 'Gagal menyimpan berita.');
      }

      setFormOpen(false);
      setSuccess(editingId ? 'Berita berhasil diperbarui.' : 'Berita berhasil ditambahkan.');
      await loadBerita();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Terjadi kesalahan jaringan.'
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(item: Berita) {
    const confirmed = window.confirm(
      `Hapus berita "${item.judul}"?\n\nTindakan ini menghapus data berita dari database dan tidak dapat dibatalkan.`
    );

    if (!confirmed) return;

    setDeletingId(item.id);
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`/api/admin/berita/${item.id}`, {
        method: 'DELETE',
      });

      const result = await res.json();

      if (res.status === 401 || res.status === 403) {
        router.replace('/admin/login');
        return;
      }

      if (!res.ok) {
        throw new Error(result.error || 'Gagal menghapus berita.');
      }

      setSuccess('Berita berhasil dihapus.');
      await loadBerita();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Terjadi kesalahan jaringan.'
      );
    } finally {
      setDeletingId(null);
    }
  }

  const featuredCount = items.filter((item) => item.featured).length;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#F6F8FB',
        color: '#172033',
        fontFamily: 'inherit',
      }}
    >

      <main
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '34px 24px 60px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: 20,
            marginBottom: 28,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: '#176B43',
                letterSpacing: 1,
                marginBottom: 9,
              }}
            >
              MANAJEMEN KONTEN
            </div>
            <h1
              style={{
                fontSize: 30,
                letterSpacing: '-0.8px',
                margin: 0,
                fontWeight: 750,
              }}
            >
              Berita
            </h1>
            <p
              style={{
                color: '#667085',
                fontSize: 14,
                margin: '9px 0 0',
                lineHeight: 1.6,
              }}
            >
              Kelola publikasi dan informasi SMP Citra Negara.
            </p>
          </div>

          <button
            onClick={openCreateForm}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '12px 17px',
              background: '#176B43',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 650,
              cursor: 'pointer',
            }}
          >
            <Plus size={18} />
            Tambah berita
          </button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
            gap: 16,
            marginBottom: 24,
          }}
        >
          {[
            {
              label: 'Total berita',
              value: items.length,
              description: 'Semua publikasi',
              icon: Newspaper,
            },
            {
              label: 'Berita unggulan',
              value: featuredCount,
              description: 'Ditandai sebagai featured',
              icon: Star,
            },
          ].map((card) => (
            <div
              key={card.label}
              style={{
                padding: 21,
                background: '#FFFFFF',
                border: '1px solid #E8ECF1',
                borderRadius: 14,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 17,
                }}
              >
                <span style={{ color: '#667085', fontSize: 13 }}>
                  {card.label}
                </span>
                <card.icon size={19} color="#176B43" />
              </div>
              <div style={{ fontSize: 30, fontWeight: 750 }}>
                {loading ? '—' : card.value}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: '#98A2B3',
                  marginTop: 6,
                }}
              >
                {card.description}
              </div>
            </div>
          ))}
        </div>

        {success && (
          <div
            role="status"
            style={{
              display: 'flex',
              gap: 9,
              alignItems: 'center',
              padding: '13px 15px',
              marginBottom: 18,
              border: '1px solid #B7E4C7',
              borderRadius: 10,
              background: '#F0FAF3',
              color: '#176B43',
              fontSize: 13,
            }}
          >
            <CheckCircle2 size={17} />
            {success}
            <button
              onClick={() => setSuccess('')}
              aria-label="Tutup pesan"
              style={{
                marginLeft: 'auto',
                border: 0,
                background: 'transparent',
                cursor: 'pointer',
                color: 'inherit',
              }}
            >
              <X size={16} />
            </button>
          </div>
        )}

        {error && (
          <div
            role="alert"
            style={{
              display: 'flex',
              gap: 9,
              alignItems: 'center',
              padding: '13px 15px',
              marginBottom: 18,
              border: '1px solid #F2C6C6',
              borderRadius: 10,
              background: '#FFF5F5',
              color: '#B42318',
              fontSize: 13,
            }}
          >
            <AlertCircle size={17} />
            <span style={{ flex: 1 }}>{error}</span>
            <button
              onClick={() => setError('')}
              aria-label="Tutup pesan error"
              style={{
                border: 0,
                background: 'transparent',
                cursor: 'pointer',
                color: 'inherit',
              }}
            >
              <X size={16} />
            </button>
          </div>
        )}

        {formOpen && (
          <section
            style={{
              background: '#FFFFFF',
              border: '1px solid #DDE5DF',
              borderRadius: 15,
              padding: 24,
              marginBottom: 24,
              boxShadow: '0 5px 20px rgba(16, 24, 40, 0.04)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 12,
                marginBottom: 22,
              }}
            >
              <div>
                <h2 style={{ fontSize: 19, margin: 0 }}>
                  {editingId ? 'Edit berita' : 'Tambah berita baru'}
                </h2>
                <p
                  style={{
                    fontSize: 13,
                    color: '#667085',
                    margin: '6px 0 0',
                  }}
                >
                  Lengkapi informasi publikasi di bawah ini.
                </p>
              </div>
              <button
                onClick={() => setFormOpen(false)}
                aria-label="Tutup formulir"
                style={{
                  display: 'grid',
                  placeItems: 'center',
                  width: 36,
                  height: 36,
                  border: '1px solid #E4E7EC',
                  borderRadius: 9,
                  background: '#FFFFFF',
                  cursor: 'pointer',
                }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: 18,
                }}
              >
                <div>
                  <label style={labelStyle}>Judul berita *</label>
                  <input
                    style={inputStyle}
                    value={form.judul}
                    onChange={(e) => {
                      const judul = e.target.value;
                      setForm((current) => ({
                        ...current,
                        judul,
                        ...(editingId === null
                          ? { slug: makeSlug(judul) }
                          : {}),
                      }));
                    }}
                    required
                    maxLength={250}
                    placeholder="Masukkan judul berita"
                  />
                </div>

                <div>
                  <label style={labelStyle}>Kategori *</label>
                  <input
                    style={inputStyle}
                    value={form.kategori}
                    onChange={(e) => updateField('kategori', e.target.value)}
                    required
                    placeholder="Contoh: Akademik"
                  />
                </div>

                <div>
                  <label style={labelStyle}>Tanggal publikasi *</label>
                  <input
                    style={inputStyle}
                    type="date"
                    value={form.tanggal}
                    onChange={(e) => updateField('tanggal', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label style={labelStyle}>Slug URL *</label>
                  <input
                    style={inputStyle}
                    value={form.slug}
                    onChange={(e) =>
                      updateField('slug', makeSlug(e.target.value))
                    }
                    required
                    pattern="[a-z0-9]+(-[a-z0-9]+)*"
                    title="Gunakan huruf kecil, angka, dan tanda hubung."
                    placeholder="judul-berita"
                  />
                  <p
                    style={{
                      fontSize: 11,
                      color: '#98A2B3',
                      margin: '6px 0 0',
                      overflowWrap: 'anywhere',
                    }}
                  >
                    URL: /berita/{form.slug || 'judul-berita'}
                  </p>
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>URL foto *</label>
                  <input
                    style={inputStyle}
                    type="url"
                    value={form.foto_url}
                    onChange={(e) => updateField('foto_url', e.target.value)}
                    required
                    placeholder="https://..."
                  />
                  {form.foto_url && (
                    <div style={{ marginTop: 12 }}>
                      <img
                        src={form.foto_url}
                        alt="Pratinjau foto berita"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                        onLoad={(e) => {
                          e.currentTarget.style.display = 'block';
                        }}
                        style={{
                          display: 'block',
                          width: '100%',
                          maxWidth: 280,
                          maxHeight: 170,
                          objectFit: 'cover',
                          borderRadius: 9,
                          border: '1px solid #E8ECF1',
                        }}
                      />
                    </div>
                  )}
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Ringkasan berita</label>
                  <textarea
                    style={{ ...inputStyle, minHeight: 85, resize: 'vertical' }}
                    value={form.excerpt}
                    onChange={(e) => updateField('excerpt', e.target.value)}
                    placeholder="Ringkasan singkat untuk halaman daftar berita"
                  />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Isi berita</label>
                  <textarea
                    style={{ ...inputStyle, minHeight: 200, resize: 'vertical' }}
                    value={form.konten}
                    onChange={(e) => updateField('konten', e.target.value)}
                    placeholder="Tulis isi berita lengkap..."
                  />
                </div>

                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    cursor: 'pointer',
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#344054',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) =>
                      updateField('featured', e.target.checked)
                    }
                    style={{ width: 16, height: 16, accentColor: '#176B43' }}
                  />
                  <Star size={16} color="#B7791F" />
                  Tandai sebagai berita unggulan
                </label>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  flexWrap: 'wrap',
                  gap: 10,
                  marginTop: 24,
                  paddingTop: 20,
                  borderTop: '1px solid #EEF0F3',
                }}
              >
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  disabled={saving}
                  style={{
                    padding: '11px 17px',
                    border: '1px solid #D0D5DD',
                    background: '#FFFFFF',
                    borderRadius: 9,
                    cursor: 'pointer',
                    color: '#344054',
                    fontWeight: 600,
                  }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  style={{
                    padding: '11px 19px',
                    border: 'none',
                    background: saving ? '#78A990' : '#176B43',
                    color: '#FFFFFF',
                    borderRadius: 9,
                    cursor: saving ? 'wait' : 'pointer',
                    fontWeight: 650,
                  }}
                >
                  {saving
                    ? 'Menyimpan...'
                    : editingId
                      ? 'Simpan perubahan'
                      : 'Publikasikan berita'}
                </button>
              </div>
            </form>
          </section>
        )}

        <section
          style={{
            background: '#FFFFFF',
            border: '1px solid #E8ECF1',
            borderRadius: 14,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '18px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 14,
              borderBottom: '1px solid #EAECF0',
            }}
          >
            <div>
              <h2 style={{ margin: 0, fontSize: 16 }}>Semua berita</h2>
              <p
                style={{
                  margin: '5px 0 0',
                  color: '#98A2B3',
                  fontSize: 12,
                }}
              >
                {filteredItems.length} publikasi ditemukan
              </p>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 9,
                flexWrap: 'wrap',
              }}
            >
              <div style={{ position: 'relative' }}>
                <Search
                  size={17}
                  color="#98A2B3"
                  style={{
                    position: 'absolute',
                    left: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                />
                <input
                  aria-label="Cari berita"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari berita..."
                  style={{
                    ...inputStyle,
                    width: 'min(260px, 65vw)',
                    paddingLeft: 37,
                  }}
                />
              </div>

              <button
                onClick={() => void loadBerita()}
                disabled={loading}
                title="Muat ulang"
                style={{
                  display: 'grid',
                  placeItems: 'center',
                  width: 41,
                  height: 41,
                  border: '1px solid #DDE2E8',
                  background: '#FFFFFF',
                  borderRadius: 9,
                  cursor: 'pointer',
                  color: '#475467',
                }}
              >
                <RefreshCw
                  size={17}
                  style={{
                    animation: loading ? 'spin 1s linear infinite' : 'none',
                  }}
                />
              </button>
            </div>
          </div>

          {loading ? (
            <div
              style={{
                padding: '65px 20px',
                textAlign: 'center',
                color: '#667085',
              }}
            >
              <RefreshCw size={22} style={{ marginBottom: 12 }} />
              <div>Memuat data berita...</div>
            </div>
          ) : filteredItems.length === 0 ? (
            <div
              style={{
                padding: '65px 20px',
                textAlign: 'center',
              }}
            >
              <Newspaper
                size={34}
                color="#98A2B3"
                style={{ marginBottom: 12 }}
              />
              <h3 style={{ margin: '0 0 7px', fontSize: 15 }}>
                {search ? 'Berita tidak ditemukan' : 'Belum ada berita'}
              </h3>
              <p
                style={{
                  color: '#98A2B3',
                  fontSize: 13,
                  margin: '0 0 18px',
                }}
              >
                {search
                  ? 'Coba kata kunci yang berbeda.'
                  : 'Mulai dengan menambahkan publikasi pertama.'}
              </p>
              {!search && (
                <button
                  onClick={openCreateForm}
                  style={{
                    padding: '10px 15px',
                    border: 0,
                    borderRadius: 9,
                    background: '#176B43',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                  }}
                >
                  Tambah berita
                </button>
              )}
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  minWidth: 700,
                }}
              >
                <thead>
                  <tr style={{ background: '#F9FAFB' }}>
                    {['BERITA', 'KATEGORI', 'TANGGAL', 'STATUS', 'AKSI'].map(
                      (heading) => (
                        <th
                          key={heading}
                          style={{
                            padding: '12px 16px',
                            textAlign: 'left',
                            fontSize: 10,
                            letterSpacing: 0.7,
                            color: '#667085',
                            fontWeight: 700,
                            borderBottom: '1px solid #EAECF0',
                          }}
                        >
                          {heading}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr
                      key={item.id}
                      style={{ borderBottom: '1px solid #F0F2F5' }}
                    >
                      <td style={{ padding: '14px 16px', maxWidth: 360 }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                          }}
                        >
                          <img
                            src={item.foto_url}
                            alt=""
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              e.currentTarget.style.visibility = 'hidden';
                            }}
                            style={{
                              width: 66,
                              height: 52,
                              objectFit: 'cover',
                              borderRadius: 8,
                              background: '#F2F4F7',
                              flexShrink: 0,
                            }}
                          />
                          <div style={{ minWidth: 0 }}>
                            <div
                              style={{
                                fontSize: 13,
                                fontWeight: 650,
                                color: '#172033',
                                lineHeight: 1.5,
                                overflowWrap: 'anywhere',
                              }}
                            >
                              {item.judul}
                            </div>
                            <div
                              style={{
                                fontSize: 11,
                                color: '#98A2B3',
                                marginTop: 4,
                                overflowWrap: 'anywhere',
                              }}
                            >
                              /berita/{item.slug}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '5px 9px',
                            background: '#F2F4F7',
                            color: '#475467',
                            borderRadius: 6,
                            fontSize: 11,
                            fontWeight: 600,
                          }}
                        >
                          {item.kategori}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: '14px 16px',
                          color: '#667085',
                          fontSize: 12,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {formatDate(item.tanggal)}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        {item.featured ? (
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 5,
                              color: '#946200',
                              background: '#FFF7DB',
                              padding: '5px 8px',
                              borderRadius: 6,
                              fontSize: 11,
                              fontWeight: 650,
                            }}
                          >
                            <Star size={12} />
                            Unggulan
                          </span>
                        ) : (
                          <span style={{ color: '#98A2B3', fontSize: 12 }}>
                            Reguler
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', gap: 7 }}>
                          <button
                            onClick={() => openEditForm(item)}
                            title="Edit berita"
                            aria-label={`Edit ${item.judul}`}
                            style={{
                              display: 'grid',
                              placeItems: 'center',
                              width: 34,
                              height: 34,
                              border: '1px solid #DDE2E8',
                              background: '#FFFFFF',
                              borderRadius: 8,
                              color: '#475467',
                              cursor: 'pointer',
                            }}
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            onClick={() => void handleDelete(item)}
                            disabled={deletingId === item.id}
                            title="Hapus berita"
                            aria-label={`Hapus ${item.judul}`}
                            style={{
                              display: 'grid',
                              placeItems: 'center',
                              width: 34,
                              height: 34,
                              border: '1px solid #F1D0D0',
                              background: '#FFFFFF',
                              borderRadius: 8,
                              color: '#B42318',
                              cursor:
                                deletingId === item.id ? 'wait' : 'pointer',
                            }}
                          >
                            <Trash2 size={15} />
                          </button>
                          <a
                            href={`/berita/${encodeURIComponent(item.slug)}`}
                            target="_blank"
                            rel="noreferrer"
                            title="Lihat berita publik"
                            aria-label={`Lihat ${item.judul}`}
                            style={{
                              display: 'grid',
                              placeItems: 'center',
                              width: 34,
                              height: 34,
                              border: '1px solid #DDE2E8',
                              background: '#FFFFFF',
                              borderRadius: 8,
                              color: '#475467',
                              textDecoration: 'none',
                            }}
                          >
                            <ExternalLink size={15} />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <p
          style={{
            fontSize: 12,
            color: '#98A2B3',
            textAlign: 'center',
            marginTop: 24,
          }}
        >
          Panel Admin SMP Citra Negara · Manajemen Berita
        </p>
      </main>
    </div>
  );
}