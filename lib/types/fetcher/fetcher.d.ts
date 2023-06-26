import type { BaseURLOptions } from './decorators/use_base_url.d.ts'
import type { BearerOptions } from './decorators/use_bearer.d.ts'
import type { BasicAuthOptions } from './decorators/use_basic_auth.d.ts'
import type { QueryParamsOptions } from './decorators/use_query_params.d.ts'
import type { TimeoutOptions } from './decorators/use_timeout.d.ts'
import type { ErrorHandlingOptions } from './decorators/use_error_handling.d.ts'

export type FetchURL = URL | Request | string

export type FetchLike = (
  input: FetchURL,
  init?: RequestInit,
) => Promise<Response>

export type ResponseFetcher<O extends RequestInit> = {
  fetch: (
    url: FetchURL,
    options?: O,
  ) => Promise<Response>
}

export type JsonFetcher<O extends RequestInit> = {
  fetch: <T = unknown>(
    url: FetchURL,
    options?: O,
  ) => Promise<T>
}

export type FetcherConfig = {
  withAll?: boolean
  withJson?: boolean
  withDefaults?: boolean
  withBaseURL?: boolean
  withBearer?: boolean
  withBasicAuth?: boolean
  withQueryParams?: boolean
  withTimeout?: boolean
  withErrorHandling?: boolean
}

export type FectherAllOptions =
  & RequestInit
  & BaseURLOptions
  & BearerOptions
  & BasicAuthOptions
  & QueryParamsOptions
  & TimeoutOptions
  & ErrorHandlingOptions
