import React from 'react'
import PropTypes from 'prop-types'
import './List.css'

const AssignmentPage = (props) => {
  const { title } = props
  return (
    <div className="content">
      <div className="title">{title}</div>
      <div className="content-container">
        <div className="side-list" />
        <div className="main-content" />
      </div>
    </div>
  )
}
AssignmentPage.propTypes = {
  title: PropTypes.string.isRequired,
}

export default AssignmentPage
