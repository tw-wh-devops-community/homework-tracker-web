import { createAction } from 'redux-actions'
import api from '../api/api'

export const FETCH_INTERVIEWERS = 'ASSIGNMENT/FETCH_INTERVIEWERS'
export const FETCH_ROLES = 'ASSIGNMENT/FETCH_ROLES'
export const FETCH_ASSIGNMENT = 'ASSIGNMENT/FETCH_ASSIGNMENT'
export const DELETE_ASSIGNMENT = 'ASSIGNMENT/DELETE_ASSIGNMENT'
export const SET_ASSIGNMENT_ID = 'ASSIGNMENT/SET_ASSIGNMENT_ID'
export const SHOW_DELETE_MODAL = 'ASSIGNMENT/SHOW_DELETE_MODAL'
export const SHOW_FINISH_MODAL = 'ASSIGNMENT/SHOW_FINISH_MODAL'

export const fetchInterviewers = createAction(FETCH_INTERVIEWERS, () => api.get('/interviewers'))
export const fetchRoles = createAction(FETCH_ROLES, () => api.get('/roles'))
export const fetchAssignments = createAction(FETCH_ASSIGNMENT, () => api.get('/assignments'))

export const deleteAssignment = createAction(DELETE_ASSIGNMENT, assignmentId =>
  api.delete(`/assignments/${assignmentId}`), assignmentId => [{ id: assignmentId }])

export const finishAssignment = (assignmentId, finishTime) => (
  (dispatch) => {
    api.put('/assignments',
      {
        id: assignmentId,
        finished_date: finishTime,
        is_finished: true,
      }).then(() =>
      dispatch(fetchAssignments()),
    )
  }
)

export const createAssignment = data => (
  (dispatch) => {
    api.post('/assignments',
      data).then(() =>
      dispatch(fetchAssignments()),
    )
  }
)

export const setSelectAssignmentId = createAction(SET_ASSIGNMENT_ID, assignmentId => assignmentId)

export const showDeleteModal = createAction(SHOW_DELETE_MODAL)

export const showFinishModal = createAction(SHOW_FINISH_MODAL)

