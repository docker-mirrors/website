'use server'
import { queryImages } from '@/lib/images'

export async function searchImages(tag: string) {
  const stores = await queryImages(tag, 'store', { size: 4, from: 0 })
  const communities = await queryImages(tag, 'community', { size: 4, from: 0 })

  return {
    stores,
    communities
  }
}

export async function queryDashboardImages() {
  const { results: images } =
    (await queryImages('', 'image', {
      official: true,
      open_source: false,
      size: 15,
      from: 0
    })) ?? {}
  const { results: dashboardImages } =
    (await queryImages('', undefined, {
      size: 24,
      images: images?.map((v) => v.id).join(',')
    })) ?? {}

  return dashboardImages
}
