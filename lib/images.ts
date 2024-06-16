import { stringify } from 'qs'
import merge from 'lodash.merge'
import type { ImageType, ImageDetail } from '@/types/image'

export function makeRequestSource(source: string) {
  return [process.env.DOCK_HUB_HOST, source].join('/')
}

export async function request<T = any>(sources: string, init?: RequestInit) {
  const url = makeRequestSource(sources)
  try {
    const serverResponse = await fetch(
      url,
      merge(
        {
          headers: {
            'user-agent': 'PostmanRuntime/7.37.0'
          }
        } as RequestInit,
        init
      )
    )
    const jsonResponse = await serverResponse.json()
    return jsonResponse as T
  } catch (e) {
    console.log(e)
  }
}

export function queryImages(
  tag: string,
  type?: ImageType,
  payload?: {
    size?: number
    from?: number
    official?: boolean
    open_source?: boolean
    images?: string
  }
) {
  const query = {
    ...payload,
    source: type,
    query: tag
  }
  return request<{ total: number; results: ImageDetail[] }>(
    `api/search/v3/catalog/search?${stringify(query)}`,
    {
      next: {
        revalidate: 20 * 60 * 1000
      }
    }
  )
}
