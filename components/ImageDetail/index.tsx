'use client'

import * as React from 'react'
import {TooltipProvider} from '@/components/ui/tooltip'
import {ScrollArea} from '@/components/ui/scroll-area'
import {ImageTagList} from './image-tag-list'
import {ImageDetailForTag} from '@/types/image'
import {Toaster} from '@/components/ui/sonner'
import {ImageCommand} from './image-command'
import {useParams} from 'next/navigation'
import {Logo} from '../Logo'

interface ImageDetailProps {
  detail: string
  tags: ImageDetailForTag[]
  logo?: string
}

export function ImageDetail({tags, detail, logo}: ImageDetailProps) {
  const [displayTag, setDisplayTag] = React.useState<ImageDetailForTag>()
  const params = useParams()

  return (
    <TooltipProvider delayDuration={0}>
      <div
        className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-18 sticky top-0 bg-white z-30 border-b mx-auto max-w-[980px]">
        <h2 className="text-lg font-semibold flex items-center justify-center sticky top-0 ">
          <Logo src={logo}/>
          <span className="ml-1">{decodeURIComponent(params.slug[1])}</span>
        </h2>
        <div className="ml-auto flex w-full space-x-2 sm:justify-end">
          <ImageTagList
            displayTag={displayTag}
            tags={tags}
            onSelected={setDisplayTag}/>
          <ImageCommand displayTag={displayTag}/>
        </div>
      </div>

      <div className="grow">
        <ScrollArea className="h-full">
          <div
            dangerouslySetInnerHTML={{__html: detail}}
            className="prose dark:prose-invert py-2 max-w-[980px] mx-auto"/>
        </ScrollArea>
      </div>
      <Toaster/>
    </TooltipProvider>
  )
}
