import {combineReducers} from 'redux'
import adminReducer from './adminPage/adminReducer'

const rootReducer = combineReducers({
  admin: adminReducer
})

export default rootReducer