export const runtime = 'edge';
const mdxs = JSON.parse(process.env.mdxs ?? '');
import { md } from '@/lib/hl';

export default async function Home({
  params: { lang },
}: {
  params: { lang: string };
}) {
  console.log(mdxs);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: md.render(mdxs[lang] ?? '') }}
      className="prose dark:prose-invert py-2 max-w-[980px] mx-auto"
    />
  );
}
