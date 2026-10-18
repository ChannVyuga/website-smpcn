"use client";

import { useCallback, useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

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
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "row",
        background: "#f6f7f2",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <AdminSidebar />

      <main
        style={{
          flex: 1,
          minWidth: 0,
          minHeight: "100vh",
          padding: "clamp(18px, 4vw, 40px)",
          background: "#f6f7f2",
          color: "#20251f",
          boxSizing: "border-box",
        }}
      >