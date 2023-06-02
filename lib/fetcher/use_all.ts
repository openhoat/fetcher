import type { FetchLike, FetchURL, JsonFetcher } from '../types/fetcher.d.ts'
import type { QueryParamsOptions } from './decorators/use_query_params.ts'
import type { BaseURLOptions } from './decorators/use_base_url.ts'
import type { BasicAuthOptions } from './decorators/use_basic_auth.ts'
import type { BearerOptions } from './decorators/use_bearer.ts'
import type { TimeoutOptions } from './decorators/use_timeout.ts'
import { useQueryParams } from './decorators/use_query_params.ts'
import { useBaseURL } from './decorators/use_base_url.ts'
import { useBasicAuth } from './decorators/use_basic_auth.ts'
import { useBearer } from './decorators/use_bearer.ts'
import { useTimeout } from './decorators/use_timeout.ts'
import { useJsonResponse } from './decorators/use_json_response.ts'
import { useErrorHandling } from './decorators/use_error_handling.ts'
import { useDefaults } from './decorators/use_defaults.ts'

export const useAll = <T>(
  defaultOptions?:
    & RequestInit
    & BaseURLOptions
    & BearerOptions
    & BasicAuthOptions
    & QueryParamsOptions
    & TimeoutOptions
    & { fetch?: FetchLike },
): JsonFetcher<
  & RequestInit
  & BaseURLOptions
  & BearerOptions
  & BasicAuthOptions
  & QueryParamsOptions
  & TimeoutOptions
> =>
  useJsonResponse(
    useDefaults(
      defaultOptions,
    )(
      useBaseURL(
        useBearer(
          useBasicAuth(
            useQueryParams(
              useTimeout(
                useErrorHandling({
                  fetch: (url: FetchURL, options?: RequestInit) =>
                    (defaultOptions?.fetch ?? fetch)(url, options),
                }),
              ),
            ),
          ),
        ),
      ),
    ),
  )
