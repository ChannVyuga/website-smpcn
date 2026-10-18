import { NextResponse } from 'next/server';

// Selalu menghapus cookie sesi, apa pun kondisi token-nya.
export async function POST() {
  const response = NextResponse.json({ success: true });

  // Atribut harus sama dengan saat cookie dibuat (lihat /api/auth/login)
  // supaya browser benar-benar menghapusnya, termasuk di Vercel (HTTPS).
  response.cookies.set('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    expires: new Date(0),
    path: '/',
  });

  return response;
}
