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
        <div className="overdue-interviewer-name">{assignment.interviewer_name}</div>
        <div className="interviewer-profile">
          <img src={interviewerProfileUrl} alt="" />
        </div>
        <div className="time-records">{assignment.time_records.length}份作业</div>
      </div>
    )
  }

  buildEmptyCard = (index) => {
    const emptyCard = []
    for (let i = 0; i < index; i += 1) {
      emptyCard.push(
        <div className="card" key={i}>
          <div className="overdue-interviewer-name" />
        </div>,
      )
    }
    return emptyCard
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
            <div className="overdue-title-text-1">快快快</div>
          </div>
          <div className="overdue-title-text-2">交作业啦!  ≧▽≦</div>
          <img className="frog1" src={frog1} alt="frog1" />
          <img className="frog2" src={frog2} alt="frog2" />
        </div>
        <div className="overdue-value">
          <div className="overdue-card">
            {showAssignments.map(assignment => this.buildCard(assignment))}
            {showAssignments.length < 10 && this.buildEmptyCard(10 - showAssignments.length)}
          </div>
          <div className="overdue-footer">Page {this.props.currentPage} of {this.props.totalPage}</div>
        </div>
      </div>
    )
  }
}
Overdue.propTypes = {
  showAssignments: PropTypes.arrayOf(BulletinShape),
  totalPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
}

Overdue.defaultProps = {
  showAssignments: [],
}


export default Overdue
