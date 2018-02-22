import { handleActions, combineActions } from 'redux-actions'
import { combineReducers } from 'redux'
import { pending, resolve, reject } from '../utilities/actionConst'
import { FETCH_ASSIGNMENT, SHOW_PAGE_TYPE, FETCH_HONOR_ROLLS_BY_SPEED, FETCH_HONOR_ROLLS_BY_QUANTITY } from './actions'

const pageTypes = ['intraday', 'overdue', 'honor-rolls']

const getPageType = (currentPageTypes) => {
  const currentIndex = pageTypes.indexOf(currentPageTypes)

  if (currentIndex === pageTypes.length - 1) {
    return pageTypes[0]
  } return pageTypes[currentIndex + 1]
}

const REQUEST_ASSIGNMENT_FINISHED = combineActions(resolve(FETCH_ASSIGNMENT)
  , reject(FETCH_ASSIGNMENT))

const REQUEST_HONOR_ROLLS_BY_SPEED_FINISHED =
  combineActions(resolve(FETCH_HONOR_ROLLS_BY_SPEED)
    , reject(FETCH_HONOR_ROLLS_BY_SPEED))

const REQUEST_HONOR_ROLLS_BY_QUANTITY_FINISHED =
  combineActions(resolve(FETCH_HONOR_ROLLS_BY_QUANTITY)
    , reject(FETCH_HONOR_ROLLS_BY_QUANTITY))

const loading = handleActions({
  [pending(FETCH_ASSIGNMENT)]: () => true,
  [REQUEST_ASSIGNMENT_FINISHED]: () => false,
  [pending(FETCH_HONOR_ROLLS_BY_QUANTITY)]: () => true,
  [pending(FETCH_HONOR_ROLLS_BY_SPEED)]: () => true,
  [REQUEST_HONOR_ROLLS_BY_QUANTITY_FINISHED]: () => false,
  [REQUEST_HONOR_ROLLS_BY_SPEED_FINISHED]: () => false,
}, false)

const assignments = handleActions({
  [resolve(FETCH_ASSIGNMENT)]: (state, { payload }) => payload,
}, [])

const showPageType = handleActions({
  [SHOW_PAGE_TYPE]: (state, { payload }) => getPageType(payload),
}, pageTypes[0])

const honorRollsSortBySpeed = handleActions({
  [resolve(FETCH_HONOR_ROLLS_BY_SPEED)]: (state, { payload }) => payload,
}, [])

const honorRollsSortByQuantity = handleActions({
  [resolve(FETCH_HONOR_ROLLS_BY_QUANTITY)]: (state, { payload }) => payload,
}, [])

export default combineReducers({
  loading,
  assignments,
  showPageType,
  honorRollsSortBySpeed,
  honorRollsSortByQuantity,
})
