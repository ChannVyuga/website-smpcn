-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "namaLengkap" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pendaftaran" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "namaLengkap" TEXT NOT NULL,
    "namaPanggilan" TEXT,
    "tempatLahir" TEXT,
    "tanggalLahir" TEXT,
    "ttl" TEXT,
    "jenisKelamin" TEXT NOT NULL,
    "agama" TEXT NOT NULL,
    "anakKe" TEXT,
    "alamat" TEXT NOT NULL,
    "rt" TEXT,
    "rw" TEXT,
    "kelurahan" TEXT,
    "kecamatan" TEXT,
    "kabupaten" TEXT,
    "beratBadan" TEXT,
    "tinggiBadan" TEXT,
    "golonganDarah" TEXT,
    "nisn" TEXT,
    "nik" TEXT,
    "noPribadi" TEXT,
    "ukuranSeragam" TEXT,
    "namaPemberiReferensi" TEXT,
    "noHpReferensi" TEXT,
    "asalSD" TEXT,
    "asalSMP" TEXT,
    "asalSekolah" TEXT,
    "jurusan" TEXT NOT NULL,
    "namaAyah" TEXT,
    "ttlAyah" TEXT,
    "pendidikanAyah" TEXT,
    "pekerjaanAyah" TEXT,
    "penghasilanAyah" TEXT,
    "noHpAyah" TEXT,
    "alamatAyah" TEXT,
    "namaIbu" TEXT,
    "ttlIbu" TEXT,
    "pendidikanIbu" TEXT,
    "pekerjaanIbu" TEXT,
    "penghasilanIbu" TEXT,
    "noHpIbu" TEXT,
    "alamatIbu" TEXT,
    "namaWali" TEXT,
    "ttlWali" TEXT,
    "pendidikanWali" TEXT,
    "pekerjaanWali" TEXT,
    "penghasilanWali" TEXT,
    "noHpWali" TEXT,
    "alamatWali" TEXT,
    "namaOrtu" TEXT,
    "noOrtu" TEXT,
    "fileIjazah" TEXT,
    "fileAkte" TEXT,
    "fileKK" TEXT,
    "fileKtpOrtu" TEXT,
    "fileKip" TEXT,
    "fileFoto" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "nilaiSeleksi" DOUBLE PRECISION,
    "nilaiTes" DOUBLE PRECISION,
    "catatan" TEXT,
    "alasanPenolakan" TEXT,
    "jadwalTes" TEXT,
    "lokasiTes" TEXT,
    "infoTes" TEXT,
    "revisiCount" INTEGER NOT NULL DEFAULT 0,
    "lastRevisiAt" TIMESTAMP(3),
    "pesanPengumuman" TEXT,
    "sudahDaftarUlang" BOOLEAN NOT NULL DEFAULT false,
    "tanggalDaftarUlang" TIMESTAMP(3),
    "catatanDaftarUlang" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pendaftaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "lastActivityAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revokedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Pendaftaran_userId_key" ON "Pendaftaran"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_tokenHash_key" ON "Session"("tokenHash");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE INDEX "Session_expiresAt_idx" ON "Session"("expiresAt");

-- AddForeignKey
ALTER TABLE "Pendaftaran" ADD CONSTRAINT "Pendaftaran_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

