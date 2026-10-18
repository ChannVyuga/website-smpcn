"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

const MAX_SIZE = 2 * 1024 * 1024;

type Props = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  labelStyle?: CSSProperties;
  required?: boolean;
  previewStyle?: CSSProperties;
};

// Upload foto lewat /api/admin/directory-upload, sama seperti form guru & staff.
export default function ImageUploadField({
  label,
  value,
  onChange,
  labelStyle,
  required = false,
  previewStyle,
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const requiredRef = useRef<HTMLInputElement>(null);

  // Hapus pesan validasi bawaan browser begitu foto sudah ada.
  useEffect(() => {
    requiredRef.current?.setCustomValidity("");
  }, [value]);

  async function handleUpload(file: File | undefined) {
    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setError("Foto harus berformat JPG atau PNG.");
      return;
    }

    if (file.size > MAX_SIZE) {
      setError("Ukuran foto maksimal 2 MB.");
      return;
    }

    setUploading(true);
    setError("");
    setNotice("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/directory-upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.path) {
        throw new Error(result.error || "Upload foto gagal.");
      }

      onChange(result.path);
      setNotice("Foto berhasil diunggah.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload foto gagal.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div style={{ display: "grid", gap: 8, position: "relative" }}>
      <span style={labelStyle}>{label}</span>

      <input
        type="file"
        accept="image/jpeg,image/png"
        disabled={uploading}
        onChange={(event) => {
          void handleUpload(event.target.files?.[0]);
          event.currentTarget.value = "";
        }}
      />

      {/* Input tersembunyi agar atribut required ikut divalidasi form */}
      {required && (
        <input
          ref={requiredRef}
          tabIndex={-1}
          aria-hidden="true"
          required
          value={value}
          onChange={() => {}}
          onInvalid={(event) =>
            event.currentTarget.setCustomValidity("Foto wajib diunggah.")
          }
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 1,
            height: 1,
            opacity: 0,
            pointerEvents: "none",
          }}
        />
      )}

      {value && (
        <div style={{ display: "grid", gap: 8 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Pratinjau foto"
            referrerPolicy="no-referrer"
            style={{
              display: "block",
              width: "100%",
              maxWidth: 280,
              maxHeight: 190,
              objectFit: "cover",
              borderRadius: 8,
              border: "1px solid #e5e9df",
              ...previewStyle,
            }}
          />
          <button
            type="button"
            onClick={() => {
              onChange("");
              setNotice("");
            }}
            style={{
              width: "fit-content",
              border: "none",
              borderRadius: 8,
              background: "#6b3028",
              color: "white",
              padding: "8px 14px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Lepas foto
          </button>
        </div>
      )}

      {uploading && <p style={{ fontSize: 13 }}>Uploading foto...</p>}

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
    </div>
  );
}
