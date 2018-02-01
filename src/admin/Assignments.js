import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { HomeworkShape } from '../shared/shape'
import { fetchAssignments } from './actions'
import './css/assignments.css'

const deleteIcon = require('./images/delete.png')
const editIcon = require('./images/edit.png')
const finishIcon = require('./images/finish.png')

const tableHeader = ['面试官', '候选人', 'Role', '分配日期', '截止日期', '完成时间', '当前状态']
const homeworkStatus = { finish: '已完成', inProcess: '进行中', timeout: '已超期' }

export class Assignments extends Component {
  componentWillMount() {
    this.props.fetchAssignments()
  }

  render() {
    const homeworkList = []
    const assignments = this.props.assignments

    assignments.forEach((assignment, index) => {
      const listBackgroundColor = index % 2 === 0 ? '#ffffff' : '#dedada'
      const tableRowClassName = `tableRow ${assignment.status}`

      homeworkList.push(
        <div
          key={assignment.id}
          className={tableRowClassName}
          style={{ backgroundColor: listBackgroundColor }}
        >
          <div className='tableColumn'>{assignment.interviewer.name}</div>
          <div className='tableColumn'>{assignment.homework.candidate}</div>
          <div className='tableColumn'>{assignment.homework.job_role}</div>
          <div className='tableColumn'>{assignment.assigned_date}</div>
          <div className='tableColumn'>{assignment.deadline_date}</div>
          <div className='tableColumn'>{assignment.finished_date}</div>
          <div className='tableColumn'>${homeworkStatus[assignment.status]}</div>
          <div className='tableColumn'>
            <img className='tableEditIcon' src={finishIcon} alt='finishIcon' />
            <img className='tableEditIcon' src={editIcon} alt='editIcon' />
            <img className='tableEditIcon' src={deleteIcon} alt='deleteIcon' />
          </div>
        </div>,
      )
    })

    return (
      <div className='table'>
        <div className='tableHeader'>
          {tableHeader.map(tableTitle => (
            <div key={tableTitle} className='tableColumn'>{tableTitle}</div>
          ))}
          <div className='tableColumn' />
        </div>
        <div className='tableValue'>
          {homeworkList}
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
