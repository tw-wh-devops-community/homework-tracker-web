import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AdminContainer from './homework/admin/Admin'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <AdminContainer />
  </Provider>,
  document.getElementById('root'),
)
