import { useMemo } from 'react'
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { ClipboardCopyIcon } from '@radix-ui/react-icons'

export type LinkCommandProps = {
  id: string
  tooltip?: boolean
}

export function LinkCommand({ id, tooltip }: LinkCommandProps) {
  const downloadCommand = useMemo(() => {
    return `${process.env.NEXT_PUBLIC_DOCKER_REPLY_REGISTRY}/${id}`
  }, [id])
  if (!tooltip) {
    return (
      <kbd
        className="h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 flex"
        onClick={() => navigator.clipboard.writeText(downloadCommand)}
      >
        $ {downloadCommand}
      </kbd>
    )
  }
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <ClipboardCopyIcon />
        </TooltipTrigger>
        <TooltipContent>
          <kbd
            className="h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 flex"
            onClick={() => navigator.clipboard.writeText(downloadCommand)}
          >
            $ {downloadCommand}
          </kbd>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
