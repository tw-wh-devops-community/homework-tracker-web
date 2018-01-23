import { applyMiddleware, createStore } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import rootReducer from './rootReducer'

const middlewares = [
  promiseMiddleware(),
]

if (process.env.NODE_ENV) {
  const { createLogger } = require('redux-logger') // eslint-disable-line
  middlewares.push(createLogger({ collapsed: true }))
}

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares),
)

export default store

