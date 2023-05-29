import { withBaseURL, withJsonResponse } from '../../mod.ts'

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
