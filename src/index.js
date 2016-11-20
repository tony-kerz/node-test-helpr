import debug from 'debug'
import vm from 'vm'
import config from 'config'
export * from './state'
export * from './is-like'

const dbg = debug('app:test-helpr')

export function asTemplate(value) {
  return '`' + value + '`'
}

export function evalInContext({js, context}) {
  return new vm.Script(`(${js})`).runInContext(new vm.createContext(context))
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

export function getUrl(path, {context}={}){
  return `http://localhost:${config.get('listener.port')}${evalInContext({js: asTemplate(path), context})}`
}
