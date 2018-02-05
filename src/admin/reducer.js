import { handleActions, combineActions } from 'redux-actions'
import { combineReducers } from 'redux'
import { differenceBy } from 'lodash'
import { pending, resolve, reject } from '../utilities/actionConst'
import { FETCH_ASSIGNMENT, DELETE_ASSIGNMENT, SET_ASSIGNMENT_ID, SHOW_DELETE_MODAL } from './actions'

const REQUEST_ASSIGNMENT_FINISHED = combineActions(resolve(FETCH_ASSIGNMENT)
  , reject(FETCH_ASSIGNMENT))

const DELETE_ASSIGNMENT_FINISHED = combineActions(resolve(DELETE_ASSIGNMENT)
  , reject(DELETE_ASSIGNMENT))

const loading = handleActions({
  [pending(FETCH_ASSIGNMENT)]: () => true,
  [pending(DELETE_ASSIGNMENT)]: () => true,
  [REQUEST_ASSIGNMENT_FINISHED]: () => false,
  [DELETE_ASSIGNMENT_FINISHED]: () => false,
}, false)


const assignments = handleActions({
  [resolve(FETCH_ASSIGNMENT)]: (state, { payload }) => payload,
  [resolve(DELETE_ASSIGNMENT)]: (state, { meta }) => differenceBy(state, meta, 'id'),
}, [])

const setAssignmentId = handleActions({
  [SET_ASSIGNMENT_ID]: (state, { payload }) => ({...state, selectAssignmentId: payload}),
},[])


const changeModal = handleActions({
  [SHOW_DELETE_MODAL]: (state) => ({...state, showDeleteModal: !state.showDeleteModal}),
},false)

export default combineReducers({
  loading,
  assignments,
  setAssignmentId,
  changeModal,
})
