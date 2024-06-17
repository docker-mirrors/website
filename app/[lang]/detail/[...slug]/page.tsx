import { ImageDetail } from '@/components/ImageDetail'
import { queryImageDetailTags, queryImageDetailWithTag } from '@/lib/images'
import { hl } from '@/lib/hl'
import { Metadata } from 'next'

export const runtime = 'edge'

type DetailProps = {
  params: {
    slug: string[]
  }
}

export async function generateMetadata({ params }: DetailProps) {
  return {
    title: decodeURIComponent(params.slug[1])
  } as Metadata
}

export default async function Detail({ params: { slug } }: DetailProps) {
  const tags = await queryImageDetailTags(decodeURIComponent(slug[1]))
  const details = await queryImageDetailWithTag(
    decodeURIComponent(slug[1])
  ).then(async (response) => {
    const hsDetail = await hl(response?.full_description ?? '')
    return {
      ...response,
      full_description: hsDetail
    }
  })
  return (
    <ImageDetail
      tags={tags?.results ?? []}
      logo={details.logo_url?.large}
      detail={details?.full_description ?? ''}
    />
  )
}
