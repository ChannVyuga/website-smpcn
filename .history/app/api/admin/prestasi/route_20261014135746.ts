```ts
import { NextResponse } from 'next/server';
import { sqlBerita } from '@/lib/db-berita';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
  try {
    await requireAdmin();

    const rows = await sqlBerita`
      SELECT *
      FROM prestasi
      ORDER BY tahun DESC, created_at DESC
    `;

    return NextResponse.json({ data: rows });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : '';

    const status =
      message === 'Unauthorized' ? 401 :
      message === 'Forbidden' ? 403 : 500;

    if (status === 500) {
      console.error('Admin prestasi GET:', error);
    }

    return NextResponse.json(
      {
        error: status === 500
          ? 'Gagal mengambil prestasi.'
          : message,
      },
      { status }
    );
  }
}

export async function POST(req: Request) {
  try {
    await requireAdmin();

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
      WHERE slug = ${slug}
      LIMIT 1
    `;

    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'Slug sudah digunakan.' },
        { status: 409 }
      );
    }

    const rows = await sqlBerita`
      INSERT INTO prestasi
        (tahun, nama, kategori, foto_url, slug, deskripsi)
      VALUES
        (${tahun}, ${nama}, ${kategori}, ${foto_url},
         ${slug}, ${deskripsi || null})
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
      console.error('Admin prestasi POST:', error);
    }

    return NextResponse.json(
      {
        error: status === 500
          ? 'Gagal menyimpan prestasi.'
          : message,
      },
      { status }
    );
  }
}