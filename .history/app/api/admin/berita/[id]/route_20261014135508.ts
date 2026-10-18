import { NextResponse } from 'next/server';
import { sqlBerita } from '@/lib/db-berita';
import { requireAdmin } from '@/lib/auth';

type RouteContext = {
  params: Promise<{ id: string }>;
};

function getErrorResponse(error: unknown, action: string) {
  const message =
    error instanceof Error ? error.message : '';

  const status =
    message === 'Unauthorized' ? 401 :
    message === 'Forbidden' ? 403 : 500;

  if (status === 500) {
    console.error(`Admin berita ${action}:`, error);
  }

  return NextResponse.json(
    {
      error: status === 500
        ? `Gagal ${action} berita.`
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
    const beritaId = Number(id);

    if (!Number.isSafeInteger(beritaId) || beritaId <= 0) {
      return NextResponse.json(
        { error: 'ID berita tidak valid.' },
        { status: 400 }
      );
    }

    const body = await req.json();

    const tanggal = String(body.tanggal ?? '').trim();
    const judul = String(body.judul ?? '').trim();
    const kategori = String(body.kategori ?? '').trim();
    const foto_url = String(body.foto_url ?? '').trim();
    const slug = String(body.slug ?? '').trim();
    const excerpt = String(body.excerpt ?? '').trim();
    const konten = String(body.konten ?? '').trim();
    const featured = body.featured === true;

    if (!tanggal || !judul || !kategori || !foto_url || !slug) {
      return NextResponse.json(
        { error: 'Tanggal, judul, kategori, foto, dan slug wajib diisi.' },
        { status: 400 }
      );
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(tanggal)) {
      return NextResponse.json(
        { error: 'Format tanggal harus YYYY-MM-DD.' },
        { status: 400 }
      );
    }

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      return NextResponse.json(
        { error: 'Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung.' },
        { status: 400 }
      );
    }

    const existing = await sqlBerita`
      SELECT id FROM berita
      WHERE slug = ${slug} AND id <> ${beritaId}
      LIMIT 1
    `;

    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'Slug sudah digunakan.' },
        { status: 409 }
      );
    }

    const rows = await sqlBerita`
      UPDATE berita
      SET tanggal = ${tanggal}::date,
          judul = ${judul},
          kategori = ${kategori},
          foto_url = ${foto_url},
          slug = ${slug},
          excerpt = ${excerpt || null},
          konten = ${konten || null},
          featured = ${featured}
      WHERE id = ${beritaId}
      RETURNING *
    `;

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Berita tidak ditemukan.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    return getErrorResponse(error, 'memperbarui');
  }
}

export async function DELETE(
  _req: Request,
  context: RouteContext
) {
  try {
    await requireAdmin();

    const { id } = await context.params;
    const beritaId = Number(id);

    if (!Number.isSafeInteger(beritaId) || beritaId <= 0) {
      return NextResponse.json(
        { error: 'ID berita tidak valid.' },
        { status: 400 }
      );
    }

    const rows = await sqlBerita`
      DELETE FROM berita
      WHERE id = ${beritaId}
      RETURNING id
    `;

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Berita tidak ditemukan.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Berita berhasil dihapus.',
    });
  } catch (error) {
    return getErrorResponse(error, 'menghapus');
  }
}