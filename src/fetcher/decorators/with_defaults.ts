import type { FetchURL, ResponseFetcher } from '../../types/fetcher.d.ts'

export const withDefaults = <O extends RequestInit>(
  defaultOptions?: O,
) =>
(fetcher?: ResponseFetcher<O>): ResponseFetcher<O> => ({
  fetch: (
    url: FetchURL,
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
    return (fetcher?.fetch ?? fetch)(url, finalOptions)
  },
})
