import { handleActions, combineActions } from 'redux-actions'
import { combineReducers } from 'redux'
import { differenceBy } from 'lodash'
import { pending, resolve, reject } from '../utilities/actionConst'
import { FETCH_ASSIGNMENT,
  DELETE_ASSIGNMENT,
  FETCH_INTERVIEWERS,
  FETCH_ROLES,
  SET_ASSIGNMENT_ID,
  SHOW_DELETE_MODAL,
  SHOW_FINISH_MODAL }
from './actions'

const REQUEST_ASSIGNMENT_FINISHED = combineActions(resolve(FETCH_ASSIGNMENT)
  , reject(FETCH_ASSIGNMENT))

const REQUEST_INTERVIEWERS_FINISHED = combineActions(resolve(FETCH_INTERVIEWERS)
  , reject(FETCH_INTERVIEWERS))

const DELETE_ASSIGNMENT_FINISHED = combineActions(resolve(DELETE_ASSIGNMENT)
  , reject(DELETE_ASSIGNMENT))

const loading = handleActions({
  [pending(FETCH_ASSIGNMENT)]: () => true,
  [pending(FETCH_INTERVIEWERS)]: () => true,
  [pending(FETCH_ROLES)]: () => true,
  [pending(DELETE_ASSIGNMENT)]: () => true,
  [REQUEST_ASSIGNMENT_FINISHED]: () => false,
  [REQUEST_INTERVIEWERS_FINISHED]: () => false,
  [DELETE_ASSIGNMENT_FINISHED]: () => false,
}, false)


const assignments = handleActions({
  [resolve(FETCH_ASSIGNMENT)]: (state, { payload }) => payload,
  [resolve(DELETE_ASSIGNMENT)]: (state, { meta }) => differenceBy(state, meta, 'id'),
}, [])

const interviewerOptions = handleActions({
   [resolve(FETCH_INTERVIEWERS)]: (state, { payload }) => payload.map(interviewer => (
     { value: interviewer.employee_id, label: interviewer.name })),
}, [])

const roleOptions = handleActions({
  [resolve(FETCH_ROLES)]: (state, { payload }) => payload.map(role => (
    { value: role, label: role })),
}, [])

const setAssignmentId = handleActions({
  [SET_ASSIGNMENT_ID]: (state, { payload }) => ({ ...state, selectAssignmentId: payload }),
}, [])


const changeModal = handleActions({
  [SHOW_DELETE_MODAL]: state => ({ ...state, showDeleteModal: !state.showDeleteModal }),
  [SHOW_FINISH_MODAL]: state => ({ ...state, showFinishModal: !state.showFinishModal }),
}, false)

export default combineReducers({
  roleOptions,
  interviewerOptions,
  loading,
  assignments,
  setAssignmentId,
  changeModal,
})
