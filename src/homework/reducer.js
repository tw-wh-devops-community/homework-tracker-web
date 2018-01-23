import { handleActions, combineActions } from 'redux-actions'
import { combineReducers } from 'redux'
import { pending, resolve, reject } from '../utilities/actionConst'
import { FETCH_HOMEWORK } from './actions'

const REQUEST_HOMEWORK_FINISHED = combineActions(resolve(FETCH_HOMEWORK), reject(FETCH_HOMEWORK))

const loading = handleActions({
  [pending(FETCH_HOMEWORK)]: () => true,
  [REQUEST_HOMEWORK_FINISHED]: () => false,
}, false)

const homeworks = handleActions({
  [resolve(FETCH_HOMEWORK)]: (state, { payload }) => payload,
}, [])

export default combineReducers({
  loading,
  homeworks,
})
