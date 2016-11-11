import test from 'ava'
import assert from 'assert'
import {evalInContext} from '../../src/test-helpr'
import foo from '../src/foo'

assert.equal(foo('bar'), 'foo:bar')

test('evalInContext: function', (t)=>{
  t.is(evalInContext(
    {
      js: 'foo("bar")',
      context: {foo}
    }
  ), 'foo:bar')
})

test('evalInContext: object', (t)=>{
  t.deepEqual(evalInContext(
    {
      js: '{foo: foo("bar")}',
      context: {foo}
    }
  ),
  {foo: 'foo:bar'})
})

test('evalInContext: array', (t)=>{
  t.deepEqual(evalInContext(
    {
      js: '[foo("bar")]',
      context: {foo}
    }
  ),
  ['foo:bar'])
})

test('evalInContext: string-template', (t)=>{
  t.is(evalInContext(
    {
      js: '`#${foo("bar")}`',
      context: {foo}
    }
  ),
  '#foo:bar')
})
