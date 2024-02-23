import { RegisterForm } from '@/components/ui/register-form';
import type { Metadata } from 'next';
import { validateRequest } from '@/auth/validate-request';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Register | Lucia auth demo',
  description: 'Create your account.',
};

const Register = async () => {
  const { user } = await validateRequest();

  if (user) {
    return redirect('/protected');
  }

  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <h1 className='text-6xl font-extrabold'>Create an account</h1>
      <RegisterForm />
    </div>
  );
};

export default Register;
