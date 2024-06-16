'use client'

import * as React from 'react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ImageTagDetail } from './image-tag-detail'
import { ImageTagList } from './image-tag-list'
import { ImageDetailForTag } from '@/types/image'

interface ImageDetailProps {
  detail: string
  tags: ImageDetailForTag[]
}

const defaultLayout = [655, 265, 440]

export function ImageDetail({ tags, detail }: ImageDetailProps) {
  const [displayTag, setDisplayTag] = React.useState<ImageDetailForTag>()

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full max-h-[800px] items-stretch"
      >
        <ResizablePanel defaultSize={defaultLayout[0]}>
          <ScrollArea className="h-full">
            <div
              dangerouslySetInnerHTML={{ __html: detail }}
              className="prose dark:prose-invert"
            />
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          defaultSize={defaultLayout[1]}
          minSize={15}
          maxSize={20}
        >
          <ImageTagList
            displayTag={displayTag}
            tags={tags}
            onSelected={setDisplayTag}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
          <ImageTagDetail tag={displayTag} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}
