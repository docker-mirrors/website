'use client'
import { useOptimistic, useState, startTransition, useEffect } from 'react'
import { DataTable, defaultPagination } from '@/components/DataTable'
import { columns } from '@/components/DataTable/columns'
import { useDebounceEffect, useMemoizedFn } from 'ahooks'
import { queryImageBySource } from '@/app/actions'
import { useParams } from 'next/navigation'
import { ImageType } from '@/types/image'
import { PaginationState } from '@tanstack/react-table'

export type SearchProps = {
  params: {
    slug: string[]
  }
}

function useSearch() {
  const [page, changePage] = useState<PaginationState>({ ...defaultPagination })
  const { slug } = useParams<SearchProps['params']>()
  const [searchResult, setSearchResult] =
    useState<Awaited<ReturnType<typeof queryImageBySource>>>()
  const [optimisticSearchResult, addOptimisticLoading] = useOptimistic(
    { ...searchResult, loading: false },
    (state, loading: boolean) => ({ ...state, loading })
  )

  const handleSearch = useMemoizedFn(async () => {
    startTransition(() => addOptimisticLoading(true))
    const [source, query] = slug
    const currentSearchResult = await queryImageBySource(
      query,
      source as ImageType,
      page.pageIndex + 1
    )
    setSearchResult(currentSearchResult)
  })

  useDebounceEffect(
    () => {
      if (typeof page.pageIndex === 'number') {
        handleSearch()
      }
    },
    [page.pageIndex],
    { wait: 500 }
  )

  return [optimisticSearchResult, changePage] as const
}

export default function Search() {
  const [{ results = [], total }, changePage] = useSearch()

  return (
    <DataTable
      pagination
      rowCount={total}
      columns={columns}
      data={results}
      onPaginationChange={changePage}
    />
  )
}
