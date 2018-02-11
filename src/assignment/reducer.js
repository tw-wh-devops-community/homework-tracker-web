import { handleActions, combineActions } from 'redux-actions'
import { combineReducers } from 'redux'
import { pending, resolve, reject } from '../utilities/actionConst'
import { FETCH_ASSIGNMENT, SHOW_PAGE_TYPE } from './actions'

const pageTypes = ['intraday', 'overdue']

const getPageType = (currentPageTypes) => {
  const currentIndex = pageTypes.indexOf(currentPageTypes)

  if (currentIndex === pageTypes.length - 1) {
    return pageTypes[0]
  } return pageTypes[currentIndex + 1]
}

const REQUEST_ASSIGNMENT_FINISHED = combineActions(resolve(FETCH_ASSIGNMENT)
  , reject(FETCH_ASSIGNMENT))

const loading = handleActions({
  [pending(FETCH_ASSIGNMENT)]: () => true,
  [REQUEST_ASSIGNMENT_FINISHED]: () => false,
}, false)

const assignments = handleActions({
  [resolve(FETCH_ASSIGNMENT)]: (state, { payload }) => payload,
}, [])

const showPageType = handleActions({
  [SHOW_PAGE_TYPE]: (state, { payload }) => getPageType(payload),
}, pageTypes[0])

export default combineReducers({
  loading,
  assignments,
  showPageType,
})
