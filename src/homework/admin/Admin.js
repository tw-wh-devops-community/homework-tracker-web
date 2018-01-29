import React, { Component } from 'react'
import Homeworks from './Homeworks'
import './admin.css'

// eslint-disable-next-line react/prefer-stateless-function
export class Admin extends Component {
  render() {
    return (
      <div className='homepage'>
        <div className="header">
          <div className="homePage">HOMEWORK 管理平台</div>
          <div className="buttonNew">
            <button>New</button>
          </div>
        </div>
        <Homeworks />
      </div>
    )
  }
}

export default Admin
