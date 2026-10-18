import { NextResponse } from 'next/server';
import { sqlBerita } from '@/lib/db-berita';
import { requireAdmin } from '@/lib/auth';

function errorResponse(error: unknown, action: string) {
  const message = error instanceof Error ? error.message : '';

  const status =
    message === 'Unauthorized' ? 401 :
    message === 'Forbidden' ? 403 : 500;

  if (status === 500) {
    console.error(`Admin staff ${action}:`, error);
  }

  return NextResponse.json(
    {
      error: status === 500
        ? `Gagal ${action} data staff.`
        : message,
    },
    { status }
  );
}

export async function GET() {
  try {
    await requireAdmin();

    const rows = await sqlBerita`
      SELECT id, nama, jabatan, foto_url, created_at, updated_at
      FROM staff
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
    const jabatan = String(body.jabatan ?? '').trim();
    const fotoUrl = String(body.foto_url ?? '').trim();

    if (!nama || !jabatan) {
      return NextResponse.json(
        { error: 'Nama dan jabatan wajib diisi.' },
        { status: 400 }
      );
    }

    const rows = await sqlBerita`
      INSERT INTO staff (nama, jabatan, foto_url)
      VALUES (${nama}, ${jabatan}, ${fotoUrl || null})
      RETURNING id, nama, jabatan, foto_url, created_at, updated_at
    `;

    return NextResponse.json(
      { success: true, data: rows[0] },
      { status: 201 }
    );
  } catch (error) {
    return errorResponse(error, 'menyimpan');
  }
}