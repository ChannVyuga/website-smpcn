```ts
import { NextResponse } from 'next/server';
import { sqlBerita } from '@/lib/db-berita';
import { requireAdmin } from '@/lib/auth';

type RouteContext = {
  params: Promise<{ id: string }>;
};

function errorResponse(error: unknown, action: string) {
  const message =
    error instanceof Error ? error.message : '';

  const status =
    message === 'Unauthorized' ? 401 :
    message === 'Forbidden' ? 403 : 500;

  if (status === 500) {
    console.error(`Admin prestasi ${action}:`, error);
  }

  return NextResponse.json(
    {
      error: status === 500
        ? `Gagal ${action} prestasi.`
        : message,
    },
    { status }
  );
}

export async function PUT(
  req: Request,
  context: RouteContext
) {
  try {
    await requireAdmin();

    const { id } = await context.params;
    const prestasiId = Number(id);

    if (!Number.isSafeInteger(prestasiId) || prestasiId <= 0) {
      return NextResponse.json(
        { error: 'ID prestasi tidak valid.' },
        { status: 400 }
      );
    }

    const body = await req.json();

    const tahun = String(body.tahun ?? '').trim();
    const nama = String(body.nama ?? '').trim();
    const kategori = String(body.kategori ?? '').trim();
    const foto_url = String(body.foto_url ?? '').trim();
    const slug = String(body.slug ?? '').trim();
    const deskripsi = String(body.deskripsi ?? '').trim();

    if (!tahun || !nama || !kategori || !foto_url || !slug) {
      return NextResponse.json(
        {
          error: 'Tahun, nama, kategori, foto, dan slug wajib diisi.',
        },
        { status: 400 }
      );
    }

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      return NextResponse.json(
        {
          error: 'Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung.',
        },
        { status: 400 }
      );
    }

    const existing = await sqlBerita`
      SELECT id
      FROM prestasi
      WHERE slug = ${slug} AND id <> ${prestasiId}
      LIMIT 1
    `;

    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'Slug sudah digunakan.' },
        { status: 409 }
      );
    }

    const rows = await sqlBerita`
      UPDATE prestasi
      SET tahun = ${tahun},
          nama = ${nama},
          kategori = ${kategori},
          foto_url = ${foto_url},
          slug = ${slug},
          deskripsi = ${deskripsi || null}
      WHERE id = ${prestasiId}
      RETURNING *
    `;

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Prestasi tidak ditemukan.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    return errorResponse(error, 'memperbarui');
  }
}

export async function DELETE(
  _req: Request,
  context: RouteContext
) {
  try {
    await requireAdmin();

    const { id } = await context.params;
    const prestasiId = Number(id);

    if (!Number.isSafeInteger(prestasiId) || prestasiId <= 0) {
      return NextResponse.json(
        { error: 'ID prestasi tidak valid.' },
        { status: 400 }
      );
    }

    const rows = await sqlBerita`
      DELETE FROM prestasi
      WHERE id = ${prestasiId}
      RETURNING id
    `;

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Prestasi tidak ditemukan.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Prestasi berhasil dihapus.',
    });
  } catch (error) {
    return errorResponse(error, 'menghapus');
  }
}