import { Wrapper } from '@/components/ui/wrapper';
import Link from 'next/link';
import { Github } from 'lucide-react';

const year = new Date().getFullYear();

export const Footer = () => {
  return (
    <footer>
      <Wrapper>
        <div className='flex w-full items-center justify-between'>
          <p className='py-2'>
            {' '}
            &copy; {year}{' '}
            <Link href='https://github.com/ssynowiec' target='_blank'>
              Stanisław Synowiec
            </Link>
          </p>
          <Link
            href='https://github.com/ssynowiec/lucia-demo'
            target='_blank'
            title='Github repo'
          >
            <Github />
          </Link>
        </div>
      </Wrapper>
    </footer>
  );
};
