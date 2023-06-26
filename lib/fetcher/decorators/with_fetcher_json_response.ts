import type { JsonOptions } from '../../types/fetcher/decorators/use_json_response.d.ts'
import type {
  FetchURL,
  JsonFetcher,
  ResponseFetcher,
} from '../../types/fetcher/fetcher.d.ts'
import { isJsonResponse } from '../../utils/helper.ts'

export const JSON_MIME_TYPE = 'application/json'

export const withFetcherJsonResponse = <O extends RequestInit>(
  fetcher?: ResponseFetcher<O & JsonOptions>,
): JsonFetcher<O & JsonOptions> => ({
  fetch: async <T>(url: FetchURL, options?: O & JsonOptions) => {
    const headers = new Headers(options?.headers)
    headers.append('Accept', JSON_MIME_TYPE)
    let body = options?.body
    // TODO: do same with form
    if (typeof options?.json !== 'undefined') {
      body = JSON.stringify(options.json)
      headers.append('Content-Type', JSON_MIME_TYPE)
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
