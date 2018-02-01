import { handleActions, combineActions } from 'redux-actions'
import { combineReducers } from 'redux'
import { pending, resolve, reject } from '../utilities/actionConst'
import { FETCH_ASSIGNMENT } from './actions'

const REQUEST_ASSIGNMENT_FINISHED = combineActions(resolve(FETCH_ASSIGNMENT)
  , reject(FETCH_ASSIGNMENT))

const loading = handleActions({
  [pending(FETCH_ASSIGNMENT)]: () => true,
  [REQUEST_ASSIGNMENT_FINISHED]: () => false,
}, false)

const assignments = handleActions({
  [resolve(FETCH_ASSIGNMENT)]: (state, { payload }) => payload,
}, [])

export default combineReducers({
  loading,
  assignments,
})
