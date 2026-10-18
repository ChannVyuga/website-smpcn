
import { NextResponse } from "next/server";
import { sqlBerita } from "@/lib/db-berita";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const result = await sqlBerita`
      SELECT id, nama, mata_pelajaran, foto_url
      FROM guru
      ORDER BY id ASC
    `;

    const guru = result.map((item) => ({
      id: item.id,
      name: item.nama,
      label: item.mata_pelajaran,
      photo: item.foto_url || "/images/placeholder-guru.jpg",
    }));

    return NextResponse.json(guru);
  } catch (error) {
    console.error("Gagal mengambil data guru:", error);

    return NextResponse.json(
      { error: "Gagal mengambil data guru." },
      { status: 500 }
    );
  }
}
