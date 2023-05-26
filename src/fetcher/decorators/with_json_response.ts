import type {
  JsonFetcher,
  ResponseFetcher,
} from '../../types/utils/fetcher.d.ts'

export const isJson = (response: Response) =>
  response.headers.get('Content-Type')?.includes(
    'application/json',
  )

export const withJsonResponse = <O extends RequestInit>(
  fetcher: ResponseFetcher<O>,
): JsonFetcher<O> => ({
  fetch: async <T>(url: string, options?: O) => {
    const headers = options?.headers
    let errorResponse: undefined | Response
    try {
      const response = await fetcher.fetch(url, {
        ...options as O,
        headers: { ...headers, 'Accept': 'application/json' },
      })
      errorResponse = response
      if (!isJson(response)) {
        throw new Error('Response is not JSON')
      }
      return await response.json() as T
    } finally {
      if (errorResponse?.body?.locked === false) {
        await errorResponse?.body?.cancel()
      }
    }
  },
})
