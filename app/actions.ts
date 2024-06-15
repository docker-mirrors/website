'use server'
import { queryImages } from '@/lib/images'

export async function searchImages(tag: string) {
  const stores = await queryImages(tag, 'store')
  const communities = await queryImages(tag, 'community')

  return {
    stores: stores?.results ?? [],
    communities: communities?.results ?? []
  }
}
