'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from '@/auth/login';
import { useState } from 'react';
import { loginFormSchema } from '@/auth/schema';

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setLoading(true);
    const res = await login(values);
    if (res?.error) {
      form.setError('login', { type: 'custom', message: res.error });
      form.setError('password', { type: 'custom', message: res.error });
    }
    setLoading(false);
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name='login'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Login</FormLabel>
                <FormControl>
                  <Input placeholder='johndoe' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder='**********' {...field} type='password' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='mt-4 w-full'>
            Login
          </Button>
        </form>
      </Form>
      <div className='mt-4'>
        <p>Demo login:</p>
        <p>
          Login: <span className='font-bold'>admin</span>
        </p>
        <p>
          Password: <span className='font-bold'>Pa$$w0rd</span>
        </p>
      </div>
    </>
  );
};
