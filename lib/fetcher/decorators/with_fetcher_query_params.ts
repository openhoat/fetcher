import type {
  QueryParams,
  QueryParamsOptions,
} from '../../types/fetcher/decorators/use_query_params.d.ts'
import type {
  FetchURL,
  ResponseFetcher,
} from '../../types/fetcher/fetcher.d.ts'
import { toURL } from '../../utils/helper.ts'

export const toQueryParamsURL = (url: FetchURL, query: QueryParams) => {
  const queryParamsURL = toURL(url)
  Object.entries(query).forEach(([name, value]) => {
    queryParamsURL.searchParams.set(name, value)
  })
  return queryParamsURL
}

export const withFetcherQueryParams = <O extends RequestInit>(
  fetcher?: ResponseFetcher<O>,
): ResponseFetcher<O & QueryParamsOptions> => ({
  fetch: (
    url: FetchURL,
    options?: O & QueryParamsOptions,
  ) => {
    const query = options?.query
    const queryParamsURL = query ? toQueryParamsURL(url, query) : url
    return (fetcher?.fetch ?? fetch)(queryParamsURL, options)
  },
})
