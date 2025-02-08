import { Env } from '@/data-accesses/queries/env/Env';
import { upperzero } from '@/data-accesses/types/zod/utils';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

export async function genHash(text: string) {
  return await bcrypt.hash(
    text,
    upperzero(z.number()).parse(Number(Env.TOKEN_SALT_ROUNDS)),
  );
}
