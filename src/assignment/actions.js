import { createAction } from 'redux-actions'
import api from '../api/api'

export const FETCH_ASSIGNMENT = 'ASSIGNMENT/FETCH_ASSIGNMENT'
export const SHOW_PAGE_TYPE = 'ASSIGNMENT/SHOW_PAGE_TYPE'

export const fetchAssignments = createAction(FETCH_ASSIGNMENT, type => api.get(`/bulletins?type=${type}`))

export const showPageType = createAction(SHOW_PAGE_TYPE, type => type)
