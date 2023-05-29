import type { FetchURL, ResponseFetcher } from '../../types/fetcher.d.ts'

export type TimeoutOptions = {
  timeout?: number
}

export const withTimeout = <O extends RequestInit>(
  fetcher?: ResponseFetcher<O>,
): ResponseFetcher<O & TimeoutOptions> => ({
  fetch: async (
    url: FetchURL,
    options?: O & TimeoutOptions,
  ) => {
    const timeout = options?.timeout ?? 5000
    const controller = new AbortController()
    let isTimedOut: true | undefined
    const timer = setTimeout(() => {
      isTimedOut = true
    }, timeout)
    try {
      const response = await (fetcher?.fetch ?? fetch)(
        url,
        { ...options, signal: controller.signal } as O,
      )
      if (isTimedOut) {
        await response.body?.cancel()
        throw new Error(`Connection timeout (trying to fetch ${url})`)
      }
      return response
    } finally {
      clearTimeout(timer)
    }
  },
})
