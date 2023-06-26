[![deno module](https://shield.deno.dev/x/fetcher)](https://deno.land/x/fetcher)
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/fetcher/mod.ts)
[![CI](https://github.com/openhoat/fetcher/actions/workflows/build.yml/badge.svg)](https://github.com/openhoat/fetcher/actions/workflows/build.yml)
[![codecov](https://codecov.io/gh/openhoat/fetcher/branch/main/graph/badge.svg?token=VFJ63YUYY0)](https://app.codecov.io/openhoat/openhoat/fetcher)
[![vr scripts](https://badges.velociraptor.run/flat.svg)](https://velociraptor.run)
[![license](https://img.shields.io/github/license/openhoat/fetcher)](https://github.com/openhoat/fetcher/blob/master/LICENSE)

# Fetcher

Friendly fetch with full capabilities.

## Getting started

Use a fetch-like function with extra [features](#features), thanks to provided
decorators.

```typescript
import { Fetcher } from 'https://deno.land/x/fetcher/mod.ts'

type Data = { name: string; username: string }

const email = 'Lucio_Hettinger@annie.ca'

const baseURL = 'https://jsonplaceholder.typicode.com'
const fetcher = Fetcher({ baseURL })
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

- [x] [Base URL](https://deno.land/x/fetcher/mod.ts?s=withFetcherBaseURL) :
  - add the ability to set a base URL and then use a simple relative value in
    `url`, usefull when fetch is used multiple times to request the same base
    URL (DRY).
  - add
    [`BaseURLOptions`](https://deno.land/x/fetcher@0.1.0/mod.ts?s=BaseURLOptions)
    support to fetch options.
- [x] [Basic auth](https://deno.land/x/fetcher/mod.ts?s=withFetcherBasicAuth) :
  - add authentication ability based on Basic Auth credentials
  - add
    [`BasicAuthOptions`](https://deno.land/x/fetcher@0.1.0/mod.ts?s=BasicAuthOptions)
    support to fetch options.
- [x] [Bearer](https://deno.land/x/fetcher/mod.ts?s=withFetcherBearer) :
  - add authentification ability based on a token in request header
  - add
    [`BearerOptions`](https://deno.land/x/fetcher@0.1.0/mod.ts?s=BearerOptions)
    support to fetch options.
- [x] [Defaults](https://deno.land/x/fetcher/mod.ts?s=withFetcherDefaults) :
  - add ability to set default options at Fetcher creation.
- [x] [Error handling](https://deno.land/x/fetcher/mod.ts?s=withFetcherErrorHandling)
      :
  - add error throwing abilitty when a response send an HTTP error
  - add
    [`ErrorHandlingOptions`](https://deno.land/x/fetcher@0.1.0/mod.ts?s=ErrorHandlingOptions)
    support to fetch options.
- [x] [JSON response & payload](https://deno.land/x/fetcher/mod.ts?s=withFetcherJsonResponse)
      :
  - add support for JSON response and JSON payload
  - return the response body object (JSON data) instead of a `Response`
  - add [`JsonOptions`](https://deno.land/x/fetcher@0.1.0/mod.ts?s=JsonOptions)
    support to fetch options.
- [x] [Query params](https://deno.land/x/fetcher/mod.ts?s=withFetcherQueryParams)
      :
  - add support for request query parameters as a plain object
  - add
    [`QueryParamsOptions`](https://deno.land/x/fetcher@0.1.0/mod.ts?s=QueryParamsOptions)
    support to fetch options.
- [x] [Timeout](https://deno.land/x/fetcher/mod.ts?s=withFetcherTimeout) :
  - add a timeout feature, aborting the request whenever the server did not
    respond until the specified duration
  - add
    [`TimeoutOptions`](https://deno.land/x/fetcher@0.1.0/mod.ts?s=TimeoutOptions)
    support to fetch options.

## Usecases

`Fetcher()` returns a fetcher object decorated with all the decorators, enabling
all the features in one.

If you don't need all the features, feel free to customize your fetcher instance
with the decorators you want with `defaultOptions` and `config` arguments.

Examples :

- POST a JSON payload with a base URL

  ```typescript
  import type {
    BaseURLOptions,
    JsonFetcher,
    JsonOptions,
  } from 'https://deno.land/x/fetcher/mod.ts'
  import { Fetcher } from 'https://deno.land/x/fetcher/mod.ts'

  const baseURL = 'https://dummyjson.com'
  const username = 'kminchelle'
  const password = '0lelplR'

  const fetcher = Fetcher<
    JsonFetcher<BaseURLOptions & JsonOptions & RequestInit>
  >(
    { baseURL },
    {
      withBaseURL: true,
      withDefaults: true,
      withJson: true,
    },
  )

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
    method: 'POST',
    json: { username, password },
  })

  console.log('data:', data)
  ```

## License

The [MIT License](LICENSE)
