"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import {
  ElementType,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

const STATS = [
  { angka: 2015, suffix: "", label: "Tahun Berdiri" },
  { angka: 25, suffix: "+", label: "Anggota Aktif" },
  { angka: 12, suffix: "", label: "Prestasi Diraih" },
  { angka: 100, suffix: "%", label: "Dedikasi" },
];

const TUJUAN = [
  {
    icon: "⚡",
    judul: "Kebugaran Fisik",
    deskripsi:
      "Futsal membantu meningkatkan kebugaran fisik siswa melalui latihan yang intens dan pertandingan yang dinamis dan penuh semangat.",
  },
  {
    icon: "⚽",
    judul: "Keterampilan Teknis",
    deskripsi:
      "Futsal merupakan versi mini sepak bola yang membantu siswa mengasah keterampilan dribbling, passing, dan shooting secara optimal.",
  },
  {
    icon: "🤝",
    judul: "Kerjasama Tim",
    deskripsi:
      "Dalam futsal, kerjasama tim adalah kunci. Siswa belajar berkomunikasi, membangun kepercayaan, dan merancang strategi bersama.",
  },
];

const KEGIATAN = [
  {
    no: "01",
    nama: "Latihan Teknik Dasar",
    detail: "Dribbling, passing, shooting, dan penguasaan bola.",
  },
  {
    no: "02",
    nama: "Latihan Fisik",
    detail: "Jogging, sprint, dan latihan kekuatan tubuh.",
  },
  {
    no: "03",
    nama: "Strategi & Taktik",
    detail: "Formasi, pergerakan tanpa bola, pola serangan.",
  },
  {
    no: "04",
    nama: "Pertandingan Internal",
    detail: "Scrimmage antar anggota untuk uji kemampuan.",
  },
  {
    no: "05",
    nama: "Partisipasi Turnamen",
    detail: "Kompetisi futsal regional hingga nasional.",
  },
  {
    no: "06",
    nama: "Pengembangan Mentalitas",
    detail: "Sportivitas, fair play, dan mental pemenang.",
  },
];

/* =========================
   REVEAL ON SCROLL
   -------------------------
   PENTING: status "visible" disimpan di React state
   (bukan lewat classList.add di DOM secara langsung).
   Kalau pakai classList.add manual, class itu akan
   ketimpa/hilang setiap kali React re-render elemen ini
   (misalnya saat kamu klik salah satu item kegiatan dan
   state activeKegiatan berubah) — itulah sebab bug
   "kegiatan rutin ilang pas dibuka".
========================= */

function Reveal({
  as: Tag = "div",
  delay,
  className = "",
  children,
  ...rest
}: {
  as?: ElementType;
  delay?: 1 | 2 | 3;
  className?: string;
  children: ReactNode;
  [key: string]: any;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const delayClass = delay ? `fts-delay-${delay}` : "";

  const combinedClassName = [
    "fts-reveal",
    visible ? "fts-visible" : "",
    delayClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag ref={ref} className={combinedClassName} {...rest}>
      {children}
    </Tag>
  );
}

function AnimatedStat({
  angka,
  suffix,
  label,
}: {
  angka: number;
  suffix: string;
  label: string;
}) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;

    const duration = 1300;
    const startValue = 0;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(
        Math.floor(
          startValue + (angka - startValue) * eased
        )
      );

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [visible, angka]);

  return (
    <div ref={ref} className="fts-stat">
      <div className="fts-stat-num">
        {count}
        {suffix}
      </div>

      <div className="fts-stat-label">
        {label}
      </div>
    </div>
  );
}

export default function FutsalPage() {
  const [activeKegiatan, setActiveKegiatan] =
    useState<string | null>(null);

  const heroRef = useRef<HTMLElement>(null);

  /* =========================
     HERO MOUSE PARALLAX
  ========================= */

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = hero.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) / rect.width - 0.5;

      const y =
        (event.clientY - rect.top) / rect.height - 0.5;

      hero.style.setProperty("--mouse-x", `${x}`);
      hero.style.setProperty("--mouse-y", `${y}`);
    };

    hero.addEventListener(
      "mousemove",
      handleMouseMove
    );

    return () => {
      hero.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    };
  }, []);

  /* =========================
     SCROLL TO KEGIATAN
  ========================= */

  const scrollToKegiatan = () => {
    document
      .getElementById("fts-kegiatan")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@600;700;800&display=swap');

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        .fts-root {
          font-family: 'Barlow', sans-serif;
          background: #0A192F;
          color: #171717;
          min-height: 100vh;
          overflow: hidden;
        }

        /* =========================
           SCROLL REVEAL
        ========================= */

        .fts-reveal {
          opacity: 0;
          transform: translateY(35px);

          transition:
            opacity 0.8s ease,
            transform 0.8s cubic-bezier(.2,.7,.2,1);
        }

        .fts-reveal.fts-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .fts-delay-1 {
          transition-delay: 0.08s;
        }

        .fts-delay-2 {
          transition-delay: 0.16s;
        }

        .fts-delay-3 {
          transition-delay: 0.24s;
        }

        /* =========================
           HERO
        ========================= */

        .fts-hero {
          --mouse-x: 0;
          --mouse-y: 0;

          position: relative;

          height: min(82vh, 760px);
          min-height: 580px;

          overflow: hidden;

          background: #080808;
        }

        .fts-hero-img {
          position: absolute;
          inset: -25px;

          transform:
            translate(
              calc(var(--mouse-x) * -12px),
              calc(var(--mouse-y) * -8px)
            )
            scale(1.04);

          transition:
            transform 0.25s ease-out;
        }

        .fts-hero-img img {
          object-fit: cover;
          object-position: center;

          filter:
            contrast(1.08)
            saturate(1.05);
        }

        .fts-hero-overlay {
          position: absolute;
          inset: 0;

          background:
            radial-gradient(
              circle at 75% 30%,
              rgba(2,132,199,0.22),
              transparent 30%
            ),
            linear-gradient(
              90deg,
              rgba(0,0,0,0.90) 0%,
              rgba(0,0,0,0.65) 38%,
              rgba(0,0,0,0.18) 75%,
              rgba(0,0,0,0.10) 100%
            ),
            linear-gradient(
              to top,
              rgba(0,0,0,0.90) 0%,
              transparent 48%
            );
        }

        .fts-hero::before {
          content: '';

          position: absolute;
          inset: 0;

          z-index: 1;

          background-image:
            linear-gradient(
              rgba(255,255,255,0.035) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.035) 1px,
              transparent 1px
            );

          background-size: 70px 70px;

          mask-image:
            linear-gradient(
              to bottom,
              rgba(0,0,0,0.7),
              transparent 80%
            );

          pointer-events: none;
        }

        .fts-hero::after {
          content: '';

          position: absolute;

          left: 0;
          right: 0;
          bottom: -1px;

          height: 130px;

          background:
            linear-gradient(
              to bottom,
              transparent,
              #0A192F
            );

          pointer-events: none;

          z-index: 3;
        }

        .fts-hero-content {
          position: absolute;

          z-index: 4;

          left: 0;
          right: 0;

          bottom: 105px;

          max-width: 1200px;

          margin: auto;

          padding:
            0 clamp(24px, 6vw, 80px);
        }

        .fts-eyebrow {
          display: inline-flex;
          align-items: center;

          gap: 12px;

          font-family:
            'Barlow Condensed',
            sans-serif;

          font-size: 12px;
          font-weight: 700;

          letter-spacing: 3px;

          text-transform: uppercase;

          color: #fff;

          margin-bottom: 18px;

          animation:
            ftsFadeUp
            0.8s ease
            0.15s
            both;
        }

        .fts-eyebrow::before {
          content: '';

          width: 38px;
          height: 2px;

          background: #0284C7;

          box-shadow:
            0 0 15px
            rgba(2,132,199,0.8);
        }

        .fts-title {
          font-family:
            'Bebas Neue',
            sans-serif;

          font-size:
            clamp(90px, 15vw, 190px);

          line-height: 0.8;

          letter-spacing: 3px;

          color: #0284C7;

          margin: 0 0 26px;

          text-shadow:
            0 8px 40px
            rgba(0,0,0,0.35),

            0 0 45px
            rgba(2,132,199,0.18);

          animation:
            ftsTitleIn
            1s
            cubic-bezier(.2,.8,.2,1)
            0.25s
            both;
        }

        .fts-title span {
          color: #fff;
        }

        .fts-subtitle {
          max-width: 590px;

          margin: 0;

          font-size:
            clamp(15px, 1.5vw, 18px);

          line-height: 1.75;

          color:
            rgba(255,255,255,0.76);

          animation:
            ftsFadeUp
            0.9s ease
            0.45s
            both;
        }

        .fts-hero-button {
          margin-top: 28px;

          display: inline-flex;

          align-items: center;

          gap: 12px;

          border:
            1px solid
            rgba(56,189,248,0.55);

          background:
            rgba(2,132,199,0.10);

          backdrop-filter: blur(10px);

          color: #fff;

          font-family:
            'Barlow Condensed',
            sans-serif;

          font-size: 13px;

          font-weight: 800;

          letter-spacing: 1.5px;

          text-transform: uppercase;

          padding: 13px 20px;

          border-radius: 5px;

          cursor: pointer;

          transition:
            background 0.25s ease,
            transform 0.25s ease,
            box-shadow 0.25s ease;

          animation:
            ftsFadeUp
            0.9s ease
            0.6s
            both;
        }

        .fts-hero-button span {
          transition:
            transform 0.25s ease;
        }

        .fts-hero-button:hover {
          background: #0284C7;

          transform: translateY(-3px);

          box-shadow:
            0 10px 35px
            rgba(2,132,199,0.30);
        }

        .fts-hero-button:hover span {
          transform: translateY(3px);
        }

        /* =========================
           STATS
        ========================= */

        .fts-stats {
          position: relative;

          z-index: 5;

          max-width: 1100px;

          margin: -34px auto 0;

          padding: 0 24px;

          display: grid;

          grid-template-columns:
            repeat(4, 1fr);
        }

        .fts-stat {
          position: relative;

          min-height: 125px;

          padding: 28px 20px;

          background:
            linear-gradient(
              135deg,
              #161F33 0%,
              #0F172A 100%
            );

          text-align: center;

          border-right:
            1px solid
            rgba(255,255,255,0.08);

          box-shadow:
            0 12px 40px
            rgba(0,0,0,0.18);

          overflow: hidden;

          transition:
            transform 0.3s ease,
            filter 0.3s ease;
        }

        .fts-stat::before {
          content: '';

          position: absolute;
          inset: 0;

          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(56,189,248,0.20),
              transparent 55%
            );

          opacity: 0;

          transition:
            opacity 0.3s ease;
        }

        .fts-stat:hover {
          transform: translateY(-7px);

          filter: brightness(1.12);

          z-index: 2;
        }

        .fts-stat:hover::before {
          opacity: 1;
        }

        .fts-stat:first-child {
          border-radius: 12px 0 0 12px;
        }

        .fts-stat:last-child {
          border-right: none;

          border-radius:
            0 12px 12px 0;
        }

        .fts-stat-num {
          position: relative;

          font-family:
            'Bebas Neue',
            sans-serif;

          font-size: 48px;

          line-height: 1;

          color: #38BDF8;

          margin-bottom: 8px;

          text-shadow:
            0 0 20px
            rgba(56,189,248,0.15);
        }

        .fts-stat-label {
          position: relative;

          font-size: 10px;

          font-weight: 700;

          letter-spacing: 1.8px;

          text-transform: uppercase;

          color: #FFFFFF;
        }

        /* =========================
           GENERAL SECTION
        ========================= */

        .fts-section {
          max-width: 1100px;

          margin: 0 auto;

          padding:
            clamp(75px, 9vw, 115px)
            clamp(24px, 6vw, 60px);
        }

        .fts-section-label {
          display: flex;

          align-items: center;

          gap: 10px;

          font-family:
            'Barlow Condensed',
            sans-serif;

          font-size: 11px;

          font-weight: 800;

          letter-spacing: 3px;

          text-transform: uppercase;

          color: #0284C7;

          margin-bottom: 12px;
        }

        .fts-section-label::before {
          content: '';

          width: 24px;
          height: 2px;

          background: #0284C7;

          box-shadow:
            0 0 12px
            rgba(2,132,199,0.55);
        }

        .fts-section-heading {
          font-family:
            'Bebas Neue',
            sans-serif;

          font-size:
            clamp(48px, 6vw, 72px);

          color: #FFFFFF;

          line-height: 0.95;

          letter-spacing: 1px;

          margin: 0 0 45px;
        }

        /* =========================
           TUJUAN
        ========================= */

        .fts-tujuan-grid {
          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap: 18px;
        }

        .fts-tujuan-card {
          position: relative;

          padding:
            36px 30px 34px;

          min-height: 280px;

          background:
            linear-gradient(
              145deg,
              #fff 0%,
              #F0F4F9 100%
            );

          border:
            1px solid
            rgba(255,255,255,0.7);

          border-radius: 14px;

          overflow: hidden;

          transition:
            transform 0.35s
              cubic-bezier(.2,.8,.2,1),
            box-shadow 0.35s ease,
            border-color 0.35s ease;
        }

        .fts-tujuan-card::before {
          content: '';

          position: absolute;

          top: 0;
          left: 0;

          width: 100%;
          height: 4px;

          background:
            linear-gradient(
              90deg,
              #38BDF8,
              #0284C7,
              #075985
            );

          transform:
            scaleX(0);

          transform-origin: left;

          transition:
            transform 0.4s ease;
        }

        .fts-tujuan-card::after {
          content: '';

          position: absolute;

          width: 150px;
          height: 150px;

          right: -70px;
          bottom: -70px;

          border-radius: 50%;

          background: #E0F2FE;

          opacity: 0;

          transition:
            opacity 0.4s ease,
            transform 0.4s ease;
        }

        .fts-tujuan-card:hover {
          transform:
            translateY(-9px)
            rotateX(2deg);

          border-color: #38BDF8;

          box-shadow:
            0 22px 55px
            rgba(2,132,199,0.15);
        }

        .fts-tujuan-card:hover::before {
          transform: scaleX(1);
        }

        .fts-tujuan-card:hover::after {
          opacity: 0.7;

          transform: scale(1.15);
        }

        .fts-tujuan-icon {
          position: relative;

          z-index: 2;

          width: 58px;
          height: 58px;

          display: flex;

          align-items: center;
          justify-content: center;

          background: #E0F2FE;

          border-radius: 12px;

          font-size: 27px;

          margin-bottom: 25px;

          transition:
            transform 0.35s ease,
            box-shadow 0.35s ease;
        }

        .fts-tujuan-card:hover
        .fts-tujuan-icon {
          transform:
            rotate(-6deg)
            scale(1.08);

          box-shadow:
            0 8px 25px
            rgba(2,132,199,0.22);
        }

        .fts-tujuan-title {
          position: relative;

          z-index: 2;

          font-family:
            'Barlow Condensed',
            sans-serif;

          font-size: 23px;

          font-weight: 800;

          color: #171717;

          text-transform: uppercase;

          letter-spacing: 0.8px;

          margin-bottom: 12px;
        }

        .fts-tujuan-desc {
          position: relative;

          z-index: 2;

          font-size: 14px;

          color: #707070;

          line-height: 1.75;

          margin: 0;
        }

        /* =========================
           DIVIDER
        ========================= */

        .fts-divider {
          max-width: 1100px;

          margin: 0 auto;

          padding: 0 60px;

          display: flex;

          align-items: center;

          gap: 18px;
        }

        .fts-divider::before,
        .fts-divider::after {
          content: '';

          height: 1px;

          flex: 1;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255,255,255,0.18)
            );
        }

        .fts-divider::after {
          background:
            linear-gradient(
              90deg,
              rgba(255,255,255,0.18),
              transparent
            );
        }

        .fts-divider-icon {
          color: #38BDF8;

          font-size: 12px;

          animation:
            ftsPulse
            2s
            ease-in-out
            infinite;
        }

        /* =========================
           KEGIATAN
        ========================= */

        .fts-kegiatan-grid {
          display: grid;

          grid-template-columns:
            repeat(2, 1fr);

          gap: 12px;
        }

        .fts-kegiatan-item {
          position: relative;

          display: flex;

          align-items: flex-start;

          gap: 22px;

          padding: 25px 28px;

          background: #fff;

          border:
            1px solid
            #e9e9e9;

          border-radius: 10px;

          cursor: pointer;

          transition:
            transform 0.3s ease,
            border-color 0.3s ease,
            box-shadow 0.3s ease,
            background 0.3s ease;
        }

        .fts-kegiatan-item:hover,
        .fts-kegiatan-item.active {
          transform: translateX(6px);

          border-color: #38BDF8;

          box-shadow:
            0 12px 30px
            rgba(2,132,199,0.10);
        }

        .fts-kegiatan-item.active {
          background:
            linear-gradient(
              135deg,
              #fff,
              #F0F9FF
            );
        }

        .fts-kegiatan-no {
          font-family:
            'Bebas Neue',
            sans-serif;

          font-size: 38px;

          line-height: 1;

          color: #0284C7;

          opacity: 0.35;

          width: 45px;

          flex-shrink: 0;

          transition:
            color 0.3s ease,
            opacity 0.3s ease,
            transform 0.3s ease;
        }

        .fts-kegiatan-item:hover
        .fts-kegiatan-no,
        .fts-kegiatan-item.active
        .fts-kegiatan-no {
          color: #0284C7;

          opacity: 1;

          transform: scale(1.08);
        }

        .fts-kegiatan-nama {
          font-family:
            'Barlow Condensed',
            sans-serif;

          font-size: 18px;

          font-weight: 800;

          color: #222;

          text-transform: uppercase;

          letter-spacing: 0.4px;

          margin-bottom: 5px;
        }

        .fts-kegiatan-detail {
          font-size: 13px;

          line-height: 1.5;

          color: #858585;

          max-height: 0;

          overflow: hidden;

          opacity: 0;

          transition:
            max-height 0.35s ease,
            opacity 0.35s ease,
            margin-top 0.35s ease;
        }

        .fts-kegiatan-item.active
        .fts-kegiatan-detail {
          max-height: 100px;

          opacity: 1;

          margin-top: 8px;
        }

        .fts-kegiatan-arrow {
          margin-left: auto;

          width: 28px;
          height: 28px;

          display: flex;

          align-items: center;
          justify-content: center;

          border:
            1px solid
            #eee;

          border-radius: 50%;

          color: #0284C7;

          flex-shrink: 0;

          transition:
            transform 0.3s ease,
            background 0.3s ease,
            color 0.3s ease;
        }

        .fts-kegiatan-item.active
        .fts-kegiatan-arrow {
          transform: rotate(180deg);

          background: #0284C7;

          color: #fff;
        }

        /* =========================
           CTA
        ========================= */

        .fts-cta {
          position: relative;

          margin-top: 35px;

          background:
            radial-gradient(
              circle at 80% 30%,
              rgba(2,132,199,0.25),
              transparent 30%
            ),
            linear-gradient(
              120deg,
              #07111F 0%,
              #0F2742 65%,
              #075985 140%
            );

          overflow: hidden;
        }

        .fts-cta::before {
          content: 'FUTSAL';

          position: absolute;

          right: -30px;
          bottom: -55px;

          font-family:
            'Bebas Neue',
            sans-serif;

          font-size:
            clamp(130px, 20vw, 280px);

          color:
            rgba(255,255,255,0.035);

          line-height: 1;

          pointer-events: none;
        }

        .fts-cta::after {
          content: '';

          position: absolute;

          top: 0;
          left: 0;

          width: 5px;
          height: 100%;

          background:
            linear-gradient(
              180deg,
              #38BDF8,
              #0284C7
            );
        }

        .fts-cta-inner {
          position: relative;

          z-index: 2;

          max-width: 1100px;

          margin: auto;

          padding:
            clamp(55px, 7vw, 85px)
            clamp(24px, 6vw, 60px);

          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 40px;
        }

        .fts-cta-title {
          font-family:
            'Bebas Neue',
            sans-serif;

          font-size:
            clamp(45px, 5vw, 68px);

          color: #fff;

          line-height: 0.9;

          margin: 0;
        }

        .fts-cta-title span {
          color: #38BDF8;
        }

        .fts-cta-sub {
          max-width: 460px;

          margin: 13px 0 0;

          font-size: 14px;

          line-height: 1.7;

          color:
            rgba(255,255,255,0.55);
        }

        .fts-cta-orbit {
          position: absolute;

          width: 240px;
          height: 240px;

          right: 10%;
          top: 50%;

          border:
            1px solid
            rgba(56,189,248,0.12);

          border-radius: 50%;

          transform:
            translateY(-50%);

          animation:
            ftsOrbit
            12s
            linear
            infinite;
        }

        /* =========================
           ANIMATIONS
        ========================= */

        @keyframes ftsFadeUp {
          from {
            opacity: 0;

            transform:
              translateY(25px);
          }

          to {
            opacity: 1;

            transform:
              translateY(0);
          }
        }

        @keyframes ftsTitleIn {
          from {
            opacity: 0;

            transform:
              translateY(40px)
              scale(0.94);

            filter: blur(8px);
          }

          to {
            opacity: 1;

            transform:
              translateY(0)
              scale(1);

            filter: blur(0);
          }
        }

        @keyframes ftsPulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.6;
          }

          50% {
            transform: scale(1.4);
            opacity: 1;
          }
        }

        @keyframes ftsOrbit {
          from {
            transform:
              translateY(-50%)
              rotate(0deg);
          }

          to {
            transform:
              translateY(-50%)
              rotate(360deg);
          }
        }

        /* =========================
           RESPONSIVE
        ========================= */

        @media (max-width: 900px) {

          .fts-hero {
            height: 650px;
          }

          .fts-hero-content {
            bottom: 95px;
          }

          .fts-title {
            font-size:
              clamp(80px, 17vw, 140px);
          }

          .fts-tujuan-grid {
            grid-template-columns: 1fr;
          }

          .fts-tujuan-card {
            min-height: auto;
          }

          .fts-cta-orbit {
            right: -80px;
          }
        }

        @media (max-width: 700px) {

          .fts-hero {
            min-height: 600px;
            height: 75vh;
          }

          .fts-hero-overlay {
            background:
              radial-gradient(
                circle at 70% 25%,
                rgba(2,132,199,0.18),
                transparent 35%
              ),
              linear-gradient(
                to top,
                rgba(0,0,0,0.94) 0%,
                rgba(0,0,0,0.55) 65%,
                rgba(0,0,0,0.25) 100%
              );
          }

          .fts-hero-content {
            bottom: 85px;

            padding: 0 22px;
          }

          .fts-title {
            font-size:
              clamp(75px, 22vw, 115px);
          }

          .fts-subtitle {
            font-size: 14px;
          }

          .fts-stats {
            grid-template-columns:
              repeat(2, 1fr);

            padding: 0 18px;
          }

          .fts-stat {
            min-height: 105px;

            padding: 23px 12px;
          }

          .fts-stat:first-child {
            border-radius:
              10px 0 0 0;
          }

          .fts-stat:nth-child(2) {
            border-radius:
              0 10px 0 0;

            border-right: none;
          }

          .fts-stat:nth-child(3) {
            border-radius:
              0 0 0 10px;
          }

          .fts-stat:last-child {
            border-radius:
              0 0 10px 0;
          }

          .fts-stat-num {
            font-size: 38px;
          }

          .fts-kegiatan-grid {
            grid-template-columns: 1fr;
          }

          .fts-divider {
            padding: 0 24px;
          }

          .fts-kegiatan-item {
            padding: 22px 18px;
          }

          .fts-cta-inner {
            align-items: flex-start;

            flex-direction: column;
          }

          .fts-cta-orbit {
            display: none;
          }
        }

        @media (max-width: 480px) {

          .fts-title {
            letter-spacing: 1px;
          }

          .fts-eyebrow {
            font-size: 10px;

            letter-spacing: 2px;
          }

          .fts-tujuan-card {
            padding: 28px 22px;
          }

          .fts-kegiatan-item {
            gap: 14px;
          }

          .fts-kegiatan-no {
            font-size: 30px;

            width: 34px;
          }

          .fts-kegiatan-arrow {
            width: 25px;
            height: 25px;
          }

          .fts-cta::before {
            display: none;
          }
        }

        /* =========================
           REDUCED MOTION
        ========================= */

        @media (prefers-reduced-motion: reduce) {

          html {
            scroll-behavior: auto;
          }

          .fts-reveal,
          .fts-title,
          .fts-eyebrow,
          .fts-subtitle,
          .fts-hero-button,
          .fts-divider-icon,
          .fts-cta-orbit {
            animation: none !important;

            transition: none !important;
          }

          .fts-hero-img {
            transform: scale(1.04);

            transition: none;
          }

          .fts-tujuan-card:hover,
          .fts-kegiatan-item:hover,
          .fts-stat:hover {
            transform: none;
          }
        }
      `}</style>

        <Navbar />
      <div className="fts-root">


        <main>

          {/* =========================
              HERO
          ========================= */}

          <section
            ref={heroRef}
            className="fts-hero"
          >

            <div className="fts-hero-img">

              <Image
                src="/images/futsalsmp.jpg"
                alt="Futsal SMP Citra Negara"
                fill
                priority
              />

              <div className="fts-hero-overlay" />

            </div>

            <div className="fts-hero-content">

              <div className="fts-eyebrow">
                Ekstrakurikuler SMP Citra Negara
              </div>

              <h1 className="fts-title">
                FUT<span>SAL</span>
              </h1>

              <p className="fts-subtitle">
                Futsal bukan sekadar ekskul favorit,
                melainkan arena pembuktian! Di sini,
                fisik ditempa, strategi dirancang,
                kekompakan tim diuji, dan mentalitas
                juara dibentuk untuk siap menghadapi
                setiap pertandingan.
              </p>

              <button
                className="fts-hero-button"
                onClick={scrollToKegiatan}
              >
                Jelajahi Kegiatan
                <span>↓</span>
              </button>

            </div>

          </section>

          {/* =========================
              STATS
          ========================= */}

          <div className="fts-stats">

            {STATS.map((s) => (
              <AnimatedStat
                key={s.label}
                angka={s.angka}
                suffix={s.suffix}
                label={s.label}
              />
            ))}

          </div>

          {/* =========================
              TUJUAN
          ========================= */}

          <section className="fts-section">

            <Reveal as="div" className="fts-section-label">
              Mengapa Futsal
            </Reveal>

            <Reveal
              as="h2"
              delay={1}
              className="fts-section-heading"
            >
              TUJUAN KAMI
            </Reveal>

            <div className="fts-tujuan-grid">

              {TUJUAN.map((t, index) => (
                <Reveal
                  key={t.judul}
                  as="div"
                  delay={((index % 3) + 1) as 1 | 2 | 3}
                  className="fts-tujuan-card"
                >

                  <span className="fts-tujuan-icon">
                    {t.icon}
                  </span>

                  <div className="fts-tujuan-title">
                    {t.judul}
                  </div>

                  <p className="fts-tujuan-desc">
                    {t.deskripsi}
                  </p>

                </Reveal>
              ))}

            </div>

          </section>

          {/* =========================
              DIVIDER
          ========================= */}

          <div className="fts-divider">

            <span className="fts-divider-icon">
              ✦
            </span>

          </div>

          {/* =========================
              KEGIATAN
          ========================= */}

          <section
            id="fts-kegiatan"
            className="fts-section"
            style={{
              paddingTop:
                "clamp(55px, 7vw, 85px)",
            }}
          >

            <Reveal as="div" className="fts-section-label">
              Program Latihan
            </Reveal>

            <Reveal as="h2" className="fts-section-heading">
              KEGIATAN RUTIN
            </Reveal>

            <div className="fts-kegiatan-grid">

              {KEGIATAN.map((k, index) => {

                const active =
                  activeKegiatan === k.no;

                return (
                  <Reveal
                    key={k.no}
                    as="div"
                    delay={((index % 3) + 1) as 1 | 2 | 3}
                    className={`fts-kegiatan-item ${
                      active ? "active" : ""
                    }`}
                    onClick={() =>
                      setActiveKegiatan(
                        active ? null : k.no
                      )
                    }
                  >

                    <div className="fts-kegiatan-no">
                      {k.no}
                    </div>

                    <div
                      style={{
                        flex: 1,
                      }}
                    >

                      <div className="fts-kegiatan-nama">
                        {k.nama}
                      </div>

                      <div className="fts-kegiatan-detail">
                        {k.detail}
                      </div>

                    </div>

                    <div className="fts-kegiatan-arrow">
                      ↓
                    </div>

                  </Reveal>
                );
              })}

            </div>

          </section>

          {/* =========================
              CTA
          ========================= */}

          <section className="fts-cta">

            <div className="fts-cta-orbit" />

            <div className="fts-cta-inner">

              <Reveal as="div">

                <h2 className="fts-cta-title">
                  SIAP JADI{" "}
                  <span>JUARA?</span>
                </h2>

                <p className="fts-cta-sub">
                  Asah teknik, bangun strategi, dan
                  buktikan mentalitas juara bersama
                  Futsal SMP Citra Negara.
                </p>

              </Reveal>

            </div>

          </section>

        </main>

        <Footer />

      </div>
    </>
  );
}