import { LoginForm } from '@/components/ui/login-form';
import Link from 'next/link';

const Login = () => {
  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <h1>Login</h1>
      <LoginForm />
      <Link href='/register' className='mt-4'>
        You do not have an account?
      </Link>
    </div>
  );
};

export default Login;
