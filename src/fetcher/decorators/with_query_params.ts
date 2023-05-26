import type { ResponseFetcher } from '../../types/utils/fetcher.d.ts'

export type QueryParams = Record<string, string>

export type QueryParamsOptions = {
  query?: QueryParams
}

export const toQueryParamsURL = (url: string, query: QueryParams) => {
  const queryParamsURL = new URL(url)
  Object.entries(query).forEach(([name, value]) => {
    queryParamsURL.searchParams.set(name, value)
  })
  return queryParamsURL.toString()
}

export const withQueryParams = <O extends RequestInit>(
  fetcher: ResponseFetcher<O>,
): ResponseFetcher<O & QueryParamsOptions> => ({
  fetch: (
    url: string,
    options?: O & QueryParamsOptions,
  ) => {
    const query = options?.query
    const queryParamsURL = query ? toQueryParamsURL(url, query) : url
    return fetcher.fetch(queryParamsURL, options)
  },
})
