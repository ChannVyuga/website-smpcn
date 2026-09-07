"use client";

import { Fraunces, Inter, Amiri } from "next/font/google";
import styles from "../program.module.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const display = Fraunces({ subsets: ["latin"], weight: ["400", "600"], style: ["normal", "italic"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body" });
const arabic = Amiri({ subsets: ["arabic"], weight: ["400", "700"], variable: "--font-arabic" });

const curriculum = [
  {
    label: "Tahsin",
    title: "Perbaikan bacaan",
    detail:
      "Siswa membenahi makhraj (tempat keluar huruf) dan hukum tajwid satu per satu, dibimbing langsung sampai bacaannya benar-benar tepat.",
  },
  {
    label: "Tahfizh",
    title: "Hafalan berjenjang",
    detail:
      "Target hafalan disusun bertahap sesuai kemampuan siswa, dengan sistem muraja'ah (pengulangan) rutin agar hafalan lama tetap terjaga.",
  },
  {
    label: "Tadabbur",
    title: "Merenungkan makna",
    detail:
      "Bukan sekadar melafalkan, siswa diajak memahami arti dan pesan ayat, serta mengaitkannya dengan kehidupan sehari-hari.",
  },
  {
    label: "Adab",
    title: "Akhlak Qur'ani",
    detail:
      "Halaqah menekankan adab terhadap Al-Qur'an, guru, dan sesama — sopan santun yang tumbuh bersamaan dengan hafalan.",
  },
  {
    label: "Talaqqi",
    title: "Kelompok kecil, bimbingan langsung",
    detail:
      "Setiap halaqah terdiri dari kelompok kecil siswa bersama satu pembimbing, sehingga koreksi bacaan bisa dilakukan secara personal.",
  },
];

const benefits = [
  {
    title: "Bacaan yang benar sesuai tajwid",
    detail: "Koreksi personal dalam kelompok kecil membuat kesalahan bacaan cepat ditemukan dan diperbaiki.",
  },
  {
    title: "Hafalan yang terjaga, bukan sekadar bertambah",
    detail: "Sistem muraja'ah rutin menjaga agar hafalan lama tidak hilang saat hafalan baru ditambahkan.",
  },
  {
    title: "Karakter dan adab yang terbentuk",
    detail: "Kedekatan dengan Al-Qur'an membentuk kebiasaan baik yang terbawa ke luar halaqah.",
  },
  {
    title: "Bimbingan yang personal",
    detail: "Kelompok kecil memastikan setiap siswa benar-benar diperhatikan, bukan hanya duduk mendengarkan.",
  },
  {
    title: "Bekal untuk dunia dan akhirat",
    detail: "Kedekatan dengan Al-Qur'an sejak dini menjadi fondasi yang dibawa siswa sepanjang hidupnya.",
  },
];

const theme: React.CSSProperties = {
  ["--bg" as string]: "#FBF7EE",
  ["--bg-alt" as string]: "#F3EDDC",
  ["--surface" as string]: "#FFFFFF",
  ["--heading" as string]: "#14312A",
  ["--muted" as string]: "#5B5646",
  ["--border" as string]: "#E4DCC5",
  ["--accent" as string]: "#0F6B4C",
  ["--accent-strong" as string]: "#125E43",
  ["--on-accent" as string]: "#FFFFFF",
  ["--accentSoft" as string]: "rgba(15, 107, 76, 0.1)",
};

export default function HolaqohAlQuranPage() {
  return (
    <>
      <Navbar />
      <main className={`${display.variable} ${body.variable} ${arabic.variable} ${styles.main}`} style={theme}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.hqStarWrap} aria-hidden="true">
            <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.hqStar}>
              <g stroke="#0F6B4C" strokeWidth="1.5">
                <polygon points="200,40 231,140 331,140 251,203 282,303 200,240 118,303 149,203 69,140 169,140" />
                <circle cx="200" cy="200" r="150" />
                <circle cx="200" cy="200" r="110" />
              </g>
            </svg>
          </div>

          <div className={`${styles.container} ${styles.heroCentered}`}>
            <p className={styles.eyebrow} style={{ justifyContent: "center" }}>
              <span className={styles.eyebrowDot} style={{ background: "#C9A227" }} />
              PROGRAM UNGGULAN — TARBIYAH
            </p>
            <p dir="rtl" className={styles.hqArabic}>
              حلقة القرآن
            </p>
            <h1 className={styles.title}>Holaqoh Al-Qur&apos;an</h1>
            <p className={styles.subtitle}>
              Belajar Al-Qur&apos;an dalam lingkaran kecil — tahsin, tahfizh, dan tadabbur, dibimbing langsung dari
              hati ke hati.
            </p>
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
                <div key={item.label} className={styles.card}>
                  <span className={styles.cardLabel}>{item.label}</span>
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
          <h2 className={styles.ctaTitle}>Mulai perjalanan bersama Al-Qur&apos;an</h2>
          <p className={styles.ctaText}>Bergabung dalam halaqah kecil dengan bimbingan personal.</p>
          <button className={styles.ctaButton}>Daftar Program</button> {/* tinggal tambahin fungsi agar terdirect ke no. pembina/ketua program */}
        </section>
      </main>
      <Footer />
    </>
  );
}