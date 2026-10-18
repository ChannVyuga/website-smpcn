
"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const GREEN = "#123524";

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
        minWidth: 
        width: 250,
        maxWidth: 250,
        minHeight: "100vh",
        boxSizing: "border-box",
        padding: 22,
        background: GREEN,
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        gap: 28,
      }}
    >
      <div>
        <div
          style={{
            width: 42,
            height: 42,
            display: "grid",
            placeItems: "center",
            borderRadius: 12,
            background: "#8fd13f",
            color: GREEN,
            fontWeight: 900,
            fontSize: 18,
            marginBottom: 16,
          }}
        >
          CN
        </div>

        <p
          style={{
            margin: 0,
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 1.2,
            color: "#d5e6d3",
          }}
        >
          SMP CITRA NEGARA
        </p>

        <h2 style={{ fontSize: 18, margin: "8px 0 0" }}>
          Admin Panel
        </h2>
      </div>

      <nav
        aria-label="Navigasi admin"
        style={{ display: "grid", gap: 8 }}
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
                background: active
                  ? "#8fd13f"
                  : "transparent",
                color: active ? GREEN : "#edf3eb",
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
            padding: "12px 14px",
            border: "1px solid #54705b",
            borderRadius: 9,
            background: "transparent",
            color: "#fff",
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
