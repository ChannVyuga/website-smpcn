
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secretValue = process.env.NEXTAUTH_SECRET;

if (!secretValue || secretValue.length < 32) {
  throw new Error(
    'NEXTAUTH_SECRET wajib diisi dengan secret minimal 32 karakter.'
  );
}

const SECRET = new TextEncoder().encode(secretValue);

export const SESSION_IDLE_MS = 15 * 60 * 1000;
export const SESSION_IDLE_SECONDS = 15 * 60;

export interface SessionPayload {
  userId: string;
  email: string;
  role: 'user' | 'admin';
  namaLengkap?: string;
  lastActivity?: number;
}

export async function createToken(
  payload: SessionPayload
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);

  return new SignJWT({
    userId: payload.userId,
    email: payload.email,
    role: payload.role,
    namaLengkap: payload.namaLengkap,
    lastActivity: now,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt(now)
    .setExpirationTime(now + SESSION_IDLE_SECONDS)
    .sign(SECRET);
}

export async function verifyToken(
  token: string
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET, {
      algorithms: ['HS256'],
    });

    if (
      typeof payload.userId !== 'string' ||
      typeof payload.email !== 'string' ||
      (payload.role !== 'user' && payload.role !== 'admin') ||
      typeof payload.lastActivity !== 'number'
    ) {
      return null;
    }

    const now = Math.floor(Date.now() / 1000);

    if (now - payload.lastActivity >= SESSION_IDLE_SECONDS) {
      return null;
    }

    return {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
      namaLengkap:
        typeof payload.namaLengkap === 'string'
          ? payload.namaLengkap
          : undefined,
      lastActivity: payload.lastActivity,
    };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) return null;

  return verifyToken(token);
}

export async function requireAuth(): Promise<SessionPayload> {
  const session = await getSession();

  if (!session) throw new Error('Unauthorized');

  return session;
}

export async function requireAdmin(): Promise<SessionPayload> {
  const session = await requireAuth();

  if (session.role !== 'admin') {
    throw new Error('Forbidden');
  }

  return session;
}
