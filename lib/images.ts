import {
  ImageDetailForTag,
  type ImageDetail,
  type ImageType,
} from '@/types/image';
import merge from 'lodash.merge';
import { stringify } from 'qs';

export function makeRequestSource(source: string) {
  return [process.env.DOCK_HUB_HOST, source].join('/');
}

export async function request<T = any>(sources: string, init?: RequestInit) {
  const url = makeRequestSource(sources);

  try {
    const serverResponse = await fetch(
      url,
      merge(
        {
          headers: {
            'user-agent': 'PostmanRuntime/7.37.0',
          },
        } as RequestInit,
        init,
      ),
    );
    const jsonResponse = await serverResponse.json();
    return jsonResponse as T;
  } catch (e) {
    console.log('request error', url, e);
  }
}

export function queryImages(
  tag: string,
  type?: ImageType,
  payload?: {
    size?: number;
    from?: number;
    official?: boolean;
    open_source?: boolean;
    images?: string;
  },
) {
  const query = {
    ...payload,
    type: type,
    query: tag,
  };
  return request<{ total: number; results: ImageDetail[] }>(
    `api/search/v3/catalog/search?${stringify(query)}`,
    {
      next: {
        revalidate: 20 * 60 * 1000,
      },
    },
  );
}

export function queryImageDetailWithTag(name: string, tags?: string) {
  return request<ImageDetailForTag>(`v2/repositories/${name}/${tags ?? ''}`, {
    next: {
      revalidate: 10 * 60 * 1000,
    },
  });
}

export function queryImageOrgDetailWithTag(name: string, tags?: string) {
  return request<Record<string, any>>(`v2/orgs/${name}/${tags ?? ''}`, {
    next: {
      revalidate: 10 * 60 * 1000,
    },
  });
}

export function queryImageTags(name: string) {
  return request<{ results: ImageDetailForTag[]; count: number }>(
    `v2/repositories/${name}/tags?${stringify({
      page: 1,
      page_size: 35,
      ordering: 'last_updated',
      name: '',
    })}`,
    {
      next: {
        revalidate: 10 * 60 * 1000,
      },
    },
  );
}
