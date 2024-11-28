import { Prisma, PrismaClient } from '@/data-accesses/infra/prisma/generated';
import { upperzero } from '@/data-accesses/types/zod/utils';
import bcrypt from 'bcrypt';
import { z } from 'zod';

const prisma = new PrismaClient();

const user = {
  name: 'テストユーザー',
  email: 'test@example.com',
  password: 'password',
};

export async function seedTestUser() {
  console.log(user);
  const hash = await bcrypt.hash(
    user.password,
    upperzero(z.number()).parse(Number(process.env.TOKEN_SALT_ROUNDS)),
  );

  await prisma.$transaction(async (t) => {
    const userData = {
      id: 'm8kpy32b06shqbw7x5pgtaan',
      name: user.name,
      email: user.email,
      passwordHash: hash,
    } satisfies Prisma.UserCreateInput;

    await t.user.upsert({
      where: {
        id: userData.id,
      },
      create: userData,
      update: userData,
    });
  });
}
