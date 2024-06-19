import { md } from '@/lib/hl';

const mdxs = JSON.parse(process.env.mdxs ?? '');

export const runtime = 'edge';

export default function DocPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: md.render(mdxs[lang] ?? '') }}
      className="prose dark:prose-invert py-2 max-w-[980px] mx-auto"
    />
  );
}
