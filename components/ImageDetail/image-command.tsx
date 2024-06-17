'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useIntl } from '@/i18n'
import { useMemoizedFn } from 'ahooks'
import { ImageDetailForTag } from '@/types/image'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'

type ImageCommandProps = {
  displayTag?: ImageDetailForTag
}

export function ImageCommand({ displayTag }: ImageCommandProps) {
  const params = useParams()
  const [, { formatMessage }] = useIntl()

  const downloadCommand = React.useMemo(() => {
    const tag = displayTag ? `:${displayTag.name}` : ''
    return `${
      process.env.NEXT_PUBLIC_DOCKER_REPLY_REGISTRY
    }/${decodeURIComponent(params.slug[1])}${tag}`
  }, [params, displayTag])

  const handleCopy = useMemoizedFn(() => {
    navigator.clipboard.writeText(downloadCommand)
    toast.info(formatMessage('images.copyMessage'))
  })

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'C' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }
        e.preventDefault()
        handleCopy()
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [handleCopy])

  return (
    <Button
      variant="outline"
      className={cn(
        'relative justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none  min-w-64 w-max'
      )}
      onClick={handleCopy}
    >
      <span className="inline-flex mr-1">{downloadCommand}</span>
      <kbd className="h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
        <span className="text-xs">⌘</span>C
      </kbd>
    </Button>
  )
}
