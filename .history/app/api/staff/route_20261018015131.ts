
import { NextResponse } from "next/server";
import { sqlBerita } from "@/lib/db-berita";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const result = await sqlBerita`
      SELECT id, nama, jabatan, foto_url
      FROM staff
      ORDER BY id ASC
    `;

    const staff = result.map((item) => ({
      id: item.id,
      name: item.nama,
      label: item.jabatan,
      photo: item.foto_url || "/images/placeholder-staff.jpg",
    }));

    return NextResponse.json(staff);
  } catch (error) {
    console.error("Gagal mengambil data staff:", error);

    return NextResponse.json(
      { error: "Gagal mengambil data staff." },
      { status: 500 }
    );
  }
}
