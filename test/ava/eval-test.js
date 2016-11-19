import test from 'ava'
import assert from 'assert'
import {evalInContext, asTemplate} from '../../src'
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

test('asTemplate', (t)=>{
  t.is(asTemplate('foo:${bar}'), '`foo:${bar}`')
})

test('evalInContext: asTemplate', (t)=>{
  const foo = asTemplate('bar')
  t.is(evalInContext(
    {
      js: foo
    }
  ),
  'bar')
})
