import { ImageDetailForTag } from '@/types/image'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useIntl } from '@/i18n'

export type ImageTagListProps = {
  displayTag?: ImageDetailForTag
  tags: ImageDetailForTag[]
  onSelected: (selected: ImageDetailForTag) => void
}

export function ImageTagList({ tags = [], onSelected }: ImageTagListProps) {
  const [, { formatMessage }] = useIntl()
  return (
    <Select
      onValueChange={(tag: string) =>
        onSelected(tags!.find((v) => v.name === tag)!)
      }
    >
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder={formatMessage('images.selectTag')} />
      </SelectTrigger>
      <SelectContent>
        {tags.map(({ id, name }) => (
          <SelectItem key={id} value={name}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
