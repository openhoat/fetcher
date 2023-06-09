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
import { withFetcherTimeout } from '../../../lib/fetcher/decorators/with_fetcher_timeout.ts'
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
  describe('withFetcherTimeout', () => {
    it('should return an object given default timeout', async () => {
      const fetcher = withFetcherTimeout()
      const response: Response = await fetcher.fetch(`${baseURL}/timeout/500`)
      expect(response.ok).toBe(true)
      const data = await response.json()
      expect(data).toEqual({ foo: 'bar' })
    })
    it('should return an object given a timeout of 1000ms', async () => {
      const fetcher = withFetcherTimeout()
      const response: Response = await fetcher.fetch(`${baseURL}/timeout/500`, {
        timeout: 1000,
      })
      expect(response.ok).toBe(true)
      const data = await response.json()
      expect(data).toEqual({ foo: 'bar' })
    })
    it('should throw an error given requesting timedout', async () => {
      const fetcher = withFetcherTimeout()
      let error: Error | undefined
      try {
        await fetcher.fetch(`${baseURL}/timeout/500`, { timeout: 200 })
      } catch (err) {
        error = err
      }
      expect(error).toBeInstanceOf(Error)
      expect(error?.message).toEqual(
        `Connection timeout (trying to fetch ${baseURL}/timeout/500)`,
      )
    })
  })
})

run()
