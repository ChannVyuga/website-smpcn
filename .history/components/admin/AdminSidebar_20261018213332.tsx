
"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const GREEN = "#123524";
const LIME = "#8fd13f";

const menu = [
  { label: "Dashboard", href: "/admin/dashboard", icon: "⌂" },
  { label: "Berita", href: "/admin/berita", icon: "▤" },
  { label: "Prestasi", href: "/admin/prestasi", icon: "✦" },
  { label: "Guru", href: "/admin/guru", icon: "♙" },
  { label: "Staff", href: "/admin/staff", icon: "♧" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Logout gagal.");
      }

      router.replace("/admin/login");
      router.refresh();
    } catch {
      setLoggingOut(false);
      alert("Logout gagal. Silakan coba lagi.");
    }
  }

  return (
    <aside
      style={{
        width: 250,
        minWidth: 250,
        maxWidth: 250,
        flexShrink: 0,
        minHeight: "100vh",
        boxSizing: "border-box",
        padding: "24px 16px",
        background: GREEN,
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        gap: 28,
        alignSelf: "stretch",
      }}
    >

      <div
        style={{
          width: 42,
          height: 42,
          display: 'grid',
          placeItems: 'center',
          borderRadius: 12,
          background: '#ffffff',
          marginBottom: 16,
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <img
          src="/public/images/smpcn.png"
          alt="Logo SMP Citra Negara"
          width={42}
          height={42}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </div>


      <nav
        aria-label="Navigasi admin"
        style={{
          display: "grid",
          gap: 8,
          position: "static",
          top: "auto",
          zIndex: "auto",
        }}
      >
        {menu.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/admin/dashboard" &&
              pathname.startsWith(`${item.href}/`));

          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 14px",
                borderRadius: 9,
                textDecoration: "none",
                fontSize: 14,
                fontWeight: active ? 800 : 500,
                background: active ? LIME : "transparent",
                color: active ? GREEN : "#edf3eb",
                transition: "background 0.2s ease",
              }}
            >
              <span
                aria-hidden="true"
                style={{ width: 20, textAlign: "center" }}
              >
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div style={{ marginTop: "auto" }}>
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          style={{
            width: "100%",
            padding: "12px 10px",
            border: "1px solid #54705b",
            borderRadius: 9,
            background: "transparent",
            color: "#ffffff",
            fontWeight: 700,
            cursor: loggingOut ? "wait" : "pointer",
            opacity: loggingOut ? 0.7 : 1,
          }}
        >
          {loggingOut ? "Keluar..." : "Keluar dari Admin"}
        </button>

        <p
          style={{
            margin: "16px 0 0",
            color: "#b8cbbb",
            fontSize: 11,
            lineHeight: 1.6,
          }}
        >
          © {new Date().getFullYear()} SMP Citra Negara
        </p>
      </div>
    </aside>
  );
}