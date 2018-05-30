import { combineReducers } from 'redux'
import assignment from './admin/reducer'
import interviewer from './interviewer/reducer'
import assignmentPage from './assignment/reducer'

const rootReducer = combineReducers({
  assignment,
  assignmentPage,
  interviewer,
})

export default rootReducer
