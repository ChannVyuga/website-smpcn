"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { angka: 2025, suffix: "", label: "Tahun Berdiri" },
  { angka: 30, suffix: "+", label: "Anggota Aktif" },
  { angka: 10, suffix: "", label: "Prestasi Diraih" },
  { angka: 100, suffix: "%", label: "Dedikasi" },
];

const TUJUAN = [
  {
    icon: "⭐",
    judul: "Nasionalisme",
    deskripsi:
      "Melalui kegiatan Paskibra, siswa diajarkan mencintai tanah air dan menghormati simbol-simbol negara, khususnya bendera Merah Putih.",
  },
  {
    icon: "💂",
    judul: "Karakter Unggul",
    deskripsi:
      "Kedisiplinan, tanggung jawab, dan kerjasama adalah nilai-nilai utama yang ditanamkan dalam setiap sesi latihan dan penugasan.",
  },
  {
    icon: "🦅",
    judul: "Jiwa Kepemimpinan",
    deskripsi:
      "Anggota Paskibra dilatih memiliki jiwa kepemimpinan dan keberanian dalam menghadapi berbagai tantangan nyata.",
  },
];

const KEGIATAN = [
  {
    no: "01",
    nama: "Latihan Baris-Berbaris (PBB)",
    detail: "Formasi, kerapian, dan ketepatan gerakan.",
  },
  {
    no: "02",
    nama: "Pengibaran Bendera Protokoler",
    detail: "Prosedur resmi sesuai standar nasional.",
  },
  {
    no: "03",
    nama: "Ketahanan Fisik & Mental",
    detail: "Drill intensif membangun kepercayaan diri.",
  },
  {
    no: "04",
    nama: "Upacara Kenegaraan",
    detail: "Berperan aktif di hari besar nasional.",
  },
  {
    no: "05",
    nama: "Pelatihan Kedisiplinan",
    detail: "Etika, sikap, dan tanggung jawab.",
  },
  {
    no: "06",
    nama: "Kompetisi Antar Sekolah",
    detail: "Representasi sekolah di tingkat daerah.",
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
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(start + (angka - start) * eased);
      setCount(value);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [visible, angka]);

  return (
    <div ref={ref} className="psk-stat">
      <div className="psk-stat-num">
        {count}
        {suffix}
      </div>
      <div className="psk-stat-label">{label}</div>
    </div>
  );
}

export default function PaskibraPage() {
  const [activeKegiatan, setActiveKegiatan] = useState<string | null>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reveals = document.querySelectorAll(".psk-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("psk-visible");
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

        .psk-root {
          font-family: 'Barlow', sans-serif;
          background: #f7f7f5;
          color: #171717;
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* REVEAL */
        .psk-reveal {
          opacity: 0;
          transform: translateY(35px);
          transition: opacity 0.8s ease, transform 0.8s cubic-bezier(.2,.7,.2,1);
        }
        .psk-reveal.psk-visible { opacity: 1; transform: translateY(0); }
        .psk-delay-1 { transition-delay: 0.08s; }
        .psk-delay-2 { transition-delay: 0.16s; }
        .psk-delay-3 { transition-delay: 0.24s; }

        /* HERO */
        .psk-hero {
          --mouse-x: 0;
          --mouse-y: 0;
          position: relative;
          height: min(78vh, 720px);
          min-height: 560px;
          overflow: hidden;
          background: #080808;
        }

        .psk-hero-img {
          position: absolute;
          inset: -25px;
          transform: translate(calc(var(--mouse-x) * -12px), calc(var(--mouse-y) * -8px)) scale(1.04);
          transition: transform 0.25s ease-out;
        }

        .psk-hero-img img {
          object-fit: cover;
          object-position: center;
          filter: contrast(1.08);
        }

        .psk-hero-overlay {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 75% 35%, rgba(215,25,32,0.20), transparent 28%),
            linear-gradient(90deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.62) 38%, rgba(0,0,0,0.15) 75%, rgba(0,0,0,0.1) 100%),
            linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 45%),
            linear-gradient(200deg, rgba(196,18,28,0.18) 0%, transparent 55%);
        }

        .psk-hero::before {
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

        .psk-hero::after {
          content: '';
          position: absolute;
          left: 0; right: 0; bottom: -1px;
          height: 100px;
          background: linear-gradient(to bottom, transparent, #f7f7f5);
          pointer-events: none;
          z-index: 3;
        }

        .psk-hero-content {
          position: absolute;
          z-index: 4;
          left: 0; right: 0; bottom: 105px;
          max-width: 1200px;
          margin: auto;
          padding: 0 clamp(24px, 6vw, 80px);
        }

        .psk-eyebrow {
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
          animation: pskFadeUp 0.8s ease 0.15s both;
        }

        .psk-eyebrow::before {
          content: '';
          width: 38px; height: 2px;
          background: #d71920;
          box-shadow: 0 0 15px rgba(215,25,32,0.8);
        }

        .psk-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(90px, 15vw, 190px);
          line-height: 0.8;
          letter-spacing: 3px;
          color: #d71920;
          margin: 0 0 26px;
          text-shadow: 0 8px 40px rgba(0,0,0,0.35), 0 0 45px rgba(215,25,32,0.15);
          animation: pskTitleIn 1s cubic-bezier(.2,.8,.2,1) 0.25s both;
        }

        .psk-title span { color: #fff; }

        .psk-subtitle {
          max-width: 590px;
          margin: 0;
          font-size: clamp(15px, 1.5vw, 18px);
          line-height: 1.75;
          color: rgba(255,255,255,0.76);
          animation: pskFadeUp 0.9s ease 0.45s both;
        }

        .psk-hero-button {
          margin-top: 28px;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          border: 1px solid rgba(215,25,32,0.55);
          background: rgba(215,25,32,0.08);
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
          animation: pskFadeUp 0.9s ease 0.6s both;
        }

        .psk-hero-button span { transition: transform 0.25s ease; }

        .psk-hero-button:hover {
          background: #d71920;
          transform: translateY(-3px);
          box-shadow: 0 10px 35px rgba(215,25,32,0.28);
        }

        .psk-hero-button:hover span { transform: translateY(3px); }

        /* STATS */
        .psk-stats {
          position: relative;
          z-index: 5;
          max-width: 1100px;
          margin: -34px auto 0;
          padding: 0 24px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }

        .psk-stat {
          position: relative;
          min-height: 125px;
          padding: 28px 20px;
          background: #fff;
          text-align: center;
          border-right: 1px solid #e7e7e7;
          box-shadow: 0 12px 40px rgba(0,0,0,0.06);
          overflow: hidden;
          transition: transform 0.3s ease, filter 0.3s ease;
        }

        .psk-stat::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 0%, rgba(215,25,32,0.14), transparent 55%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .psk-stat:hover { transform: translateY(-7px); filter: brightness(1.03); z-index: 2; }
        .psk-stat:hover::before { opacity: 1; }
        .psk-stat:first-child { border-radius: 12px 0 0 12px; }
        .psk-stat:last-child { border-right: none; border-radius: 0 12px 12px 0; }

        .psk-stat-num {
          position: relative;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 48px;
          line-height: 1;
          color: #c4121c;
          margin-bottom: 8px;
        }

        .psk-stat-label {
          position: relative;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          color: #777;
        }

        /* SECTION */
        .psk-section {
          max-width: 1100px;
          margin: 0 auto;
          padding: clamp(75px, 9vw, 115px) clamp(24px, 6vw, 60px);
        }

        .psk-section-label {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #c4121c;
          margin-bottom: 12px;
        }

        .psk-section-label::before {
          content: '';
          width: 24px; height: 2px;
          background: #c4121c;
          box-shadow: 0 0 12px rgba(196,18,28,0.5);
        }

        .psk-section-heading {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(48px, 6vw, 72px);
          color: #171717;
          line-height: 0.95;
          letter-spacing: 1px;
          margin: 0 0 45px;
        }

        /* TUJUAN */
        .psk-tujuan-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .psk-tujuan-card {
          position: relative;
          padding: 36px 30px 34px;
          min-height: 280px;
          background: linear-gradient(145deg, #fff 0%, #FFF3F3 100%);
          border: 1px solid #e9e9e9;
          border-radius: 14px;
          overflow: hidden;
          transition: transform 0.35s cubic-bezier(.2,.8,.2,1), box-shadow 0.35s ease, border-color 0.35s ease;
        }

        .psk-tujuan-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 4px;
          background: linear-gradient(90deg, #d71920, #c4121c, #1C1C1C);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }

        .psk-tujuan-card::after {
          content: '';
          position: absolute;
          width: 150px; height: 150px;
          right: -70px; bottom: -70px;
          border-radius: 50%;
          background: #fff0f0;
          opacity: 0;
          transition: opacity 0.4s ease, transform 0.4s ease;
        }

        .psk-tujuan-card:hover {
          transform: translateY(-9px) rotateX(2deg);
          border-color: #d71920;
          box-shadow: 0 22px 55px rgba(215,25,32,0.16);
        }

        .psk-tujuan-card:hover::before { transform: scaleX(1); }
        .psk-tujuan-card:hover::after { opacity: 0.7; transform: scale(1.15); }

        .psk-tujuan-icon {
          position: relative;
          z-index: 2;
          width: 58px; height: 58px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff0f0;
          border-radius: 12px;
          font-size: 27px;
          margin-bottom: 25px;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }

        .psk-tujuan-card:hover .psk-tujuan-icon {
          transform: rotate(-6deg) scale(1.08);
          box-shadow: 0 8px 25px rgba(215,25,32,0.22);
        }

        .psk-tujuan-title {
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

        .psk-tujuan-desc {
          position: relative;
          z-index: 2;
          font-size: 14px;
          color: #707070;
          line-height: 1.75;
          margin: 0;
        }

        /* DIVIDER */
        .psk-divider {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 60px;
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .psk-divider::before, .psk-divider::after {
          content: '';
          height: 1px; flex: 1;
          background: linear-gradient(90deg, transparent, #dedede);
        }

        .psk-divider::after {
          background: linear-gradient(90deg, #dedede, transparent);
        }

        .psk-divider-icon {
          color: #c4121c;
          font-size: 12px;
          animation: pskPulse 2s ease-in-out infinite;
        }

        /* KEGIATAN */
        .psk-kegiatan-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .psk-kegiatan-item {
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

        .psk-kegiatan-item:hover,
        .psk-kegiatan-item[data-active="true"] {
          transform: translateX(6px);
          border-color: #d71920;
          box-shadow: 0 12px 30px rgba(215,25,32,0.10);
        }

        .psk-kegiatan-item[data-active="true"] {
          background: linear-gradient(135deg, #fff, #fff0f0);
        }

        .psk-kegiatan-no {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 38px;
          line-height: 1;
          color: #d71920;
          opacity: 0.35;
          width: 45px;
          flex-shrink: 0;
          transition: color 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
        }

        .psk-kegiatan-item:hover .psk-kegiatan-no,
        .psk-kegiatan-item[data-active="true"] .psk-kegiatan-no {
          color: #d71920;
          opacity: 1;
          transform: scale(1.08);
        }

        .psk-kegiatan-nama {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 18px;
          font-weight: 800;
          color: #222;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          margin-bottom: 5px;
        }

        .psk-kegiatan-detail {
          font-size: 13px;
          line-height: 1.5;
          color: #858585;
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height 0.35s ease, opacity 0.35s ease, margin-top 0.35s ease;
        }

        .psk-kegiatan-item[data-active="true"] .psk-kegiatan-detail {
          max-height: 100px;
          opacity: 1;
          margin-top: 8px;
        }

        .psk-kegiatan-arrow {
          margin-left: auto;
          width: 28px; height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #eee;
          border-radius: 50%;
          color: #d71920;
          flex-shrink: 0;
          transition: transform 0.3s ease, background 0.3s ease, color 0.3s ease;
        }

        .psk-kegiatan-item[data-active="true"] .psk-kegiatan-arrow {
          transform: rotate(180deg);
          background: #d71920;
          color: #fff;
        }

        /* CTA */
        .psk-cta {
          position: relative;
          margin-top: 35px;
          background: radial-gradient(circle at 80% 30%, rgba(215,25,32,0.20), transparent 30%),
            #151515;
          overflow: hidden;
        }

        .psk-cta::before {
          content: 'PASKIBRA';
          position: absolute;
          right: -30px; bottom: -55px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(130px, 20vw, 280px);
          color: rgba(255,255,255,0.025);
          line-height: 1;
          pointer-events: none;
        }

        .psk-cta::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 5px; height: 100%;
          background: #d71920;
        }

        .psk-cta-inner {
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

        .psk-cta-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(45px, 5vw, 68px);
          color: #fff;
          line-height: 0.9;
          margin: 0;
        }

        .psk-cta-title span { color: #d71920; }

        .psk-cta-sub {
          max-width: 460px;
          margin: 13px 0 0;
          font-size: 14px;
          line-height: 1.7;
          color: rgba(255,255,255,0.55);
        }

        .psk-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: #d71920;
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

        .psk-btn:hover {
          background: #ed252c;
          transform: translateY(-3px);
        }

        .psk-cta-orbit {
          position: absolute;
          width: 240px; height: 240px;
          right: 10%; top: 50%;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 50%;
          transform: translateY(-50%);
          animation: pskOrbit 12s linear infinite;
        }

        /* KEYFRAMES */
        @keyframes pskFadeUp {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pskTitleIn {
          from { opacity: 0; transform: translateY(40px) scale(0.94); filter: blur(8px); }
          to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }

        @keyframes pskPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.4); opacity: 1; }
        }

        @keyframes pskOrbit {
          from { transform: translateY(-50%) rotate(0deg); }
          to { transform: translateY(-50%) rotate(360deg); }
        }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .psk-hero { height: 650px; }
          .psk-hero-content { bottom: 95px; }
          .psk-title { font-size: clamp(80px, 17vw, 140px); }
          .psk-tujuan-grid { grid-template-columns: 1fr; }
          .psk-tujuan-card { min-height: auto; }
          .psk-cta-orbit { right: -80px; }
        }

        @media (max-width: 700px) {
          .psk-hero { min-height: 600px; height: 75vh; }
          .psk-hero-overlay {
            background:
              radial-gradient(circle at 70% 25%, rgba(215,25,32,0.18), transparent 35%),
              linear-gradient(to top, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.25) 100%);
          }
          .psk-hero-content { bottom: 85px; padding: 0 22px; }
          .psk-title { font-size: clamp(75px, 22vw, 115px); }
          .psk-subtitle { font-size: 14px; }
          .psk-stats { grid-template-columns: repeat(2, 1fr); padding: 0 18px; }
          .psk-stat { min-height: 105px; padding: 23px 12px; }
          .psk-stat:first-child { border-radius: 10px 0 0 0; }
          .psk-stat:nth-child(2) { border-radius: 0 10px 0 0; border-right: none; }
          .psk-stat:nth-child(3) { border-radius: 0 0 0 10px; }
          .psk-stat:last-child { border-radius: 0 0 10px 0; }
          .psk-stat-num { font-size: 38px; }
          .psk-kegiatan-grid { grid-template-columns: 1fr; }
          .psk-divider { padding: 0 24px; }
          .psk-kegiatan-item { padding: 22px 18px; }
          .psk-cta-inner { align-items: flex-start; flex-direction: column; }
          .psk-btn { width: 100%; }
          .psk-cta-orbit { display: none; }
        }

        @media (max-width: 480px) {
          .psk-title { letter-spacing: 1px; }
          .psk-eyebrow { font-size: 10px; letter-spacing: 2px; }
          .psk-tujuan-card { padding: 28px 22px; }
          .psk-kegiatan-item { gap: 14px; }
          .psk-kegiatan-no { font-size: 30px; width: 34px; }
          .psk-kegiatan-arrow { width: 25px; height: 25px; }
          .psk-cta::before { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .psk-reveal, .psk-title, .psk-eyebrow, .psk-subtitle, .psk-hero-button, .psk-divider-icon, .psk-cta-orbit {
            animation: none !important;
            transition: none !important;
          }
          .psk-hero-img { transform: scale(1.04); transition: none; }
          .psk-tujuan-card:hover, .psk-kegiatan-item:hover, .psk-stat:hover { transform: none; }
        }
      `}</style>

        <Navbar />
      <div className="psk-root">

        <main>
          {/* HERO */}
          <section ref={heroRef} className="psk-hero">
            <div className="psk-hero-img">
              <Image
                src="/images/paskibsmp.jpg"
                alt="Paskibra SMP Citra Negara"
                fill
                priority
              />
              <div className="psk-hero-overlay" />
            </div>

            <div className="psk-hero-content">
              <div className="psk-eyebrow">Ekstrakurikuler SMP Citra Negara</div>
              <h1 className="psk-title">
                PASKI<span>BRA</span>
              </h1>
              <p className="psk-subtitle">
                Pasukan Pengibar Bendera — garda terdepan kehormatan bangsa.
                Kami bukan sekadar berseragam, kami adalah simbol disiplin,
                kebanggaan, dan dedikasi.
              </p>
              <button className="psk-hero-button" onClick={scrollToKegiatan}>
                Jelajahi Kegiatan
                <span>↓</span>
              </button>
            </div>
          </section>

          {/* STATS */}
          <div className="psk-stats">
            {STATS.map((s) => (
              <AnimatedStat key={s.label} angka={s.angka} suffix={s.suffix} label={s.label} />
            ))}
          </div>

          {/* TUJUAN */}
          <section className="psk-section">
            <div className="psk-section-label psk-reveal">Mengapa Paskibra</div>
            <h2 className="psk-section-heading psk-reveal psk-delay-1">TUJUAN KAMI</h2>
            <div className="psk-tujuan-grid">
              {TUJUAN.map((t, index) => (
                <div key={t.judul} className={`psk-tujuan-card psk-reveal psk-delay-${index + 1}`}>
                  <span className="psk-tujuan-icon">{t.icon}</span>
                  <div className="psk-tujuan-title">{t.judul}</div>
                  <p className="psk-tujuan-desc">{t.deskripsi}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="psk-divider">
            <span className="psk-divider-icon">✦</span>
          </div>

          {/* KEGIATAN */}
          <section id="kegiatan" className="psk-section" style={{ paddingTop: "clamp(55px, 7vw, 85px)" }}>
            <div className="psk-section-label psk-reveal">Program Latihan</div>
            <h2 className="psk-section-heading psk-reveal">KEGIATAN RUTIN</h2>
            <div className="psk-kegiatan-grid">
              {KEGIATAN.map((k, index) => {
                const active = activeKegiatan === k.no;
                return (
                  <div
                    key={k.no}
                    className={`psk-kegiatan-item psk-reveal psk-delay-${(index % 3) + 1}`}
                    data-active={active}
                    onClick={() => setActiveKegiatan(active ? null : k.no)}
                  >
                    <div className="psk-kegiatan-no">{k.no}</div>
                    <div style={{ flex: 1 }}>
                      <div className="psk-kegiatan-nama">{k.nama}</div>
                      <div className="psk-kegiatan-detail">{k.detail}</div>
                    </div>
                    <div className="psk-kegiatan-arrow">↓</div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* CTA */}
          <section className="psk-cta">
            <div className="psk-cta-orbit" />
            <div className="psk-cta-inner">
              <div className="psk-reveal">
                <h2 className="psk-cta-title">
                  SIAP MENJADI <span>PEMIMPIN?</span>
                </h2>
                <p className="psk-cta-sub">
                  Bangun disiplin, keberanian, dan rasa tanggung jawab bersama Paskibra SMP Citra Negara.
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