import assert from 'assert'
import vm from 'vm'
import debug from 'debug'

export * from './state'
export * from './is-like'

const dbg = debug('app:test-helpr')

export function asTemplate(value) {
  return '`' + value + '`'
}

export function evalInContext({js, context}) {
  // eslint-disable-next-line new-cap
  return new vm.Script(`(${js})`).runInContext(new vm.createContext(context))
}

export async function chill({millis = 0, resolution, rejection = 'doh!'}) {
  dbg('chill: millis=%o, resolution=%o, rejection=%o', millis, resolution, rejection)
  const promise = new Promise(
    (resolve, reject) => {
      setTimeout(
        () => {
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

export function getUrl(path, {context, port} = {}) {
  assert(path, 'path required')
  assert(port, 'port required')
  return `http://localhost:${port}${evalInContext({js: asTemplate(path), context})}`
}

export function requireUncached(module) {
  delete require.cache[require.resolve(module)]
  // eslint-disable-next-line import/no-dynamic-require
  return require(module)
}
