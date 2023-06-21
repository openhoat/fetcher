import type { BearerOptions } from '../../types/fetcher/decorators/use_bearer.d.ts'
import type {
  FetchURL,
  ResponseFetcher,
} from '../../types/fetcher/fetcher.d.ts'

export const useBearer = <O extends RequestInit>(
  fetcher?: ResponseFetcher<O>,
): ResponseFetcher<O & BearerOptions> => ({
  fetch: (
    url: FetchURL,
    options?: O & BearerOptions,
  ) => {
    const headers = new Headers(options?.headers)
    const token = options?.token
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return (fetcher?.fetch ?? fetch)(url, {
      ...options,
      headers,
    } as O)
  },
})
