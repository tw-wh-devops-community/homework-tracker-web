import { createAction } from 'redux-actions'
import api from '../api/api'

export const FETCH_HONOR_ROLLS_BY_SPEED = 'HONOR_ROLL/FETCH_HONOR_ROLLS_BY_SPEED'
export const FETCH_HONOR_ROLLS_BY_QUANTITY = 'HONOR_ROLL/FETCH_HONOR_ROLLS_BY_QUANTITY'

export const fetchHonorRollsSortBySpeed = createAction(FETCH_HONOR_ROLLS_BY_SPEED, () => api.get('/honorrolls?year=2018&month=02&type=speed'))
export const fetchHonorRollsSortByQuantity = createAction(FETCH_HONOR_ROLLS_BY_QUANTITY, () => api.get('/honorrolls?year=2018&month=02&type=quantity'))

