import 'server-only';

import { jwtData } from '@/data-access/entities/Auth/JwtData';
import { Env } from '@/data-access/entities/Env/Env';
import { prisma } from '@/data-access/infra/prisma';
import bcrypt from 'bcrypt';

class AuthData {
  public async hash(value: string) {
    return await bcrypt.hash(value, Env.SALT_ROUNDS);
  }

  public async signin(params: { email: string; password: string }) {
    const secret = await prisma.userSecret.findUnique({
      where: {
        email: params.email,
        passwordHash: await this.hash(params.password),
      },
    });

    if (!secret) {
      throw new Error('User not found.');
    }

    await jwtData.sign(secret.userId);
  }

  public async getUserId() {
    const jwt = await jwtData.verify();
    return jwt?.payload.sub ?? undefined;
  }
}

export const authData = new AuthData();
