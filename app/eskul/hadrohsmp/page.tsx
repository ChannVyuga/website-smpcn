"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { angka: 2013, suffix: "", label: "Tahun Berdiri" },
  { angka: 35, suffix: "+", label: "Anggota Aktif" },
  { angka: 8, suffix: "", label: "Prestasi Diraih" },
  { angka: 100, suffix: "%", label: "Dedikasi" },
];

const TUJUAN = [
  {
    icon: "🪘",
    judul: "Pengembangan Bakat",
    deskripsi:
      "Membantu siswa mengasah kemampuan memainkan alat musik hadroh dan vokal sholawat secara terarah.",
  },
  {
    icon: "🤲",
    judul: "Kekompakan Tim",
    deskripsi:
      "Melatih kerja sama, disiplin, dan kekompakan dalam setiap penampilan maupun latihan rutin.",
  },
  {
    icon: "🕌",
    judul: "Cinta Sholawat",
    deskripsi:
      "Menanamkan kecintaan kepada Rasulullah SAW melalui lantunan sholawat yang indah dan penuh makna.",
  },
];

const KEGIATAN = [
  {
    no: "01",
    nama: "Pembinaan Dasar Islam",
    detail: "Tahsin/Tahfidz Al-Qur'an, Fiqih, dan kajian kitab.",
  },
  {
    no: "02",
    nama: "Aksi Sosial & Kemanusiaan",
    detail: "Bakti sosial, santunan, dan peduli bencana.",
  },
  {
    no: "03",
    nama: "Praktik Dakwah",
    detail: "Latihan MC, muadzin, imam, dan kultum.",
  },
  {
    no: "04",
    nama: "Penyelenggaraan PHBI",
    detail: "Maulid, Isra Mi'raj, dan Pesantren Kilat.",
  },
  {
    no: "05",
    nama: "Pengembangan Mental Qur'ani",
    detail: "Mental tangguh dan menjadi teladan sebaya.",
  },
  {
    no: "06",
    nama: "Keterampilan Organisasi",
    detail: "Public speaking, manajemen acara, administrasi.",
  },
];

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

    let start = 0;
    const duration = 1300;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(start + (angka - start) * eased);
      setCount(value);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [visible, angka]);

  return (
    <div ref={ref} className="had-stat">
      <div className="had-stat-num">
        {count}
        {suffix}
      </div>
      <div className="had-stat-label">{label}</div>
    </div>
  );
}

export default function IrmaPage() {
  const [activeKegiatan, setActiveKegiatan] = useState<string | null>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reveals = document.querySelectorAll(".had-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("had-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      hero.style.setProperty("--mouse-x", `${x}`);
      hero.style.setProperty("--mouse-y", `${y}`);
    };

    hero.addEventListener("mousemove", handleMouseMove);
    return () => hero.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToKegiatan = () => {
    document.getElementById("kegiatan")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@600;700;800&display=swap');

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        .had-root {
          /* --- Unified color system, built from the core brand green #159447 --- */
          --had-green: #159447;
          --had-green-light: #1CAF57;
          --had-green-dark: #0C6E34;
          --had-green-deep: #073D22;
          --had-green-tint: #E7F5EC;
          --had-green-tint-deep: #DCEEE1;
          --had-gold: #C9A227;
          --had-gold-dark: #96771C;
          --had-ink: #14181A;
          --had-paper: #F6F8F6;

          font-family: 'Barlow', sans-serif;
          background: var(--had-paper);
          color: var(--had-ink);
          min-height: 100vh;
          overflow: hidden;
        }

        /* REVEAL */
        .had-reveal {
          opacity: 0;
          transform: translateY(35px);
          transition: opacity 0.8s ease, transform 0.8s cubic-bezier(.2,.7,.2,1);
        }
        .had-reveal.had-visible { opacity: 1; transform: translateY(0); }
        .had-delay-1 { transition-delay: 0.08s; }
        .had-delay-2 { transition-delay: 0.16s; }
        .had-delay-3 { transition-delay: 0.24s; }

        /* HERO */
        .had-hero {
          --mouse-x: 0;
          --mouse-y: 0;
          position: relative;
          height: min(78vh, 720px);
          min-height: 560px;
          overflow: hidden;
          background: var(--had-paper);
        }

        .had-hero-img {
          position: absolute;
          inset: -25px;
          transform: translate(calc(var(--mouse-x) * -12px), calc(var(--mouse-y) * -8px)) scale(1.04);
          transition: transform 0.25s ease-out;
        }

        .had-hero-img img {
          object-fit: cover;
          object-position: center top;
          filter: contrast(1.08);
        }

        .had-hero-overlay {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 75% 35%, rgba(21,148,71,0.22), transparent 28%),
            linear-gradient(90deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.62) 38%, rgba(0,0,0,0.15) 75%, rgba(0,0,0,0.1) 100%),
            linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 45%),
            linear-gradient(200deg, rgba(7,61,34,0.30) 0%, transparent 55%);
        }

        .had-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 1;
          background-image:
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size: 70px 70px;
          mask-image: linear-gradient(to bottom, rgba(0,0,0,0.7), transparent 80%);
          pointer-events: none;
        }

        .had-hero::after {
          content: '';
          position: absolute;
          left: 0; right: 0; bottom: -1px;
          height: 100px;
          background: linear-gradient(to bottom, transparent, var(--had-paper));
          pointer-events: none;
          z-index: 3;
        }

        .had-hero-content {
          position: absolute;
          z-index: 4;
          left: 0; right: 0; bottom: 105px;
          max-width: 1200px;
          margin: auto;
          padding: 0 clamp(24px, 6vw, 80px);
        }

        .had-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 18px;
          animation: hadFadeUp 0.8s ease 0.15s both;
        }

        .had-eyebrow::before {
          content: '';
          width: 38px; height: 2px;
          background: var(--had-green-light);
          box-shadow: 0 0 15px rgba(21,148,71,0.75);
        }

        .had-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(90px, 15vw, 190px);
          line-height: 0.8;
          letter-spacing: 3px;
          color: var(--had-green-light);
          margin: 0 0 26px;
          text-shadow: 0 8px 40px rgba(0,0,0,0.35), 0 0 45px rgba(21,148,71,0.32);
          animation: hadTitleIn 1s cubic-bezier(.2,.8,.2,1) 0.25s both;
        }

        .had-title span { color: #fff; }

        .had-subtitle {
          max-width: 590px;
          margin: 0;
          font-size: clamp(15px, 1.5vw, 18px);
          line-height: 1.75;
          color: rgba(255,255,255,0.76);
          animation: hadFadeUp 0.9s ease 0.45s both;
        }

        .had-hero-button {
          margin-top: 28px;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          border: 1px solid rgba(21,148,71,0.5);
          background: rgba(21,148,71,0.10);
          backdrop-filter: blur(10px);
          color: #fff;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 13px 20px;
          border-radius: 5px;
          cursor: pointer;
          transition: background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
          animation: hadFadeUp 0.9s ease 0.6s both;
        }

        .had-hero-button span { transition: transform 0.25s ease; }

        .had-hero-button:hover {
          background: var(--had-green);
          transform: translateY(-3px);
          box-shadow: 0 10px 35px rgba(21,148,71,0.30);
        }

        .had-hero-button:hover span { transform: translateY(3px); }

        /* STATS */
        .had-stats {
          position: relative;
          z-index: 5;
          max-width: 1100px;
          margin: -34px auto 0;
          padding: 0 24px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }

        .had-stat {
          position: relative;
          min-height: 125px;
          padding: 28px 20px;
          background: linear-gradient(135deg, var(--had-green) 0%, var(--had-green-dark) 55%, var(--had-green-deep) 100%);
          text-align: center;
          border-right: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 12px 40px rgba(7,61,34,0.25);
          overflow: hidden;
          transition: transform 0.3s ease, filter 0.3s ease;
        }

        .had-stat::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 0%, rgba(255,255,255,0.18), transparent 55%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .had-stat:hover { transform: translateY(-7px); filter: brightness(1.12); z-index: 2; }
        .had-stat:hover::before { opacity: 1; }
        .had-stat:first-child { border-radius: 12px 0 0 12px; }
        .had-stat:last-child { border-right: none; border-radius: 0 12px 12px 0; }

        .had-stat-num {
          position: relative;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 48px;
          line-height: 1;
          color: #FFFFFF;
          margin-bottom: 8px;
        }

        .had-stat-label {
          position: relative;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.75);
        }

        /* SECTION */
        .had-section {
          max-width: 1100px;
          margin: 0 auto;
          padding: clamp(75px, 9vw, 115px) clamp(24px, 6vw, 60px);
        }

        .had-section-label {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--had-gold-dark);
          margin-bottom: 12px;
        }

        .had-section-label::before {
          content: '';
          width: 24px; height: 2px;
          background: var(--had-gold);
          box-shadow: 0 0 12px rgba(201,162,39,0.45);
        }

        .had-section-heading {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(48px, 6vw, 72px);
          color: var(--had-ink);
          line-height: 0.95;
          letter-spacing: 1px;
          margin: 0 0 45px;
        }

        /* TUJUAN */
        .had-tujuan-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .had-tujuan-card {
          position: relative;
          padding: 36px 30px 34px;
          min-height: 280px;
          background: linear-gradient(145deg, var(--had-green-tint) 0%, var(--had-green-tint-deep) 100%);
          border: 1px solid rgba(255,255,255,0.7);
          border-radius: 14px;
          overflow: hidden;
          transition: transform 0.35s cubic-bezier(.2,.8,.2,1), box-shadow 0.35s ease, border-color 0.35s ease;
        }

        .had-tujuan-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 4px;
          background: linear-gradient(90deg, var(--had-gold), var(--had-green), var(--had-green-deep));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }

        .had-tujuan-card::after {
          content: '';
          position: absolute;
          width: 150px; height: 150px;
          right: -70px; bottom: -70px;
          border-radius: 50%;
          background: var(--had-green-tint-deep);
          opacity: 0;
          transition: opacity 0.4s ease, transform 0.4s ease;
        }

        .had-tujuan-card:hover {
          transform: translateY(-9px) rotateX(2deg);
          border-color: var(--had-green);
          box-shadow: 0 22px 55px rgba(21,148,71,0.18);
        }

        .had-tujuan-card:hover::before { transform: scaleX(1); }
        .had-tujuan-card:hover::after { opacity: 0.7; transform: scale(1.15); }

        .had-tujuan-icon {
          position: relative;
          z-index: 2;
          width: 58px; height: 58px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--had-green-tint-deep);
          border-radius: 12px;
          font-size: 27px;
          margin-bottom: 25px;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }

        .had-tujuan-card:hover .had-tujuan-icon {
          transform: rotate(-6deg) scale(1.08);
          box-shadow: 0 8px 25px rgba(21,148,71,0.24);
        }

        .had-tujuan-title {
          position: relative;
          z-index: 2;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 23px;
          font-weight: 800;
          color: var(--had-ink);
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 12px;
        }

        .had-tujuan-desc {
          position: relative;
          z-index: 2;
          font-size: 14px;
          color: #707070;
          line-height: 1.75;
          margin: 0;
        }

        /* DIVIDER */
        .had-divider {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 60px;
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .had-divider::before, .had-divider::after {
          content: '';
          height: 1px; flex: 1;
          background: linear-gradient(90deg, transparent, rgba(21,148,71,0.18));
        }

        .had-divider::after {
          background: linear-gradient(90deg, rgba(21,148,71,0.18), transparent);
        }

        .had-divider-icon {
          color: var(--had-gold);
          font-size: 12px;
          animation: hadPulse 2s ease-in-out infinite;
        }

        /* KEGIATAN */
        .had-kegiatan-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .had-kegiatan-item {
          position: relative;
          display: flex;
          align-items: flex-start;
          gap: 22px;
          padding: 25px 28px;
          background: #fff;
          border: 1px solid #e9e9e9;
          border-radius: 10px;
          cursor: pointer;
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
        }

        .had-kegiatan-item:hover,
        .had-kegiatan-item[data-active="true"] {
          transform: translateX(6px);
          border-color: var(--had-green);
          box-shadow: 0 12px 30px rgba(21,148,71,0.14);
        }

        .had-kegiatan-item[data-active="true"] {
          background: linear-gradient(135deg, #fff, var(--had-green-tint));
        }

        .had-kegiatan-no {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 38px;
          line-height: 1;
          color: var(--had-green);
          opacity: 0.35;
          width: 45px;
          flex-shrink: 0;
          transition: color 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
        }

        .had-kegiatan-item:hover .had-kegiatan-no,
        .had-kegiatan-item[data-active="true"] .had-kegiatan-no {
          color: var(--had-green);
          opacity: 1;
          transform: scale(1.08);
        }

        .had-kegiatan-nama {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 18px;
          font-weight: 800;
          color: #222;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          margin-bottom: 5px;
        }

        .had-kegiatan-detail {
          font-size: 13px;
          line-height: 1.5;
          color: #858585;
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height 0.35s ease, opacity 0.35s ease, margin-top 0.35s ease;
        }

        .had-kegiatan-item[data-active="true"] .had-kegiatan-detail {
          max-height: 100px;
          opacity: 1;
          margin-top: 8px;
        }

        .had-kegiatan-arrow {
          margin-left: auto;
          width: 28px; height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #eee;
          border-radius: 50%;
          color: var(--had-gold);
          flex-shrink: 0;
          transition: transform 0.3s ease, background 0.3s ease, color 0.3s ease;
        }

        .had-kegiatan-item[data-active="true"] .had-kegiatan-arrow {
          transform: rotate(180deg);
          background: var(--had-gold);
          color: #fff;
        }

        /* CTA */
        .had-cta {
          position: relative;
          margin-top: 35px;
          background: radial-gradient(circle at 80% 30%, rgba(21,148,71,0.22), transparent 30%),
            linear-gradient(120deg, var(--had-green-deep) 0%, var(--had-green-dark) 60%, var(--had-green) 140%);
          overflow: hidden;
        }

        .had-cta::before {
          content: 'HADROH';
          position: absolute;
          right: -30px; bottom: -55px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(110px, 16vw, 240px);
          color: rgba(255,255,255,0.04);
          line-height: 1;
          pointer-events: none;
        }

        .had-cta::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 5px; height: 100%;
          background: linear-gradient(180deg, var(--had-gold), var(--had-green-light));
        }

        .had-cta-inner {
          position: relative;
          z-index: 2;
          max-width: 1100px;
          margin: auto;
          padding: clamp(55px, 7vw, 85px) clamp(24px, 6vw, 60px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
        }

        .had-cta-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(45px, 5vw, 68px);
          color: #fff;
          line-height: 0.9;
          margin: 0;
        }

        .had-cta-title span { color: var(--had-gold); }

        .had-cta-sub {
          max-width: 460px;
          margin: 13px 0 0;
          font-size: 14px;
          line-height: 1.7;
          color: rgba(255,255,255,0.55);
        }

        .had-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: linear-gradient(135deg, var(--had-gold), var(--had-gold-dark));
          color: #fff;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          text-decoration: none;
          padding: 16px 28px;
          border-radius: 5px;
          white-space: nowrap;
          transition: background 0.2s ease, transform 0.2s ease;
        }

        .had-btn:hover {
          background: linear-gradient(135deg, #DCB93A, var(--had-gold));
          transform: translateY(-3px);
        }

        .had-cta-orbit {
          position: absolute;
          width: 240px; height: 240px;
          right: 10%; top: 50%;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 50%;
          transform: translateY(-50%);
          animation: hadOrbit 12s linear infinite;
        }

        /* KEYFRAMES */
        @keyframes hadFadeUp {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes hadTitleIn {
          from { opacity: 0; transform: translateY(40px) scale(0.94); filter: blur(8px); }
          to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }

        @keyframes hadPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.4); opacity: 1; }
        }

        @keyframes hadOrbit {
          from { transform: translateY(-50%) rotate(0deg); }
          to { transform: translateY(-50%) rotate(360deg); }
        }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .had-hero { height: 650px; }
          .had-hero-content { bottom: 95px; }
          .had-title { font-size: clamp(80px, 17vw, 140px); }
          .had-tujuan-grid { grid-template-columns: 1fr; }
          .had-tujuan-card { min-height: auto; }
          .had-cta-orbit { right: -80px; }
        }

        @media (max-width: 700px) {
          .had-hero { min-height: 600px; height: 75vh; }
          .had-hero-overlay {
            background:
              radial-gradient(circle at 70% 25%, rgba(21,148,71,0.20), transparent 35%),
              linear-gradient(to top, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.25) 100%);
          }
          .had-hero-content { bottom: 85px; padding: 0 22px; }
          .had-title { font-size: clamp(75px, 22vw, 115px); }
          .had-subtitle { font-size: 14px; }
          .had-stats { grid-template-columns: repeat(2, 1fr); padding: 0 18px; }
          .had-stat { min-height: 105px; padding: 23px 12px; }
          .had-stat:first-child { border-radius: 10px 0 0 0; }
          .had-stat:nth-child(2) { border-radius: 0 10px 0 0; border-right: none; }
          .had-stat:nth-child(3) { border-radius: 0 0 0 10px; }
          .had-stat:last-child { border-radius: 0 0 10px 0; }
          .had-stat-num { font-size: 38px; }
          .had-kegiatan-grid { grid-template-columns: 1fr; }
          .had-divider { padding: 0 24px; }
          .had-kegiatan-item { padding: 22px 18px; }
          .had-cta-inner { align-items: flex-start; flex-direction: column; }
          .had-btn { width: 100%; }
          .had-cta-orbit { display: none; }
        }

        @media (max-width: 480px) {
          .had-title { letter-spacing: 1px; }
          .had-eyebrow { font-size: 10px; letter-spacing: 2px; }
          .had-tujuan-card { padding: 28px 22px; }
          .had-kegiatan-item { gap: 14px; }
          .had-kegiatan-no { font-size: 30px; width: 34px; }
          .had-kegiatan-arrow { width: 25px; height: 25px; }
          .had-cta::before { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .had-reveal, .had-title, .had-eyebrow, .had-subtitle, .had-hero-button, .had-divider-icon, .had-cta-orbit {
            animation: none !important;
            transition: none !important;
          }
          .had-hero-img { transform: scale(1.04); transition: none; }
          .had-tujuan-card:hover, .had-kegiatan-item:hover, .had-stat:hover { transform: none; }
        }
      `}</style>

        <Navbar />
      <div className="had-root">

        <main>
          {/* Hero */}
          <section ref={heroRef} className="had-hero">
            <div className="had-hero-img">
              <Image
                src="/images/hadroh.jpg"
                alt="HADROH SMP Citra Negara"
                fill
                priority
              />
              <div className="had-hero-overlay" />
            </div>
            <div className="had-hero-content">
              <div className="had-eyebrow">Ekstrakurikuler SMP Citra Negara</div>
              <h1 className="had-title">
                HA<span>DROH</span>
              </h1>
              <p className="had-subtitle">
                Ekstrakurikuler Hadroh menjadi wadah bagi siswa untuk
                mengembangkan bakat dalam seni musik islami. Melalui latihan
                rutin, siswa belajar memainkan alat musik hadroh, melantunkan
                sholawat, serta menumbuhkan rasa cinta kepada Rasulullah SAW
                sekaligus membangun kekompakan tim.
              </p>
              <button className="had-hero-button" onClick={scrollToKegiatan}>
                Jelajahi Kegiatan
                <span>↓</span>
              </button>
            </div>
          </section>

          {/* Stats */}
          <div className="had-stats">
            {STATS.map((s) => (
              <AnimatedStat key={s.label} angka={s.angka} suffix={s.suffix} label={s.label} />
            ))}
          </div>

          {/* Tujuan */}
          <section className="had-section">
            <div className="had-section-label had-reveal">Mengapa IRMA</div>
            <h2 className="had-section-heading had-reveal had-delay-1">TUJUAN KAMI</h2>
            <div className="had-tujuan-grid">
              {TUJUAN.map((t, index) => (
                <div key={t.judul} className={`had-tujuan-card had-reveal had-delay-${index + 1}`}>
                  <span className="had-tujuan-icon">{t.icon}</span>
                  <div className="had-tujuan-title">{t.judul}</div>
                  <p className="had-tujuan-desc">{t.deskripsi}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="had-divider">
            <span className="had-divider-icon">✦</span>
          </div>

          {/* Kegiatan */}
          <section id="kegiatan" className="had-section" style={{ paddingTop: "clamp(55px, 7vw, 85px)" }}>
            <div className="had-section-label had-reveal">Program Kegiatan</div>
            <h2 className="had-section-heading had-reveal">KEGIATAN RUTIN</h2>
            <div className="had-kegiatan-grid">
              {KEGIATAN.map((k, index) => {
                const active = activeKegiatan === k.no;
                return (
                  <div
                    key={k.no}
                    className={`had-kegiatan-item had-reveal had-delay-${(index % 3) + 1}`}
                    data-active={active}
                    onClick={() => setActiveKegiatan(active ? null : k.no)}
                  >
                    <div className="had-kegiatan-no">{k.no}</div>
                    <div style={{ flex: 1 }}>
                      <div className="had-kegiatan-nama">{k.nama}</div>
                      <div className="had-kegiatan-detail">{k.detail}</div>
                    </div>
                    <div className="had-kegiatan-arrow">↓</div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* CTA */}
          <section className="had-cta">
            <div className="had-cta-orbit" />
            <div className="had-cta-inner">
              <div className="had-reveal">
                <h2 className="had-cta-title">
                  SIAP GABUNG <span>IRMA?</span>
                </h2>
                <p className="had-cta-sub">
                  Kembangkan bakat musik islami dan perdalam cinta sholawat bersama IRMA SMP Citra Negara.
                </p>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}