import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import { Provider } from 'react-redux'
import AdminContainer from './homework/admin/Admin'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route exact path="/admin" component={AdminContainer} />
    </Router>
  </Provider>,
  document.getElementById('root'),
)
