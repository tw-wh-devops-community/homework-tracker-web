import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BulletinShape } from '../shared/shape'
import './Overdue.css'

const crab = require('./images/crab.png')
const hamster = require('./images/hamster.png')
const frog1 = require('./images/frog1.png')
const frog2 = require('./images/frog2.png')

const imageAPI = 'http://54.223.64.0:5678/'
export class Overdue extends Component {
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
      <div className="overdue-group">
        <div className="overdue-title">
          <img className="crab" src={crab} alt="crab" />
          <img className="hamster" src={hamster} alt="hamster" />
          <div className="overdue-highlight">
            <div className="circle" />
            <div className="overdue-title-text-1">超期</div>
          </div>
          <div className="overdue-title-text-2">作业名单</div>
          <img className="frog1" src={frog1} alt="frog1" />
          <img className="frog2" src={frog2} alt="frog2" />
        </div>
        <div className="overdue-value">
          {showAssignments.map(assignment => this.buildCard(assignment))}
        </div>
      </div>
    )
  }
}
Overdue.propTypes = {
  showAssignments: PropTypes.arrayOf(BulletinShape),
}

Overdue.defaultProps = {
  showAssignments: [],
}


export default Overdue
