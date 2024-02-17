import { type ReactNode } from 'react';

interface WrapperProps {
  children: ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  return (
    <section className='mx-auto flex min-h-full w-full max-w-screen-lg'>
      {children}
    </section>
  );
};
