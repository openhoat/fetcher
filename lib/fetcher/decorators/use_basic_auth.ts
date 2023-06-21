import type { BasicAuthOptions } from '../../types/fetcher/decorators/use_basic_auth.d.ts'
import type {
  FetchURL,
  ResponseFetcher,
} from '../../types/fetcher/fetcher.d.ts'
import { encode } from '../../../deps/std/encoding.ts'

export const useBasicAuth = <O extends RequestInit>(
  fetcher?: ResponseFetcher<O>,
): ResponseFetcher<O & BasicAuthOptions> => ({
  fetch: (
    url: FetchURL,
    options?: O & BasicAuthOptions,
  ) => {
    const headers = new Headers(options?.headers)
    const { username, password = '', ...optionsWoCredentials } = options || {}
    const basicAuthValue = username && encode(`${username}:${password}`)
    if (basicAuthValue) {
      headers.set('Authorization', `Basic ${basicAuthValue}`)
    }
    return (fetcher?.fetch ?? fetch)(url, {
      ...optionsWoCredentials,
      headers,
    } as O)
  },
})
