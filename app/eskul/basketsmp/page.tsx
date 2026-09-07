"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { angka: 2016, suffix: "", label: "Tahun Berdiri" },
  { angka: 40, suffix: "+", label: "Anggota Aktif" },
  { angka: 8, suffix: "", label: "Prestasi Diraih" },
  { angka: 100, suffix: "%", label: "Semangat" },
];

const TUJUAN = [
  {
    icon: "🏀",
    judul: "Kebugaran Fisik",
    deskripsi:
      "Melalui latihan dan pertandingan rutin, basket membantu meningkatkan kebugaran, kekuatan otot, dan ketahanan fisik siswa secara menyeluruh.",
  },
  {
    icon: "🤝",
    judul: "Kerjasama Tim",
    deskripsi:
      "Basket adalah olahraga tim yang mengajarkan pentingnya komunikasi, koordinasi, dan strategi bersama untuk meraih kemenangan.",
  },
  {
    icon: "🏆",
    judul: "Sportivitas",
    deskripsi:
      "Siswa belajar tentang fair play, cara menghadapi kemenangan maupun kekalahan dengan sikap positif dan mental yang tangguh.",
  },
];

const KEGIATAN = [
  {
    no: "01",
    nama: "Latihan Teknik Dasar",
    detail: "Dribbling, passing, shooting, dan lay-up.",
  },
  {
    no: "02",
    nama: "Latihan Fisik",
    detail: "Lari, jumping, dan strength training.",
  },
  {
    no: "03",
    nama: "Simulasi Pertandingan",
    detail: "Strategi dan taktik permainan tim.",
  },
  {
    no: "04",
    nama: "Turnamen Internal",
    detail: "Kompetisi antar kelas di dalam sekolah.",
  },
  {
    no: "05",
    nama: "Turnamen Eksternal",
    detail: "Mewakili sekolah di luar lingkungan sekolah.",
  },
  {
    no: "06",
    nama: "Pengembangan Mentalitas",
    detail: "Mental pemenang dan kerja keras tanpa henti.",
  },
  {
    no: "07",
    nama: "Offensive & Defensive Plays",
    detail: "Strategi menyerang dan bertahan terstruktur.",
  },
  {
    no: "08",
    nama: "Spot-up & Pressure Shooting",
    detail:
      "Latihan akurasi tembakan tiga angka, mid-range, dan tembakan di bawah tekanan.",
  },
];

/* =========================================================
   ANIMATED STAT
========================================================= */

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
          startValue +
            (angka - startValue) * eased
        )
      );

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [visible, angka]);

  return (
    <div ref={ref} className="psk-stat">
      <div className="psk-stat-num">
        {count}
        {suffix}
      </div>

      <div className="psk-stat-label">
        {label}
      </div>
    </div>
  );
}

/* =========================================================
   BASKET PAGE
========================================================= */

export default function BasketPage() {
  const [activeKegiatan, setActiveKegiatan] =
    useState<string | null>(null);

  const heroRef =
    useRef<HTMLElement>(null);

  const ballRefs =
    useRef<(HTMLDivElement | null)[]>([]);

  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  useEffect(() => {
    const reveals =
      document.querySelectorAll(".psk-reveal");

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(
                "psk-visible"
              );

              observer.unobserve(
                entry.target
              );
            }
          });
        },
        {
          threshold: 0.12,
        }
      );

    reveals.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  /* =======================================================
     HERO MOUSE PARALLAX
  ======================================================= */

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero) return;

    const handlePointerMove = (
      event: PointerEvent
    ) => {
      const rect =
        hero.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) /
          rect.width -
        0.5;

      const y =
        (event.clientY - rect.top) /
          rect.height -
        0.5;

      hero.style.setProperty(
        "--mouse-x",
        `${x}`
      );

      hero.style.setProperty(
        "--mouse-y",
        `${y}`
      );
    };

    hero.addEventListener(
      "pointermove",
      handlePointerMove
    );

    return () => {
      hero.removeEventListener(
        "pointermove",
        handlePointerMove
      );
    };
  }, []);

  /* =======================================================
     INTERACTIVE BASKETBALL PHYSICS

     Cursor / touch:
     - mendeteksi jarak pointer ke bola
     - memberikan dorongan
     - bola punya velocity
     - friction memperlambat bola
     - spring menarik bola kembali
  ======================================================= */

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero) return;

    const elements =
      ballRefs.current.filter(
        Boolean
      ) as HTMLDivElement[];

    if (!elements.length) return;

    const rect =
      hero.getBoundingClientRect();

    type Ball = {
      element: HTMLDivElement;
      x: number;
      y: number;
      homeX: number;
      homeY: number;
      vx: number;
      vy: number;
      radius: number;
      rotation: number;
      rotationVelocity: number;
      scale: number;
    };

    const balls: Ball[] =
      elements.map(
        (element, index) => {
          const homeX =
            parseFloat(
              element.dataset.x || "50"
            );

          const homeY =
            parseFloat(
              element.dataset.y || "50"
            );

          const radius =
            parseFloat(
              element.dataset.radius ||
                "32"
            );

          const scale =
            parseFloat(
              element.dataset.scale ||
                "1"
            );

          return {
            element,

            x:
              (homeX / 100) *
              rect.width,

            y:
              (homeY / 100) *
              rect.height,

            homeX:
              (homeX / 100) *
              rect.width,

            homeY:
              (homeY / 100) *
              rect.height,

            vx: 0,
            vy: 0,

            radius,

            rotation:
              index * 25,

            rotationVelocity: 0,

            scale,
          };
        }
      );

    let pointerX = -9999;
    let pointerY = -9999;

    let pointerActive = false;

    let animationFrame = 0;

    const handlePointerDown = (
      event: PointerEvent
    ) => {
      const heroRect =
        hero.getBoundingClientRect();

      pointerX =
        event.clientX -
        heroRect.left;

      pointerY =
        event.clientY -
        heroRect.top;

      pointerActive = true;

      /*
       * Kalau pointer langsung menekan
       * bola, kasih impulse kecil.
       */
      balls.forEach((ball) => {
        const dx =
          ball.x - pointerX;

        const dy =
          ball.y - pointerY;

        const distance =
          Math.sqrt(
            dx * dx + dy * dy
          );

        const hitRadius =
          ball.radius + 28;

        if (
          distance < hitRadius
        ) {
          const safeDistance =
            Math.max(
              distance,
              1
            );

          const nx =
            dx / safeDistance;

          const ny =
            dy / safeDistance;

          const force =
            5.5;

          ball.vx +=
            nx * force;

          ball.vy +=
            ny * force;

          ball.rotationVelocity +=
            nx * 3;
        }
      });
    };

    const handlePointerMove = (
      event: PointerEvent
    ) => {
      const heroRect =
        hero.getBoundingClientRect();

      pointerX =
        event.clientX -
        heroRect.left;

      pointerY =
        event.clientY -
        heroRect.top;

      pointerActive = true;
    };

    const handlePointerUp = () => {
      pointerActive = false;

      pointerX = -9999;
      pointerY = -9999;
    };

    hero.addEventListener(
      "pointerdown",
      handlePointerDown
    );

    hero.addEventListener(
      "pointermove",
      handlePointerMove
    );

    hero.addEventListener(
      "pointerup",
      handlePointerUp
    );

    hero.addEventListener(
      "pointercancel",
      handlePointerUp
    );

    hero.addEventListener(
      "pointerleave",
      handlePointerUp
    );

    const animate = () => {
      const currentRect =
        hero.getBoundingClientRect();

      /*
       * Update ukuran kalau window berubah.
       */
      const scaleX =
        currentRect.width /
        Math.max(rect.width, 1);

      const scaleY =
        currentRect.height /
        Math.max(rect.height, 1);

      balls.forEach((ball) => {
        /*
         * =================================================
         * POINTER FORCE
         * =================================================
         */

        if (pointerActive) {
          const dx =
            ball.x - pointerX;

          const dy =
            ball.y - pointerY;

          const distance =
            Math.sqrt(
              dx * dx +
                dy * dy
            );

          const interactionRadius =
            ball.radius + 55;

          if (
            distance <
            interactionRadius
          ) {
            const safeDistance =
              Math.max(
                distance,
                1
              );

            const nx =
              dx / safeDistance;

            const ny =
              dy / safeDistance;

            /*
             * Semakin dekat cursor,
             * semakin kuat dorongannya.
             */
            const proximity =
              1 -
              distance /
                interactionRadius;

            const force =
              proximity *
              2.4;

            ball.vx +=
              nx * force;

            ball.vy +=
              ny * force;

            /*
             * Sedikit rotasi saat
             * bola didorong.
             */
            ball.rotationVelocity +=
              nx *
              proximity *
              2.5;
          }
        }

        /*
         * =================================================
         * SPRING
         * =================================================
         *
         * Bola pelan-pelan balik
         * ke posisi awal.
         */

        const homeX =
          ball.homeX *
          scaleX;

        const homeY =
          ball.homeY *
          scaleY;

        const springStrength =
          0.009;

        ball.vx +=
          (homeX - ball.x) *
          springStrength;

        ball.vy +=
          (homeY - ball.y) *
          springStrength;

        /*
         * =================================================
         * FRICTION
         * =================================================
         */

        ball.vx *= 0.94;
        ball.vy *= 0.94;

        ball.rotationVelocity *=
          0.94;

        /*
         * =================================================
         * MAX SPEED
         * =================================================
         */

        const speed =
          Math.sqrt(
            ball.vx *
              ball.vx +
              ball.vy *
                ball.vy
          );

        const maxSpeed = 13;

        if (
          speed > maxSpeed
        ) {
          const factor =
            maxSpeed /
            speed;

          ball.vx *= factor;
          ball.vy *= factor;
        }

        /*
         * =================================================
         * POSITION
         * =================================================
         */

        ball.x += ball.vx;
        ball.y += ball.vy;

        /*
         * =================================================
         * ROTATION
         * =================================================
         */

        ball.rotation +=
          ball.rotationVelocity;

        /*
         * =================================================
         * SOFT BOUNDARY
         * =================================================
         */

        const padding =
          ball.radius * 0.45;

        if (
          ball.x <
          padding
        ) {
          ball.x = padding;
          ball.vx *= -0.45;
        }

        if (
          ball.x >
          currentRect.width -
            padding
        ) {
          ball.x =
            currentRect.width -
            padding;

          ball.vx *= -0.45;
        }

        if (
          ball.y <
          padding
        ) {
          ball.y = padding;
          ball.vy *= -0.45;
        }

        if (
          ball.y >
          currentRect.height -
            padding
        ) {
          ball.y =
            currentRect.height -
            padding;

          ball.vy *= -0.45;
        }

        /*
         * =================================================
         * RENDER
         * =================================================
         */

        ball.element.style.transform =
          `translate3d(
            ${ball.x - ball.radius}px,
            ${ball.y - ball.radius}px,
            0
          ) rotate(${ball.rotation}deg) scale(${ball.scale})`;
      });

      animationFrame =
        requestAnimationFrame(
          animate
        );
    };

    animationFrame =
      requestAnimationFrame(
        animate
      );

    return () => {
      cancelAnimationFrame(
        animationFrame
      );

      hero.removeEventListener(
        "pointerdown",
        handlePointerDown
      );

      hero.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      hero.removeEventListener(
        "pointerup",
        handlePointerUp
      );

      hero.removeEventListener(
        "pointercancel",
        handlePointerUp
      );

      hero.removeEventListener(
        "pointerleave",
        handlePointerUp
      );
    };
  }, []);

  /* =======================================================
     SCROLL
  ======================================================= */

  const scrollToKegiatan = () => {
    document
      .getElementById(
        "psk-kegiatan"
      )
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@600;700;800&display=swap');

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        /* =================================================
           ROOT
        ================================================= */

        .psk-root {
          /* --- Unified color system, built from the core brand orange #F26A21 --- */
          --psk-orange: #F26A21;
          --psk-orange-light: #FF9F5E;
          --psk-orange-dark: #B84E14;
          --psk-orange-deep: #5C280A;
          --psk-orange-tint: #FDE3CE;
          --psk-orange-tint-soft: #FFF2E7;

          font-family: 'Barlow', sans-serif;
          background-color: #0D0D0D;
          background-image: radial-gradient(120% 60% at 15% 0%, rgba(242,106,33,0.32) 0%, rgba(184,78,20,0.14) 35%, transparent 70%);
          background-repeat: no-repeat;
          color: #171717;
          min-height: 100vh;
          overflow: hidden;
        }

        /* =================================================
           REVEAL
        ================================================= */

        .psk-reveal {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.8s ease, transform 0.8s cubic-bezier(.2,.7,.2,1);
        }

        .psk-reveal.psk-visible { opacity: 1; transform: translateY(0); }
        .psk-delay-1 { transition-delay: 0.08s; }
        .psk-delay-2 { transition-delay: 0.16s; }
        .psk-delay-3 { transition-delay: 0.24s; }

        /* =================================================
           HERO
        ================================================= */

        .psk-hero {
          --mouse-x: 0;
          --mouse-y: 0;
          position: relative;
          height: min(82vh, 760px);
          min-height: 580px;
          overflow: hidden;
          background: #080808;
          /* Penting untuk touch. Vertical swipe masih bisa digunakan untuk scroll halaman. */
          touch-action: pan-y;
        }

        /* =================================================
           HERO IMAGE
        ================================================= */

        .psk-hero-img {
          position: absolute;
          inset: -25px;
          z-index: 0;
          transform: translate(calc(var(--mouse-x) * -12px), calc(var(--mouse-y) * -8px)) scale(1.04);
          transition: transform 0.25s ease-out;
          pointer-events: none;
        }

        .psk-hero-img img {
          object-fit: cover;
          object-position: center;
          filter: contrast(1.08) saturate(1.05);
        }

        /* =================================================
           OVERLAY
        ================================================= */

        .psk-hero-overlay {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 75% 30%, rgba(242,106,33,0.22), transparent 30%),
            linear-gradient(90deg, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.65) 38%, rgba(0,0,0,0.18) 75%, rgba(0,0,0,0.10) 100%),
            linear-gradient(to top, rgba(0,0,0,0.90) 0%, transparent 48%);
        }

        /* =================================================
           HERO GRID
        ================================================= */

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

        /* =================================================
           HERO BOTTOM FADE
        ================================================= */

        .psk-hero::after {
          content: '';
          position: absolute;
          left: 0; right: 0; bottom: -1px;
          height: 130px;
          background: linear-gradient(to bottom, transparent, #0D0D0D);
          pointer-events: none;
          z-index: 6;
        }

        /* =================================================
           INTERACTIVE BALLS
        ================================================= */

        .psk-floating-balls {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
          overflow: hidden;
        }

        .psk-ball {
          position: absolute;
          top: 0; left: 0;
          width: 64px; height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 52px;
          line-height: 1;
          user-select: none;
          pointer-events: none;
          will-change: transform;
          filter: drop-shadow(0 8px 15px rgba(0,0,0,0.35));
          transform-origin: center;
          /* Tidak pakai CSS animation. Gerak sepenuhnya dikontrol JavaScript physics. */
        }

        .psk-ball::after {
          content: '';
          position: absolute;
          inset: 13px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, rgba(255,255,255,0.18), transparent 35%);
          pointer-events: none;
        }

        .psk-ball-1 { width: 76px; height: 76px; font-size: 61px; }
        .psk-ball-2 { width: 56px; height: 56px; font-size: 45px; opacity: 0.72; }
        .psk-ball-3 { width: 44px; height: 44px; font-size: 36px; opacity: 0.55; }
        .psk-ball-4 { width: 67px; height: 67px; font-size: 54px; opacity: 0.65; }
        .psk-ball-5 { width: 38px; height: 38px; font-size: 31px; opacity: 0.45; }
        .psk-ball-6 { width: 51px; height: 51px; font-size: 41px; opacity: 0.52; }

        /* =================================================
           HERO CONTENT
        ================================================= */

        .psk-hero-content {
          position: absolute;
          z-index: 5;
          left: 0; right: 0; bottom: 105px;
          max-width: 1200px;
          margin: auto;
          padding: 0 clamp(24px, 6vw, 80px);
          pointer-events: none;
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
          background: var(--psk-orange);
          box-shadow: 0 0 15px rgba(242,106,33,0.75);
        }

        .psk-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(90px, 15vw, 190px);
          line-height: 0.8;
          letter-spacing: 3px;
          color: var(--psk-orange);
          margin: 0 0 26px;
          text-shadow: 0 8px 40px rgba(0,0,0,0.35), 0 0 45px rgba(242,106,33,0.22);
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
          border: 1px solid rgba(255,159,94,0.55);
          background: rgba(242,106,33,0.10);
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
          pointer-events: auto;
          transition: background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
          animation: pskFadeUp 0.9s ease 0.6s both;
        }

        .psk-hero-button span { transition: transform 0.25s ease; }

        .psk-hero-button:hover {
          background: var(--psk-orange);
          transform: translateY(-3px);
          box-shadow: 0 10px 35px rgba(242,106,33,0.30);
        }

        .psk-hero-button:hover span { transform: translateY(3px); }

        /* =================================================
           STATS
        ================================================= */

        .psk-stats {
          position: relative;
          z-index: 7;
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
          background: linear-gradient(135deg, #1C1C1C 0%, var(--psk-orange-dark) 100%);
          text-align: center;
          border-right: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 12px 40px rgba(0,0,0,0.2);
          overflow: hidden;
          transition: transform 0.3s ease, filter 0.3s ease;
        }

        .psk-stat::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 0%, rgba(255,159,94,0.20), transparent 55%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .psk-stat:hover { transform: translateY(-7px); filter: brightness(1.12); z-index: 2; }
        .psk-stat:hover::before { opacity: 1; }
        .psk-stat:first-child { border-radius: 12px 0 0 12px; }
        .psk-stat:last-child { border-right: none; border-radius: 0 12px 12px 0; }

        .psk-stat-num {
          position: relative;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 48px;
          line-height: 1;
          color: var(--psk-orange-light);
          margin-bottom: 8px;
          text-shadow: 0 0 20px rgba(255,159,94,0.18);
        }

        .psk-stat-label {
          position: relative;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.75);
        }

        /* =================================================
           SECTION
        ================================================= */

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
          color: var(--psk-orange);
          margin-bottom: 12px;
        }

        .psk-section-label::before {
          content: '';
          width: 24px; height: 2px;
          background: var(--psk-orange);
          box-shadow: 0 0 12px rgba(242,106,33,0.5);
        }

        .psk-section-heading {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(48px, 6vw, 72px);
          color: #FFFFFF;
          line-height: 0.95;
          letter-spacing: 1px;
          margin: 0 0 45px;
        }

        /* =================================================
           TUJUAN
        ================================================= */

        .psk-tujuan-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .psk-tujuan-card {
          position: relative;
          padding: 36px 30px 34px;
          min-height: 280px;
          background: linear-gradient(145deg, #F5F1EB 0%, #EDE6DA 100%);
          border: 1px solid #e9e3d9;
          border-radius: 14px;
          overflow: hidden;
          transition: transform 0.35s cubic-bezier(.2,.8,.2,1), box-shadow 0.35s ease, border-color 0.35s ease;
        }

        .psk-tujuan-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 4px;
          background: linear-gradient(90deg, var(--psk-orange-light), var(--psk-orange), var(--psk-orange-dark));
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
          background: var(--psk-orange-tint);
          opacity: 0;
          transition: opacity 0.4s ease, transform 0.4s ease;
        }

        .psk-tujuan-card:hover {
          transform: translateY(-9px) rotateX(2deg);
          border-color: var(--psk-orange-light);
          box-shadow: 0 22px 55px rgba(242,106,33,0.16);
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
          background: var(--psk-orange-tint);
          border-radius: 12px;
          font-size: 27px;
          margin-bottom: 25px;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }

        .psk-tujuan-card:hover .psk-tujuan-icon {
          transform: rotate(-6deg) scale(1.08);
          box-shadow: 0 8px 25px rgba(242,106,33,0.22);
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

        /* =================================================
           DIVIDER
        ================================================= */

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
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18));
        }

        .psk-divider::after {
          background: linear-gradient(90deg, rgba(255,255,255,0.18), transparent);
        }

        .psk-divider-icon {
          color: var(--psk-orange-light);
          font-size: 12px;
          animation: pskPulse 2s ease-in-out infinite;
        }

        /* =================================================
           KEGIATAN
        ================================================= */

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
        .psk-kegiatan-item.active {
          transform: translateX(6px);
          border-color: var(--psk-orange-light);
          box-shadow: 0 12px 30px rgba(242,106,33,0.12);
        }

        .psk-kegiatan-item.active {
          background: linear-gradient(135deg, #fff, var(--psk-orange-tint-soft));
        }

        .psk-kegiatan-no {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 38px;
          line-height: 1;
          color: var(--psk-orange);
          opacity: 0.35;
          width: 45px;
          flex-shrink: 0;
          transition: color 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
        }

        .psk-kegiatan-item:hover .psk-kegiatan-no,
        .psk-kegiatan-item.active .psk-kegiatan-no {
          color: var(--psk-orange);
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

        .psk-kegiatan-item.active .psk-kegiatan-detail {
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
          color: var(--psk-orange);
          flex-shrink: 0;
          transition: transform 0.3s ease, background 0.3s ease, color 0.3s ease;
        }

        .psk-kegiatan-item.active .psk-kegiatan-arrow {
          transform: rotate(180deg);
          background: var(--psk-orange);
          color: #fff;
        }

        /* =================================================
           CTA
        ================================================= */

        .psk-cta {
          position: relative;
          margin-top: 35px;
          background:
            radial-gradient(circle at 80% 30%, rgba(242,106,33,0.25), transparent 30%),
            linear-gradient(120deg, #151515 0%, var(--psk-orange-deep) 65%, #1C1C1C 140%);
          overflow: hidden;
        }

        .psk-cta::before {
          content: 'BASKET';
          position: absolute;
          right: -30px; bottom: -55px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(110px, 16vw, 240px);
          color: rgba(255,255,255,0.035);
          line-height: 1;
          pointer-events: none;
        }

        .psk-cta::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 5px; height: 100%;
          background: linear-gradient(180deg, var(--psk-orange-light), var(--psk-orange));
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

        .psk-cta-title span { color: var(--psk-orange); }

        .psk-cta-sub {
          max-width: 460px;
          margin: 13px 0 0;
          font-size: 14px;
          line-height: 1.7;
          color: rgba(255,255,255,0.55);
        }

        .psk-cta-orbit {
          position: absolute;
          width: 240px; height: 240px;
          right: 10%; top: 50%;
          border: 1px solid rgba(242,106,33,0.15);
          border-radius: 50%;
          transform: translateY(-50%);
          animation: pskOrbit 12s linear infinite;
        }

        /* =================================================
           ANIMATIONS
        ================================================= */

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

        /* =================================================
           RESPONSIVE
        ================================================= */

        @media (max-width: 900px) {
          .psk-hero { height: 650px; }
          .psk-hero-content { bottom: 95px; }
          .psk-title { font-size: clamp(80px, 17vw, 140px); }
          .psk-tujuan-grid { grid-template-columns: 1fr; }
          .psk-tujuan-card { min-height: auto; }
          .psk-cta-orbit { right: -80px; }
          .psk-ball-1 { width: 66px; height: 66px; font-size: 53px; }
          .psk-ball-4 { width: 58px; height: 58px; font-size: 47px; }
        }

        @media (max-width: 700px) {
          .psk-hero { min-height: 600px; height: 75vh; }
          .psk-hero-overlay {
            background:
              radial-gradient(circle at 70% 25%, rgba(242,106,33,0.18), transparent 35%),
              linear-gradient(to top, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.25) 100%);
          }
          .psk-hero-content { bottom: 85px; padding: 0 22px; }
          .psk-title { font-size: clamp(75px, 22vw, 115px); }
          .psk-subtitle { font-size: 14px; }

          /* Bola HP dibuat lebih kecil */
          .psk-ball-1 { width: 55px; height: 55px; font-size: 44px; }
          .psk-ball-2 { width: 43px; height: 43px; font-size: 35px; }
          .psk-ball-3 { width: 34px; height: 34px; font-size: 28px; }
          .psk-ball-4 { width: 47px; height: 47px; font-size: 38px; }
          .psk-ball-5 { width: 30px; height: 30px; font-size: 24px; }
          .psk-ball-6 { width: 38px; height: 38px; font-size: 31px; }

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

          /* Kurangi jumlah bola di layar kecil supaya tetap ringan. */
          .psk-ball-5, .psk-ball-6 { display: none; }
        }

        /* =================================================
           REDUCED MOTION
        ================================================= */

        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }

          .psk-reveal, .psk-title, .psk-eyebrow, .psk-subtitle, .psk-hero-button, .psk-divider-icon, .psk-cta-orbit {
            animation: none !important;
            transition: none !important;
          }

          .psk-hero-img { transform: scale(1.04); transition: none; }

          .psk-tujuan-card:hover, .psk-kegiatan-item:hover, .psk-stat:hover {
            transform: none;
          }

          /*
           * PENTING:
           * bola TIDAK dimatikan.
           * Karena gerak bola dikontrol JS physics dan merupakan
           * interaksi user, bukan sekadar decorative animation.
           */
        }
      `}</style>

        <Navbar />
      <div className="psk-root">


        <main>

          {/* =================================================
              HERO
          ================================================= */}

          <section
            ref={heroRef}
            className="psk-hero"
          >

            {/* =============================================
                INTERACTIVE BASKETBALLS
            ============================================== */}

            <div
              className="psk-floating-balls"
              aria-hidden="true"
            >

              <div
                ref={(el) => {
                  ballRefs.current[0] = el;
                }}
                className="
                  psk-ball
                  psk-ball-1
                "
                data-x="16"
                data-y="22"
                data-radius="38"
                data-scale="1"
              >
                🏀
              </div>

              <div
                ref={(el) => {
                  ballRefs.current[1] = el;
                }}
                className="
                  psk-ball
                  psk-ball-2
                "
                data-x="72"
                data-y="18"
                data-radius="28"
                data-scale="1"
              >
                🏀
              </div>

              <div
                ref={(el) => {
                  ballRefs.current[2] = el;
                }}
                className="
                  psk-ball
                  psk-ball-3
                "
                data-x="87"
                data-y="43"
                data-radius="22"
                data-scale="1"
              >
                🏀
              </div>

              <div
                ref={(el) => {
                  ballRefs.current[3] = el;
                }}
                className="
                  psk-ball
                  psk-ball-4
                "
                data-x="63"
                data-y="74"
                data-radius="33"
                data-scale="1"
              >
                🏀
              </div>

              <div
                ref={(el) => {
                  ballRefs.current[4] = el;
                }}
                className="
                  psk-ball
                  psk-ball-5
                "
                data-x="32"
                data-y="38"
                data-radius="19"
                data-scale="1"
              >
                🏀
              </div>

              <div
                ref={(el) => {
                  ballRefs.current[5] = el;
                }}
                className="
                  psk-ball
                  psk-ball-6
                "
                data-x="91"
                data-y="76"
                data-radius="25"
                data-scale="1"
              >
                🏀
              </div>

            </div>

            {/* =============================================
                HERO IMAGE
            ============================================== */}

            <div className="psk-hero-img">

              <Image
                src="/images/basket2.jpeg"
                alt="Basket SMP Citra Negara"
                fill
                priority
              />

              <div
                className="psk-hero-overlay"
              />

            </div>

            {/* =============================================
                HERO CONTENT
            ============================================== */}

            <div
              className="psk-hero-content"
            >

              <div
                className="psk-eyebrow"
              >
                Ekstrakurikuler SMP Citra Negara
              </div>

              <h1 className="psk-title">
                BAS<span>KET</span>
              </h1>

              <p className="psk-subtitle">
                Lebih dari sekadar olahraga —
                basket adalah ruang membangun
                karakter, melatih kerja sama,
                dan mencetak atlet berprestasi
                dari SMP Citra Negara.
              </p>

              <button
                className="psk-hero-button"
                onClick={
                  scrollToKegiatan
                }
              >
                Jelajahi Kegiatan

                <span>
                  ↓
                </span>
              </button>

            </div>

          </section>

          {/* =================================================
              STATS
          ================================================= */}

          <div className="psk-stats">

            {STATS.map((s) => (
              <AnimatedStat
                key={s.label}
                angka={s.angka}
                suffix={s.suffix}
                label={s.label}
              />
            ))}

          </div>

          {/* =================================================
              TUJUAN
          ================================================= */}

          <section className="psk-section">

            <div
              className="
                psk-section-label
                psk-reveal
              "
            >
              Mengapa Basket
            </div>

            <h2
              className="
                psk-section-heading
                psk-reveal
                psk-delay-1
              "
            >
              TUJUAN KAMI
            </h2>

            <div
              className="psk-tujuan-grid"
            >

              {TUJUAN.map(
                (t, index) => (
                  <div
                    key={t.judul}
                    className={`
                      psk-tujuan-card
                      psk-reveal
                      psk-delay-${
                        index + 1
                      }
                    `}
                  >

                    <span
                      className="
                        psk-tujuan-icon
                      "
                    >
                      {t.icon}
                    </span>

                    <div
                      className="
                        psk-tujuan-title
                      "
                    >
                      {t.judul}
                    </div>

                    <p
                      className="
                        psk-tujuan-desc
                      "
                    >
                      {t.deskripsi}
                    </p>

                  </div>
                )
              )}

            </div>

          </section>

          {/* =================================================
              DIVIDER
          ================================================= */}

          <div className="psk-divider">

            <span
              className="
                psk-divider-icon
              "
            >
              ✦
            </span>

          </div>

          {/* =================================================
              KEGIATAN
          ================================================= */}

          <section
            id="psk-kegiatan"
            className="psk-section"
            style={{
              paddingTop:
                "clamp(55px, 7vw, 85px)",
            }}
          >

            <div
              className="
                psk-section-label
                psk-reveal
              "
            >
              Program Latihan
            </div>

            <h2
              className="
                psk-section-heading
                psk-reveal
              "
            >
              KEGIATAN RUTIN
            </h2>

            <div
              className="
                psk-kegiatan-grid
              "
            >

              {KEGIATAN.map(
                (k, index) => {
                  const active =
                    activeKegiatan ===
                    k.no;

                  return (
                    <div
                      key={k.no}
                      className={`
                        psk-kegiatan-item
                        psk-reveal
                        psk-delay-${
                          (index % 3) + 1
                        }
                        ${
                          active
                            ? "active"
                            : ""
                        }
                      `}
                      onClick={() =>
                        setActiveKegiatan(
                          active
                            ? null
                            : k.no
                        )
                      }
                    >

                      <div
                        className="
                          psk-kegiatan-no
                        "
                      >
                        {k.no}
                      </div>

                      <div
                        style={{
                          flex: 1,
                        }}
                      >

                        <div
                          className="
                            psk-kegiatan-nama
                          "
                        >
                          {k.nama}
                        </div>

                        <div
                          className="
                            psk-kegiatan-detail
                          "
                        >
                          {k.detail}
                        </div>

                      </div>

                      <div
                        className="
                          psk-kegiatan-arrow
                        "
                      >
                        ↓
                      </div>

                    </div>
                  );
                }
              )}

            </div>

          </section>

          {/* =================================================
              CTA
          ================================================= */}

          <section
            className="psk-cta"
          >

            <div
              className="
                psk-cta-orbit
              "
            />

            <div
              className="
                psk-cta-inner
              "
            >

              <div
                className="
                  psk-reveal
                "
              >

                <h2
                  className="
                    psk-cta-title
                  "
                >
                  SIAP JADI{" "}
                  <span>
                    JUARA?
                  </span>
                </h2>

                <p
                  className="
                    psk-cta-sub
                  "
                >
                  Asah teknik, bangun
                  strategi, dan buktikan
                  mentalitas juara bersama
                  Basket SMP Citra Negara.
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