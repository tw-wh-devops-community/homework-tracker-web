import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './List.css'
import SideList from './SideList'

export default class AssignmentPage extends Component {
  constructor(props) {
    super(props)
    this.state = { height: window.innerHeight }
  }

  render() {
    const { title } = this.props
    return (
      <div className="content" style={{ height: `${this.state.height}px` }}>
        <div className="title">{title}</div>
        <div className="content-container">
          <div className="side-list"><SideList /></div>
          <div className="main-content" />
        </div>
      </div>
    )
  }
}

AssignmentPage.propTypes = {
  title: PropTypes.string.isRequired,
}

