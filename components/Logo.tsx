import Image from 'next/image';
import { useMemo } from 'react';

export type LogoProps = {
  src?: string;
  size?: 24 | 36;
};

export function Logo({ src = '/docker-mirrors.svg', size = 24 }: LogoProps) {
  const imageProps = useMemo(() => {
    // if (src.startsWith('http')) {
    //   const source = src.replace(new URL(src).origin, '');
    //   return {
    //     src: source,
    //     loader: () => {
    //       return src;
    //     },
    //   };
    // }

    return {
      src,
    };
  }, [src]);
  return (
    <Image
      priority
      {...imageProps}
      referrerPolicy="no-referrer"
      width={size}
      height={size}
      alt={imageProps.src}
    />
  );
}
