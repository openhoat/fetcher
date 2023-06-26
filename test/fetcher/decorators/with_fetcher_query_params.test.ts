import type { WebServerable } from '../../../deps/test/x/precise.ts'
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  run,
} from '../../../deps/test/x/tincan.ts'
import { withFetcherQueryParams } from '../../../lib/fetcher/decorators/with_fetcher_query_params.ts'
import { FakeWebServer } from '../../fake_web_server.ts'
import { toConnectableHostname } from '../../utils/test_helper.ts'

describe('fetcher decorators', () => {
  let fakeWebServer: WebServerable
  let baseURL: string
  beforeAll(() => {
    fakeWebServer = new FakeWebServer()
  })
  beforeEach(async () => {
    await fakeWebServer.start()
    baseURL = `http://${
      toConnectableHostname(fakeWebServer.hostname)
    }:${fakeWebServer.port}`
  })
  afterEach(async () => {
    await fakeWebServer.stop()
  })
  describe('withFetcherQueryParams', () => {
    it('should return an empty object given no query param', async () => {
      const fetcher = withFetcherQueryParams()
      const response: Response = await fetcher.fetch(`${baseURL}/query`)
      expect(response.ok).toBe(true)
      const data = await response.json()
      expect(data).toEqual({})
    })
    it('should return an object given query params', async () => {
      const fetcher = withFetcherQueryParams()
      const response: Response = await fetcher.fetch(`${baseURL}/query`, {
        query: { foo: 'bar' },
      })
      expect(response.ok).toBe(true)
      const data = await response.json()
      expect(data).toEqual({ foo: 'bar' })
    })
  })
})

run()
