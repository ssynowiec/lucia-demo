import Image from 'next/image';

const Home = () => {
  return (
    <main className='flex flex-col items-center justify-center'>
      <h1>Hello, world!</h1>
      <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
    </main>
  );
};

export default Home;
