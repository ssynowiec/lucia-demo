import { cookies } from 'next/headers';
import { OAuth2RequestError } from 'arctic';
import { generateId } from 'lucia';
import { db } from '@/auth/adapter';
import { github, lucia } from '@/auth/auth';
import { userTable } from '@/auth/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const storedState = cookies().get('github_oauth_state')?.value ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await github.validateAuthorizationCode(code);
    const githubUserResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const githubUser: GitHubUser = await githubUserResponse.json();

    // Replace this with your own DB client.
    const existingUser = await db
      .select()
      .from(userTable)
      .where(eq(userTable.github_id, githubUser.id))
      .then((rows) => rows[0]);

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {
        username: existingUser.username,
        github_id: existingUser.github_id,
      });
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
      return new Response(null, {
        status: 302,
        headers: {
          Location: '/protected',
        },
      });
    }

    const userId = generateId(15);

    // Replace this with your own DB client.
    const newUser = await db
      .insert(userTable)
      .values({
        id: userId,
        github_id: githubUser.id,
        username: githubUser.login,
        hashed_password: '',
      })
      .returning({
        username: userTable.username,
        github_id: userTable.github_id,
      })
      .then((rows) => rows[0]);

    const session = await lucia.createSession(userId, {
      username: newUser.username,
      github_id: newUser.github_id,
    });
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/',
      },
    });
  } catch (e) {
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}

interface GitHubUser {
  id: string;
  login: string;
}
