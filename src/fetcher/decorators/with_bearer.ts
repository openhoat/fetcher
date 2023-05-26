import type { ResponseFetcher } from '../../types/utils/fetcher.d.ts'

export type BearerOptions = {
  token?: string
}

export const withBearer = <O extends RequestInit>(
  fetcher: ResponseFetcher<O>,
): ResponseFetcher<O & BearerOptions> => ({
  fetch: (
    url: string,
    options?: O & BearerOptions,
  ) => {
    const headers = options?.headers
    const token = options?.token
    return fetcher.fetch(url, {
      ...options,
      headers: token
        ? {
          ...headers,
          'Authorization': `Bearer ${token}`,
        }
        : headers,
    } as O)
  },
})
