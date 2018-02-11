import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BulletinShape } from '../shared/shape'
import './Intraday.css'

const imageAPI = 'http://54.223.64.0:5678/'
export class Intraday extends Component {
  buildCard = (assignment) => {
    const interviewerProfileUrl = assignment.interviewer_profile ?
      `${imageAPI}${assignment.interviewer_profile}` : `${imageAPI}image/default`

    return (
      <div className="card" key={assignment.interviewer_employee_id}>
        <div className="interviewer-name">{assignment.interviewer_name}</div>
        <div className="interviewer_profile">
          <img src={interviewerProfileUrl} alt="" />
        </div>
        <div className="time-records">{assignment.time_records}</div>
      </div>
    )
  }

  render() {
    const showAssignments = this.props.showAssignments
    return (
      <div className="inreaday-group">
        <div className="inreaday-title" />
        <div className="inreaday-value">
          {showAssignments.map(assignment => this.buildCard(assignment))}
        </div>
      </div>
    )
  }
}
Intraday.propTypes = {
  showAssignments: PropTypes.arrayOf(BulletinShape),
}

Intraday.defaultProps = {
  showAssignments: [],
}


export default Intraday
