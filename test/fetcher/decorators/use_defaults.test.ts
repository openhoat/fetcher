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
import { useDefaults } from '../../../lib/fetcher/decorators/use_defaults.ts'

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
  describe('withDefaults', () => {
    it('should return headers given defaults', async () => {
      const fetcher = useDefaults({
        headers: {
          'x-custom-header': 'mycustomvalue',
        },
      })()
      const response = await fetcher.fetch(`${baseURL}/custom-header`)
      expect(response.ok).toBe(true)
      const data = await response.json()
      expect(data).toEqual({ value: 'mycustomvalue' })
    })
  })
})

run()
