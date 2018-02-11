import { combineReducers } from 'redux'
import assignment from './admin/reducer'
import assignmentPage from './assignment/reducer'
import honorRollsPage from './honor-rolls/reducer'

const rootReducer = combineReducers({
  assignment,
  assignmentPage,
  honorRollsPage,
})

export default rootReducer
