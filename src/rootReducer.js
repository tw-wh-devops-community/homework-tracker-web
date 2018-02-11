import { combineReducers } from 'redux'
import assignment from './admin/reducer'
import assignmentPage from './assignment/reducer'

const rootReducer = combineReducers({
  assignment,
  assignmentPage,
})

export default rootReducer
