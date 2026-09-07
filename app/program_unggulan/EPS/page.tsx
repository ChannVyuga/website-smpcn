"use client";

import { Fraunces, Inter, Space_Grotesk } from "next/font/google";
import styles from "../program.module.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const display = Fraunces({ subsets: ["latin"], weight: ["400", "600"], style: ["normal", "italic"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body" });
const mono = Space_Grotesk({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-mono" });

const stages = [
  {
    step: "01",
    height: 34,
    title: "Mindset wirausaha",
    detail: "Membangun keberanian mencoba dan ketahanan menghadapi kegagalan — pondasi sebelum bicara soal bisnis.",
  },
  {
    step: "02",
    height: 50,
    title: "Riset & validasi ide",
    detail: "Siswa belajar mengenali masalah nyata di sekitar mereka sebelum buru-buru membuat produk.",
  },
  {
    step: "03",
    height: 66,
    title: "Model bisnis & keuangan dasar",
    detail: "Menghitung modal, menentukan harga, dan memahami dari mana keuntungan sebenarnya berasal.",
  },
  {
    step: "04",
    height: 82,
    title: "Branding & pemasaran",
    detail: "Membangun cerita produk yang menarik dan mempromosikannya lewat kanal digital sederhana.",
  },
  {
    step: "05",
    height: 100,
    title: "Praktik langsung",
    detail: "Puncaknya: siswa benar-benar menjual produk atau jasa nyata lewat market day dan project bisnis kelas.",
  },
];

const benefits = [
  {
    title: "Berani mengambil keputusan",
    detail: "Terbiasa menimbang risiko dan tetap melangkah, bukan menunggu kondisi sempurna.",
  },
  {
    title: "Melek keuangan sejak dini",
    detail: "Memahami arus uang masuk dan keluar — bekal yang berguna jauh di luar konteks bisnis.",
  },
  {
    title: "Komunikasi & negosiasi",
    detail: "Menjual produk melatih siswa menjelaskan ide dan meyakinkan orang lain dengan percaya diri.",
  },
  {
    title: "Terbiasa gagal lalu mencoba lagi",
    detail: "Bisnis kelas yang tidak laku bukan akhir — jadi bahan evaluasi untuk percobaan berikutnya.",
  },
  {
    title: "Bekal jadi pencipta peluang",
    detail: "Siswa dilatih berpikir sebagai pembuat lapangan kerja, bukan hanya pencari pekerjaan.",
  },
];

const theme: React.CSSProperties = {
  ["--bg" as string]: "#F2E9DC",
  ["--bg-alt" as string]: "#EADFC7",
  ["--surface" as string]: "#FFFFFF",
  ["--heading" as string]: "#2B2013",
  ["--muted" as string]: "#5E4E33",
  ["--border" as string]: "#DFCFAE",
  ["--accent" as string]: "#C2540A",
  ["--accent2" as string]: "#E8890C",
  ["--accent-strong" as string]: "#A8480A",
  ["--on-accent" as string]: "#FFFFFF",
};

export default function EntrepreneurshipPage() {
  return (
    <>
      <Navbar />
      <main className={`${display.variable} ${body.variable} ${mono.variable} ${styles.main}`} style={theme}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={`${styles.container} ${styles.heroSplit}`}>
            <div>
              <p className={styles.eyebrow}>
                <span className={styles.eyebrowDot} />
                PROGRAM UNGGULAN — KEWIRAUSAHAAN
              </p>
              <h1 className={styles.title}>Entrepreneurship</h1>
              <p className={styles.subtitle}>
                Bukan sekadar teori bisnis di atas kertas — siswa merancang, membangun, dan benar-benar menjual sesuatu
                sebelum lulus.
              </p>
            </div>

            {/* Signature: ascending step bars */}
            <div className={styles.epBars}>
              {stages.map((s, i) => (
                <div key={s.step} className={styles.epBarItem}>
                  <span className={styles.epBarIndex}>{s.step}</span>
                  <div
                    className={styles.epBarFill}
                    style={{ height: `${s.height}px`, animationDelay: `${i * 0.08}s` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Materi */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Materi yang dipelajari</h2>
              <span className={styles.sectionTag}>5 TAHAP MEMBANGUN BISNIS</span>
            </div>

            <ol className={styles.epStepList}>
              {stages.map((s) => (
                <li key={s.step} className={styles.epStepItem}>
                  <span className={styles.epStepIndex}>{s.step}</span>
                  <div>
                    <h3 className={styles.cardTitle}>{s.title}</h3>
                    <p className={styles.cardText}>{s.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Manfaat */}
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle} style={{ marginBottom: "3rem" }}>
              Manfaat bagi siswa
            </h2>
            <div className={`${styles.grid} ${styles.grid2} ${styles.grid3}`}>
              {benefits.map((b) => (
                <div key={b.title} className={styles.card}>
                  <h3 className={styles.cardTitle} style={{ fontSize: "1rem" }}>
                    {b.title}
                  </h3>
                  <p className={styles.cardText}>{b.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.cta}>
          <h2 className={styles.ctaTitle}>Siap membangun bisnis pertamamu?</h2>
          <p className={styles.ctaText}>Ikuti program Entrepreneurship dan bawa idemu sampai benar-benar terjual.</p>
          <button className={styles.ctaButton}>Daftar Program</button> {/* tinggal tambahin fungsi agar terdirect ke no. pembina/ketua program */}
        </section>
      </main>
      <Footer />
    </>
  );
}