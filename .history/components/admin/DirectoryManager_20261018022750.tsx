"use client";

import { useCallback, useEffect, useState } from "react"; 
import { useCallback, useEffect, useState } from "react";

type DirectoryType = "guru" | "staff";

type Person = {
  id: number;
  nama: string;
  mata_pelajaran?: string | null;
  jabatan?: string | null;
  foto_url: string | null;
};

type Props = {
  type: DirectoryType;
};

export default function DirectoryManager({ type }: Props) {
  const isGuru = type === "guru";
  const endpoint = `/api/admin/${type}`;
  const roleLabel = isGuru ? "Guru" : "Staff";
  const detailLabel = isGuru ? "Mata Pelajaran" : "Jabatan";

  const [items, setItems] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [nama, setNama] = useState("");
  const [detail, setDetail] = useState("");
  const [fotoUrl, setFotoUrl] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadItems = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(endpoint, { cache: "no-store" });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gagal mengambil data.");
      }

      setItems(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    void loadItems();
  }, [loadItems]);

  function resetForm() {
    setEditingId(null);
    setNama("");
    setDetail("");
    setFotoUrl("");
    setError("");
    setNotice("");
  }

  function startEdit(person: Person) {
    setEditingId(person.id);
    setNama(person.nama);
    setDetail(
      isGuru
        ? person.mata_pelajaran || ""
        : person.jabatan || ""
    );
    setFotoUrl(person.foto_url || "");
    setError("");
    setNotice("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleUpload(file: File | undefined) {
    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setError("Foto harus berformat JPG atau PNG.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Ukuran foto maksimal 2 MB.");
      return;
    }

    setUploading(true);
    setError("");
    setNotice("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fieldName", `${type}-photo`);

      const response = await fetch("/api/admin/directory-upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.path) {
        throw new Error(result.error || "Upload foto gagal.");
      }

      setFotoUrl(result.path);
      setNotice("Foto berhasil diunggah.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload foto gagal.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");

    try {
      const payload = {
        nama: nama.trim(),
        ...(isGuru
          ? { mata_pelajaran: detail.trim() }
          : { jabatan: detail.trim() }),
        foto_url: fotoUrl.trim(),
      };

      const response = await fetch(
        editingId === null ? endpoint : `${endpoint}/${editingId}`,
        {
          method: editingId === null ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gagal menyimpan data.");
      }

      resetForm();
      setNotice(
        editingId === null
          ? `Data ${roleLabel.toLowerCase()} berhasil ditambahkan.`
          : `Data ${roleLabel.toLowerCase()} berhasil diperbarui.`
      );

      await loadItems();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan data.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(person: Person) {
    if (!window.confirm(`Hapus data ${person.nama}?`)) return;

    setError("");
    setNotice("");

    try {
      const response = await fetch(`${endpoint}/${person.id}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gagal menghapus data.");
      }

      if (editingId === person.id) resetForm();

      setNotice(`Data ${person.nama} berhasil dihapus.`);
      await loadItems();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menghapus data.");
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    boxSizing: "border-box",
    padding: "11px 12px",
    border: "1px solid #d9dfd3",
    borderRadius: 8,
    background: "#fff",
    color: "#20251f",
    fontSize: 14,
  };

  const buttonStyle: React.CSSProperties = {
    padding: "10px 14px",
    border: "none",
    borderRadius: 8,
    background: "#123524",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "clamp(18px, 4vw, 40px)",
        background: "#f6f7f2",
        color: "#20251f",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 24,
        }}
      >
        <div>
          <p style={{ color: "#123524", fontSize: 11, fontWeight: 800 }}>
            SMP CITRA NEGARA
          </p>
          <h1 style={{ color: "#123524", margin: 0 }}>
            Kelola {roleLabel}
          </h1>
          <p style={{ color: "#737a70", fontSize: 13 }}>
            {items.length} data {roleLabel.toLowerCase()}
          </p>
        </div>

        <a
          href="/admin/dashboard"
          style={{
            color: "#123524",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          ← Dashboard
        </a>
      </header>

      <section
        style={{
          padding: 22,
          border: "1px solid #e5e9df",
          borderRadius: 12,
          background: "#fff",
          marginBottom: 24,
        }}
      >
        <h2 style={{ marginTop: 0, color: "#123524", fontSize: 18 }}>
          {editingId === null ? `Tambah ${roleLabel}` : `Edit ${roleLabel}`}
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "grid", gap: 14 }}
        >
          <label style={{ display: "grid", gap: 6, fontSize: 13 }}>
            Nama lengkap
            <input
              style={inputStyle}
              value={nama}
              onChange={(event) => setNama(event.target.value)}
              maxLength={150}
              required
              placeholder={`Nama ${roleLabel.toLowerCase()}`}
            />
          </label>

          <label style={{ display: "grid", gap: 6, fontSize: 13 }}>
            {detailLabel}
            <input
              style={inputStyle}
              value={detail}
              onChange={(event) => setDetail(event.target.value)}
              maxLength={100}
              required
              placeholder={isGuru ? "Contoh: Matematika" : "Contoh: Tata Usaha"}
            />
          </label>

          <label style={{ display: "grid", gap: 8, fontSize: 13 }}>
            Foto (JPG/PNG, maksimal 2 MB)
            <input
              type="file"
              accept="image/jpeg,image/png"
              disabled={uploading}
              onChange={(event) => {
                void handleUpload(event.target.files?.[0]);
                event.currentTarget.value = "";
              }}
            />
          </label>

          {fotoUrl && (
            <div style={{ display: "grid", gap: 8 }}>
              <img
                src={fotoUrl}
                alt="Pratinjau foto"
                style={{
                  width: 110,
                  height: 130,
                  objectFit: "cover",
                  borderRadius: 8,
                  border: "1px solid #e5e9df",
                }}
              />
              <button
                type="button"
                onClick={() => setFotoUrl("")}
                style={{ ...buttonStyle, background: "#6b3028", width: "fit-content" }}
              >
                Lepas foto
              </button>
            </div>
          )}

          {uploading && <p>Uploading foto...</p>}

          {error && (
            <p role="alert" style={{ color: "#b42318", fontSize: 13 }}>
              {error}
            </p>
          )}

          {notice && (
            <p role="status" style={{ color: "#267343", fontSize: 13 }}>
              {notice}
            </p>
          )}

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              type="submit"
              disabled={saving || uploading}
              style={{ ...buttonStyle, opacity: saving || uploading ? 0.6 : 1 }}
            >
              {saving
                ? "Menyimpan..."
                : editingId === null
                  ? "Tambah Data"
                  : "Simpan Perubahan"}
            </button>

            {editingId !== null && (
              <button
                type="button"
                onClick={resetForm}
                style={{
                  ...buttonStyle,
                  background: "#e8ece4",
                  color: "#20251f",
                }}
              >
                Batal Edit
              </button>
            )}
          </div>
        </form>
      </section>

      <section>
        <h2 style={{ color: "#123524", fontSize: 19 }}>
          Daftar {roleLabel}
        </h2>

        {loading ? (
          <p>Memuat data...</p>
        ) : items.length === 0 ? (
          <p style={{ color: "#737a70" }}>
            Belum ada data {roleLabel.toLowerCase()}.
          </p>
        ) : (
          <div style={{ display: "grid", gap: 12 }}>
            {items.map((person) => (
              <article
                key={person.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  flexWrap: "wrap",
                  padding: 16,
                  border: "1px solid #e5e9df",
                  borderRadius: 10,
                  background: "#fff",
                }}
              >
                {person.foto_url ? (
                  <img
                    src={person.foto_url}
                    alt={person.nama}
                    loading="lazy"
                    style={{
                      width: 66,
                      height: 78,
                      objectFit: "cover",
                      borderRadius: 8,
                      background: "#f0f0f0",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 66,
                      height: 78,
                      display: "grid",
                      placeItems: "center",
                      background: "#edf0e8",
                      borderRadius: 8,
                      color: "#737a70",
                      fontSize: 12,
                    }}
                  >
                    Tanpa foto
                  </div>
                )}

                <div style={{ flex: "1 1 180px" }}>
                  <strong>{person.nama}</strong>
                  <p style={{ margin: "5px 0", color: "#737a70", fontSize: 13 }}>
                    {isGuru ? person.mata_pelajaran : person.jabatan}
                  </p>
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    type="button"
                    onClick={() => startEdit(person)}
                    style={buttonStyle}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleDelete(person)}
                    style={{ ...buttonStyle, background: "#a83232" }}
                  >
                    Hapus
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}