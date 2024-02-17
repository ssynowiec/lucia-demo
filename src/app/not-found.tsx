import type { Metadata } from 'next';
import { Wrapper } from '@/components/ui/wrapper';

export const metadata: Metadata = {
  title: 'Error 404 - Not Found',
  description: 'Page not found.',
};

const NotFound = () => {
  return (
    <Wrapper>
      <div className='flex h-full w-full flex-1 flex-col items-center justify-center'>
        <h1 className='text-8xl font-extrabold'>404</h1>
        <p className='text-xl'>Page not found.</p>
      </div>
    </Wrapper>
  );
};

export default NotFound;
