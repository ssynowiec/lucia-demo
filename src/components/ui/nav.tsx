'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@radix-ui/react-navigation-menu';
import Link from 'next/link';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { ModeToggle } from '@/components/ui/theme-switcher';

export const Nav = () => {
  return (
    <NavigationMenu className='mx-auto flex max-w-screen-lg justify-between'>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href='/' legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
          <Link href='/login' legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Login
            </NavigationMenuLink>
          </Link>
          <Link href='/register' legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Register
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
      <ModeToggle />
    </NavigationMenu>
  );
};
