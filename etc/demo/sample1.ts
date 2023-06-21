import { Fetcher } from '../../mod.ts'

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
