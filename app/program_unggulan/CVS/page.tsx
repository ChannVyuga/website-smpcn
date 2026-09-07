"use client";

import { Fraunces, Inter } from "next/font/google";
import styles from "../program.module.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const display = Fraunces({ subsets: ["latin"], weight: ["400", "600"], style: ["normal", "italic"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body" });

const curriculum = [
  {
    title: "Speaking practice harian",
    detail: "Setiap sesi diisi obrolan aktif — siswa berbicara sejak menit pertama, bukan mendengarkan teori grammar lebih dulu.",
  },
  {
    title: "Vocabulary in context",
    detail: "Kosakata baru dipelajari lewat situasi nyata (memesan makanan, memperkenalkan diri, bercerita), bukan daftar hafalan lepas.",
  },
  {
    title: "Listening & pronunciation",
    detail: "Siswa terbiasa mendengar berbagai aksen dan melatih pelafalan sampai bisa dipahami lawan bicara dengan jelas.",
  },
  {
    title: "Public speaking & presentasi",
    detail: "Sesi rutin tampil di depan kelas melatih siswa menyusun dan menyampaikan gagasan dengan percaya diri.",
  },
  {
    title: "Cultural exposure",
    detail: "Bahasa dipelajari bersama konteks budayanya, agar siswa memahami bukan hanya kata, tapi juga maksudnya.",
  },
];

const benefits = [
  {
    title: "Percaya diri berbicara di depan umum",
    detail: "Latihan rutin membuat rasa gugup berbicara di depan orang lain berangsur hilang.",
  },
  {
    title: "Komunikasi lintas bahasa",
    detail: "Siswa terbiasa berpindah antara bahasa Indonesia, Inggris, dan Arab sesuai konteks percakapan.",
  },
  {
    title: "Peluang studi & kerja internasional",
    detail: "Kemampuan bicara aktif membuka jalan ke beasiswa, pertukaran pelajar, dan lingkungan kerja global.",
  },
  {
    title: "Mendengar aktif & respons cepat",
    detail: "Percakapan dua arah melatih siswa menangkap maksud lawan bicara dan merespons secara alami.",
  },
  {
    title: "Wawasan lintas budaya",
    detail: "Memahami cara pandang budaya lain membuat siswa lebih terbuka dan mudah beradaptasi.",
  },
];

const theme: React.CSSProperties = {
  ["--bg" as string]: "#F4F7F8",
  ["--bg-alt" as string]: "#EAF0F1",
  ["--surface" as string]: "#FFFFFF",
  ["--heading" as string]: "#16232B",
  ["--muted" as string]: "#4E6068",
  ["--border" as string]: "#DCE6E8",
  ["--accent" as string]: "#1B4B5A",
  ["--accent2" as string]: "#D6604D",
  ["--accent-strong" as string]: "#153A46",
  ["--on-accent" as string]: "#FFFFFF",
};

export default function ConversationPage() {
  return (
    <>
      <Navbar />
      <main className={`${display.variable} ${body.variable} ${styles.main}`} style={theme}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={`${styles.container} ${styles.heroSplit}`}>
            <div>
              <p className={styles.eyebrow}>
                <span className={styles.eyebrowDot} style={{ background: "#D6604D" }} />
                PROGRAM UNGGULAN — BAHASA
              </p>
              <h1 className={styles.title}>Conversation</h1>
              <p className={styles.subtitle}>
                Belajar bahasa dengan cara paling alami: bicara. Setiap sesi adalah percakapan sungguhan, bukan
                latihan soal di atas kertas.
              </p>
            </div>

            {/* Signature: dialogue exchange */}
            <div className={styles.cvBubbles}>
              <div className={`${styles.cvBubble} ${styles.cvBubbleLeft}`}>&ldquo;What did you do last weekend?&rdquo;</div>
              <div className={`${styles.cvBubble} ${styles.cvBubbleRight}`}>
                &ldquo;I visited my grandma and we cooked together.&rdquo;
              </div>
              <div className={`${styles.cvBubble} ${styles.cvBubbleLeft}`}>&ldquo;That sounds lovely — what did you cook?&rdquo;</div>
              <div className={`${styles.cvBubble} ${styles.cvBubbleAccent2}`}>&ldquo;Rendang! It took hours.&rdquo;</div>
            </div>
          </div>
        </section>

        {/* Materi */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Materi yang dipelajari</h2>
            </div>

            <div className={`${styles.grid} ${styles.grid2} ${styles.grid3}`}>
              {curriculum.map((item) => (
                <div key={item.title} className={styles.card}>
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
            <div className={`${styles.grid} ${styles.grid2}`}>
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
          <h2 className={styles.ctaTitle}>Siap memulai percakapan pertamamu?</h2>
          <p className={styles.ctaText}>Bergabung dengan program Conversation dan mulai bicara dengan percaya diri.</p>
          <button className={styles.ctaButton}>Daftar Program</button> {/* tinggal tambahin fungsi agar terdirect ke no. pembina/ketua program */}
        </section>
      </main>
      <Footer />
    </>
  );
}