import test from 'ava'
import config from 'config'
import {getUrl, chill} from '../../src'

test('getUrl', t => {
  const path = '/foo/bar'
  const port = config.get('listener.port')
  t.is(getUrl(path, {port}), `http://localhost:${port}${path}`)
})

test('getUrl: context', t => {
  const context = {bar: 'baz'}
  const port = config.get('listener.port')
  // eslint-disable-next-line no-template-curly-in-string
  t.is(getUrl('/foo/${bar}', {context, port}), `http://localhost:${port}/foo/baz`)
})

test('chill', async t => {
  const resolution = 'foo'
  const _resolution = await chill({resolution})
  t.is(_resolution, resolution)
})
