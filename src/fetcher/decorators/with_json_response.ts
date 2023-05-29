import type {
  FetchURL,
  JsonFetcher,
  ResponseFetcher,
} from '../../types/fetcher.d.ts'
import type { JSONValue } from '../../types/json.d.ts'

export const isJsonResponse = (response: Response) =>
  response.headers.get('Content-Type')?.includes(
    'application/json',
  )

export type JsonOptions = { json?: JSONValue }

export const withJsonResponse = <O extends RequestInit>(
  fetcher?: ResponseFetcher<O & JsonOptions>,
): JsonFetcher<O & JsonOptions> => ({
  fetch: async <T>(url: FetchURL, options?: O & JsonOptions) => {
    const headers: HeadersInit = new Headers(options?.headers)
    headers.append('Accept', 'application/json')
    let body = options?.body
    if (typeof options?.json !== 'undefined') {
      body = JSON.stringify(options.json)
      headers.append('Content-Type', 'application/json')
    }
    let errorResponse: undefined | Response
    try {
      const response = await (fetcher?.fetch ?? fetch)(url, {
        ...options as O,
        headers,
        body,
      })
      errorResponse = response
      if (!isJsonResponse(response)) {
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
