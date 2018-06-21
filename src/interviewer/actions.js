import { createAction } from 'redux-actions'
import api from '../api/api'

export const FETCH_INTERVIEWERS = 'INTERVIEWER/FETCH_INTERVIEWERS'
export const FETCH_ROLES = 'INTERVIEWER/FETCH_ROLES'
export const DELETE_INTERVIEWER = 'INTERVIEWER/DELETE_INTERVIEWER'
export const SET_INTERVIEWER_ID = 'INTERVIEWER/SET_INTERVIEWER_ID'
export const SHOW_EDIT_MODAL = 'INTERVIEWER/SHOW_EDIT_MODAL'
export const SHOW_ERROR_MSG = 'INTERVIEWER/SHOW_ERROR_MSG'
export const SHOW_NEW_MODAL = 'INTERVIEWER/SHOW_NEW_MODAL'

export const fetchInterviewers = createAction(FETCH_INTERVIEWERS,
  name => api.get(`/interviewers/${name}`))


export const unbindInterviews = data => (
  (dispatch) => {
    window.console.log(`'and' ${data}`)
    api.delete('../pweb/openId',
      data).then(() =>
        dispatch(fetchInterviewers('')),
    )
  }
)

export const fetchRoles = createAction(FETCH_ROLES, () => api.get('/roles'))

export const deleteInterviewer = createAction(DELETE_INTERVIEWER, interviewerId =>
  api.delete(`/interviewers/${interviewerId}`), interviewerId => [{ id: interviewerId }])

export const showErrorMsg = createAction(SHOW_ERROR_MSG, msg => msg)

export const showModal = createAction(SHOW_NEW_MODAL)

export const createInterviewer = data => (
  (dispatch) => {
    api.post('/interviewers', data)
      .then(() => {
        dispatch(showErrorMsg(''))
        dispatch(showModal())
        dispatch(fetchInterviewers(''))
      })
      .catch((res) => {
        dispatch(showErrorMsg(res.response.data.message))
      })
  }
)

export const updateInterviewer = data => (
  (dispatch) => {
    api.put('/interviewers',
      data).then(() =>
        dispatch(fetchInterviewers('')),
    )
  }
)

export const setSelectInterviewerId
  = createAction(SET_INTERVIEWER_ID, interviewerId => interviewerId)

export const showModalE = createAction(SHOW_EDIT_MODAL)

