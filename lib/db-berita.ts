import { neon } from '@neondatabase/serverless';
import type { NeonQueryFunction } from '@neondatabase/serverless';

// Tipe yang sama dengan hasil neon(url) tanpa opsi, supaya hasil query
// tetap bertipe array biasa seperti sebelumnya.
type SqlClient = NeonQueryFunction<false, false>;

let client: SqlClient | null = null;

// Koneksi dibuat saat query pertama (bukan saat file di-import) supaya build
// di Vercel tidak gagal kalau BERITA_DATABASE_URL belum diisi.
function getClient(): SqlClient {
  if (!client) {
    const url = process.env.BERITA_DATABASE_URL;

    if (!url) {
      throw new Error(
        'BERITA_DATABASE_URL belum di-set. Cek file .env atau Environment Variables di Vercel.'
      );
    }

    client = neon(url);
  }

  return client;
}

export const sqlBerita = ((
  strings: TemplateStringsArray,
  ...values: unknown[]
) => getClient()(strings, ...values)) as SqlClient;
