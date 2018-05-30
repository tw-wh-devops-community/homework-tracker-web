import { createAction } from 'redux-actions'
import api from '../api/api'

export const FETCH_INTERVIEWERS = 'INTERVIEWER/FETCH_INTERVIEWERS'
export const FETCH_ROLES = 'INTERVIEWER/FETCH_ROLES'
export const DELETE_INTERVIEWER = 'INTERVIEWER/DELETE_INTERVIEWER'
export const SET_INTERVIEWER_ID = 'INTERVIEWER/SET_INTERVIEWER_ID'
export const SHOW_DELETE_MODAL = 'INTERVIEWER/SHOW_DELETE_MODAL'
export const SHOW_FINISH_MODAL = 'INTERVIEWER/SHOW_FINISH_MODAL'
export const SHOW_EDIT_MODAL = 'INTERVIEWER/SHOW_EDIT_MODAL'

export const fetchInterviewers = createAction(FETCH_INTERVIEWERS, () => api.get('/interviewers'))
export const fetchRoles = createAction(FETCH_ROLES, () => api.get('/roles'))

export const deleteInterviewer = createAction(DELETE_INTERVIEWER, interviewerId =>
  api.delete(`/interviewers/${interviewerId}`), interviewerId => [{ id: interviewerId }])

export const createInterviewer = data => (
  (dispatch) => {
    api.post('/interviewers',
      data).then(() =>
      dispatch(fetchInterviewers()),
    )
  }
)

export const updateInterviewer = data => (
  (dispatch) => {
    api.put('/interviewers',
      data).then(() =>
      dispatch(fetchInterviewers()),
    )
  }
)

export const setSelectInterviewerId
  = createAction(SET_INTERVIEWER_ID, interviewerId => interviewerId)

export const showDeleteModal = createAction(SHOW_DELETE_MODAL)

export const showFinishModal = createAction(SHOW_FINISH_MODAL)

export const showEditModal = createAction(SHOW_EDIT_MODAL)

