import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import 'font-awesome/css/font-awesome.min.css'
import moment from 'moment'
import { AssignmentShape } from '../shared/shape'
import { fetchAssignments, setSelectAssignmentId, showFinishModal, showDeleteModal } from './actions'
import './css/assignments.css'

const tableHeader = ['面试官', '候选人', 'Role', '分配日期', '截止日期', '完成时间', '当前状态']
const assignmentStatus = { finished: '已完成', ongoing: '进行中', overdue: '已超期' }

export class Assignments extends Component {
  componentWillMount() {
    this.props.fetchAssignments()
  }

  changeShowDeleteModal = (selectAssignmentId) => {
    this.props.showDeleteModal()
    this.props.setSelectAssignmentId(selectAssignmentId)
  }

  changeShowFinishModal = (selectAssignmentId) => {
    this.props.showFinishModal()
    this.props.setSelectAssignmentId(selectAssignmentId)
  }

  dateFormat = date => (date ? moment(date).format('YYYY-MM-DD HH:mm:ss') : '')

  renderItem = (assignment, index) => {
    const tableValue = classNames(`table-row ${assignment.status}`, {
      'highlight-item': index % 2 === 0,
    })
    return (
      <div
        key={assignment.id}
        className={tableValue}
      >
        <div className='table-column'>{assignment.interviewer_name}</div>
        <div className='table-column'>{assignment.candidate}</div>
        <div className='table-column'>{assignment.job_role}</div>
        <div className='table-column'>{this.dateFormat(assignment.assigned_date)}</div>
        <div className='table-column'>{this.dateFormat(assignment.deadline_date)}</div>
        <div className='table-column'>{this.dateFormat(assignment.finished_date)}</div>
        <div className='table-column'>{assignmentStatus[assignment.status]}</div>
        <div className='table-column'>
          <i className='fa fa-check table-editIcon' role='presentation' onClick={() => this.changeShowFinishModal(assignment.id)} />
          <i className='fa fa-edit table-editIcon' />
          <i className='fa fa-trash table-editIcon' role='presentation' onClick={() => this.changeShowDeleteModal(assignment.id)} />
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
  assignments: PropTypes.arrayOf(AssignmentShape),
  fetchAssignments: PropTypes.func.isRequired,
  showFinishModal: PropTypes.func.isRequired,
  showDeleteModal: PropTypes.func.isRequired,
  setSelectAssignmentId: PropTypes.func.isRequired,
}

Assignments.defaultProps = {
  assignments: [],
}

const mapStateToProps = state => ({
  assignments: state.assignment.assignments,
})

export default connect(mapStateToProps,
  { fetchAssignments, setSelectAssignmentId, showFinishModal, showDeleteModal })(Assignments)
