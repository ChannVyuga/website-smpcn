"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { angka: 2013, suffix: "", label: "Tahun Berdiri" },
  { angka: 18, suffix: "+", label: "Anggota Aktif" },
  { angka: 16, suffix: "", label: "Prestasi Diraih" },
  { angka: 80, suffix: "%", label: "Dedikasi" },
];

const TUJUAN = [
  {
    icon: "💃",
    judul: "Pengembangan Diri & Motorik",
    deskripsi:
      "Melatih kelenturan, keseimbangan, koordinasi gerak, dan ketahanan fisik melalui olah tubuh rutin.",
  },
  {
    icon: "🌸",
    judul: "Kreativitas & Apresiasi Seni",
    deskripsi:
      "Mendorong siswa untuk berinovasi merangkai gerakan baru dan mengasah daya imajinasi secara bebas.",
  },
  {
    icon: "🔗",
    judul: "Kerjasama & Kemampuan Sosial",
    deskripsi:
      "Melatih kepemimpinan, rasa tanggung jawab, komunikasi, dan rasa saling percaya antaranggota kelompok tari.",
  },
];

const KEGIATAN = [
  {
    no: "01",
    nama: "Fondasi & Olah Gerak",
    detail:
      "Penguatan fisik, keseimbangan tubuh, dan ketukan irama dasar.",
  },
  {
    no: "02",
    nama: "Eksplorasi Koreografi",
    detail:
      "Pengembangan karya tari dari ragam budaya lokal hingga tren modern.",
  },
  {
    no: "03",
    nama: "Jam Terbang Panggung",
    detail:
      "Unjuk kebolehan di pentas seni sekolah, festival budaya, dan perlombaan.",
  },
  {
    no: "04",
    nama: "Masterclass Koreografer",
    detail:
      "Pertemuan khusus bersama praktisi seni untuk memperluas cakrawala bertari.",
  },
  {
    no: "05",
    nama: "Studi Kebudayaan",
    detail:
      "Mendalami latar belakang nilai, musik pengiring, dan busana tari daerah.",
  },
  {
    no: "06",
    nama: "Kolaborasi Pertunjukan",
    detail:
      "Proyek lintas divisi bersama klub musik, teater, dan tata panggung.",
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

    const start = 0;
    const duration = 1300;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(start + (angka - start) * eased);

      setCount(value);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [visible, angka]);

  return (
    <div ref={ref} className="tri-stat">
      <div className="tri-stat-num">
        {count}
        {suffix}
      </div>
      <div className="tri-stat-label">{label}</div>
    </div>
  );
}

export default function TariPage() {
  const [activeKegiatan, setActiveKegiatan] = useState<string | null>(
    null
  );

  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reveals = document.querySelectorAll(".tri-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("tri-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    reveals.forEach((element) => observer.observe(element));

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

    return () => {
      hero.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const scrollToKegiatan = () => {
    document
      .getElementById("kegiatan")
      ?.scrollIntoView({ behavior: "smooth" });
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

        .tri-root {
          font-family: 'Barlow', sans-serif;
          background: #F4F6F0;
          color: #171717;
          min-height: 100vh;
          overflow: hidden;
        }

        /* =========================
           REVEAL ANIMATION
        ========================= */

        .tri-reveal {
          opacity: 0;
          transform: translateY(35px);
          transition:
            opacity 0.8s ease,
            transform 0.8s cubic-bezier(.2,.7,.2,1);
        }

        .tri-reveal.tri-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .tri-delay-1 {
          transition-delay: 0.08s;
        }

        .tri-delay-2 {
          transition-delay: 0.16s;
        }

        .tri-delay-3 {
          transition-delay: 0.24s;
        }

        /* =========================
           HERO
        ========================= */

        .tri-hero {
          --mouse-x: 0;
          --mouse-y: 0;

          position: relative;
          height: min(82vh, 760px);
          min-height: 580px;
          overflow: hidden;
          background: #0A060A;
        }

        .tri-hero-img {
          position: absolute;
          inset: -25px;
          transform:
            translate(
              calc(var(--mouse-x) * -12px),
              calc(var(--mouse-y) * -8px)
            )
            scale(1.04);

          transition: transform 0.25s ease-out;
        }

        .tri-hero-img img {
          object-fit: cover;
          object-position: center 28%;
          filter:
            contrast(1.08)
            saturate(0.95);
        }

        .tri-hero-overlay {
          position: absolute;
          inset: 0;

          background:
            radial-gradient(
              circle at 75% 35%,
              rgba(224,111,160,0.20),
              transparent 28%
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

        .tri-hero::before {
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
          mask-image: linear-gradient(
            to bottom,
            rgba(0,0,0,0.7),
            transparent 80%
          );

          pointer-events: none;
        }

        .tri-hero::after {
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
              #F4F6F0
            );

          pointer-events: none;
          z-index: 3;
        }

        .tri-hero-content {
          position: absolute;
          z-index: 4;
          left: 0;
          right: 0;
          bottom: 105px;

          max-width: 1200px;
          margin: auto;

          padding: 0 clamp(24px, 6vw, 80px);
        }

        .tri-eyebrow {
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

          animation: triFadeUp 0.8s ease 0.15s both;
        }

        .tri-eyebrow::before {
          content: '';
          width: 38px;
          height: 2px;
          background: #E06FA0;

          box-shadow:
            0 0 15px rgba(224,111,160,0.8);
        }

        .tri-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(90px, 15vw, 190px);
          line-height: 0.8;
          letter-spacing: 3px;

          color: #A63D74;
          margin: 0 0 26px;

          text-shadow:
            0 8px 40px rgba(0,0,0,0.35),
            0 0 45px rgba(166,61,116,0.15);

          animation:
            triTitleIn 1s cubic-bezier(.2,.8,.2,1) 0.25s both;
        }

        .tri-title span {
          color: #fff;
        }

        .tri-subtitle {
          max-width: 590px;
          margin: 0;

          font-size: clamp(15px, 1.5vw, 18px);
          line-height: 1.75;

          color: rgba(255,255,255,0.76);

          animation: triFadeUp 0.9s ease 0.45s both;
        }

        .tri-hero-button {
          margin-top: 28px;

          display: inline-flex;
          align-items: center;
          gap: 12px;

          border: 1px solid rgba(224,111,160,0.55);
          background: rgba(224,111,160,0.08);
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

          transition:
            background 0.25s ease,
            transform 0.25s ease,
            box-shadow 0.25s ease;

          animation: triFadeUp 0.9s ease 0.6s both;
        }

        .tri-hero-button span {
          transition: transform 0.25s ease;
        }

        .tri-hero-button:hover {
          background: #E06FA0;

          transform: translateY(-3px);

          box-shadow:
            0 10px 35px rgba(224,111,160,0.28);
        }

        .tri-hero-button:hover span {
          transform: translateY(3px);
        }

        /* =========================
           STATS
        ========================= */

        .tri-stats {
          position: relative;
          z-index: 5;

          max-width: 1100px;
          margin: -34px auto 0;

          padding: 0 24px;

          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }

        .tri-stat {
          position: relative;

          min-height: 125px;
          padding: 28px 20px;

          background:
            linear-gradient(
              135deg,
              #A63D74 0%,
              #4A0E2E 100%
            );

          text-align: center;

          border-right: 1px solid rgba(255,255,255,0.12);

          box-shadow:
            0 12px 40px rgba(0,0,0,0.2);

          overflow: hidden;

          transition:
            transform 0.3s ease,
            filter 0.3s ease;
        }

        .tri-stat::before {
          content: '';

          position: absolute;
          inset: 0;

          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(255,255,255,0.18),
              transparent 55%
            );

          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .tri-stat:hover {
          transform: translateY(-7px);
          filter: brightness(1.12);
          z-index: 2;
        }

        .tri-stat:hover::before {
          opacity: 1;
        }

        .tri-stat:first-child {
          border-radius: 12px 0 0 12px;
        }

        .tri-stat:last-child {
          border-right: none;
          border-radius: 0 12px 12px 0;
        }

        .tri-stat-num {
          position: relative;

          font-family: 'Bebas Neue', sans-serif;
          font-size: 48px;
          line-height: 1;

          color: #FFFFFF;

          margin-bottom: 8px;
        }

        .tri-stat-label {
          position: relative;

          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.8px;

          text-transform: uppercase;

          color: rgba(255,255,255,0.75);
        }

        /* =========================
           GENERAL SECTION
        ========================= */

        .tri-section {
          max-width: 1100px;
          margin: 0 auto;

          padding:
            clamp(75px, 9vw, 115px)
            clamp(24px, 6vw, 60px);
        }

        .tri-section-label {
          display: flex;
          align-items: center;
          gap: 10px;

          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 3px;

          text-transform: uppercase;

          color: #E06FA0;

          margin-bottom: 12px;
        }

        .tri-section-label::before {
          content: '';

          width: 24px;
          height: 2px;

          background: #E06FA0;

          box-shadow:
            0 0 12px rgba(224,111,160,0.5);
        }

        .tri-section-heading {
          font-family: 'Bebas Neue', sans-serif;

          font-size: clamp(48px, 6vw, 72px);
          color: #000000;

          line-height: 0.95;
          letter-spacing: 1px;

          margin: 0 0 45px;
        }

        /* =========================
           TUJUAN
        ========================= */

        .tri-tujuan-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .tri-tujuan-card {
          position: relative;

          padding: 36px 30px 34px;
          min-height: 280px;

          background:
            linear-gradient(
              145deg,
              #fff 0%,
              #F9F0F5 100%
            );

          border: 1px solid rgba(255,255,255,0.7);
          border-radius: 14px;

          overflow: hidden;

          transition:
            transform 0.35s cubic-bezier(.2,.8,.2,1),
            box-shadow 0.35s ease,
            border-color 0.35s ease;
        }

        .tri-tujuan-card::before {
          content: '';

          position: absolute;
          top: 0;
          left: 0;

          width: 100%;
          height: 4px;

          background:
            linear-gradient(
              90deg,
              #E06FA0,
              #A63D74,
              #4A0E2E
            );

          transform: scaleX(0);
          transform-origin: left;

          transition: transform 0.4s ease;
        }

        .tri-tujuan-card::after {
          content: '';

          position: absolute;

          width: 150px;
          height: 150px;

          right: -70px;
          bottom: -70px;

          border-radius: 50%;

          background: #FCE1EE;

          opacity: 0;

          transition:
            opacity 0.4s ease,
            transform 0.4s ease;
        }

        .tri-tujuan-card:hover {
          transform:
            translateY(-9px)
            rotateX(2deg);

          border-color: #E06FA0;

          box-shadow:
            0 22px 55px rgba(166,61,116,0.16);
        }

        .tri-tujuan-card:hover::before {
          transform: scaleX(1);
        }

        .tri-tujuan-card:hover::after {
          opacity: 0.7;
          transform: scale(1.15);
        }

        .tri-tujuan-icon {
          position: relative;
          z-index: 2;

          width: 58px;
          height: 58px;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #FCE1EE;

          border-radius: 12px;

          font-size: 27px;

          margin-bottom: 25px;

          transition:
            transform 0.35s ease,
            box-shadow 0.35s ease;
        }

        .tri-tujuan-card:hover .tri-tujuan-icon {
          transform:
            rotate(-6deg)
            scale(1.08);

          box-shadow:
            0 8px 25px rgba(224,111,160,0.22);
        }

        .tri-tujuan-title {
          position: relative;
          z-index: 2;

          font-family: 'Barlow Condensed', sans-serif;

          font-size: 23px;
          font-weight: 800;

          color: #171717;

          text-transform: uppercase;
          letter-spacing: 0.8px;

          margin-bottom: 12px;
        }

        .tri-tujuan-desc {
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

        .tri-divider {
          max-width: 1100px;
          margin: 0 auto;

          padding: 0 60px;

          display: flex;
          align-items: center;
          gap: 18px;
        }

        .tri-divider::before,
        .tri-divider::after {
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

        .tri-divider::after {
          background:
            linear-gradient(
              90deg,
              rgba(255,255,255,0.18),
              transparent
            );
        }

        .tri-divider-icon {
          color: #E06FA0;
          font-size: 12px;

          animation: triPulse 2s ease-in-out infinite;
        }

        /* =========================
           KEGIATAN
        ========================= */

        .tri-kegiatan-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .tri-kegiatan-item {
          position: relative;

          display: flex;
          align-items: flex-start;

          gap: 22px;

          padding: 25px 28px;

          background: #fff;

          border: 1px solid #e9e9e9;
          border-radius: 10px;

          cursor: pointer;

          transition:
            transform 0.3s ease,
            border-color 0.3s ease,
            box-shadow 0.3s ease,
            background 0.3s ease;
        }

        .tri-kegiatan-item:hover,
        .tri-kegiatan-item[data-active="true"] {
          transform: translateX(6px);

          border-color: #E06FA0;

          box-shadow:
            0 12px 30px rgba(166,61,116,0.10);
        }

        .tri-kegiatan-item[data-active="true"] {
          background:
            linear-gradient(
              135deg,
              #fff,
              #FDF3F8
            );
        }

        .tri-kegiatan-no {
          font-family: 'Bebas Neue', sans-serif;

          font-size: 38px;
          line-height: 1;

          color: #A63D74;
          opacity: 0.35;

          width: 45px;
          flex-shrink: 0;

          transition:
            color 0.3s ease,
            opacity 0.3s ease,
            transform 0.3s ease;
        }

        .tri-kegiatan-item:hover .tri-kegiatan-no,
        .tri-kegiatan-item[data-active="true"] .tri-kegiatan-no {
          color: #E06FA0;
          opacity: 1;

          transform: scale(1.08);
        }

        .tri-kegiatan-nama {
          font-family: 'Barlow Condensed', sans-serif;

          font-size: 18px;
          font-weight: 800;

          color: #222;

          text-transform: uppercase;
          letter-spacing: 0.4px;

          margin-bottom: 5px;
        }

        .tri-kegiatan-detail {
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

        .tri-kegiatan-item[data-active="true"] .tri-kegiatan-detail {
          max-height: 100px;
          opacity: 1;
          margin-top: 8px;
        }

        .tri-kegiatan-arrow {
          margin-left: auto;

          width: 28px;
          height: 28px;

          display: flex;
          align-items: center;
          justify-content: center;

          border: 1px solid #eee;
          border-radius: 50%;

          color: #A63D74;

          flex-shrink: 0;

          transition:
            transform 0.3s ease,
            background 0.3s ease,
            color 0.3s ease;
        }

        .tri-kegiatan-item[data-active="true"] .tri-kegiatan-arrow {
          transform: rotate(180deg);

          background: #E06FA0;
          color: #fff;
        }

        /* =========================
           CTA
        ========================= */

        .tri-cta {
          position: relative;

          margin-top: 35px;

          background:
            radial-gradient(
              circle at 80% 30%,
              rgba(224,111,160,0.25),
              transparent 30%
            ),
            linear-gradient(
              120deg,
              #150910 0%,
              #4A0E2E 65%,
              #A63D74 140%
            );

          overflow: hidden;
        }

        .tri-cta::before {
          content: 'SENI TARI';

          position: absolute;

          right: -30px;
          bottom: -55px;

          font-family: 'Bebas Neue', sans-serif;

          font-size: clamp(110px, 16vw, 240px);

          color: rgba(255,255,255,0.03);

          line-height: 1;

          pointer-events: none;
        }

        .tri-cta::after {
          content: '';

          position: absolute;

          top: 0;
          left: 0;

          width: 5px;
          height: 100%;

          background:
            linear-gradient(
              180deg,
              #E06FA0,
              #4A0E2E
            );
        }

        .tri-cta-inner {
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

        .tri-cta-title {
          font-family: 'Bebas Neue', sans-serif;

          font-size: clamp(45px, 5vw, 68px);

          color: #fff;

          line-height: 0.9;

          margin: 0;
        }

        .tri-cta-title span {
          color: #E06FA0;
        }

        .tri-cta-sub {
          max-width: 460px;

          margin: 13px 0 0;

          font-size: 14px;
          line-height: 1.7;

          color: rgba(255,255,255,0.55);
        }

        .tri-cta-orbit {
          position: absolute;

          width: 240px;
          height: 240px;

          right: 10%;
          top: 50%;

          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 50%;

          transform: translateY(-50%);

          animation:
            triOrbit 12s linear infinite;
        }

        /* =========================
           KEYFRAMES
        ========================= */

        @keyframes triFadeUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes triTitleIn {
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

        @keyframes triPulse {
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

        @keyframes triOrbit {
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

          .tri-hero {
            height: 650px;
          }

          .tri-hero-content {
            bottom: 95px;
          }

          .tri-title {
            font-size: clamp(80px, 17vw, 140px);
          }

          .tri-tujuan-grid {
            grid-template-columns: 1fr;
          }

          .tri-tujuan-card {
            min-height: auto;
          }

          .tri-cta-orbit {
            right: -80px;
          }
        }

        @media (max-width: 700px) {

          .tri-hero {
            min-height: 600px;
            height: 75vh;
          }

          .tri-hero-overlay {
            background:
              radial-gradient(
                circle at 70% 25%,
                rgba(224,111,160,0.18),
                transparent 35%
              ),
              linear-gradient(
                to top,
                rgba(0,0,0,0.94) 0%,
                rgba(0,0,0,0.55) 65%,
                rgba(0,0,0,0.25) 100%
              );
          }

          .tri-hero-content {
            bottom: 85px;
            padding: 0 22px;
          }

          .tri-title {
            font-size: clamp(75px, 22vw, 115px);
          }

          .tri-subtitle {
            font-size: 14px;
          }

          .tri-stats {
            grid-template-columns: repeat(2, 1fr);
            padding: 0 18px;
          }

          .tri-stat {
            min-height: 105px;
            padding: 23px 12px;
          }

          .tri-stat:first-child {
            border-radius: 10px 0 0 0;
          }

          .tri-stat:nth-child(2) {
            border-radius: 0 10px 0 0;
            border-right: none;
          }

          .tri-stat:nth-child(3) {
            border-radius: 0 0 0 10px;
          }

          .tri-stat:last-child {
            border-radius: 0 0 10px 0;
          }

          .tri-stat-num {
            font-size: 38px;
          }

          .tri-kegiatan-grid {
            grid-template-columns: 1fr;
          }

          .tri-divider {
            padding: 0 24px;
          }

          .tri-kegiatan-item {
            padding: 22px 18px;
          }

          .tri-cta-inner {
            align-items: flex-start;
            flex-direction: column;
          }

          .tri-cta-orbit {
            display: none;
          }
        }

        @media (max-width: 480px) {

          .tri-title {
            letter-spacing: 1px;
          }

          .tri-eyebrow {
            font-size: 10px;
            letter-spacing: 2px;
          }

          .tri-tujuan-card {
            padding: 28px 22px;
          }

          .tri-kegiatan-item {
            gap: 14px;
          }

          .tri-kegiatan-no {
            font-size: 30px;
            width: 34px;
          }

          .tri-kegiatan-arrow {
            width: 25px;
            height: 25px;
          }

          .tri-cta::before {
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

          .tri-reveal,
          .tri-title,
          .tri-eyebrow,
          .tri-subtitle,
          .tri-hero-button,
          .tri-divider-icon,
          .tri-cta-orbit {
            animation: none !important;
            transition: none !important;
          }

          .tri-hero-img {
            transform: scale(1.04);
            transition: none;
          }

          .tri-tujuan-card:hover,
          .tri-kegiatan-item:hover,
          .tri-stat:hover {
            transform: none;
          }
        }
      `}</style>

        <Navbar />
      <div className="tri-root">

        <main>

          {/* HERO */}
          <section
            ref={heroRef}
            className="tri-hero"
          >
            <div className="tri-hero-img">
              <Image
                src="/images/tari1.jpg"
                alt="Tari SMP Citra Negara"
                fill
                priority
              />

              <div className="tri-hero-overlay" />
            </div>

            <div className="tri-hero-content">

              <div className="tri-eyebrow">
                Ekstrakurikuler SMP Citra Negara
              </div>

              <h1 className="tri-title">
                SE<span>NI TARI</span>
              </h1>

              <p className="tri-subtitle">
                Ekstrakurikuler tari memungkinkan siswa mengekspresikan
                diri melalui seni dan gerakan. Dari tari tradisional
                hingga modern, kami membentuk penari muda yang
                berkarakter dan berbudaya.
              </p>

              <button
                className="tri-hero-button"
                onClick={scrollToKegiatan}
              >
                Jelajahi Kegiatan
                <span>↓</span>
              </button>

            </div>
          </section>

          {/* STATS */}
          <div className="tri-stats">
            {STATS.map((s) => (
              <AnimatedStat
                key={s.label}
                angka={s.angka}
                suffix={s.suffix}
                label={s.label}
              />
            ))}
          </div>

          {/* TUJUAN */}
          <section className="tri-section">

            <div className="tri-section-label tri-reveal">
              Mengapa Seni Tari
            </div>

            <h2 className="tri-section-heading tri-reveal tri-delay-1">
              TUJUAN KAMI
            </h2>

            <div className="tri-tujuan-grid">

              {TUJUAN.map((t, index) => (
                <div
                  key={t.judul}
                  className={`tri-tujuan-card tri-reveal tri-delay-${index + 1}`}
                >
                  <span className="tri-tujuan-icon">
                    {t.icon}
                  </span>

                  <div className="tri-tujuan-title">
                    {t.judul}
                  </div>

                  <p className="tri-tujuan-desc">
                    {t.deskripsi}
                  </p>
                </div>
              ))}

            </div>

          </section>

          {/* DIVIDER */}
          <div className="tri-divider">
            <span className="tri-divider-icon">
              ✦
            </span>
          </div>

          {/* KEGIATAN */}
          <section
            id="kegiatan"
            className="tri-section"
            style={{
              paddingTop: "clamp(55px, 7vw, 85px)",
            }}
          >

            <div className="tri-section-label tri-reveal">
              Program Latihan
            </div>

            <h2 className="tri-section-heading tri-reveal">
              KEGIATAN RUTIN
            </h2>

            <div className="tri-kegiatan-grid">

              {KEGIATAN.map((k, index) => {
                const active = activeKegiatan === k.no;

                return (
                  <div
                    key={k.no}
                    className={`tri-kegiatan-item tri-reveal tri-delay-${
                      (index % 3) + 1
                    }`}
                    data-active={active}
                    onClick={() =>
                      setActiveKegiatan(
                        active ? null : k.no
                      )
                    }
                  >

                    <div className="tri-kegiatan-no">
                      {k.no}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div className="tri-kegiatan-nama">
                        {k.nama}
                      </div>

                      <div className="tri-kegiatan-detail">
                        {k.detail}
                      </div>
                    </div>

                    <div className="tri-kegiatan-arrow">
                      ↓
                    </div>

                  </div>
                );
              })}

            </div>

          </section>

          {/* CTA */}
          <section className="tri-cta">

            <div className="tri-cta-orbit" />

            <div className="tri-cta-inner">

              <div className="tri-reveal">

                <h2 className="tri-cta-title">
                  SIAP JADI <span>PENARI?</span>
                </h2>

                <p className="tri-cta-sub">
                  Ekspresikan dirimu lewat gerak dan budaya
                  bersama Seni Tari SMP Citra Negara.
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