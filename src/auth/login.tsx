'use server';

import { db } from '@/auth/adapter';
import { loginFormSchema, userTable } from '@/auth/schema';
import { eq } from 'drizzle-orm';
import { Argon2id } from 'oslo/password';
import { lucia } from '@/auth/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

interface ActionResult {
  error: string;
}

export const login = async (
  formData: z.infer<typeof loginFormSchema>,
): Promise<ActionResult> => {
  const { login, password } = formData;

  const existingUser = await db
    .select()
    .from(userTable)
    .where(eq(userTable.username, login));

  if (existingUser.length === 0) {
    return {
      error: 'Incorrect username or password',
    };
  }

  const validPassword = await new Argon2id().verify(
    existingUser[0].hashed_password,
    password,
  );

  if (!validPassword) {
    return {
      error: 'Incorrect username or password',
    };
  }

  const session = await lucia.createSession(existingUser[0].id, {
    username: existingUser[0].username,
  });
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect('/protected');
};
