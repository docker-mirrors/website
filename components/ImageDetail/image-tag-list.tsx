import { ImageDetailForTag } from '@/types/image'

export type ImageTagListProps = {
  displayTag?: ImageDetailForTag
  tags: ImageDetailForTag[]
  onSelected: (selected: ImageDetailForTag) => void
}

export function ImageTagList(props: ImageTagListProps) {
  return 'ImageTagList'
}
