import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import 'font-awesome/css/font-awesome.min.css'
import { HomeworkShape } from '../shared/shape'
import { fetchAssignments } from './actions'

import './css/assignments.css'

const tableHeader = ['面试官', '候选人', 'Role', '分配日期', '截止日期', '完成时间', '当前状态']
const homeworkStatus = { finish: '已完成', inProcess: '进行中', timeout: '已超期' }

export class Assignments extends Component {
  componentWillMount() {
    this.props.fetchAssignments()
  }

  renderItem = (assignment, index) => {
    const tableValue = classNames(`table-row ${assignment.status}`, {
      'highlight-item': index % 2 === 0,
    })
    return (
      <div
        key={assignment.id}
        className={tableValue}
      >
        <div className='table-column'>{assignment.interviewer.name}</div>
        <div className='table-column'>{assignment.homework.candidate}</div>
        <div className='table-column'>{assignment.homework.job_role}</div>
        <div className='table-column'>{assignment.assigned_date}</div>
        <div className='table-column'>{assignment.deadline_date}</div>
        <div className='table-column'>{assignment.finished_date}</div>
        <div className='table-column'>{homeworkStatus[assignment.status]}</div>
        <div className='table-column'>
          <i className="fa fa-check table-editIcon" />
          <i className="fa fa-edit table-editIcon" />
          <i className="fa fa-trash table-editIcon" />
        </div>
      </div>
    )
  }

  render() {
    const assignments = this.props.assignments

    return (
      <div className='table'>
        <div className='table-header'>
          {tableHeader.map(tableTitle => (
            <div key={tableTitle} className='table-column'>{tableTitle}</div>
          ))}
          <div className='table-column' />
        </div>
        <div className='table-value'>
          {assignments.map((assignment, index) => this.renderItem(assignment, index))}
        </div>
      </div>

    )
  }
}

Assignments.propTypes = {
  assignments: PropTypes.arrayOf(HomeworkShape),
  fetchAssignments: PropTypes.func.isRequired,
}

Assignments.defaultProps = {
  assignments: [],
}

const mapStateToProps = state => ({
  assignments: state.assignment.assignments,
})

export default connect(mapStateToProps, { fetchAssignments })(Assignments)
