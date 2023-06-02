import type { FetchURL, ResponseFetcher } from '../../types/fetcher.d.ts'
import { encode } from '../../../deps/std/encoding.ts'

export type BasicAuthOptions = {
  username?: string
  password?: string
}

export const useBasicAuth = <O extends RequestInit>(
  fetcher?: ResponseFetcher<O>,
): ResponseFetcher<O & BasicAuthOptions> => ({
  fetch: (
    url: FetchURL,
    options?: O & BasicAuthOptions,
  ) => {
    const headers = options?.headers
    const username = options?.username
    const password = options?.password ?? ''
    const basicAuthValue = username && encode(`${username}:${password}`)
    return (fetcher?.fetch ?? fetch)(url, {
      ...options,
      headers: basicAuthValue
        ? {
          ...headers,
          'Authorization': `Basic ${basicAuthValue}`,
        }
        : headers,
    } as O)
  },
})
