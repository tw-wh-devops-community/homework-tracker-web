import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Card extends Component {
  buildCard = assignment => (
    <div className="card" key={assignment.interviewer_employee_id}>
      <div className="interviewer-name">{assignment.interviewer_name}</div>
      <div className="interviewer-profile">{assignment.interviewer_profile}</div>
      <div className="time-records">{assignment.time_records}</div>
    </div>)

  render() {
    const showAssignments = this.props.showAssignments
    return (
      <div>
        {showAssignments.map(assignment => this.buildCard(assignment))}
      </div>
    )
  }
}
Card.propTypes = {
  showAssignments: PropTypes.arrayOf.isRequired,
}
export default Card
