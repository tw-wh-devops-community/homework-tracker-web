import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BulletinShape } from '../shared/shape'
import './Intraday.css'

const crab = require('./images/crab.png')
const hamster = require('./images/hamster.png')
const frog1 = require('./images/frog1.png')
const frog2 = require('./images/frog2.png')

const imageAPI = 'http://54.223.64.0:5678/'
export class Intraday extends Component {
  buildCard = (assignment) => {
    const interviewerProfileUrl = assignment.interviewer_profile ?
      `${imageAPI}${assignment.interviewer_profile}` : `${imageAPI}image/default`

    return (
      <div className="card" key={assignment.interviewer_employee_id}>
        <div className="intraday-interviewer-name">{assignment.interviewer_name}</div>
        <div className="interviewer-profile">
          <img src={interviewerProfileUrl} alt="" />
        </div>
        <div className="time-records">
          <span>{assignment.time_records.length}份作业, 还剩</span>
          <span className="time-highlight">{assignment.time_records.join(',')}</span>
          <span>小时</span>
        </div>
      </div>
    )
  }

  buildEmptyCard = (index) => {
    const emptyCard = []
    for (let i = 0; i < index; i += 1) {
      emptyCard.push(
        <div className="card" key={i}>
          <div className="intraday-interviewer-name" />
        </div>,
      )
    }
    return emptyCard
  }

  render() {
    const showAssignments = this.props.showAssignments
    return (
      <div className="intraday-group">
        <div className="intraday-title">
          <img className="crab" src={crab} alt="crab" />
          <img className="hamster" src={hamster} alt="hamster" />
          <div className="intraday-highlight">
            <div className="rectangle" />
            <div className="intraday-title-text-1">24小时</div>
          </div>
          <div className="intraday-title-text-2">内需提交作业名单</div>
          <img className="frog1" src={frog1} alt="frog1" />
          <img className="frog2" src={frog2} alt="frog2" />
        </div>
        <div className="intraday-value">
          <div className="intraday-card">
            {showAssignments.map(assignment => this.buildCard(assignment))}
            {showAssignments.length < 10 && this.buildEmptyCard(10 - showAssignments.length)}
          </div>
          <div className="intraday-footer">Page {this.props.currentPage} of {this.props.totalPage}</div>
        </div>
      </div>
    )
  }
}
Intraday.propTypes = {
  showAssignments: PropTypes.arrayOf(BulletinShape),
  totalPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
}

Intraday.defaultProps = {
  showAssignments: [],
}

export default Intraday
