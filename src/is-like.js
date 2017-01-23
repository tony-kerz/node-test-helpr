import _ from 'lodash'
import debug from 'debug'
import stringify from 'fast-safe-stringify'

const dbg = debug('app:is-like')
const assertRe = /^assert\((.+)\)$/

// eslint-disable-next-line import/prefer-default-export
export function isLike({expected, actual}) {
  let result
  let match
  if (_.isArray(expected)) {
    result = isArrayLike({expected, actual})
  } else if (_.isObject(expected)) {
    result = isObjectLike({expected, actual})
    // eslint-disable-next-line no-cond-assign
  } else if (match = assertRe.exec(expected)) {
    dbg('is-like: encountered assert=%o', match[1])
    // eslint-disable-next-line no-eval
    result = eval(match[1])
  } else {
    result = expected === actual
  }
  dbg('is-like: expected=%o, actual=%o, result=%o', stringify(expected), stringify(actual), result)
  return result
}

function isArrayLike({expected, actual}) {
  return (
    _.isArray(actual) &&
    (expected.length === actual.length) &&
    _.every(expected, (elt, index) => {
      return isLike({expected: elt, actual: actual[index]})
    })
  )
}

function isObjectLike({expected, actual}) {
  return (
    _.isObject(actual) &&
    _.every(expected, (elt, key) => {
      return isLike({expected: elt, actual: actual[key]})
    })
  )
}
