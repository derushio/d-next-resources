import { prisma } from '@/data-accesses/infra/prisma';
import { Prisma, PrismaClient } from '@/data-accesses/infra/prisma/generated';
import { genHash } from '@/utils/hash';

const user = {
  name: 'テストユーザー',
  email: 'test@example.com',
  password: 'password',
};

export async function seedTestUser() {
  console.log(user);
  const hash = await genHash(user.password);

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
