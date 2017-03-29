import assert from 'assert'
import _ from 'lodash'

/* eslint-disable camelcase */
var __helpr_state__ = {}

export function initState() {
  __helpr_state__ = {}
}

export function setState(state) {
  __helpr_state__ = {...__helpr_state__, ...state}
}

export function getState(key, {dflt} = {}) {
  return key ? _.get(__helpr_state__, key, dflt) : __helpr_state__
}

export function getRequiredState(key) {
  assert(_.has(__helpr_state__, key))
  return getState(key)
}

export function unsetState(key) {
  _.unset(__helpr_state__, key)
}
