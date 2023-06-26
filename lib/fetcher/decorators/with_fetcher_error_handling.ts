import type { ErrorHandlingOptions } from '../../types/fetcher/decorators/use_error_handling.d.ts'
import type {
  FetchURL,
  ResponseFetcher,
} from '../../types/fetcher/fetcher.d.ts'
import { createError } from '../../../deps/x/http_errors.ts'
import { isJsonResponse } from '../../utils/helper.ts'

export const withFetcherErrorHandling = <O extends RequestInit>(
  fetcher?: ResponseFetcher<O>,
): ResponseFetcher<O & ErrorHandlingOptions> => ({
  fetch: async (
    url: FetchURL,
    options?: O & ErrorHandlingOptions,
  ) => {
    const hasAbortController = !!options?.abortController
    const abortController = options?.abortController ?? new AbortController()
    if (!hasAbortController) {
      abortController.signal.throwIfAborted()
    }
    const response = await (fetcher?.fetch ?? fetch)(
      url,
      { ...options, abortController, signal: abortController.signal } as
        & O
        & ErrorHandlingOptions,
    )
    if (response.status >= 400) {
      try {
        const body = isJsonResponse(response)
          ? await response.json()
          : undefined
        const message = body?.message || response.statusText
        throw createError(response.status, message, body)
      } finally {
        abortController.abort()
      }
    }
    return response
  },
})
