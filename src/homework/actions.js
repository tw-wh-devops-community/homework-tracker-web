import { createAction } from 'redux-actions'
import api from '../api/api'


export const FETCH_HOMEWORK = 'HOMEWORK/FETCH_HOMEWORK'

export const fetchHomeworks = createAction(FETCH_HOMEWORK, () => api.get('homeworks'))

