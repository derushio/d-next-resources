'use server';

import { authorize } from '@/data-accesses/infra/nextAuth';
import { prisma } from '@/data-accesses/infra/prisma';
import { Env } from '@/data-accesses/queries/env/Env';
import { genCuid2 } from '@/utils/cuid2';
import { genHash } from '@/utils/hash';
import { encode } from 'next-auth/jwt';
import { cookies as _cookies } from 'next/headers';

export async function createUser(
  state: {
    error?: Error;
  },
  { userName }: { userName: string },
) {
  try {
    const id = genCuid2();
    const email = `${id}@example.com`;
    const password = id;

    await prisma.user.create({
      data: {
        email: email,
        name: userName,
        passwordHash: await genHash(password),
      },
    });

    console.log(Env.NEXT_PUBLIC_BASE_URL);

    const token = await authorize({
      email: email,
      password: password,
    });
    if (!token) {
      throw new Error('token is null');
    }
    const cookies = await _cookies();

    const jwt = await encode({
      token: token,
      secret: Env.TOKEN_SECRET,
      maxAge: Env.TOKEN_MAX_AGE_MINUTES,
    });

    cookies.set('next-auth.session-token', jwt, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });
  } catch (e) {
    console.error(e);
    state.error = e as Error;
  }

  return state;
}
