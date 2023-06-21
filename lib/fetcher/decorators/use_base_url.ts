import type { BaseURLOptions } from '../../types/fetcher/decorators/use_base_url.d.ts'
import type { ResponseFetcher } from '../../types/fetcher/fetcher.d.ts'
import { toURL } from '../../utils/helper.ts'

export const useBaseURL = <O extends RequestInit>(
  fetcher?: ResponseFetcher<O>,
): ResponseFetcher<O & BaseURLOptions> => ({
  fetch: (
    url: URL | Request | string,
    options?: O & BaseURLOptions,
  ) => (fetcher?.fetch ?? fetch)(toURL(url, options?.baseURL), options),
})
