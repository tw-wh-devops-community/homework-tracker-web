import { applyMiddleware, createStore } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import rootReducer from './rootReducer'
import { APP_ENV, ENV } from './api/apiHost'

const middlewares = [
  promiseMiddleware(),
]

if (APP_ENV === ENV.DEV) {
  const { createLogger } = require('redux-logger') // eslint-disable-line
  middlewares.push(createLogger({ collapsed: true }))
}

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares),
)

export default store

