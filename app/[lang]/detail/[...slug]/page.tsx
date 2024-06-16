import { ImageDetail } from '@/components/ImageDetail'
import { queryImageDetailTags, queryImageDetailWithTag } from '@/lib/images'
import { hl } from '@/lib/hl'

export type DetailProps = {
  params: {
    slug: string[]
  }
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
    <div className="flex-1">
      <ImageDetail
        tags={tags?.results ?? []}
        detail={details?.full_description ?? ''}
      />
    </div>
  )
}
