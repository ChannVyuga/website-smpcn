import { NextResponse } from 'next/server';
import { sqlBerita } from '@/lib/db-berita';

export async function GET() {
  try {
    const rows = await sqlBerita`
      SELECT * FROM berita ORDER BY tanggal DESC, created_at DESC
    `;
    return NextResponse.json(rows);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Gagal mengambil data berita.' }, { status: 500 });
  }
}