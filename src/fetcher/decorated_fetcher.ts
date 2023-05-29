import type { FetchLike, FetchURL, JsonFetcher } from '../types/fetcher.d.ts'
import type { QueryParamsOptions } from './decorators/with_query_params.ts'
import type { BaseURLOptions } from './decorators/with_base_url.ts'
import type { BasicAuthOptions } from './decorators/with_basic_auth.ts'
import type { BearerOptions } from './decorators/with_bearer.ts'
import type { TimeoutOptions } from './decorators/with_timeout.ts'
import { withQueryParams } from './decorators/with_query_params.ts'
import { withBaseURL } from './decorators/with_base_url.ts'
import { withBasicAuth } from './decorators/with_basic_auth.ts'
import { withBearer } from './decorators/with_bearer.ts'
import { withTimeout } from './decorators/with_timeout.ts'
import { withJsonResponse } from './decorators/with_json_response.ts'
import { withErrorHandling } from './decorators/with_error_handling.ts'
import { withDefaults } from './decorators/with_defaults.ts'

export const decoratedFetcher = <T>(
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
  withJsonResponse(
    withDefaults(
      defaultOptions,
    )(
      withBaseURL(
        withBearer(
          withBasicAuth(
            withQueryParams(
              withTimeout(
                withErrorHandling({
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
