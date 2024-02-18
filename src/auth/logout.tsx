'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { validateRequest } from '@/auth/validate-request';
import { lucia } from '@/auth/auth';

export const logout = async (): Promise<ActionResult> => {
  // 'use server';
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: 'Unauthorized',
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect('/login');
};

interface ActionResult {
  error: string | null;
}
