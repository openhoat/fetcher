import type { ResponseFetcher } from '../../types/utils/fetcher.d.ts'
import { FetchLike } from '../../types/utils/fetcher.d.ts'

export const withFetcher = <O extends RequestInit>(
  fetchLike: FetchLike = fetch,
): ResponseFetcher<O> => ({
  fetch: (url: string, options?: O) => fetchLike(url, options),
})
