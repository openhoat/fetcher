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
import { FakeWebServer } from '../../fake_web_server.ts'
import { toConnectableHostname } from '../../utils/helper.ts'
import { useBearer } from '../../../lib/fetcher/decorators/use_bearer.ts'

describe('fetcher decorators', () => {
  let fakeWebServer: WebServerable
  let baseURL: string
  let response: Response
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
    if (response?.body?.locked === false) {
      await response?.body?.cancel()
    }
    await fakeWebServer.stop()
  })
  describe('withBearer', () => {
    it('should return an object given valid bearer', async () => {
      const fetcher = useBearer()
      response = await fetcher.fetch(`${baseURL}/bearer`, {
        token: 'mybearertoken',
      })
      expect(response.ok).toBe(true)
      const data = await response.json()
      expect(data).toEqual({ foo: 'bar' })
    })
    it('should throw an error given no bearer', async () => {
      const fetcher = useBearer()
      response = await fetcher.fetch(`${baseURL}/bearer`)
      expect(response.ok).toBe(false)
      expect(response.status).toBe(401)
      expect(response.statusText).toEqual('Unauthorized')
    })
    it('should throw an error given not valid bearer', async () => {
      const fetcher = useBearer()
      response = await fetcher.fetch(`${baseURL}/bearer`, {
        token: 'badtoken',
      })
      expect(response.ok).toBe(false)
      expect(response.status).toBe(401)
      expect(response.statusText).toEqual('Unauthorized')
    })
  })
})

run()
