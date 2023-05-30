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
import { withJsonResponse } from '../../../src/fetcher/decorators/with_json_response.ts'
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
  describe('withJsonResponse', () => {
    it('should return an object given requesting a json endpoint', async () => {
      const fetcher = withJsonResponse()
      const data = await fetcher.fetch(`${baseURL}/`)
      expect(data).toEqual({ foo: 'bar' })
    })
    it('should throw an error given requesting a not json endpoint', async () => {
      const fetcher = withJsonResponse()
      let error: Error | undefined
      try {
        await fetcher.fetch(`${baseURL}/text`)
      } catch (err) {
        error = err
      }
      expect(error).toBeInstanceOf(Error)
      expect(error?.message).toEqual('Response is not JSON')
    })
    it('should post a json payload', async () => {
      const fetcher = withJsonResponse()
      const data = await fetcher.fetch(`${baseURL}/json`, {
        method: 'POST',
        json: { foo: 'bar' },
      })
      expect(data).toEqual({ foo: 'bar' })
    })
  })
})

run()
