import { Wrapper } from '@/components/ui/wrapper';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home | Lucia auth demo',
  description: 'Homepage Lucia auth demo app',
};

const Home = () => {
  return (
    <Wrapper>
      <div className='flex w-full flex-col items-center justify-center'>
        <h1 className='text-5xl font-extrabold'>Hello, world! 👋</h1>
      </div>
    </Wrapper>
  );
};

export default Home;
