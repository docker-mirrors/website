import { ImageDetail } from '@/components/ImageDetail';
import { hl } from '@/lib/hl';
import {
  queryImageDetailWithTag,
  queryImageOrgDetailWithTag,
  queryImageTags,
} from '@/lib/images';
import { Metadata } from 'next';

export const runtime = 'edge';

type DetailProps = {
  params: {
    slug: string[];
  };
};

export async function generateMetadata({ params }: DetailProps) {
  return {
    title: decodeURIComponent(params.slug[1]),
  } as Metadata;
}

export default async function Detail({ params: { slug } }: DetailProps) {
  const tags = await queryImageTags(decodeURIComponent(slug[1]));
  const details = await queryImageDetailWithTag(
    decodeURIComponent(slug[1]),
  ).then(async (response) => {
    const hsDetail = await hl(response?.full_description ?? '');
    console.log(response);
    return {
      ...response,
      full_description: hsDetail,
    };
  });
  const orgInfo = await queryImageOrgDetailWithTag(details.namespace!);

  return (
    <ImageDetail
      tags={tags?.results ?? []}
      logo={orgInfo?.gravatar_url}
      detail={details?.full_description ?? ''}
    />
  );
}
