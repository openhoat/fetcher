[![deno module](https://shield.deno.dev/x/fetcher)](https://deno.land/x/fetcher)
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/fetcher/mod.ts)
[![CI](https://github.com/openhoat/fetcher/actions/workflows/build.yml/badge.svg)](https://github.com/openhoat/fetcher/actions/workflows/build.yml)
[![codecov](https://codecov.io/gh/openhoat/fetcher/branch/main/graph/badge.svg?token=VFJ63YUYY0)](https://app.codecov.io/openhoat/openhoat/fetcher)
[![vr scripts](https://badges.velociraptor.run/flat.svg)](https://velociraptor.run)
[![license](https://img.shields.io/github/license/openhoat/fetcher)](https://github.com/openhoat/fetcher/blob/master/LICENSE)

# Fetcher

Decorators for a more friendly fetch.

## Getting started

Thanks to provided decorators, use a fetch-like with extra features: baseURL,
query params, timeout, json response…

```typescript
import { decoratedFetcher } from 'https://deno.land/x/fetcher/mod.ts'

type Data = { name: string; username: string }

const email = 'Lucio_Hettinger@annie.ca'

const baseURL = 'https://jsonplaceholder.typicode.com'
const fetcher = decoratedFetcher<Data[]>({ baseURL })
try {
  console.log('Fetching /users from jsonplaceholder…')
  const data: Data[] = await fetcher.fetch(
    '/users',
    { query: { email }, timeout: 5000 },
  )
  const { name, username } = data[0]
  console.log('Success!')
  console.log('Result:', { name, username })
} catch (err) {
  console.error(err)
}
```

## Features

- [x] [Base URL](https://deno.land/x/fetcher/mod.ts?s=withBaseURL)
- [x] [Basic auth](https://deno.land/x/fetcher/mod.ts?s=withBasicAuth)
- [x] [Bearer](https://deno.land/x/fetcher/mod.ts?s=withBearer)
- [x] [Defaults](https://deno.land/x/fetcher/mod.ts?s=withDefaults)
- [x] [Error handling](https://deno.land/x/fetcher/mod.ts?s=withErrorHandling)
- [x] [JSON response & payload](https://deno.land/x/fetcher/mod.ts?s=withJsonResponse)
- [x] [Query params](https://deno.land/x/fetcher/mod.ts?s=withQueryParams)
- [x] [Timeout](https://deno.land/x/fetcher/mod.ts?s=withTimeout)

## Usecases

The decoratedFetcher object is decorated with all the decorators, enabling all
the features in one.

If you don't need all the features, feel free to customize your fetcher instance
with the decorators you want.

Examples :

- POST a JSON payload with a base URL

  ```typescript
  import {
    withBaseURL,
    withJsonResponse,
  } from 'https://deno.land/x/fetcher/mod.ts'

  const baseURL = 'https://dummyjson.com'
  const username = 'kminchelle'
  const password = '0lelplR'

  const fetcher = withJsonResponse(withBaseURL())

  type Data = {
    id: number
    username: string
    email: string
    firstName: string
    lastName: string
    gender: string
    image: string
    token: string
  }

  const data = await fetcher.fetch<Data>('/auth/login', {
    baseURL,
    method: 'POST',
    json: { username, password },
  })

  console.log('data:', data)
  ```

## License

The [MIT License](LICENSE)
