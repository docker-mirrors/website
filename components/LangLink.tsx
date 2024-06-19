import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ComponentProps } from 'react';

export function LangLink({ href, ...props }: ComponentProps<typeof Link>) {
  const params = useParams();
  return <Link {...props} href={`/${params.lang ?? 'zh'}${href}`} />;
}
