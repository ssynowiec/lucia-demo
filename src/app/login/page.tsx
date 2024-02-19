import { LoginForm } from '@/components/ui/login-form';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import { validateRequest } from '@/auth/validate-request';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Login | Lucia auth demo',
  description: 'Login to your account.',
};

const Login = async () => {
  const { user } = await validateRequest();

  if (user) {
    return redirect('/protected');
  }

  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <h1 className='text-6xl font-extrabold'>Login</h1>
      <LoginForm />
      <Button variant='outline' asChild={true} className='mt-4'>
        <Link href='/login/github'>
          <Github className='mr-2' /> Login with Github
        </Link>
      </Button>
      <Link href='/register' className='mt-4'>
        You do not have an account?
      </Link>
    </div>
  );
};

export default Login;
