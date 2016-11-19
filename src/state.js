import _ from 'lodash'
import assert from 'assert'

let _state = {}

export function initState(){
  _state = {}
}

export function setState(state){
  _state = {..._state, ...state}
}

export function getState(key, {dflt}={}){
  return key ? _.get(_state, key, dflt) : _state
}

export function getRequiredState(key){
  assert(_.has(_state, key))
  return getState(key)
}

export function unsetState(key) {
  _.unset(_state, key)
}
