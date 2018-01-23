import { combineReducers } from 'redux'
import homework from './homework/reducer'

const rootReducer = combineReducers({
  homework,
})

export default rootReducer
