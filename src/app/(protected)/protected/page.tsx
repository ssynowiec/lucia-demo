import { validateRequest } from '@/auth/validate-request';
import { redirect } from 'next/navigation';
import { db } from '@/auth/adapter';
import { userTable } from '@/auth/schema';
import { eq } from 'drizzle-orm';

const Protected = async () => {
  const { user } = await validateRequest();

  if (!user) {
    return redirect('/login');
  }

  const userData = await db
    .select()
    .from(userTable)
    .where(eq(userTable.id, user.id))
    .then((res) => res[0]);

  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <h1 className='text-6xl font-extrabold'>This is protected page</h1>
      <p>Logged as: {userData.username}</p>
    </div>
  );
};

export default Protected;
