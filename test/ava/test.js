import test from 'ava'
import config from 'config'
import {getUrl} from '../../src'

test('getUrl', (t)=>{
  const path = '/foo/bar'
  t.is(getUrl(path), `http://localhost:${config.get('listener.port')}${path}`)
})

test('getUrl: context', (t)=>{
  const context = {bar: 'baz'}
  t.is(getUrl('/foo/${bar}', {context}), `http://localhost:${config.get('listener.port')}/foo/baz`)
})
