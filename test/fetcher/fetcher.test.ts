import type { WebServerable } from '../../deps/test/x/precise.ts'
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  run,
} from '../../deps/test/x/tincan.ts'
import { FakeWebServer } from '../fake_web_server.ts'
import { toConnectableHostname } from '../utils/test_helper.ts'
import { Fetcher } from '../../lib/fetcher/fetcher.ts'
import { HttpError } from '../../deps/x/http_errors.ts'

describe('fetcher', () => {
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
  describe('Fetcher', () => {
    it('should return an object given requesting a json endpoint', async () => {
      const fetcher = Fetcher()
      const data = await fetcher.fetch(baseURL)
      expect(data).toEqual({ foo: 'bar' })
    })
    it('should return an object given requesting a json endpoint and baseURL', async () => {
      const fetcher = Fetcher()
      const data = await fetcher.fetch(
        '',
        { baseURL },
      )
      expect(data).toEqual({ foo: 'bar' })
    })
    it('should return an object given valid basic auth credentials', async () => {
      const fetcher = Fetcher()
      const data = await fetcher.fetch('/basicauth', {
        baseURL,
        username: 'john',
        password: 'password',
      })
      expect(data).toEqual({ foo: 'bar' })
    })
    it('should throw an error given requesting a not found resource', async () => {
      const fetcher = Fetcher()
      let error: Error | undefined
      try {
        await fetcher.fetch('/bad/resource/path', { baseURL })
      } catch (err) {
        error = err
      }
      expect(error).toBeInstanceOf(HttpError)
      expect(error).toHaveProperty('status') //, 404)
      expect(error?.message).toEqual(
        `Resource 'GET ${baseURL}/bad/resource/path' not found.`,
      )
    })
    it('should return an object given query params', async () => {
      const fetcher = Fetcher()
      const data = await fetcher.fetch('/query', {
        baseURL,
        query: { foo: 'bar' },
      })
      expect(data).toEqual({ foo: 'bar' })
    })
    it('should throw an error given requesting timedout', async () => {
      const fetcher = Fetcher()
      let error: Error | undefined
      try {
        await fetcher.fetch('/timeout/500', {
          baseURL,
          timeout: 100,
        })
      } catch (err) {
        error = err
      }
      expect(error).toBeInstanceOf(Error)
      expect(error?.message).toEqual(
        `Connection timeout (trying to fetch ${baseURL}/timeout/500)`,
      )
    })
    it('should return headers given defaults', async () => {
      const fetcher = Fetcher({
        headers: {
          'x-custom-header': 'mycustomvalue',
        },
      })
      const data = await fetcher.fetch<Record<string, string>>(
        '/custom-header',
        {
          baseURL,
          query: { foo: 'bar' },
        },
      )
      expect(data).toEqual({ value: 'mycustomvalue' })
    })
    it('should return an object given valid bearer', async () => {
      const fetcher = Fetcher()
      const data = await fetcher.fetch<Record<string, string>>('/bearer', {
        baseURL,
        token: 'mybearertoken',
      })
      expect(data).toEqual({ foo: 'bar' })
    })
  })
})

run()
