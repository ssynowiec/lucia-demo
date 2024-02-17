import { Wrapper } from '@/components/ui/wrapper';
import Link from 'next/link';

const year = new Date().getFullYear();

export const Footer = () => {
  return (
    <footer>
      <Wrapper>
        <p className='py-2'>
          {' '}
          &copy; {year}{' '}
          <Link href='https://github.com/ssynowiec' target='_blank'>
            Stanisław Synowiec
          </Link>
        </p>
      </Wrapper>
    </footer>
  );
};
