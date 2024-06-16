'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'

import { IMAGETYPE } from '@/constants/images'
import { ImageDetail } from '@/types/image'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import {
  CheckCircledIcon,
  DownloadIcon,
  FaceIcon,
  QuestionMarkCircledIcon,
  StarIcon
} from '@radix-ui/react-icons'
import { LinkCommand } from '../LinkCommand'
import { Logo } from '../Logo'
import Link from 'next/link'

export const columns: ColumnDef<ImageDetail>[] = [
  {
    accessorKey: 'logo_url',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="images.logo" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-10">
          <Logo src={row.original.logo_url?.small} />
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="images.name" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">
        <Link
          href={`/detail/${row.original.type}/${encodeURIComponent(
            row.original.id
          )}`}
        >
          {row.getValue('name')}
        </Link>
      </div>
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'short_description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="images.description" />
    ),
    cell: ({ row }) => {
      const label = IMAGETYPE.find((label) => label.value === row.original.type)

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('short_description')}
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: 'official',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="images.official" />
    ),
    cell: ({ row }) => {
      const isOfficial =
        !!row.original.rate_plans?.[0]?.repositories?.[0]?.is_official
      const verified = row.original.source === 'verified_publisher'

      const OfficialIcon = isOfficial
        ? CheckCircledIcon
        : verified
        ? FaceIcon
        : QuestionMarkCircledIcon
      return (
        <div className="flex w-4 items-center">
          <OfficialIcon className="h-4 w-4 text-muted-foreground" />
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    accessorKey: 'star_count',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="images.data" />
    ),
    cell: ({ row }) => {
      const starCount = row.getValue<number>('star_count')
      const pullCount =
        row.original.rate_plans?.[0]?.repositories?.[0]?.pull_count

      return (
        <div className="flex items-center">
          <StarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
          <span>{starCount}</span>
          <DownloadIcon className="mx-2 h-4 w-4 text-muted-foreground" />
          <span>{pullCount}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="images.download" />
    ),
    cell: ({ row }) => <LinkCommand id={row.getValue('id')} tooltip />
  }
]
