import type { ResponseFetcher } from '../../types/utils/fetcher.d.ts'

export type BaseURLOptions = {
  baseURL?: string
}

export const withBaseURL = <O extends RequestInit>(
  fetcher: ResponseFetcher<O>,
): ResponseFetcher<O & BaseURLOptions> => ({
  fetch: (
    url: string,
    options?: O & BaseURLOptions,
  ) => {
    const finalURL = (new URL(url, options?.baseURL)).toString()
    return fetcher.fetch(finalURL, options)
  },
})
