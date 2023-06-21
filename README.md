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

- [x] [Base URL](https://deno.land/x/fetcher/mod.ts?s=useBaseURL)
- [x] [Basic auth](https://deno.land/x/fetcher/mod.ts?s=useBasicAuth)
- [x] [Bearer](https://deno.land/x/fetcher/mod.ts?s=useBearer)
- [x] [Defaults](https://deno.land/x/fetcher/mod.ts?s=useDefaults)
- [x] [Error handling](https://deno.land/x/fetcher/mod.ts?s=useErrorHandling)
- [x] [JSON response & payload](https://deno.land/x/fetcher/mod.ts?s=useJsonResponse)
- [x] [Query params](https://deno.land/x/fetcher/mod.ts?s=useQueryParams)
- [x] [Timeout](https://deno.land/x/fetcher/mod.ts?s=useTimeout)

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
      useBaseURL: true,
      useDefaults: true,
      useJson: true,
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
