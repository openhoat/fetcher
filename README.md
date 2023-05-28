[![deno module](https://shield.deno.dev/x/fetcher)](https://deno.land/x/fetcher)
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/fetcher/mod.ts)
[![CI](https://github.com/openhoat/fetcher/actions/workflows/build.yml/badge.svg)](https://github.com/openhoat/fetcher/actions/workflows/build.yml)
[![codecov](https://codecov.io/gh/openhoat/fetcher/branch/main/graph/badge.svg?token=VFJ63YUYY0)](https://app.codecov.io/openhoat/openhoat/fetcher)
[![license](https://img.shields.io/github/license/openhoat/fetcher)](https://github.com/openhoat/fetcher/blob/master/LICENSE)

# Fetcher

Decorators for a more friendly fetch.

## Getting started

Thanks to provided decorators, use a fetch-like with extra features: baseURL, query params, timeout, json response…

```typescript
import { decoratedFetcher } from 'https://deno.land/x/fetcher/mod.ts'

type Data = { name: string; username: string }

const email = 'Lucio_Hettinger@annie.ca'

const baseURL = 'https://jsonplaceholder.typicode.com'
const fetcher = decoratedFetcher<Data[]>()
try {
  console.log('Fetching /users from jsonplaceholder…')
  const data: Data[] = await fetcher.fetch(
    '/users',
    { baseURL, query: { email }, timeout: 5000 },
  )
  const { name, username } = data[0]
  console.log('Success!')
  console.log('Result:', { name, username })
} catch (err) {
  console.error(err)
}
```

## Features

- [x] Base URL
- [x] Basic auth
- [x] Bearer
- [x] Defaults
- [x] Error handling
- [x] JSON response
- [x] Query params
- [x] Timeout

## License

The [MIT License](LICENSE)
