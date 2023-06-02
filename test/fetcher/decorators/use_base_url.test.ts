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
import { useBaseURL } from '../../../lib/fetcher/decorators/use_base_url.ts'
import { FakeWebServer } from '../../fake_web_server.ts'
import { toConnectableHostname } from '../../utils/helper.ts'

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
  describe('withBaseURL', () => {
    it('should return an object given requesting a json endpoint with a base URL', async () => {
      const fetcher = useBaseURL()
      const response = await fetcher.fetch(
        '/',
        { baseURL },
      )
      expect(response.ok).toBe(true)
      const data = await response.json()
      expect(data).toEqual({ foo: 'bar' })
    })
  })
})

run()
