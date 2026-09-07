"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Target, Eye, Quote } from "lucide-react";
import "./tentang.css";

/* ══════════════════════════════════════════
   HOOK: reveal-on-scroll (dipakai hemat, hanya
   untuk momen yang punya makna — bukan default
   fade di setiap section)
══════════════════════════════════════════ */
function useInView<T extends HTMLElement>(threshold = 0.18) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window !== "undefined" && "matchMedia" in window) {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setInView(true);
        return;
      }
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

/* ══════════════════════════════════════════
   KOMPONEN STRUKTUR ORGANISASI
══════════════════════════════════════════ */
function Box({
  name,
  label,
  variant = "default",
  wide = false,
}: {
  name: string;
  label: string;
  variant?: string;
  wide?: boolean;
}) {
  const styles: Record<
    string,
    { bg: string; border: string; nameColor: string; labelColor: string }
  > = {
    default: {
      bg: "white",
      border: "#E2D9C8",
      nameColor: "#0A1628",
      labelColor: "#6B7280",
    },
    dark: {
      bg: "#023d17",
      border: "#C8973A",
      nameColor: "white",
      labelColor: "#C8973A",
    },
    gold: {
      bg: "linear-gradient(135deg,#C8973A,#E8B84B)",
      border: "#C8973A",
      nameColor: "#0A1628",
      labelColor: "#0A1628",
    },
    cream: {
      bg: "#FAF7F0",
      border: "#E2D9C8",
      nameColor: "#0A1628",
      labelColor: "#6B7280",
    },
  };
  const s = styles[variant] ?? styles.default;
  return (
    <div
      className="so-box"
      style={{
        background: s.bg,
        border: `1.5px solid ${s.border}`,
        borderRadius: 9,
        padding: "8px 14px",
        textAlign: "center",
        minWidth: wide ? 220 : 148,
        maxWidth: wide ? 260 : 200,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: s.nameColor,
          lineHeight: 1.35,
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontSize: 10,
          color: s.labelColor,
          marginTop: 2,
          fontWeight: 600,
        }}
      >
        {label}
      </div>
    </div>
  );
}

const VLine = ({ h = 18 }: { h?: number }) => (
  <div
    style={{
      width: 2,
      height: h,
      background: "#C8973A",
      alignSelf: "center",
      flexShrink: 0,
    }}
  />
);
const HLine = ({ w = 32 }: { w?: number }) => (
  <div
    style={{
      height: 2,
      width: w,
      background: "#C8973A",
      alignSelf: "center",
      flexShrink: 0,
    }}
  />
);
function VCol({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {children}
    </div>
  );
}

function LeaderCard({
  name,
  label,
  variant = "default",
}: {
  name: string;
  label: string;
  variant?: string;
}) {
  const styles: Record<
    string,
    { bg: string; border: string; nameColor: string; labelColor: string }
  > = {
    default: {
      bg: "white",
      border: "#E2D9C8",
      nameColor: "#0A1628",
      labelColor: "#6B7280",
    },
    dark: {
      bg: "#023d17",
      border: "#C8973A",
      nameColor: "white",
      labelColor: "#C8973A",
    },
    gold: {
      bg: "linear-gradient(135deg,#C8973A,#E8B84B)",
      border: "#C8973A",
      nameColor: "#0A1628",
      labelColor: "#0A1628",
    },
    cream: {
      bg: "#FAF7F0",
      border: "#E2D9C8",
      nameColor: "#0A1628",
      labelColor: "#6B7280",
    },
  };
  const s = styles[variant] ?? styles.default;
  return (
    <div
      className="so-leader-card"
      style={{
        background: s.bg,
        border: `1.5px solid ${s.border}`,
        borderRadius: 9,
        padding: "10px 14px",
        textAlign: "center",
        width: "100%",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: s.nameColor,
          lineHeight: 1.35,
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontSize: 11,
          color: s.labelColor,
          marginTop: 2,
          fontWeight: 600,
        }}
      >
        {label}
      </div>
    </div>
  );
}

type Person = { name: string; label: string };
type Division = { head: Person; members: Person[] };

const divisions: Division[] = [
  {
    head: { name: "Iin Inayah, S.Pd", label: "Waka Kurikulum" },
    members: [
      { name: "Istiranah, S.P, M.Pd", label: "Lab IPA" },
      { name: "Khanes Setyo Adjie", label: "Lab Komputer" },
      { name: "Miftah Farid, S.Sos", label: "Perpustakaan" },
    ],
  },
  {
    head: { name: "Irma Anggraeni, M.Pd", label: "Waka Humas" },
    members: [
      {
        name: "Feri",
        label: "Keamanan",
      },
      { name: "Anwar", label: "Kebersihan" },
    ],
  },
  {
    head: { name: "Didin Nuryadin", label: "Waka Kesiswaan" },
    members: [
      { name: "Ika Indriani, S.Pd", label: "Pembina OSIS" },
      { name: "Caswadin", label: "SARPRAS" },
      { name: "Lanna Suryani, S.Pd", label: "BP/BK" },
    ],
  },
  {
    head: { name: "Dina Sundari W, S.E", label: "Koordinator Keuangan" },
    members: [
      { name: "Neneng Rosiana, S.Pd", label: "Bendahara" },
      { name: "Finy Juliantie, S.Pd", label: "Staff Loket Keuangan" },
    ],
  },
  {
    head: { name: "Sukaryani, A.Md", label: "Kepala Tata Usaha" },
    members: [
      { name: "Hanifah Fauziah", label: "Staff Tata Usaha" },
      { name: "Firmansyah, S.Sn", label: "Operator" },
    ],
  },
];

function StrukturOrganisasi() {
  const [treeRef, treeInView] = useInView<HTMLDivElement>(0.1);

  return (
    <section className="so-section" style={{ background: "white" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="so-heading-wrap">
          <div
            style={{
              width: 3,
              height: 32,
              background: "linear-gradient(#C8973A,#E8B84B)",
              margin: "0 auto 16px",
              borderRadius: 2,
            }}
          />
          <h2
            className="so-heading"
            style={{
              fontFamily: "Georgia, serif",
              color: "#0A1628",
              margin: 0,
            }}
          >
            Struktur Organisasi
          </h2>
          <p
            style={{
              color: "#C8973A",
              fontWeight: 700,
              marginTop: 6,
              fontSize: 14,
              letterSpacing: 1,
            }}
          >
            SMP CITRA NEGARA
          </p>
        </div>

        {/* ── Tampilan Desktop: bagan pohon ── */}
        <div className="so-desktop">
          <div className="so-scroll-wrap">
            <div
              ref={treeRef}
              className={`so-tree ${treeInView ? "so-tree-visible" : ""}`}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minWidth: 1100,
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <Box
                  name="Dr. M. Rizki Darmaguna Hasan, S.Tr., M.Pd"
                  label="Ketua BPH"
                  variant="gold"
                  wide
                />
                <HLine w={40} />
                <Box name="Hj. Mutiah, S.Pd., MM" label="Advisor BPH" />
              </div>
              <VLine />
              <Box name="Agustin Wijayanti, S.H., MM" label="Wakil Ketua BPH" />
              <VLine />
              <div style={{ display: "flex", alignItems: "center" }}>
                <Box name="Nunung" label="Komite Sekolah" variant="cream" />
                <HLine w={32} />
                <Box
                  name="Rosmarina, S.Pd"
                  label="Kepala SMP Citra Negara"
                  variant="dark"
                  wide
                />
              </div>
              <VLine h={24} />

              {/* 6 Divisi */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  width: "100%",
                  justifyContent: "space-between",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "5%",
                    right: "5%",
                    height: 2,
                    background: "#C8973A",
                  }}
                />

                <VCol>
                  <VLine h={16} />
                  <Box name="Iin Inayah, S.Pd" label="Waka Kurikulum" />
                  <VLine />
                  <div style={{ display: "flex", gap: 8 }}>
                    <VCol>
                      <Box
                        name="Istiranah, S.P, M.Pd"
                        label="Lab IPA"
                        variant="cream"
                      />
                      <VLine h={10} />
                      <Box
                        name="Khanes Setyo Adjie"
                        label="Lab Komputer"
                        variant="cream"
                      />
                      <VLine h={10} />
                      <Box
                        name="Miftah Farid, S.Sos"
                        label="Perpustakan"
                        variant="cream"
                      />
                    </VCol>
                  </div>
                </VCol>

                <VCol>
                  <VLine h={16} />
                  <Box name="Irma Anggraeni, M.Pd" label="Waka Humas" />
                  <VLine />
                  <Box name="Feri" label="Keamanan" variant="cream" />
                  <VLine h={10} />
                  <Box name="Anwar" label="Kebersihan" variant="cream" />
                </VCol>

                <VCol>
                  <VLine h={16} />
                  <Box name="Didin Nuryadin, S.Pd" label="Waka Kesiswaan" />
                  <VLine />
                  <Box
                    name="Ika Indriani, S.Pd"
                    label="Pembina OSIS"
                    variant="cream"
                  />
                  <VLine h={10} />
                  <Box name="Caswadin" label="SARPRAS" variant="cream" />
                  <VLine h={10} />
                  <Box
                    name="Lanna Suryani, S.Pd"
                    label="BP/BK"
                    variant="cream"
                  />
                </VCol>

                <VCol>
                  <VLine h={16} />
                  <Box name="Dina Sundari W, S.E" label="Koordinator Keuangan" />
                  <VLine />
                <VLine h={0} />
                  <Box
                    name="Neneng Rosiana, S.Pd"
                    label="Bendahara"
                    variant="cream"
                  />
                  <VLine h={10} />
                  <Box
                    name="Finy Juliantie, S.Pd"
                    label="Staff Loket Keuangan"
                    variant="cream"
                  />
                </VCol>

                <VCol>
                  <VLine h={16} />
                  <Box name="Sukaryani, A.Md" label="Kepala Tata Usaha" />
                  <VLine />
                  <Box
                    name="Hanifah Fauziah"
                    label="Staff Tata Usaha"
                    variant="cream"
                  />
                  <VLine h={10} />
                  <Box
                    name="Firmansyah, S.Sn"
                    label="Operator"
                    variant="cream"
                  />
                </VCol>
              </div>

              <VLine h={36} />
              <div
                style={{
                  background: "#FAF7F0",
                  border: "1.5px solid #C8973A",
                  borderRadius: 10,
                  padding: "10px 60px",
                  fontWeight: 800,
                  color: "#0A1628",
                  fontSize: 14,
                  letterSpacing: 2,
                }}
              >
                WALAS
              </div>
              <VLine />
              <div
                style={{
                  background: "#FAF7F0",
                  border: "1.5px solid #C8973A",
                  borderRadius: 10,
                  padding: "10px 60px",
                  fontWeight: 800,
                  color: "#0A1628",
                  fontSize: 14,
                  letterSpacing: 2,
                }}
              >
                GURU
              </div>
              <VLine />
              <div
                style={{
                  background: "linear-gradient(135deg,#C8973A,#E8B84B)",
                  border: "1.5px solid #C8973A",
                  borderRadius: 10,
                  padding: "10px 60px",
                  fontWeight: 800,
                  color: "#0A1628",
                  fontSize: 14,
                  letterSpacing: 2,
                }}
              >
                PESERTA DIDIK
              </div>
            </div>
          </div>
        </div>

        {/* ── Tampilan Mobile: kartu + akordeon ── */}
        <div className="so-mobile">
          <div className="so-mobile-leadership">
            <LeaderCard
              name="Dr. M. Rizki Darmaguna Hasan, S.Tr., M.Pd"
              label="Ketua BPH"
              variant="gold"
            />
            <LeaderCard name="Hj. Mutiah, S.Pd., MM" label="Advisor BPH" />
            <LeaderCard
              name="Agustin Wijayanti, S.H., MM"
              label="Wakil Ketua BPH"
            />
            <LeaderCard
              name="Nunung"
              label="Komite Sekolah"
              variant="cream"
            />
            <LeaderCard
              name="Rosmarina, S.Pd"
              label="Kepala SMP Citra Negara"
              variant="dark"
            />
            <LeaderCard
              name="Decky Ryansyah, M.Kom"
              label="Kepala IT"
              variant="cream"
            />
          </div>

          <p className="so-mobile-caption">
            Ketuk setiap divisi untuk melihat anggotanya
          </p>

          <div className="so-accordion">
            {divisions.map((div, i) => (
              <details key={i} className="so-accordion-item">
                <summary className="so-accordion-head">
                  <span>
                    <span className="so-accordion-name">{div.head.name}</span>
                    <span className="so-accordion-label">{div.head.label}</span>
                  </span>
                  <span className="so-accordion-chevron">▾</span>
                </summary>
                <div className="so-accordion-body">
                  {div.members.map((m, j) => (
                    <div
                      key={j}
                      className="so-member-row"
                      style={{ animationDelay: `${j * 0.06}s` }}
                    >
                      <span className="so-member-name">{m.name}</span>
                      <span className="so-member-label">{m.label}</span>
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>

          <div className="so-mobile-leadership" style={{ marginTop: 20 }}>
            <LeaderCard name="WALAS" label="Wali Kelas" variant="cream" />
            <LeaderCard name="GURU" label="Tenaga Pengajar" variant="cream" />
            <LeaderCard
              name="PESERTA DIDIK"
              label="Siswa & Siswi"
              variant="gold"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   SAMBUTAN KEPALA SEKOLAH
══════════════════════════════════════════ */
function SambutanKepalaSekolah() {
  return (
    <section className="ks-section" style={{ background: "#FAF7F0" }}>
      <div className="ks-inner" style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Foto */}
        <div className="ks-photo-wrap">
          <div
            className="ks-photo-frame"
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "3 / 4",
              borderRadius: 18,
              overflow: "hidden",
              border: "4px solid white",
            }}
          >
            <Image
              src="/images/kepseksmp.jpg"
              alt="Kepala SMP Citra Negara"
              fill
              priority
              sizes="(max-width: 767px) 220px, 300px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="ks-photo-accent" />
        </div>

        {/* Teks */}
        <div className="ks-text">
          <div className="gold-line" style={{ marginBottom: 16 }} />
          <h2 className="font-display ks-title" style={{ color: "#0A1628" }}>
            Sambutan Kepala Sekolah
          </h2>
          <Quote size={28} color="#C8973A" className="ks-quote-icon" />
          <p className="ks-desc" style={{ color: "#6B7280", lineHeight: 1.8 }}>
            Assalamu&apos;alaikum warahmatullahi wabarakatuh. Saya Rosmarina
            S.Pd selaku kepala sekolah SMP CITRA NEGARA. Salam sejahtera untuk
            seluruh siswa-siswi, orang tua, guru, dan staff sekolah kita yang
            tercinta. Hari ini, kita semua bersyukur dan merasa bangga karena
            telah meluncurkan website resmi sekolah kita. Website ini diharapkan
            dapat menjadi sarana informasi dan komunikasi yang efektif antara
            sekolah, orang tua, dan siswa-siswi.
          </p>
          <div style={{ marginTop: 20 }}>
            <p
              style={{
                fontSize: 15,
                fontWeight: 800,
                color: "#0A1628",
                margin: 0,
              }}
            >
              Rosmarina S.Pd
            </p>
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#C8973A",
                marginTop: 2,
              }}
            >
              Kepala SMP Citra Negara
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   SEJARAH — linimasa (garis waktu berjalan
   sesuai konten yang memang kronologis)
══════════════════════════════════════════ */
const milestones = [
  {
    year: "2004",
    title: "Awal Berdiri",
    text: "Perjalanan SMP Citra Negara Depok merupakan bagian tak terpisahkan dari dedikasi Yayasan At-Taqwa Kemiri Jaya. Didirikan pada tahun 2004 oleh H. Drs. Nasan, M.M., yayasan ini lahir di Jalan Tanah Baru, Kemiri Jaya No. 99, Beji, Kota Depok, dengan cita-cita menghadirkan pendidikan yang berkualitas bagi masyarakat sekitar.",
  },
  {
    year: "Pertumbuhan",
    title: "Perluasan Jenjang Pendidikan",
    text: "Berkat kepercayaan dan dukungan masyarakat yang terus berkembang, kompleks pendidikan kami bertumbuh pesat hingga akhirnya memperluas layanannya dengan menghadirkan jenjang SMK dan SMA Citra Negara.",
  },
  {
    year: "Kini",
    title: "Melangkah ke Masa Depan",
    text: "Kini, SMP Citra Negara hadir sebagai wadah belajar yang siap mendampingi para siswa tumbuh menjadi pribadi yang cerdas, berkarakter, dan siap melangkah ke masa depan.",
  },
];

function SejarahTimeline() {
  const [ref, inView] = useInView<HTMLDivElement>(0.15);
  return (
    <div
      ref={ref}
      className={`sejarah-timeline ${inView ? "sejarah-in-view" : ""}`}
    >
      <div className="sejarah-line" />
      {milestones.map((m, i) => (
        <div
          key={i}
          className="sejarah-item"
          style={{ transitionDelay: `${0.15 + i * 0.18}s` }}
        >
          <div className="sejarah-dot" />
          <span className="sejarah-year">{m.year}</span>
          <h3 className="sejarah-item-title">{m.title}</h3>
          <p className="sejarah-item-text">{m.text}</p>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════
   HALAMAN TENTANG (tanpa section Prestasi)
══════════════════════════════════════════ */
export default function TentangPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="hero-gradient tp-hero-section">
          <div className="tp-hero-blob tp-hero-blob-1" aria-hidden="true" />
          <div className="tp-hero-blob tp-hero-blob-2" aria-hidden="true" />
          <div
            style={{
              maxWidth: 800,
              margin: "0 auto",
              textAlign: "center",
              position: "relative",
            }}
          >
            <div className="flex justify-center mb-6 tp-hero-anim tp-hero-anim-1">
              <div
                className="tp-hero-logo"
                style={{
                  borderRadius: 10,
                  overflow: "hidden",
                  position: "relative",
                  width: "clamp(100px, 26vw, 200px)",
                  height: "clamp(100px, 26vw, 200px)",
                }}
              >
                <Image
                  src="/images/smpcn.png"
                  alt="Logo SMP Citra Negara"
                  fill
                  priority
                  sizes="(max-width: 640px) 130px, 200px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <h1
              className="font-display tp-hero-title tp-hero-anim tp-hero-anim-2"
              style={{ color: "white" }}
            >
              Tentang SMP Citra Negara
            </h1>
            <p
              className="tp-hero-desc tp-hero-anim tp-hero-anim-3"
              style={{
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.7,
                maxWidth: 580,
                margin: "0 auto",
              }}
            >
              Berdiri sejak 2004, kami telah menjadi institusi pendidikan
              kejuruan terkemuka yang menghasilkan lulusan siap kerja dan
              berkarakter.
            </p>
          </div>
        </section>

        {/* Visi Misi */}
        <section
          className="tp-visimisi-section"
          style={{ background: "white" }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div className="gold-line" style={{ margin: "0 auto 16px" }} />
              <h2
                className="font-display tp-section-heading"
                style={{ color: "#0A1628" }}
              >
                Visi & Misi
              </h2>
            </div>
            <div className="tp-visimisi-grid">
              {[
                {
                  icon: Eye,
                  title: "Visi",
                  color: "#023d17",
                  content:
                    "Terwujudnya Sekolah Kejujuran yang Religius, Disiplin dan Terampil Dalam Menyongsong Generasi Emas di Tahun 2045",
                },
                {
                  icon: Target,
                  title: "Misi",
                  color: "#C8973A",
                  content:
                    "1. Mewujudkan Insan yang taat beribadah, cinta kepada kitab suci dan pandai dalam dakwah keagamaan\n2. Mewujudkan peserta didik yang beperilaku baik, patuh, dan memiliki jiwa kepemimpinan\n3. Mewujudkan peserta didik yang ahli sesuai dengan kejuruannya, sinkronasi kurikulum intrakurikuler dengan ekstrakurikuler, dan pengembangan kerjasama dengan dunia industri",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="tp-visimisi-card"
                  style={{ background: item.color, borderRadius: 18 }}
                >
                  <div
                    className="tp-visimisi-icon"
                    style={{ background: "rgba(255,255,255,0.1)" }}
                  >
                    <item.icon size={24} color="#E8B84B" />
                  </div>
                  <h3
                    className="font-display tp-visimisi-title"
                    style={{ color: "white" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="tp-visimisi-content"
                    style={{
                      color: "rgba(255,255,255,0.8)",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sambutan Kepala Sekolah */}
        <SambutanKepalaSekolah />

        {/* Sejarah */}
        <section
          className="tp-sejarah-section"
          style={{ background: "#FAF7F0" }}
        >
          <div className="tp-sejarah-wrap">
            <div className="gold-line" style={{ marginBottom: 16 }} />
            <h2
              className="font-display tp-section-heading"
              style={{ color: "#0A1628", marginBottom: 32 }}
            >
              Sejarah Singkat
            </h2>
            <SejarahTimeline />
          </div>
        </section>

        {/* Struktur Organisasi */}
        <StrukturOrganisasi />
      </main>
      <Footer />

    </>
  );
}