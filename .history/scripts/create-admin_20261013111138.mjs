
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

const prisma = new PrismaClient();

const rl = createInterface({ input: stdin, output: stdout });

try {
  const email = (await rl.question('Email admin: '))
    .trim()
    .toLowerCase();

  const namaLengkap = (await rl.question('Nama admin: ')).trim();
  const password = await rl.question('Password admin: ');

  if (!email || !namaLengkap || password.length < 12) {
    throw new Error(
      'Email dan nama wajib diisi. Password minimal 12 karakter.'
    );
  }

  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    throw new Error(
      'Email sudah terdaftar. Tidak ada akun yang diubah.'
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await prisma.user.create({
    data: {
      email,
      namaLengkap,
      password: passwordHash,
      role: 'admin',
    },
    select: {
      id: true,
      email: true,
      namaLengkap: true,
      role: true,
    },
  });

  console.log('\nAkun admin berhasil dibuat:');
  console.log(admin);
} catch (error) {
  console.error('\nGagal membuat akun:', error.message);
  process.exitCode = 1;
} finally {
  rl.close();
  await prisma.$disconnect();
}
