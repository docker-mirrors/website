'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { DialogProps } from '@radix-ui/react-alert-dialog'
import {
  LayersIcon,
  GearIcon,
  LaptopIcon,
  MoonIcon,
  SunIcon,
  PersonIcon,
  Half2Icon
} from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'
import { useDebounceFn } from 'ahooks'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command'
import { Intl, useIntl } from '@/i18n'
import { searchImages } from '@/app/actions'
import { Logo } from './Logo'

export function useSearch() {
  const [searchResult, setSearchResult] =
    React.useState<Awaited<ReturnType<typeof searchImages>>>()
  const [optimisticSearchResult, addOptimisticLoading] = React.useOptimistic(
    { ...searchResult, loading: false },
    (state, loading: boolean) => ({ ...state, loading })
  )
  const searchTag = React.useRef<string>()

  const { run: handleSearch } = useDebounceFn(
    async (searchSources: string) => {
      React.startTransition(() => addOptimisticLoading(true))
      searchTag.current = searchSources
      const currentSearchResult = await searchImages(searchSources)
      console.log(currentSearchResult)
      setSearchResult(currentSearchResult)
    },
    { wait: 500 }
  )

  return [optimisticSearchResult, handleSearch, searchTag] as const
}

export function CommandMenu({ ...props }: DialogProps) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const { setTheme } = useTheme()
  const [, { formatMessage }] = useIntl()
  const [{ loading, stores, communities }, handleSearch, searchTag] =
    useSearch()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }

        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          'relative h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64'
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="hidden lg:inline-flex">
          <Intl locale="search.placeholder" />
        </span>
        <span className="inline-flex lg:hidden">
          <Intl locale="search.loading" />
        </span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder={formatMessage('search.placeholder')}
          onValueChange={handleSearch}
        />
        <CommandList>
          <CommandEmpty>
            <Intl locale="search.notFound" />
          </CommandEmpty>
          {stores?.results?.length ? (
            <CommandGroup
              heading={
                <span className="flex items-center">
                  <GearIcon className="mr-2 h-4 w-4" />
                  <Intl locale="search.trustedContent" />
                </span>
              }
            >
              {stores.results.map(({ name, id, type, logo_url }) => (
                <CommandItem
                  key={id}
                  value={name}
                  onSelect={() => {
                    runCommand(() =>
                      router.push(`/detail/${type}/${encodeURIComponent(id)}`)
                    )
                  }}
                >
                  <Logo src={logo_url?.small} />
                  <span className="ml-2">{name}</span>
                </CommandItem>
              ))}
              <CommandItem
                value="trustedContent"
                key="trustedContent"
                onSelect={() => {
                  runCommand(() =>
                    router.push(
                      `/search/store/${encodeURIComponent(
                        searchTag.current ?? ''
                      )}`
                    )
                  )
                }}
              >
                <LayersIcon className="mr-2 h-4 w-4" />
                <Intl locale="search.showAll" />
                <Intl locale="search.trustedContent" />
                {stores.total}
              </CommandItem>
            </CommandGroup>
          ) : null}
          {communities?.results?.length ? (
            <CommandGroup
              heading={
                <span className="flex items-center">
                  <PersonIcon className="mr-2 h-4 w-4" />
                  <Intl locale="search.community" />
                </span>
              }
            >
              {communities.results.map(({ name, id, type, logo_url }) => (
                <CommandItem
                  key={id}
                  value={name}
                  onSelect={() => {
                    runCommand(() =>
                      router.push(`/detail/${type}/${encodeURIComponent(id)}`)
                    )
                  }}
                >
                  <Logo src={logo_url?.small} />
                  <span className="ml-2">{name}</span>
                </CommandItem>
              ))}
              <CommandItem
                key="community"
                value="community"
                onSelect={() => {
                  runCommand(() =>
                    router.push(
                      `/search/community/${encodeURIComponent(
                        searchTag.current ?? ''
                      )}`
                    )
                  )
                }}
              >
                <LayersIcon className="mr-2 h-4 w-4" />
                <Intl locale="search.showAll" />
                <Intl locale="search.community" />
                {communities.total}
              </CommandItem>
            </CommandGroup>
          ) : null}
          <CommandSeparator />
          <CommandGroup
            heading={
              <span className="flex items-center">
                <Half2Icon className="mr-2 h-4 w-4" />
                <Intl locale="search.theme" />
              </span>
            }
          >
            <CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
              <SunIcon className="mr-2 h-4 w-4" />
              <Intl locale="theme.light" />
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
              <MoonIcon className="mr-2 h-4 w-4" />
              <Intl locale="theme.dark" />
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('system'))}>
              <LaptopIcon className="mr-2 h-4 w-4" />
              <Intl locale="theme.system" />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
