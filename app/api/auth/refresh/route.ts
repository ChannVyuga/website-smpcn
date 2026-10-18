import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  createToken,
  verifyToken,
  SESSION_IDLE_SECONDS,
} from '@/lib/auth';

// Dipanggil SessionGuard tiap menit selama admin aktif untuk memperpanjang sesi.
export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return NextResponse.json(
      { error: 'Sesi berakhir. Silakan login kembali.' },
      { status: 401 }
    );
  }

  const session = await verifyToken(token);

  if (!session) {
    const response = NextResponse.json(
      { error: 'Sesi berakhir. Silakan login kembali.' },
      { status: 401 }
    );

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

  const newToken = await createToken(session);

  const response = NextResponse.json({ success: true });

  response.cookies.set('token', newToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_IDLE_SECONDS,
    path: '/',
  });

  return response;
}
