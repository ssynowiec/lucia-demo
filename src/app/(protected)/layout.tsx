import type { ReactNode } from 'react';

interface ProtectedLayoutProps {
  children: ReactNode;
}

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
  // const { user } = await validateRequest();
  //
  // if (!user) {
  //   return redirect('/login');
  // }

  return <>{children}</>;
};

export default ProtectedLayout;
