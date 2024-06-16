export enum SYSTEM {
  LINUX = 'linux',
  UNKNOWN = 'unknown',
  WINDOWS = 'windows'
}

export type OperatingSystem = {
  name: SYSTEM
  label: Uppercase<SYSTEM>
}

export type Repository = {
  name: string
  namespace: string
  description: string
  type: ImageType
  pull_count: string
  is_automated: boolean
  is_official: boolean
  is_trusted: boolean
  last_pushed_at: string
  last_pulled_at: string
}

export type Architecture = {
  name: string
  label: string
}

export type RatePlanItem = {
  id: string
  repositories: Repository[]
  operating_systems: OperatingSystem[]
  architectures: Architecture[]
}

export type CategoryItem = {
  slug: string
  name: string
}

export type ImageType = 'store' | 'community' | 'image' | 'verified_publisher'

export type ImageDetail = {
  id: string
  name: string
  slug: string
  type: ImageType
  created_at: string
  updated_at: string
  short_description: string
  source: ImageType
  star_count: number
  extension_reviewed: boolean
  logo_url: {
    large: string
    small: string
  }
  categories: CategoryItem[]
  rate_plans: RatePlanItem[]
}

export type ImageDetailForTag = ImageDetail & {
  full_description: string
  hub_user: string
  namespace: string
  pull_count: number
  repository_type: ImageType
  star_count: number
  status: number
  user: string
  last_updated: string
  content_types: ImageType[]
}
