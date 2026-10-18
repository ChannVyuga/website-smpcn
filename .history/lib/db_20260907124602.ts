// Taruh file ini di: (project-website-sekolah)/lib/db.ts
// Ini WAJIB pakai DATABASE_URL yang SAMA PERSIS dengan project admin.

import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL belum di-set. Cek file .env.local kamu.');
}

export const sql = neon(process.env.DATABASE_URL);