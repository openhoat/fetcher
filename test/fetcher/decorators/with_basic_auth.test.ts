import type { WebServerable } from '../../deps/x/precise.ts'
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  run,
} from '../../deps/x/tincan.ts'
import { withBasicAuth } from '../../../src/fetcher/decorators/with_basic_auth.ts'
import { FakeWebServer } from '../../fake_web_server.ts'
import { toConnectableHostname } from '../../utils/helper.ts'

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
  describe('withBasicAuth', () => {
    it('should return an object given valid basic auth credentials', async () => {
      const fetcher = withBasicAuth()
      response = await fetcher.fetch(`${baseURL}/basicauth`, {
        username: 'john',
        password: 'password',
      })
      expect(response.ok).toBe(true)
      const data = await response.json()
      expect(data).toEqual({ foo: 'bar' })
    })
    it('should throw an error given no basic auth credentials', async () => {
      const fetcher = withBasicAuth()
      response = await fetcher.fetch(`${baseURL}/basicauth`)
      expect(response.ok).toBe(false)
      expect(response.status).toBe(401)
      expect(response.statusText).toEqual('Unauthorized')
    })
    it('should throw an error given not valid basic auth credentials', async () => {
      const fetcher = withBasicAuth()
      response = await fetcher.fetch(`${baseURL}/basicauth`, {
        username: 'bill',
        password: 'badpassword',
      })
      expect(response.ok).toBe(false)
      expect(response.status).toBe(401)
      expect(response.statusText).toEqual('Unauthorized')
    })
  })
})

run()
