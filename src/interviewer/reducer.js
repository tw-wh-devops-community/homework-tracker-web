import { handleActions, combineActions } from 'redux-actions'
import { combineReducers } from 'redux'
import { differenceBy } from 'lodash'
import { pending, resolve, reject } from '../utilities/actionConst'
import {
  DELETE_INTERVIEWER,
  FETCH_INTERVIEWERS,
  FETCH_ROLES,
  SET_INTERVIEWER_ID,
  SHOW_DELETE_MODAL,
  SHOW_FINISH_MODAL,
  SHOW_EDIT_MODAL,
}
from './actions'

const REQUEST_INTERVIEWER_FINISHED = combineActions(resolve(FETCH_INTERVIEWERS)
  , reject(FETCH_INTERVIEWERS))

const REQUEST_INTERVIEWERS_FINISHED = combineActions(resolve(FETCH_INTERVIEWERS)
  , reject(FETCH_INTERVIEWERS))

const DELETE_INTERVIEWER_FINISHED = combineActions(resolve(DELETE_INTERVIEWER)
  , reject(DELETE_INTERVIEWER))

const loading = handleActions({
  [pending(FETCH_INTERVIEWERS)]: () => true,
  [pending(FETCH_ROLES)]: () => true,
  [pending(DELETE_INTERVIEWER)]: () => true,
  [REQUEST_INTERVIEWER_FINISHED]: () => false,
  [REQUEST_INTERVIEWERS_FINISHED]: () => false,
  [DELETE_INTERVIEWER_FINISHED]: () => false,
}, false)


const interviewers = handleActions({
  [resolve(FETCH_INTERVIEWERS)]: (state, { payload }) => payload,
  [resolve(DELETE_INTERVIEWER)]: (state, { meta }) => differenceBy(state, meta, 'id'),
}, [])

const roleOptions = handleActions({
  [resolve(FETCH_ROLES)]: (state, { payload }) => payload.map(role => (
    { value: role, label: role })),
}, [])

const setInterviewerId = handleActions({
  [SET_INTERVIEWER_ID]: (state, { payload }) => ({ ...state, selectInterviewerId: payload }),
}, [])


const changeModal = handleActions({
  [SHOW_DELETE_MODAL]: state => ({ ...state, showDeleteModal: !state.showDeleteModal }),
  [SHOW_FINISH_MODAL]: state => ({ ...state, showFinishModal: !state.showFinishModal }),
  [SHOW_EDIT_MODAL]: state => ({ ...state, showEditModal: !state.showEditModal }),
}, false)

export default combineReducers({
  roleOptions,
  loading,
  interviewers,
  setInterviewerId,
  changeModal,
})
