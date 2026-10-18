import { NextResponse } from 'next/server';
import { sqlBerita } from '@/lib/db-berita';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
  try {
    await requireAdmin();

    const rows = await sqlBerita`
      SELECT *
      FROM berita
      ORDER BY tanggal DESC, created_at DESC
    `;

    return NextResponse.json({ data: rows });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : '';

    const status =
      message === 'Unauthorized' ? 401 :
      message === 'Forbidden' ? 403 : 500;

    if (status === 500) {
      console.error('Admin berita GET:', error);
    }

    return NextResponse.json(
      { error: status === 500
          ? 'Gagal mengambil berita.'
          : message },
      { status }
    );
  }
}

export async function POST(req: Request) {
  try {
    await requireAdmin();

    const body = await req.json();

    const tanggal = String(body.tanggal ?? '').trim();
    const judul = String(body.judul ?? '').trim();
    const kategori = String(body.kategori ?? '').trim();
    const foto_url = String(body.foto_url ?? '').trim();
    const slug = String(body.slug ?? '').trim();
    const excerpt = String(body.excerpt ?? '').trim();
    const konten = String(body.konten ?? '').trim();
    const featured = body.featured === true;

    if (
      !tanggal || !judul || !kategori ||
      !foto_url || !slug
    ) {
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
      SELECT id FROM berita WHERE slug = ${slug} LIMIT 1
    `;

    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'Slug sudah digunakan.' },
        { status: 409 }
      );
    }

    const rows = await sqlBerita`
      INSERT INTO berita
        (tanggal, judul, kategori, foto_url, slug, excerpt, konten, featured)
      VALUES
        (${tanggal}::date, ${judul}, ${kategori}, ${foto_url},
         ${slug}, ${excerpt || null}, ${konten || null}, ${featured})
      RETURNING *
    `;

    return NextResponse.json(
      { success: true, data: rows[0] },
      { status: 201 }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : '';

    const status =
      message === 'Unauthorized' ? 401 :
      message === 'Forbidden' ? 403 : 500;

    if (status === 500) {
      console.error('Admin berita POST:', error);
    }

    return NextResponse.json(
      { error: status === 500
          ? 'Gagal menyimpan berita.'
          : message },
      { status }
    );
  }
}