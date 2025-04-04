'use server';

import { SidenavClient } from '@/components/navigation/sidenav/SidenavClient';
import { SidenavClientContainer } from '@/components/navigation/sidenav/SidenavClientContainer';
import { getAuth } from '@/data-accesses/infra/nextAuth';

export async function Sidenav() {
  const auth = await getAuth();

  return (
    <SidenavClientContainer>
      <SidenavClient auth={auth} />
    </SidenavClientContainer>
  );
}
