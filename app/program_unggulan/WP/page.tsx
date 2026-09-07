"use client";

import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import styles from "../program.module.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const display = Fraunces({ subsets: ["latin"], weight: ["400", "600"], style: ["normal", "italic"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

const curriculum = [
  {
    stage: "01",
    label: "Fondasi",
    title: "HTML & CSS — cara berpikir seperti browser",
    detail:
      "Siswa belajar menyusun struktur halaman dan menatanya secara visual: elemen, layout, warna, tipografi, dan responsivitas di berbagai ukuran layar.",
  },
  {
    stage: "02",
    label: "Logika",
    title: "JavaScript & interaktivitas",
    detail:
      "Dari variabel dan fungsi hingga memanipulasi tampilan secara langsung (DOM), siswa membuat halaman yang merespons aksi pengguna.",
  },
  {
    stage: "03",
    label: "Framework",
    title: "React & Next.js",
    detail:
      "Belajar berpikir dalam komponen: memecah tampilan jadi bagian kecil yang bisa dipakai ulang, mengelola state, dan membangun aplikasi multi-halaman.",
  },
  {
    stage: "04",
    label: "Backend",
    title: "Server, API, dan database dasar",
    detail:
      "Siswa mengenal Node.js, membuat API sederhana, serta menyimpan dan mengambil data dari database — memahami apa yang terjadi di balik layar.",
  },
  {
    stage: "05",
    label: "Rilis",
    title: "Git, GitHub, dan deployment",
    detail:
      "Setiap project dikelola dengan version control dan benar-benar dipublikasikan ke internet, bukan hanya berhenti di laptop.",
  },
];

const benefits = [
  {
    title: "Portofolio yang bisa dipakai",
    detail: "Setiap modul menghasilkan project nyata — website atau aplikasi yang bisa langsung ditunjukkan ke kampus atau perusahaan.",
  },
  {
    title: "Cara berpikir yang runtut",
    detail: "Debugging melatih siswa memecah masalah besar jadi langkah kecil yang bisa diuji satu per satu — kebiasaan yang berguna jauh di luar coding.",
  },
  {
    title: "Peluang penghasilan lebih awal",
    detail: "Keterampilan membangun website membuka jalan ke kerja lepas (freelance) sejak masih di bangku sekolah.",
  },
  {
    title: "Bekal untuk industri digital",
    detail: "Hampir semua bidang kini butuh literasi teknologi. Siswa masuk dengan kepala mulai lebih dulu.",
  },
  {
    title: "Ketekunan menghadapi kegagalan",
    detail: "Kode yang error adalah bagian dari proses. Siswa terbiasa mencoba lagi tanpa merasa gagal secara pribadi.",
  },
];

// Palette for this page only — everything in program.module.css reads these variables.
const theme: React.CSSProperties = {
  ["--bg" as string]: "#0B0D14",
  ["--bg-alt" as string]: "#0F1220",
  ["--surface" as string]: "#0B0D14",
  ["--heading" as string]: "#FFFFFF",
  ["--muted" as string]: "#A7ADBE",
  ["--border" as string]: "#1E2230",
  ["--accent" as string]: "#7C8CF8",
  ["--accent-strong" as string]: "#95A3FF",
  ["--on-accent" as string]: "#0B0D14",
};

export default function WebProgrammingPage() {
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
                PROGRAM UNGGULAN — TEKNOLOGI
              </p>
              <h1 className={styles.title}>Web Programming</h1>
              <p className={styles.subtitle}>
                Dari tag <code className={styles.code}>&lt;div&gt;</code> pertama sampai aplikasi web utuh yang bisa
                dipakai orang lain — siswa belajar membangun, bukan sekadar menghafal istilah.
              </p>
            </div>

            {/* Signature: terminal window */}
            <div className={styles.wpTerminal}>
              <div className={styles.wpTerminalHeader}>
                <span className={`${styles.wpDot} ${styles.wpDotRed}`} />
                <span className={`${styles.wpDot} ${styles.wpDotYellow}`} />
                <span className={`${styles.wpDot} ${styles.wpDotGreen}`} />
                <span className={styles.wpFilename}>siswa@kelas — index.tsx</span>
              </div>
              <div className={styles.wpBody}>
                <p className={styles.wpComment}>// project pertama kamu</p>
                <p>
                  <span className={styles.wpKeyword}>function</span> <span className={styles.wpFunc}>Sapa</span>() {"{"}
                </p>
                <p style={{ paddingLeft: 16 }}>
                  <span className={styles.wpKeyword}>return</span> (
                </p>
                <p style={{ paddingLeft: 32 }} className={styles.wpTag}>
                  &lt;h1&gt;
                  <span className={`${styles.wpTyped} ${styles.wpString}`}>Halo, dunia! Ini web pertamaku.</span>
                  <span className={styles.wpCursor}>▌</span>
                  &lt;/h1&gt;
                </p>
                <p style={{ paddingLeft: 16 }}>);</p>
                <p>{"}"}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Materi */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Materi yang dipelajari</h2>
              <span className={styles.sectionTag}>5 TAHAP BELAJAR</span>
            </div>

            <div className={`${styles.grid} ${styles.grid2}`}>
              {curriculum.map((item) => (
                <div key={item.stage} className={styles.card}>
                  <div className={styles.cardEyebrow}>
                    <span className={styles.cardEyebrowIndex}>{item.stage}</span>
                    <span className={styles.cardEyebrowLabel}>{item.label}</span>
                  </div>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardText}>{item.detail}</p>
                </div>
              ))}
            </div>
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
          <h2 className={styles.ctaTitle}>Siap menulis baris kode pertamamu?</h2>
          <p className={styles.ctaText}>Daftar program Web Programming dan mulai membangun sesuatu yang nyata.</p>
          <button className={styles.ctaButton}>Daftar Program</button> {/* tinggal tambahin fungsi agar terdirect ke no. pembina/ketua program */}
        </section> 
      </main>
      <Footer />
    </>
  );
}