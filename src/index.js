import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Provider } from 'react-redux'
import store from './store'
import Admin from './admin/Admin'
import Assignments from './assignment/AssignmentPage'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/admin" component={Admin} />
        <Route path="/assignments" component={Assignments} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'),
)
