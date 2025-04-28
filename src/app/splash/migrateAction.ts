'use server';

import { migrate } from '@/data-accesses/infra/prisma/migrate';

export async function migrateAction() {
  await migrate();
}
