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

export async function PUT(req: Request, context: RouteContext) {
  try {
    await requireAdmin();

    const { id } = await context.params;
    const staffId = Number(id);

    if (!Number.isSafeInteger(staffId) || staffId <= 0) {
      return NextResponse.json(
        { error: 'ID staff tidak valid.' },
        { status: 400 }
      );
    }

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
      UPDATE staff
      SET nama = ${nama},
          jabatan = ${jabatan},
          foto_url = ${fotoUrl || null},
          updated_at = NOW()
      WHERE id = ${staffId}
      RETURNING id, nama, jabatan, foto_url, created_at, updated_at
    `;

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Staff tidak ditemukan.' },
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
    const staffId = Number(id);

    if (!Number.isSafeInteger(staffId) || staffId <= 0) {
      return NextResponse.json(
        { error: 'ID staff tidak valid.' },
        { status: 400 }
      );
    }

    const rows = await sqlBerita`
      DELETE FROM staff
      WHERE id = ${staffId}
      RETURNING id
    `;

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Staff tidak ditemukan.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Data staff berhasil dihapus.',
    });
  } catch (error) {
    return errorResponse(error, 'menghapus');
  }
}