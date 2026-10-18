import { NextResponse } from 'next/server';
import { sqlBerita } from '@/lib/db-berita';
import { requireAdmin } from '@/lib/auth';

function errorResponse(error: unknown, action: string) {
  const message = error instanceof Error ? error.message : '';

  const status =
    message === 'Unauthorized' ? 401 :
    message === 'Forbidden' ? 403 : 500;

  if (status === 500) {
    console.error(`Admin guru ${action}:`, error);
  }

  return NextResponse.json(
    {
      error: status === 500
        ? `Gagal ${action} data guru.`
        : message,
    },
    { status }
  );
}

export async function GET() {
  try {
    await requireAdmin();

    const rows = await sqlBerita`
      SELECT id, nama, mata_pelajaran, foto_url, created_at, updated_at
      FROM guru
      ORDER BY nama ASC
    `;

    return NextResponse.json({ data: rows });
  } catch (error) {
    return errorResponse(error, 'mengambil');
  }
}

export async function POST(req: Request) {
  try {
    await requireAdmin();

    const body = await req.json();
    const nama = String(body.nama ?? '').trim();
    const mataPelajaran = String(body.mata_pelajaran ?? '').trim();
    const fotoUrl = String(body.foto_url ?? '').trim();

    if (!nama || !mataPelajaran) {
      return NextResponse.json(
        { error: 'Nama dan mata pelajaran wajib diisi.' },
        { status: 400 }
      );
    }

    const rows = await sqlBerita`
      INSERT INTO guru (nama, mata_pelajaran, foto_url)
      VALUES (${nama}, ${mataPelajaran}, ${fotoUrl || null})
      RETURNING id, nama, mata_pelajaran, foto_url, created_at, updated_at
    `;

    return NextResponse.json(
      { success: true, data: rows[0] },
      { status: 201 }
    );
  } catch (error) {
    return errorResponse(error, 'menyimpan');
  }
}