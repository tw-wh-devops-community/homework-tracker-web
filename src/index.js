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
import Assignments from './assignment/AssignmentPage'
import { Home } from './home/Home'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        {/* <Route exact path="/home/admin" component={Admin} /> */}
        <Route exact path="/home" component={Home} />
        <Route path="/assignments" component={Assignments} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'),
)
