'use client';

import { migrateAction } from '@/app/splash/migrateAction';
import { startTransition, useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    startTransition(async () => {
      await migrateAction();
    });
  }, []);

  return <></>;
}
