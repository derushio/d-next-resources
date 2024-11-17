import 'server-only';

import { Env } from '@/data-access/entities/Env/Env';

class CookieData {
  public authCookiePolicy = {
    name: 'auth-token',
    domain: Env.TOKEN_COOKIE_DOMAIN,
    sameSite: 'strict',
    httpOnly: true,
    secure: true,
  } as const;
}

export const cookieData = new CookieData();
