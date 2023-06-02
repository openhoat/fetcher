import { describe, expect, it, run } from '../../deps/test/x/tincan.ts'
import { toURL } from '../../lib/utils/helper.ts'

describe('helper', () => {
  describe('toURL', () => {
    it('should return an URL given a Request', () => {
      // Given
      const urlString = 'http://myhostname.local.io/foo/bar'
      const request = new Request(urlString)
      // When
      const url = toURL(request)
      // Then
      expect(url.toString()).toEqual(urlString)
    })
  })
})

run()
