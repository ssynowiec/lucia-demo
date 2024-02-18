import { LoginForm } from '@/components/ui/login-form';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account.',
};

const Login = () => {
  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <h1 className='text-6xl font-extrabold'>Login</h1>
      <LoginForm />
      <Link href='/register' className='mt-4'>
        You do not have an account?
      </Link>
    </div>
  );
};

export default Login;
