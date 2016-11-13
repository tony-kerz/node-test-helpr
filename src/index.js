import _ from 'lodash'
import debug from 'debug'
import vm from 'vm'
const assertRe = /^assert\((.+)\)$/
const dbg = debug('test:test-helpr')

export function asTemplate(value) {
  return `\`${value}\``
}

export function evalInContext({js, context}) {
  return new vm.Script(`(${js})`).runInContext(new vm.createContext(context))
}

export function isLike({expected, actual}) {
  let result
  let match
  if (_.isArray(expected)) {
    result = isArrayLike({expected, actual})
  } else if (_.isObject(expected)) {
    result = isObjectLike({expected, actual})
  } else if (match = assertRe.exec(expected)) { // eslint-disable-line no-cond-assign
    dbg('is-like: encountered assert=%o', match[1])
    result = eval(match[1])
  } else {
    result = expected === actual
  }
  dbg('is-like: expected=%o, actual=%o, result=%o', JSON.stringify(expected), JSON.stringify(actual), result)
  return result
}

function isArrayLike({expected, actual}){
  return (
    _.isArray(actual) &&
    (expected.length == actual.length) &&
    _.every(expected, (elt, index)=>{return isLike({expected: elt, actual: actual[index]})})
  )
}

function isObjectLike({expected, actual}){
  return (
    _.isObject(actual) &&
    _.every(expected, (elt, key)=>{return isLike({expected: elt, actual: actual[key]})})
  )
}

export async function chill({millis=0, resolution, rejection='doh!'}){
  dbg('chill: millis=%o, resolution=%o, rejection=%o', millis, resolution, rejection)
  const promise = new Promise(
    (resolve, reject)=>{
      setTimeout(
        ()=>{
          dbg('chill: chilled for [%o] ms...', millis)
          if (resolution) {
            resolve(resolution)
          } else {
            reject(rejection)
          }
        },
        millis
      )
    }
  )
  return promise
}
