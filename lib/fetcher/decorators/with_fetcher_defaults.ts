import type {
  FetchURL,
  ResponseFetcher,
} from '../../types/fetcher/fetcher.d.ts'

export const withFetcherDefaults = <O extends RequestInit>(
  defaultOptions?: O,
) =>
(fetcher?: ResponseFetcher<O>): ResponseFetcher<O> => ({
  fetch: (
    url: FetchURL,
    options?: O,
  ) => {
    const headers = new Headers(defaultOptions?.headers)
    if (options?.headers) {
      new Headers(options.headers).forEach((value, key) => {
        headers.append(key, value)
      })
    }
    const finalOptions = {
      ...defaultOptions,
      ...options,
      headers,
    } as O
    return (fetcher?.fetch ?? fetch)(url, finalOptions)
  },
})
