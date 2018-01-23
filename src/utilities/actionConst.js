import { PENDING, FULFILLED, REJECTED } from 'redux-promise-middleware'

export const pending = type => `${type}_${PENDING}`
export const resolve = type => `${type}_${FULFILLED}`
export const reject = type => `${type}_${REJECTED}`
