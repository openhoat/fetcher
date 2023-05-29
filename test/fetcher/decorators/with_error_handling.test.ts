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
import { HttpError } from '../../../deps/x/http_errors.ts'
import { withErrorHandling } from '../../../src/fetcher/decorators/with_error_handling.ts'
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
  describe('withErrorHandling', () => {
    it('should return an object given requesting a json endpoint', async () => {
      const fetcher = withErrorHandling()
      const response: Response = await fetcher.fetch(`${baseURL}/`)
      const data = await response.json()
      expect(data).toEqual({ foo: 'bar' })
    })
    it('should throw an error given requesting a not found resource', async () => {
      const fetcher = withErrorHandling()
      let error: Error | undefined
      try {
        await fetcher.fetch(`${baseURL}/bad/resource/path`)
      } catch (err) {
        error = err
      }
      expect(error).toBeInstanceOf(HttpError)
      expect(error).toHaveProperty('status') //, 404)
      expect(error?.message).toEqual(
        `Resource 'GET ${baseURL}/bad/resource/path' not found.`,
      )
    })
    it('should throw an error given an internal error with text content', async () => {
      const fetcher = withErrorHandling()
      let error: Error | undefined
      try {
        await fetcher.fetch(`${baseURL}/error/text`)
      } catch (err) {
        error = err
      }
      expect(error).toBeInstanceOf(HttpError) // InternalServerError
      expect(error?.message).toEqual('Internal Server Error')
    })
  })
})

run()
