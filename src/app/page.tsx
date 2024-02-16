import Image from 'next/image';
import { Button } from '@/components/ui/button';

const Home = () => {
  return (
    <main className='flex flex-col items-center justify-center'>
      <h1>Hello, world!</h1>
      <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
      <Button>Click me!</Button>
    </main>
  );
};

export default Home;
