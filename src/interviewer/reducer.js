import { handleActions, combineActions } from 'redux-actions'
import { combineReducers } from 'redux'
import { pending, resolve, reject } from '../utilities/actionConst'
import {
  DELETE_INTERVIEWER,
  FETCH_INTERVIEWERS,
  FETCH_ROLES,
  SET_INTERVIEWER_ID,
  SHOW_EDIT_MODAL,
  SHOW_ERROR_MSG,
  SHOW_NEW_MODAL,
}
  from './actions'

const REQUEST_INTERVIEWERS_FINISHED = combineActions(resolve(FETCH_INTERVIEWERS)
  , reject(FETCH_INTERVIEWERS))

const loading = handleActions({
  [pending(FETCH_INTERVIEWERS)]: () => true,
  [pending(FETCH_ROLES)]: () => true,
  [pending(DELETE_INTERVIEWER)]: () => true,
  [pending(SHOW_ERROR_MSG)]: () => true,
  [REQUEST_INTERVIEWERS_FINISHED]: () => false,
}, false)


const interviewers = handleActions({
  [resolve(FETCH_INTERVIEWERS)]: (state, { payload }) => payload,
}, [])

const roleOptions = handleActions({
  [resolve(FETCH_ROLES)]: (state, { payload }) => payload.map(role => (
    { value: role, label: role })),
}, [])

const setInterviewerId = handleActions({
  [SET_INTERVIEWER_ID]: (state, { payload }) => ({ ...state, selectInterviewerId: payload }),
}, [])


const changeModal = handleActions({
  [SHOW_EDIT_MODAL]: state => ({ ...state, showEditModal: !state.showEditModal }),
  [SHOW_NEW_MODAL]: state => ({ ...state, showNewModal: !state.showNewModal }),
}, false)

const errorMsg = handleActions({
  [(SHOW_ERROR_MSG)]: (state, { payload }) => payload,
}, '')

export default combineReducers({
  roleOptions,
  loading,
  interviewers,
  setInterviewerId,
  changeModal,
  errorMsg,
})
