import React, { Component } from 'react'
import Assignments from './Assignments'
import './css/admin.css'

// eslint-disable-next-line react/prefer-stateless-function
export class Admin extends Component {
  render() {
    return (
      <div className='homepage'>
        <div className="header">
          <div className="homepage-logo">HOMEWORK 管理平台</div>
          <div className="button-new">
            <button>New</button>
          </div>
        </div>
        <Assignments />
      </div>
    )
  }
}

export default Admin
