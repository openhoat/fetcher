import type { BaseURLOptions, JsonFetcher, JsonOptions } from '../../mod.ts'
import { Fetcher } from '../../mod.ts'

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
