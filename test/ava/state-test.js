import test from 'ava'
import {initState, getState, getRequiredState, setState, unsetState} from '../../src'

test.beforeEach(() => {
  initState()
})

test('initState', t => {
  setState({foo: 'bar'})
  initState()
  t.deepEqual(getState(), {})
})

test('setState', t => {
  const state = {foo: 'bar'}
  setState(state)
  t.deepEqual(getState(), state)
})

test('getState', t => {
  const state = {foo: 'bar'}
  setState(state)
  t.deepEqual(getState('foo'), state.foo)
})

test('getState: default', t => {
  const state = {foo: 'bar'}
  setState(state)
  const dflt = 'baz'
  t.deepEqual(getState('bar', {dflt}), dflt)
})

test('getRequiredState', t => {
  const state = {foo: 'bar'}
  setState(state)
  t.deepEqual(getRequiredState('foo'), state.foo)
  t.throws(() => {
    getRequiredState('bar')
  })
})

test('unsetState', t => {
  const state = {foo: 'bar'}
  setState(state)
  unsetState('foo')
  t.deepEqual(getState(), {})
})
