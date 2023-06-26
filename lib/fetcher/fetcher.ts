import type {
  FectherAllOptions,
  FetcherConfig,
  FetchLike,
  FetchURL,
  JsonFetcher,
  ResponseFetcher,
} from '../types/fetcher/fetcher.d.ts'
import type { QueryParamsOptions } from '../types/fetcher/decorators/use_query_params.d.ts'
import type { BaseURLOptions } from '../types/fetcher/decorators/use_base_url.d.ts'
import type { BasicAuthOptions } from '../types/fetcher/decorators/use_basic_auth.d.ts'
import type { BearerOptions } from '../types/fetcher/decorators/use_bearer.d.ts'
import type { ErrorHandlingOptions } from '../types/fetcher/decorators/use_error_handling.d.ts'
import type { TimeoutOptions } from '../types/fetcher/decorators/use_timeout.d.ts'
import { withFetcherBaseURL } from './decorators/with_fetcher_base_url.ts'
import { withFetcherBasicAuth } from './decorators/with_fetcher_basic_auth.ts'
import { withFetcherBearer } from './decorators/with_fetcher_bearer.ts'
import { withFetcherDefaults } from './decorators/with_fetcher_defaults.ts'
import { withFetcherErrorHandling } from './decorators/with_fetcher_error_handling.ts'
import { withFetcherJsonResponse } from './decorators/with_fetcher_json_response.ts'
import { withFetcherQueryParams } from './decorators/with_fetcher_query_params.ts'
import { withFetcherTimeout } from './decorators/with_fetcher_timeout.ts'

export const Fetcher = <
  T extends ResponseFetcher<O> | JsonFetcher<O> = JsonFetcher<
    FectherAllOptions
  >,
  O extends
    & RequestInit
    & BaseURLOptions
    & BasicAuthOptions
    & BearerOptions
    & ErrorHandlingOptions
    & QueryParamsOptions
    & TimeoutOptions = FectherAllOptions,
>(
  defaultOptions?: O & { fetch?: FetchLike },
  config?: FetcherConfig,
): T => {
  const { withAll } = config || { withAll: true }
  let fetcher = {
    fetch: (url: FetchURL, options?: RequestInit) =>
      (defaultOptions?.fetch ?? fetch)(url, options),
  }
  if (
    withAll ? config?.withErrorHandling !== false : config?.withErrorHandling
  ) {
    fetcher = withFetcherErrorHandling(fetcher)
  }
  if (withAll ? config?.withTimeout !== false : config?.withTimeout) {
    fetcher = withFetcherTimeout(fetcher)
  }
  if (withAll ? config?.withQueryParams !== false : config?.withQueryParams) {
    fetcher = withFetcherQueryParams(fetcher)
  }
  if (withAll ? config?.withBasicAuth !== false : config?.withBasicAuth) {
    fetcher = withFetcherBasicAuth(fetcher)
  }
  if (withAll ? config?.withBearer !== false : config?.withBearer) {
    fetcher = withFetcherBearer(fetcher)
  }
  if (withAll ? config?.withBaseURL !== false : config?.withBaseURL) {
    fetcher = withFetcherBaseURL(fetcher)
  }
  if (withAll ? config?.withDefaults !== false : config?.withDefaults) {
    fetcher = withFetcherDefaults(defaultOptions)(fetcher) as ResponseFetcher<
      RequestInit
    >
  }
  if (withAll ? config?.withJson !== false : config?.withJson) {
    fetcher = withFetcherJsonResponse(fetcher)
  }
  return fetcher as T
}
