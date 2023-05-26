import type { ResponseFetcher } from '../../types/utils/fetcher.d.ts'
import { encode } from '../../../deps/std/encoding.ts'

export type BasicAuthOptions = {
  username?: string
  password?: string
}

export const withBasicAuth = <O extends RequestInit>(
  fetcher: ResponseFetcher<O>,
): ResponseFetcher<O & BasicAuthOptions> => ({
  fetch: (
    url: string,
    options?: O & BasicAuthOptions,
  ) => {
    const headers = options?.headers
    const username = options?.username
    const password = options?.password ?? ''
    const basicAuthValue = username && encode(`${username}:${password}`)
    return fetcher.fetch(url, {
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
