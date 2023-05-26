import type { ResponseFetcher } from '../../types/utils/fetcher.d.ts'

export const withDefaults = <O extends RequestInit>(
  defaultOptions?: O,
) =>
(fetcher: ResponseFetcher<O>): ResponseFetcher<O> => ({
  fetch: (
    url: string,
    options?: O,
  ) => {
    const headers = options
      ? { ...defaultOptions?.headers, ...options?.headers }
      : defaultOptions?.headers
    const finalOptions = {
      ...defaultOptions,
      ...options,
      headers,
    } as O
    return fetcher.fetch(url, finalOptions)
  },
})
