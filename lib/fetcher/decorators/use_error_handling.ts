import type { FetchURL, ResponseFetcher } from '../../types/fetcher.d.ts'
import { isJsonResponse } from './use_json_response.ts'
import { createError } from '../../../deps/x/http_errors.ts'

export type ErrorHandlingOptions = {
  abortController?: AbortController
}

export const useErrorHandling = <O extends RequestInit>(
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
    if (!response.ok) {
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
