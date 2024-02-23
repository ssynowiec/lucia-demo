'use server';

import { Argon2id } from 'oslo/password';
import { generateId } from 'lucia';
import { db } from '@/auth/adapter';
import { userTable } from '@/auth/schema';
import { eq } from 'drizzle-orm';
import { lucia } from '@/auth/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { registerFormSchema } from '@/schema/register-schema';

interface ActionResult {
  error: string;
}

export const register = async (
  formData: z.infer<typeof registerFormSchema>,
): Promise<ActionResult> => {
  const { login, password, repeatPassword } = formData;

  if (password.length < 8) {
    return {
      error: 'Password is too short',
    };
  }

  if (password !== repeatPassword) {
    return {
      error: 'Passwords do not match',
    };
  }

  const hashedPassword = await new Argon2id().hash(password);
  const userId = generateId(15);

  const user = await db
    .select()
    .from(userTable)
    .where(eq(userTable.username, login));

  if (user.length !== 0) {
    return {
      error: 'User with this login is exists',
    };
  }

  const newUser = await db
    .insert(userTable)
    .values({
      id: userId,
      username: login,
      hashed_password: hashedPassword,
    })
    .returning();

  const session = await lucia.createSession(userId, {
    username: newUser[0].username,
  });
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect('/protected');
};
