import type { ResponseFetcher } from '../../types/fetcher.d.ts'
import { toURL } from '../../utils/helper.ts'

export type BaseURLOptions = {
  baseURL?: string
}

export const withBaseURL = <O extends RequestInit>(
  fetcher?: ResponseFetcher<O>,
): ResponseFetcher<O & BaseURLOptions> => ({
  fetch: (
    url: URL | Request | string,
    options?: O & BaseURLOptions,
  ) => (fetcher?.fetch ?? fetch)(toURL(url, options?.baseURL), options),
})
