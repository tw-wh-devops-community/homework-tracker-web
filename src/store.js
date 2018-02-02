import { applyMiddleware, createStore, compose } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import { APP_ENV, ENV } from './api/apiHost'

const middlewares = [
  promiseMiddleware(),
  thunk,
]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // eslint-disable-line

if (APP_ENV === ENV.DEV) {
  const { createLogger } = require('redux-logger') // eslint-disable-line
  middlewares.push(createLogger({ collapsed: true }))
}

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares)),
)

export default store

