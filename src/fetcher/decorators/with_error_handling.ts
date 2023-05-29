import type { FetchURL, ResponseFetcher } from '../../types/fetcher.d.ts'
import { isJsonResponse } from './with_json_response.ts'
import { createError } from '../../../deps/x/http_errors.ts'

export const withErrorHandling = <O extends RequestInit>(
  fetcher?: ResponseFetcher<O>,
): ResponseFetcher<O> => ({
  fetch: async (
    url: FetchURL,
    options?: O,
  ) => {
    const controller = new AbortController()
    const response = await (fetcher?.fetch ?? fetch)(
      url,
      { ...options, signal: controller.signal } as O,
    )
    if (!response.ok) {
      try {
        const body = isJsonResponse(response)
          ? await response.json()
          : undefined
        const message = body?.message || response.statusText
        throw createError(response.status, message, body)
      } finally {
        controller.abort()
      }
    }
    return response
  },
})
