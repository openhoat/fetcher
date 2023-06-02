import type { FetchURL, ResponseFetcher } from '../../types/fetcher.d.ts'
import { ErrorHandlingOptions } from './use_error_handling.ts'

export type TimeoutOptions = {
  timeout?: number
  abortController?: AbortController
}

export const DEFAULT_TIMEOUT = 5000

export const useTimeout = <O extends RequestInit>(
  fetcher?: ResponseFetcher<O>,
): ResponseFetcher<O & TimeoutOptions> => ({
  fetch: async (
    url: FetchURL,
    options?: O & TimeoutOptions,
  ) => {
    const timeout = options?.timeout ?? DEFAULT_TIMEOUT
    const hasAbortController = !!options?.abortController
    const abortController = options?.abortController ?? new AbortController()
    if (!hasAbortController) {
      abortController.signal.throwIfAborted()
    }
    const timer = setTimeout(() => {
      abortController.abort(
        new Error(`Connection timeout (trying to fetch ${url})`),
      )
    }, timeout)
    try {
      return await (fetcher?.fetch ?? fetch)(
        url,
        { ...options, abortController, signal: abortController.signal } as
          & O
          & ErrorHandlingOptions,
      )
    } finally {
      clearTimeout(timer)
    }
  },
})
