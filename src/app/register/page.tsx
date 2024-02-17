import { RegisterForm } from '@/components/ui/register-form';

const Register = () => {
  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <h1>Create an account</h1>
      <RegisterForm />
    </div>
  );
};

export default Register;
