"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import {
  Menu,
  X,
  ChevronDown,
  Code2,
  BookOpenText,
  Briefcase,
  MessagesSquare,
  Users,
} from "lucide-react";
import type {
  CSSProperties,
  MouseEvent,
  ReactNode,
} from "react";

/* =========================================================
   DATA
   ========================================================= */

const JURUSAN_LIST = [
  {
    kode: "WP",
    nama: "Web Programming",
    singkat: "Program Unggulan SMP Citra Negara",
    color: "#0B3D2E",
    icon: Code2,
    href: "/program_unggulan/WP",
  },
  {
    kode: "HQ",
    nama: "Holaqoh Quran",
    singkat: "Program Unggulan SMP Citra Negara",
    color: "#0B3D2E",
    icon: BookOpenText,
    href: "/program_unggulan/HQ",
  },
  {
    kode: "EPS",
    nama: "Entrepreneurship",
    singkat: "Program Unggulan SMP Citra Negara",
    color: "#0B3D2E",
    icon: Briefcase,
    href: "/program_unggulan/EPS",
  },
  {
    kode: "CVS",
    nama: "Conversation",
    singkat: "Program Unggulan SMP Citra Negara",
    color: "#0B3D2E",
    icon: MessagesSquare,
    href: "/program_unggulan/CVS",
  },
  {
    kode: "ORGANISASI",
    nama: "Organisasi Siswa",
    singkat: "Osis, Rohis & Tim Kreatif",
    color: "#0B3D2E",
    icon: Users,
    href: "/organisasi",
  },
];

const ESKUL_LIST = [
  {
    nama: "Paskibra",
    href: "/eskul/paskibrasmp",
  },
  {
    nama: "Futsal",
    href: "/eskul/futsalsmp",
  },
  {
    nama: "Taekwondo",
    href: "/eskul/taekwondosmp",
  },
  {
    nama: "Basket",
    href: "/eskul/basketsmp",
  },
  {
    nama: "Tari",
    href: "/eskul/tarismp",
  },
  {
    nama: "Pramuka",
    href: "/eskul/pramukasmp",
  },
  {
    nama: "Hadroh",
    href: "/eskul/hadrohsmp",
  },
];

const DIREKTORI_LIST = [
  {
    nama: "Guru",
    href: "/direktori/guru",
  },
  {
    nama: "Staff",
    href: "/direktori/staff",
  },
];

/* =========================================================
   TYPES
   ========================================================= */

interface Session {
  role: string;
  namaLengkap?: string;
}

/* =========================================================
   CONSTANT STYLES
   ========================================================= */

const NAV_LINK: CSSProperties = {
  color: "var(--nav-text)",
  textDecoration: "none",
  padding: "8px 11px",
  borderRadius: 9,
  fontSize: 13.5,
  fontWeight: 550,
  whiteSpace: "nowrap",
  transition:
    "color 0.2s ease, background 0.2s ease",
};

const MOBILE_LINK: CSSProperties = {
  display: "block",
  width: "100%",
  boxSizing: "border-box",
  color: "rgba(255,255,255,0.92)",
  textDecoration: "none",
  padding: "13px 4px",
  borderBottom:
    "1px solid rgba(255,255,255,0.07)",
  fontSize: 14,
};

/* =========================================================
   NAVBAR CSS
   ========================================================= */

const CSS = `
  /* =======================================================
     ANIMATIONS
     ======================================================= */

  @keyframes dropFadeIn {
    from {
      opacity: 0;
      transform: translateY(-8px) scale(0.98);
    }

    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes navLineIn {
    from {
      opacity: 0;
      transform: scaleX(0);
    }

    to {
      opacity: 1;
      transform: scaleX(1);
    }
  }

  @keyframes mobileMenuIn {
    from {
      opacity: 0;
      transform: translateY(-6px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* =======================================================
     NAV SHELL
     ======================================================= */

  .nav-shell {
    width: 100%;
    max-width: 100%;
    margin: 0 auto;

    background: #dfe7df;

    -webkit-backdrop-filter:
      blur(24px) saturate(180%);

    backdrop-filter:
      blur(24px) saturate(180%);

    border: none;

    border-bottom:
      1px solid rgba(11, 61, 46, 0.08);

    border-radius: 0;

    box-shadow:
      0 4px 18px rgba(11, 61, 46, 0.08);

    overflow: visible;

    --nav-text: #0b3d2e;

    transition:
      width 0.6s cubic-bezier(0.16, 1, 0.3, 1),
      max-width 0.6s cubic-bezier(0.16, 1, 0.3, 1),
      border-radius 0.6s cubic-bezier(0.16, 1, 0.3, 1),
      background 0.5s cubic-bezier(0.16, 1, 0.3, 1),
      box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1),
      border-color 0.5s ease;
  }

  /* =======================================================
     SCROLLED NAV
     ======================================================= */

  .nav-shell.scrolled {
    width: calc(100% - 32px);
    max-width: 1280px;

    background:
      linear-gradient(
        180deg,
        rgba(24, 100, 76, 0.48),
        rgba(14, 70, 53, 0.38)
      );

    border:
      1px solid rgba(255, 255, 255, 0.20);

    border-radius: 999px;

    --nav-text:
      rgba(255, 255, 255, 0.92);

    box-shadow:
      0 16px 44px rgba(0, 0, 0, 0.16),
      inset 0 1px 0 rgba(255, 255, 255, 0.24),
      inset 0 -1px 0 rgba(255, 255, 255, 0.05);
  }

  /* =======================================================
     CONTAINER
     ======================================================= */

  .nav-container {
    width: 100%;
    max-width: 1320px;
    margin: 0 auto;
    padding: 0 28px;
    box-sizing: border-box;
  }

  .nav-inner {
    min-height: 70px;
    padding: 9px 0;

    display: flex;
    align-items: center;

    gap: 0;

    width: 100%;
    box-sizing: border-box;

    transition:
      min-height 0.5s cubic-bezier(0.16, 1, 0.3, 1),
      padding 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .nav-inner.scrolled {
    min-height: 52px;
    padding: 5px 0;
  }

  /* =======================================================
     LOGO
     ======================================================= */

  .nav-logo-link {
    display: flex;
    align-items: center;
    gap: 11px;

    text-decoration: none;

    min-width: 0;
    flex: 0 0 auto;
  }

  .nav-logo-box {
    width: 44px;
    height: 44px;

    border-radius: 11px;

    overflow: hidden;
    flex-shrink: 0;

    box-shadow:
      0 4px 14px rgba(0, 0, 0, 0.16),
      0 0 0 1px rgba(255, 255, 255, 0.10);

    transition:
      width 0.5s cubic-bezier(0.16, 1, 0.3, 1),
      height 0.5s cubic-bezier(0.16, 1, 0.3, 1),
      border-radius 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .nav-inner.scrolled .nav-logo-box {
    width: 34px;
    height: 34px;
    border-radius: 9px;
  }

  .nav-logo-text {
    color: #000000;

    font-size: 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    line-height: 1.2;
    font-weight: 800;

    white-space: nowrap;

    transition:
      font-size 0.35s ease,
      color 0.35s ease;
  }

  .nav-shell.scrolled .nav-logo-text {
    color: #ffffff;
  }

  .nav-logo-sub {
    margin-top: 2px;

    color: #a47720;

    font-size: 10px;
    font-weight: 600;

    white-space: nowrap;

    transition:
      opacity 0.25s ease,
      max-height 0.25s ease;
  }

  .nav-inner.scrolled .nav-logo-sub {
    opacity: 0;
    max-height: 0;
    overflow: hidden;
  }

  /* =======================================================
     DESKTOP NAV
     ======================================================= */

  .desktop-nav {
    display: none;

    align-items: center;
    justify-content: center;

    gap: 2px;

    flex: 1 1 auto;
    min-width: 0;

    margin-left: 22px;
    margin-right: 18px;
  }

  .desktop-nav > * {
    flex: 0 0 auto;
  }

  /* =======================================================
     DESKTOP AUTH
     ======================================================= */

  .desktop-auth {
    display: none;

    align-items: center;
    justify-content: flex-end;

    gap: 10px;

    flex: 0 0 auto;

    margin-left: auto;

    padding-left: 18px;

    border-left:
      1px solid rgba(11, 61, 46, 0.12);

    transition:
      border-color 0.35s ease;
  }

  .nav-shell.scrolled .desktop-auth {
    border-left-color:
      rgba(255, 255, 255, 0.14);
  }

  .desktop-auth > * {
    flex: 0 0 auto;
  }

  /* =======================================================
     MOBILE BUTTON
     ======================================================= */

  .mobile-toggle {
    margin-left: auto;

    display: flex;

    align-items: center;
    justify-content: center;

    width: 42px;
    height: 42px;

    padding: 0;

    background:
      rgba(11, 61, 46, 0.07);

    border:
      1px solid rgba(11, 61, 46, 0.13);

    border-radius: 11px;

    color: #0b3d2e;

    cursor: pointer;

    flex: 0 0 auto;

    transition:
      background 0.2s ease,
      border-color 0.2s ease,
      color 0.2s ease,
      transform 0.2s ease;

    -webkit-tap-highlight-color:
      transparent;

    touch-action: manipulation;
  }

  .mobile-toggle:hover {
    background:
      rgba(200, 151, 58, 0.12);

    border-color:
      rgba(200, 151, 58, 0.30);

    color: #a47720;
  }

  .mobile-toggle:active {
    transform: scale(0.95);
  }

  .nav-shell.scrolled .mobile-toggle {
    background:
      rgba(255, 255, 255, 0.08);

    border-color:
      rgba(255, 255, 255, 0.16);

    color: #ffffff;
  }

  .nav-shell.scrolled .mobile-toggle:hover {
    background:
      rgba(200, 151, 58, 0.18);

    border-color:
      rgba(232, 184, 75, 0.38);

    color: #f2cf78;
  }

  /* =======================================================
     MOBILE MENU
     ======================================================= */

  .mobile-menu {
    width: 100%;
    box-sizing: border-box;

    background:
      rgba(7, 38, 27, 0.97);

    -webkit-backdrop-filter:
      blur(22px) saturate(160%);

    backdrop-filter:
      blur(22px) saturate(160%);

    border-top:
      1px solid rgba(200, 151, 58, 0.20);

    padding:
      8px 22px 24px;

    max-height:
      calc(100vh - 70px);

    overflow-y: auto;

    animation:
      mobileMenuIn 0.22s ease;
  }

  /* =======================================================
     MOBILE LINKS
     ======================================================= */

  .mobile-menu a {
    transition:
      color 0.2s ease,
      background 0.2s ease;
  }

  .mobile-menu a:hover {
    color: #e8b84b !important;
  }

  /* =======================================================
     DROPDOWN
     ======================================================= */

  .drop-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 4px;
  }

  .eskul-grid {
    display: grid;

    grid-template-columns:
      repeat(3, 1fr);

    gap: 6px 10px;
  }

  .drop-item {
    display: flex;

    align-items: center;

    gap: 11px;

    padding: 11px;

    border-radius: 12px;

    text-decoration: none;

    border:
      1px solid transparent;

    transition:
      background 0.18s ease,
      border-color 0.18s ease,
      transform 0.18s ease;
  }

  .drop-item:hover {
    background:
      rgba(11, 61, 46, 0.055);

    border-color:
      rgba(11, 61, 46, 0.08);

    transform:
      translateX(2px);
  }

  .eskul-text-item {
    display: flex;

    align-items: center;

    min-height: 34px;

    padding: 7px 9px;

    border-radius: 9px;

    text-decoration: none;

    color: #34443e;

    font-size: 13px;

    font-weight: 550;

    transition:
      background 0.18s ease,
      color 0.18s ease,
      transform 0.18s ease;
  }

  .eskul-text-item:hover {
    background:
      rgba(11, 61, 46, 0.06);

    color: #0b3d2e;

    transform:
      translateX(2px);
  }

  /* =======================================================
     DESKTOP
     ======================================================= */

  @media (min-width: 1100px) {
    .desktop-nav {
      display: flex;
    }

    .desktop-auth {
      display: flex;
    }

    .mobile-toggle,
    .mobile-menu {
      display: none;
    }
  }

  /* =======================================================
     TABLET
     ======================================================= */

  @media (max-width: 1099px) {
    .nav-shell.scrolled {
      width: calc(100% - 20px);
      border-radius: 20px;
    }
  }

  /* =======================================================
     MOBILE
     ======================================================= */

  @media (max-width: 640px) {
    .nav-container {
      padding: 0 16px;
    }

    .nav-inner {
      min-height: 62px;
      padding: 8px 0;
    }

    .nav-inner.scrolled {
      min-height: 48px;
      padding: 4px 0;
    }

    .nav-logo-box {
      width: 40px;
      height: 40px;
      border-radius: 9px;
    }

    .nav-logo-text {
      font-size: 14px;
    }

    .nav-logo-sub {
      font-size: 9px;
    }

    .nav-shell.scrolled {
      width: calc(100% - 16px);
      border-radius: 18px;
    }

    .mobile-menu {
      padding-left: 16px;
      padding-right: 16px;
    }

    .eskul-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  /* =======================================================
     SMALL MOBILE
     ======================================================= */

  @media (max-width: 430px) {
    .nav-logo-sub {
      display: none;
    }

    .nav-logo-link {
      gap: 9px;
    }

    .mobile-toggle {
      width: 40px;
      height: 40px;
    }
  }

  @media (max-width: 360px) {
    .nav-logo-text {
      font-size: 13px;
    }

    .nav-logo-box {
      width: 37px;
      height: 37px;
    }
  }
`;

/* =========================================================
   DROPDOWN PANEL
   ========================================================= */

function DropdownPanel({
  children,
  triggerRef,
  panelWidth = 560,
  id,
}: {
  children: ReactNode;
  triggerRef: React.RefObject<HTMLDivElement | null>;
  panelWidth?: number;
  id: string;
}) {
  const [style, setStyle] =
    useState<CSSProperties>({
      visibility: "hidden",
      position: "fixed",
    });

  const [arrowLeft, setArrowLeft] =
    useState(0);

  useEffect(() => {
    const updatePosition = () => {
      if (!triggerRef.current) return;

      const rect =
        triggerRef.current.getBoundingClientRect();

      const viewportWidth =
        window.innerWidth;

      const margin = 12;

      const width = Math.min(
        panelWidth,
        viewportWidth - margin * 2
      );

      let left =
        rect.left +
        rect.width / 2 -
        width / 2;

      left = Math.max(
        margin,
        Math.min(
          left,
          viewportWidth -
            width -
            margin
        )
      );

      const arrowPosition =
        rect.left +
        rect.width / 2 -
        left;

      setArrowLeft(
        Math.max(
          16,
          Math.min(
            arrowPosition,
            width - 16
          )
        )
      );

      setStyle({
        position: "fixed",
        top: rect.bottom + 10,
        left,
        width,
        maxHeight:
          "calc(100vh - 100px)",
        overflowY: "auto",
        visibility: "visible",
      });
    };

    updatePosition();

    window.addEventListener(
      "resize",
      updatePosition
    );

    window.addEventListener(
      "scroll",
      updatePosition,
      true
    );

    return () => {
      window.removeEventListener(
        "resize",
        updatePosition
      );

      window.removeEventListener(
        "scroll",
        updatePosition,
        true
      );
    };
  }, [triggerRef, panelWidth]);

  if (
    typeof window === "undefined"
  ) {
    return null;
  }

  return createPortal(
    <div
      style={{
        ...style,

        background:
          "rgba(250, 250, 247, 0.97)",

        WebkitBackdropFilter:
          "blur(22px) saturate(140%)",

        backdropFilter:
          "blur(22px) saturate(140%)",

        borderRadius: 18,

        boxShadow:
          "0 22px 60px rgba(11, 61, 46, 0.16), 0 4px 18px rgba(0,0,0,0.06)",

        border:
          "1px solid rgba(11, 61, 46, 0.10)",

        padding: 16,

        zIndex: 100000,

        animation:
          "dropFadeIn 0.18s ease",

        color: "#1F2937",

        boxSizing: "border-box",
      }}
      data-dropdown={id}
    >
      {/* ARROW */}

      <div
        style={{
          position: "absolute",
          top: -7,
          left: arrowLeft,

          transform:
            "translateX(-50%) rotate(45deg)",

          width: 13,
          height: 13,

          background:
            "rgba(250, 250, 247, 0.97)",

          border:
            "1px solid rgba(11, 61, 46, 0.10)",

          borderBottom: "none",
          borderRight: "none",
        }}
      />

      {children}
    </div>,
    document.body
  );
}

/* =========================================================
   DESKTOP NAV BUTTON
   ========================================================= */

function NavButton({
  label,
  isOpen,
  onClick,
}: {
  label: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        ...NAV_LINK,

        background: isOpen
          ? "rgba(200, 151, 58, 0.12)"
          : "transparent",

        border:
          "1px solid transparent",

        cursor: "pointer",

        display: "flex",
        alignItems: "center",

        gap: 5,

        color: isOpen
          ? "#C8973A"
          : "var(--nav-text)",

        fontFamily: "inherit",

        transition:
          "color 0.2s ease, background 0.2s ease, border-color 0.2s ease",
      }}
      onMouseEnter={(event) => {
        event.currentTarget.style.color =
          "#C8973A";

        event.currentTarget.style.background =
          "rgba(200, 151, 58, 0.10)";

        event.currentTarget.style.borderColor =
          "rgba(200, 151, 58, 0.18)";
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.color =
          isOpen
            ? "#C8973A"
            : "var(--nav-text)";

        event.currentTarget.style.background =
          isOpen
            ? "rgba(200, 151, 58, 0.12)"
            : "transparent";

        event.currentTarget.style.borderColor =
          "transparent";
      }}
    >
      {label}

      <ChevronDown
        size={14}
        strokeWidth={2}
        style={{
          flexShrink: 0,

          transition:
            "transform 0.25s ease",

          transform: isOpen
            ? "rotate(180deg)"
            : "rotate(0deg)",
        }}
      />
    </button>
  );
}

/* =========================================================
   MOBILE ACCORDION BUTTON
   ========================================================= */

function MobileAccordionButton({
  label,
  isOpen,
  onClick,
}: {
  label: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        ...MOBILE_LINK,

        background: isOpen
          ? "rgba(200, 151, 58, 0.08)"
          : "none",

        border: "none",

        borderBottom:
          "1px solid rgba(255,255,255,0.07)",

        textAlign: "left",

        cursor: "pointer",

        display: "flex",
        alignItems: "center",

        justifyContent:
          "space-between",

        boxSizing: "border-box",

        color: isOpen
          ? "#E8B84B"
          : "rgba(255,255,255,0.92)",

        borderRadius:
          isOpen
            ? "8px 8px 0 0"
            : 0,

        fontFamily: "inherit",

        transition:
          "color 0.2s ease, background 0.2s ease",
      }}
    >
      <span>{label}</span>

      <ChevronDown
        size={16}
        style={{
          color: "#C8973A",

          flexShrink: 0,

          transition:
            "transform 0.2s ease",

          transform: isOpen
            ? "rotate(180deg)"
            : "rotate(0deg)",
        }}
      />
    </button>
  );
}

/* =========================================================
   MAIN NAVBAR
   ========================================================= */

export default function Navbar() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [scrolled, setScrolled] =
    useState(false);

  const [jurusanOpen, setJurusanOpen] =
    useState(false);

  const [eskulOpen, setEskulOpen] =
    useState(false);

  const [direktoriOpen, setDirektoriOpen] =
    useState(false);

  const [mobileJurusan, setMobileJurusan] =
    useState(false);

  const [mobileEskul, setMobileEskul] =
    useState(false);

  const [mobileDirektori, setMobileDirektori] =
    useState(false);

  const [session, setSession] =
    useState<Session | null>(null);

  const jurusanRef =
    useRef<HTMLDivElement>(null);

  const eskulRef =
    useRef<HTMLDivElement>(null);

  const direktoriRef =
    useRef<HTMLDivElement>(null);

  /* =======================================================
     SCROLL + SESSION
     ======================================================= */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(
        window.scrollY > 40
      );
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    fetch("/api/auth/me")
      .then((response) =>
        response.json()
      )
      .then((data) => {
        if (data?.user) {
          setSession(data.user);
        }
      })
      .catch(() => {});

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  /* =======================================================
     CLOSE DESKTOP DROPDOWNS
     ======================================================= */

  useEffect(() => {
    const handleMouseDown = (
      event: globalThis.MouseEvent
    ) => {
      const target =
        event.target as HTMLElement;

      const inJurusan =
        jurusanRef.current?.contains(
          target
        ) ||
        target.closest?.(
          '[data-dropdown="jurusan"]'
        );

      const inEskul =
        eskulRef.current?.contains(
          target
        ) ||
        target.closest?.(
          '[data-dropdown="eskul"]'
        );

      const inDirektori =
        direktoriRef.current?.contains(
          target
        ) ||
        target.closest?.(
          '[data-dropdown="direktori"]'
        );

      if (!inJurusan) {
        setJurusanOpen(false);
      }

      if (!inEskul) {
        setEskulOpen(false);
      }

      if (!inDirektori) {
        setDirektoriOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleMouseDown
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleMouseDown
      );
    };
  }, []);

  /* =======================================================
     CLOSE MOBILE ON DESKTOP
     ======================================================= */

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1100) {
        setMobileOpen(false);
        setMobileJurusan(false);
        setMobileEskul(false);
        setMobileDirektori(false);
      }
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  /* =======================================================
     CLOSE MOBILE ON ROUTE CHANGE
     ======================================================= */

  useEffect(() => {
    setMobileOpen(false);
    setMobileJurusan(false);
    setMobileEskul(false);
    setMobileDirektori(false);
  }, [pathname]);

  /* =======================================================
     LOGOUT
     ======================================================= */

  const handleLogout = async () => {
    try {
      await fetch(
        "/api/auth/logout",
        {
          method: "POST",
        }
      );
    } finally {
      window.location.href = "/";
    }
  };

  /* =======================================================
     HELPERS
     ======================================================= */

  const closeMobile = () => {
    setMobileOpen(false);
  };

  const toggleJurusan = () => {
    setJurusanOpen(
      (value) => !value
    );

    setEskulOpen(false);
    setDirektoriOpen(false);
  };

  const toggleEskul = () => {
    setEskulOpen(
      (value) => !value
    );

    setJurusanOpen(false);
    setDirektoriOpen(false);
  };

  const toggleDirektori = () => {
    setDirektoriOpen(
      (value) => !value
    );

    setJurusanOpen(false);
    setEskulOpen(false);
  };

  const dashboardHref =
    session?.role === "admin"
      ? "/admin/dashboard"
      : "/dashboard";

  /* =======================================================
     RETURN
     ======================================================= */

  return (
    <>
      <style>{CSS}</style>

      <nav
        style={{
          position: "sticky",
          top: 0,

          zIndex: 99999,

          width: "100%",

          background: "transparent",

          padding: scrolled
            ? "14px 0 0"
            : "0",

          transition:
            "padding 0.45s cubic-bezier(0.22,1,0.36,1)",

          isolation: "isolate",
        }}
      >
        <div
          className={`nav-shell${
            scrolled
              ? " scrolled"
              : ""
          }`}
        >
          <div className="nav-container">
            <div
              className={`nav-inner${
                scrolled
                  ? " scrolled"
                  : ""
              }`}
            >
              {/* =================================================
                  LOGO
                  ================================================= */}

              <Link
                href="/"
                className="nav-logo-link"
              >
                <div className="nav-logo-box">
                  <Image
                    src="/images/smpcn.png"
                    alt="Logo SMP Citra Negara"
                    width={44}
                    height={44}
                    priority
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div
                  style={{
                    minWidth: 0,
                  }}
                >
                  <div className="nav-logo-text">
                    SMP Citra Negara
                  </div>

                  <div className="nav-logo-sub">
                    Pilihan Tepat di Sekolah yang MANTAP
                  </div>
                </div>
              </Link>

              {/* =================================================
                  DESKTOP NAV
                  ================================================= */}

              <div className="desktop-nav">
                <NavLink href="/">
                  Beranda
                </NavLink>

                <NavLink href="/tentang">
                  Tentang Kami
                </NavLink>

                {/* PROGRAM KEAHLIAN */}

                <div
                  ref={jurusanRef}
                  style={{
                    position: "relative",
                  }}
                >
                  <NavButton
                    label="Program Keahlian"
                    isOpen={jurusanOpen}
                    onClick={toggleJurusan}
                  />

                  {jurusanOpen && (
                    <DropdownPanel
                      triggerRef={jurusanRef}
                      panelWidth={390}
                      id="jurusan"
                    >
                      <p
                        style={{
                          fontSize: 10,
                          color: "#7A857F",
                          fontWeight: 800,
                          letterSpacing: 1.1,
                          margin:
                            "2px 0 11px",
                          paddingLeft: 2,
                        }}
                      >
                        PROGRAM & ORGANISASI
                      </p>

                      <div className="drop-grid">
                        {JURUSAN_LIST.map(
                          (item) => {
                            const Icon =
                              item.icon;

                            return (
                              <Link
                                key={
                                  item.kode
                                }
                                href={
                                  item.href
                                }
                                className="drop-item"
                                onClick={() =>
                                  setJurusanOpen(
                                    false
                                  )
                                }
                              >
                                <div
                                  style={{
                                    width: 38,
                                    height: 38,

                                    borderRadius: 10,

                                    background:
                                      "rgba(11,61,46,0.08)",

                                    border:
                                      "1px solid rgba(11,61,46,0.10)",

                                    display:
                                      "flex",

                                    alignItems:
                                      "center",

                                    justifyContent:
                                      "center",

                                    flexShrink: 0,
                                  }}
                                >
                                  <Icon
                                    size={19}
                                    color="#0B3D2E"
                                    strokeWidth={
                                      2
                                    }
                                  />
                                </div>

                                <div
                                  style={{
                                    minWidth: 0,
                                  }}
                                >
                                  <span
                                    style={{
                                      display:
                                        "inline-flex",

                                      alignItems:
                                        "center",

                                      marginBottom:
                                        3,

                                      fontSize: 9,

                                      fontWeight: 800,

                                      background:
                                        "rgba(200,151,58,0.12)",

                                      color:
                                        "#A47720",

                                      border:
                                        "1px solid rgba(200,151,58,0.20)",

                                      padding:
                                        "2px 6px",

                                      borderRadius: 5,
                                    }}
                                  >
                                    {
                                      item.kode
                                    }
                                  </span>

                                  <div
                                    style={{
                                      fontSize: 12,
                                      fontWeight: 750,
                                      color:
                                        "#18382D",
                                      lineHeight:
                                        1.3,
                                    }}
                                  >
                                    {
                                      item.nama
                                    }
                                  </div>

                                  <div
                                    style={{
                                      marginTop: 2,
                                      fontSize: 10.5,
                                      color:
                                        "#718078",
                                      lineHeight:
                                        1.35,
                                    }}
                                  >
                                    {
                                      item.singkat
                                    }
                                  </div>
                                </div>
                              </Link>
                            );
                          }
                        )}
                      </div>

                      <div
                        style={{
                          marginTop: 11,
                          paddingTop: 11,

                          borderTop:
                            "1px solid rgba(11,61,46,0.09)",

                          display: "flex",

                          alignItems:
                            "center",

                          justifyContent:
                            "space-between",

                          gap: 8,

                          flexWrap: "wrap",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 10.5,
                            color:
                              "#7A857F",
                          }}
                        >
                          Lanjut ke SMK/SMA
                          setelah lulus
                        </span>

                        <Link
                          href="/"
                          onClick={() =>
                            setJurusanOpen(
                              false
                            )
                          }
                          style={{
                            fontSize: 11,
                            fontWeight: 700,

                            color:
                              "#0B3D2E",

                            textDecoration:
                              "none",

                            background:
                              "rgba(11,61,46,0.06)",

                            padding:
                              "6px 12px",

                            borderRadius: 20,

                            border:
                              "1px solid rgba(11,61,46,0.10)",

                            whiteSpace:
                              "nowrap",
                          }}
                        >
                          Info SMP →
                        </Link>
                      </div>
                    </DropdownPanel>
                  )}
                </div>

                {/* EKSTRAKURIKULER */}

                <div
                  ref={eskulRef}
                  style={{
                    position: "relative",
                  }}
                >
                  <NavButton
                    label="Ekstrakurikuler"
                    isOpen={eskulOpen}
                    onClick={toggleEskul}
                  />

                  {eskulOpen && (
                    <DropdownPanel
                      triggerRef={eskulRef}
                      panelWidth={470}
                      id="eskul"
                    >
                      <p
                        style={{
                          fontSize: 10,
                          color: "#7A857F",
                          fontWeight: 800,
                          letterSpacing: 1.1,
                          margin:
                            "2px 0 11px",
                          paddingLeft: 2,
                        }}
                      >
                        7 EKSTRAKURIKULER
                      </p>

                      <div className="eskul-grid">
                        {ESKUL_LIST.map(
                          (item) => (
                            <Link
                              key={
                                item.nama
                              }
                              href={
                                item.href
                              }
                              className="eskul-text-item"
                              onClick={() =>
                                setEskulOpen(
                                  false
                                )
                              }
                            >
                              {item.nama}
                            </Link>
                          )
                        )}
                      </div>
                    </DropdownPanel>
                  )}
                </div>

                {/* DIREKTORI */}

                <div
                  ref={direktoriRef}
                  style={{
                    position: "relative",
                  }}
                >
                  <NavButton
                    label="Direktori"
                    isOpen={
                      direktoriOpen
                    }
                    onClick={
                      toggleDirektori
                    }
                  />

                  {direktoriOpen && (
                    <DropdownPanel
                      triggerRef={
                        direktoriRef
                      }
                      panelWidth={220}
                      id="direktori"
                    >
                      <p
                        style={{
                          fontSize: 10,
                          color: "#7A857F",
                          fontWeight: 800,
                          letterSpacing: 1.1,
                          margin:
                            "2px 0 11px",
                          paddingLeft: 2,
                        }}
                      >
                        DIREKTORI
                      </p>

                      <div className="drop-grid">
                        {DIREKTORI_LIST.map(
                          (item) => (
                            <Link
                              key={
                                item.nama
                              }
                              href={
                                item.href
                              }
                              className="eskul-text-item"
                              onClick={() =>
                                setDirektoriOpen(
                                  false
                                )
                              }
                            >
                              {item.nama}
                            </Link>
                          )
                        )}
                      </div>
                    </DropdownPanel>
                  )}
                </div>

                <NavLink href="/prestasi">
                  Prestasi
                </NavLink>

                <NavLink href="/news">
                  Berita
                </NavLink>

                <NavLink href="/spmb">
                  SPMB
                </NavLink>
              </div>

              {/* =================================================
                  DESKTOP AUTH
                  ================================================= */}

              <div className="desktop-auth">
                {session ? (
                  <>
                    <Link
                      href={
                        dashboardHref
                      }
                      style={{
                        color: "#C8973A",

                        fontSize: 13,

                        fontWeight: 700,

                        textDecoration:
                          "none",

                        maxWidth: 140,

                        overflow: "hidden",

                        textOverflow:
                          "ellipsis",

                        whiteSpace:
                          "nowrap",
                      }}
                    >
                      {session.namaLengkap ||
                        "Dashboard"}
                    </Link>

                    <button
                      type="button"
                      onClick={
                        handleLogout
                      }
                      style={{
                        background:
                          "transparent",

                        border:
                          "1px solid rgba(11,61,46,0.16)",

                        color:
                          "var(--nav-text)",

                        padding:
                          "7px 13px",

                        borderRadius: 8,

                        cursor: "pointer",

                        fontSize: 12,

                        whiteSpace:
                          "nowrap",

                        transition:
                          "all 0.2s ease",
                      }}
                    >
                      Keluar
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      style={{
                        color:
                          "var(--nav-text)",

                        textDecoration:
                          "none",

                        fontSize: 13,

                        fontWeight: 600,

                        padding:
                          "8px 6px",

                        whiteSpace:
                          "nowrap",
                      }}
                    >
                      Masuk
                    </Link>

                    <Link
                      href="/register"
                      className="btn-primary"
                      style={{
                        padding:
                          "9px 17px",

                        fontSize: 12.5,

                        whiteSpace:
                          "nowrap",

                        textDecoration:
                          "none",

                        borderRadius: 10,
                      }}
                    >
                      Daftar Sekarang
                    </Link>
                  </>
                )}
              </div>

              {/* =================================================
                  MOBILE BUTTON
                  ================================================= */}

              <button
                type="button"
                onClick={() =>
                  setMobileOpen(
                    (value) => !value
                  )
                }
                className="mobile-toggle"
                aria-label={
                  mobileOpen
                    ? "Tutup menu"
                    : "Buka menu"
                }
                aria-expanded={
                  mobileOpen
                }
              >
                {mobileOpen ? (
                  <X size={22} />
                ) : (
                  <Menu size={22} />
                )}
              </button>
            </div>
          </div>

          {/* =====================================================
              MOBILE MENU
              ===================================================== */}

          {mobileOpen && (
            <div className="mobile-menu">
              {/* BERANDA */}

              <Link
                href="/"
                onClick={closeMobile}
                style={MOBILE_LINK}
              >
                Beranda
              </Link>

              {/* TENTANG */}

              <Link
                href="/tentang"
                onClick={closeMobile}
                style={MOBILE_LINK}
              >
                Tentang Kami
              </Link>

              {/* PROGRAM */}

              <MobileAccordionButton
                label="Program Keahlian"
                isOpen={
                  mobileJurusan
                }
                onClick={() =>
                  setMobileJurusan(
                    (value) => !value
                  )
                }
              />

              {mobileJurusan && (
                <div
                  style={{
                    paddingLeft: 8,
                    paddingBottom: 4,
                    background:
                      "rgba(0,0,0,0.10)",
                    borderRadius:
                      "0 0 8px 8px",
                  }}
                >
                  {JURUSAN_LIST.map(
                    (item) => {
                      const Icon =
                        item.icon;

                      return (
                        <Link
                          key={
                            item.kode
                          }
                          href={
                            item.href
                          }
                          onClick={() => {
                            closeMobile();

                            setMobileJurusan(
                              false
                            );
                          }}
                          style={{
                            display:
                              "flex",

                            alignItems:
                              "center",

                            gap: 10,

                            padding:
                              "9px 4px",

                            textDecoration:
                              "none",

                            borderBottom:
                              "1px solid rgba(255,255,255,0.05)",
                          }}
                        >
                          <div
                            style={{
                              width: 30,
                              height: 30,

                              borderRadius: 8,

                              background:
                                "rgba(200,151,58,0.10)",

                              border:
                                "1px solid rgba(200,151,58,0.16)",

                              display:
                                "flex",

                              alignItems:
                                "center",

                              justifyContent:
                                "center",

                              flexShrink: 0,
                            }}
                          >
                            <Icon
                              size={15}
                              color="#E8B84B"
                              strokeWidth={
                                2
                              }
                            />
                          </div>

                          <div
                            style={{
                              minWidth: 0,
                            }}
                          >
                            <span
                              style={{
                                fontSize: 9,
                                fontWeight: 800,
                                color:
                                  "#E8B84B",
                                marginRight:
                                  7,
                              }}
                            >
                              {
                                item.kode
                              }
                            </span>

                            <span
                              style={{
                                fontSize: 13,
                                color:
                                  "rgba(255,255,255,0.90)",
                              }}
                            >
                              {
                                item.nama
                              }
                            </span>
                          </div>
                        </Link>
                      );
                    }
                  )}
                </div>
              )}

              {/* EKSKUL */}

              <MobileAccordionButton
                label="Ekstrakurikuler"
                isOpen={
                  mobileEskul
                }
                onClick={() =>
                  setMobileEskul(
                    (value) => !value
                  )
                }
              />

              {mobileEskul && (
                <div
                  style={{
                    paddingLeft: 8,
                    paddingBottom: 4,
                    background:
                      "rgba(0,0,0,0.10)",
                    borderRadius:
                      "0 0 8px 8px",
                  }}
                >
                  {ESKUL_LIST.map(
                    (item) => (
                      <Link
                        key={
                          item.nama
                        }
                        href={
                          item.href
                        }
                        onClick={() => {
                          closeMobile();

                          setMobileEskul(
                            false
                          );
                        }}
                        style={{
                          display: "block",

                          padding:
                            "9px 4px",

                          textDecoration:
                            "none",

                          borderBottom:
                            "1px solid rgba(255,255,255,0.05)",

                          fontSize: 13,

                          color:
                            "rgba(255,255,255,0.88)",
                        }}
                      >
                        {item.nama}
                      </Link>
                    )
                  )}
                </div>
              )}

              {/* DIREKTORI */}

              <MobileAccordionButton
                label="Direktori"
                isOpen={
                  mobileDirektori
                }
                onClick={() =>
                  setMobileDirektori(
                    (value) => !value
                  )
                }
              />

              {mobileDirektori && (
                <div
                  style={{
                    paddingLeft: 8,
                    paddingBottom: 4,
                    background:
                      "rgba(0,0,0,0.10)",
                    borderRadius:
                      "0 0 8px 8px",
                  }}
                >
                  {DIREKTORI_LIST.map(
                    (item) => (
                      <Link
                        key={
                          item.nama
                        }
                        href={
                          item.href
                        }
                        onClick={() => {
                          closeMobile();

                          setMobileDirektori(
                            false
                          );
                        }}
                        style={{
                          display: "block",

                          padding:
                            "9px 4px",

                          textDecoration:
                            "none",

                          borderBottom:
                            "1px solid rgba(255,255,255,0.05)",

                          fontSize: 13,

                          color:
                            "rgba(255,255,255,0.88)",
                        }}
                      >
                        {item.nama}
                      </Link>
                    )
                  )}
                </div>
              )}

              {/* PRESTASI */}

              <Link
                href="/prestasi"
                onClick={closeMobile}
                style={MOBILE_LINK}
              >
                Prestasi
              </Link>
              
              {/* BERITA */}

              <Link
                href="/news"
                onClick={closeMobile}
                style={MOBILE_LINK}
              >
                Berita
              </Link>

              {/* SPMB */}

              <Link
                href="/spmb"
                onClick={closeMobile}
                style={MOBILE_LINK}
              >
                SPMB
              </Link>

              {/* =================================================
                  MOBILE AUTH
                  ================================================= */}

              <div
                style={{
                  marginTop: 16,

                  paddingTop: 14,

                  borderTop:
                    "1px solid rgba(255,255,255,0.08)",

                  display: "flex",

                  gap: 10,
                }}
              >
                {session ? (
                  <>
                    <Link
                      href={
                        dashboardHref
                      }
                      onClick={
                        closeMobile
                      }
                      style={{
                        flex: 1,

                        textAlign:
                          "center",

                        padding:
                          "10px",

                        border:
                          "1px solid rgba(200,151,58,0.35)",

                        borderRadius: 9,

                        color:
                          "#E8B84B",

                        textDecoration:
                          "none",

                        fontSize: 13,

                        fontWeight: 700,
                      }}
                    >
                      Dashboard
                    </Link>

                    <button
                      type="button"
                      onClick={
                        handleLogout
                      }
                      style={{
                        flex: 1,

                        padding:
                          "10px",

                        border:
                          "1px solid rgba(255,255,255,0.18)",

                        borderRadius: 9,

                        background:
                          "transparent",

                        color:
                          "rgba(255,255,255,0.90)",

                        cursor:
                          "pointer",

                        fontSize: 13,
                      }}
                    >
                      Keluar
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={
                        closeMobile
                      }
                      style={{
                        flex: 1,

                        textAlign:
                          "center",

                        padding:
                          "10px",

                        border:
                          "1px solid rgba(255,255,255,0.22)",

                        borderRadius: 9,

                        color:
                          "rgba(255,255,255,0.92)",

                        textDecoration:
                          "none",

                        fontSize: 13,
                      }}
                    >
                      Masuk
                    </Link>

                    <Link
                      href="/register"
                      onClick={
                        closeMobile
                      }
                      className="btn-primary"
                      style={{
                        flex: 1,

                        textAlign:
                          "center",

                        padding:
                          "10px",

                        fontSize: 13,

                        textDecoration:
                          "none",

                        borderRadius: 9,
                      }}
                    >
                      Daftar
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

/* =========================================================
   NAV LINK
   ========================================================= */

function NavLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const pathname = usePathname();

  const isActive =
    pathname === href;

  return (
    <Link
      href={href}
      style={{
        ...NAV_LINK,

        color: isActive
          ? "#C8973A"
          : "var(--nav-text)",

        position: "relative",

        background: isActive
          ? "rgba(200,151,58,0.08)"
          : "transparent",
      }}
      onMouseEnter={(event) =>
        applyHover(
          event,
          true,
          isActive
        )
      }
      onMouseLeave={(event) =>
        applyHover(
          event,
          false,
          isActive
        )
      }
    >
      {children}

      {isActive && (
        <span
          style={{
            position: "absolute",

            left: 11,
            right: 11,

            bottom: 2,

            height: 2,

            background:
              "linear-gradient(90deg, transparent, #E8B84B, transparent)",

            borderRadius: 999,

            animation:
              "navLineIn 0.35s ease-out",

            pointerEvents:
              "none",
          }}
        />
      )}
    </Link>
  );
}

/* =========================================================
   HOVER
   ========================================================= */

function applyHover(
  event: MouseEvent<HTMLAnchorElement>,
  hovered: boolean,
  isActive = false
) {
  const element =
    event.currentTarget;

  element.style.color =
    hovered || isActive
      ? "#C8973A"
      : "var(--nav-text)";

  element.style.background =
    hovered || isActive
      ? "rgba(200,151,58,0.09)"
      : "transparent";
}