import type {
  FectherAllOptions,
  FetcherConfig,
  FetchLike,
  FetchURL,
  JsonFetcher,
} from '../types/fetcher/fetcher.d.ts'
import type { QueryParamsOptions } from '../types/fetcher/decorators/use_query_params.d.ts'
import type { BaseURLOptions } from '../types/fetcher/decorators/use_base_url.d.ts'
import type { BasicAuthOptions } from '../types/fetcher/decorators/use_basic_auth.d.ts'
import type { BearerOptions } from '../types/fetcher/decorators/use_bearer.d.ts'
import type { TimeoutOptions } from '../types/fetcher/decorators/use_timeout.d.ts'
import type { ErrorHandlingOptions } from '../types/fetcher/decorators/use_error_handling.d.ts'
import { useQueryParams } from './decorators/use_query_params.ts'
import { useBaseURL } from './decorators/use_base_url.ts'
import { useBasicAuth } from './decorators/use_basic_auth.ts'
import { useBearer } from './decorators/use_bearer.ts'
import { useTimeout } from './decorators/use_timeout.ts'
import { useJsonResponse } from './decorators/use_json_response.ts'
import { useErrorHandling } from './decorators/use_error_handling.ts'
import { useDefaults } from './decorators/use_defaults.ts'

export const Fetcher = <T = JsonFetcher<FectherAllOptions>>(
  defaultOptions?:
    & RequestInit
    & BaseURLOptions
    & BearerOptions
    & BasicAuthOptions
    & QueryParamsOptions
    & TimeoutOptions
    & ErrorHandlingOptions
    & { fetch?: FetchLike },
  config?: FetcherConfig,
): T => {
  const { useAll } = config || { useAll: true }
  let fetcher = {
    fetch: (url: FetchURL, options?: RequestInit) =>
      (defaultOptions?.fetch ?? fetch)(url, options),
  }
  if (useAll ? config?.useErrorHandling !== false : config?.useErrorHandling) {
    fetcher = useErrorHandling(fetcher)
  }
  if (useAll ? config?.useTimeout !== false : config?.useTimeout) {
    fetcher = useTimeout(fetcher)
  }
  if (useAll ? config?.useQueryParams !== false : config?.useQueryParams) {
    fetcher = useQueryParams(fetcher)
  }
  if (useAll ? config?.useBasicAuth !== false : config?.useBasicAuth) {
    fetcher = useBasicAuth(fetcher)
  }
  if (useAll ? config?.useBearer !== false : config?.useBearer) {
    fetcher = useBearer(fetcher)
  }
  if (useAll ? config?.useBaseURL !== false : config?.useBaseURL) {
    fetcher = useBaseURL(fetcher)
  }
  if (useAll ? config?.useDefaults !== false : config?.useDefaults) {
    fetcher = useDefaults(defaultOptions)(fetcher)
  }
  if (useAll ? config?.useJson !== false : config?.useJson) {
    fetcher = useJsonResponse(fetcher)
  }
  return fetcher as T
}
