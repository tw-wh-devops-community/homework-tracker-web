import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import List from './List'
import Group from './Group'
import './AssigmentPage.css'
import { fetchAssignments } from './actions'

export class AssignmentPage extends Component {
  componentWillMount() {
    this.props.fetchAssignments()
  }

  render() {
    return (
      <div className="content" >
        <List />
        <Group />
      </div>
    )
  }
}

AssignmentPage.propTypes = {
  fetchAssignments: PropTypes.func.isRequired,
}

export default connect(null, { fetchAssignments })(AssignmentPage)
