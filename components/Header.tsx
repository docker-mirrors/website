import { buttonVariants } from '@/components/ui/button';
import { site } from '@/constants/site';
import { cn } from '@/lib/utils';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';
import { CommandMenu } from './CommandMenu';
import { ModeToggle } from './ModeToggle';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image
              src="/docker-mirrors.svg"
              alt="docker-mirrors Logo"
              width={24}
              height={24}
              priority
              className="h-6 w-6"
            />
            <span className="font-bold inline-block">{site.name}</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <div className="w-auto flex-none">
            <CommandMenu />
          </div>
          <nav className="flex items-center">
            <Link href={site.links.github} target="_blank" rel="noreferrer">
              <div
                className={cn(
                  buttonVariants({
                    variant: 'ghost',
                  }),
                  'w-9 px-0',
                )}
              >
                <GitHubLogoIcon className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
};
