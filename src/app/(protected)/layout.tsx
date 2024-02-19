import type { ReactNode } from 'react';
import { validateRequest } from '@/auth/validate-request';
import { redirect } from 'next/navigation';

interface ProtectedLayoutProps {
  children: ReactNode;
}

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
  const { user } = await validateRequest();

  if (!user) {
    return redirect('/login');
  }

  return <>{children}</>;
};

export default ProtectedLayout;
