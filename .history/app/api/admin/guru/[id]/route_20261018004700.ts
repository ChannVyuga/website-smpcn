import { NextResponse } from 'next/server';
import { sqlBerita } from '@/lib/db-berita';
import { requireAdmin } from '@/lib/auth';

type RouteContext = {
  params: Promise<{ id: string }>;
};

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

export async function PUT(req: Request, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;
    const guruId = Number(id);

    if (!Number.isSafeInteger(guruId) || guruId <= 0) {
      return NextResponse.json(
        { error: 'ID guru tidak valid.' },
        { status: 400 }
      );
    }

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
      UPDATE guru
      SET nama = ${nama},
          mata_pelajaran = ${mataPelajaran},
          foto_url = ${fotoUrl || null},
          updated_at = NOW()
      WHERE id = ${guruId}
      RETURNING id, nama, mata_pelajaran, foto_url, created_at, updated_at
    `;

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Guru tidak ditemukan.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: rows[0] });
  } catch (error) {
    return errorResponse(error, 'memperbarui');
  }
}

export async function DELETE(_req: Request, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;
    const guruId = Number(id);

    if (!Number.isSafeInteger(guruId) || guruId <= 0) {
      return NextResponse.json(
        { error: 'ID guru tidak valid.' },
        { status: 400 }
      );
    }

    const rows = await sqlBerita`
      DELETE FROM guru
      WHERE id = ${guruId}
      RETURNING id
    `;

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Guru tidak ditemukan.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Data guru berhasil dihapus.',
    });
  } catch (error) {
    return errorResponse(error, 'menghapus');
  }
}