import { handleActions, combineActions } from 'redux-actions'
import { combineReducers } from 'redux'
import { pending, resolve, reject } from '../utilities/actionConst'
import { FETCH_HONOR_ROLLS_BY_SPEED, FETCH_HONOR_ROLLS_BY_QUANTITY } from './actions'


const REQUEST_HONOR_ROLLS_BY_SPEED_FINISHED =
  combineActions(resolve(FETCH_HONOR_ROLLS_BY_SPEED)
  , reject(FETCH_HONOR_ROLLS_BY_SPEED))

const REQUEST_HONOR_ROLLS_BY_QUANTITY_FINISHED =
  combineActions(resolve(FETCH_HONOR_ROLLS_BY_QUANTITY)
  , reject(FETCH_HONOR_ROLLS_BY_QUANTITY))

const loading = handleActions({
  [pending(FETCH_HONOR_ROLLS_BY_QUANTITY)]: () => true,
  [pending(FETCH_HONOR_ROLLS_BY_SPEED)]: () => true,
  [REQUEST_HONOR_ROLLS_BY_QUANTITY_FINISHED]: () => false,
  [REQUEST_HONOR_ROLLS_BY_SPEED_FINISHED]: () => false,
}, false)

const honorRollsSortBySpeed = handleActions({
  [resolve(FETCH_HONOR_ROLLS_BY_SPEED)]: (state, { payload }) => payload,
}, [])

const honorRollsSortByQuantity = handleActions({
  [resolve(FETCH_HONOR_ROLLS_BY_QUANTITY)]: (state, { payload }) => payload,
}, [])


export default combineReducers({
  loading,
  honorRollsSortBySpeed,
  honorRollsSortByQuantity,
})
