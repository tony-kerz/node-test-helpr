import test from 'ava'
import config from 'config'
import {getUrl, chill} from '../../src'

test('getUrl', t => {
  const path = '/foo/bar'
  t.is(getUrl(path), `http://localhost:${config.get('listener.port')}${path}`)
})

test('getUrl: context', t => {
  const context = {bar: 'baz'}
  // eslint-disable-next-line no-template-curly-in-string
  t.is(getUrl('/foo/${bar}', {context}), `http://localhost:${config.get('listener.port')}/foo/baz`)
})

test('chill', async t => {
  const resolution = 'foo'
  const _resolution = await chill({resolution})
  t.is(_resolution, resolution)
})
