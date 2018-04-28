import http from 'http'
import assert from 'assert'

import { port } from '../config'
import '../src/server'

describe('Express server', () => {
  it('should return 200 status', done => {
    http.get(`http://127.0.0.1:${port}`, res => {
      assert.equal(200, res.statusCode)
      done()
    })
  })
})
