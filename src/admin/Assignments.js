import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import 'font-awesome/css/font-awesome.min.css'
import dateFormat from '../utilities/dateFormat'
import { AssignmentShape } from '../shared/shape'
import { fetchAssignments, setSelectAssignmentId, showFinishModal, showDeleteModal, showEditModal, showLogModal } from './actions'
import './Assignments.css'

const tableHeader = ['面试官', '候选人', 'Role', '分配日期', '截止日期', '完成时间', '完成耗时', '当前状态']
const assignmentStatus = { finished: '已完成', ongoing: '进行中', overdue: '已超期' }

export class Assignments extends Component {
  componentWillMount() {
    this.props.fetchAssignments()
  }

  changeShowDeleteModal = (selectAssignmentId) => {
    this.props.showDeleteModal()
    // this.props.fetchAssignmentLogs(selectAssignmentId)
    this.props.setSelectAssignmentId(selectAssignmentId)
  }

  changeShowLogModal = (selectAssignmentId) => {
    this.props.showLogModal(selectAssignmentId)
    this.props.setSelectAssignmentId(selectAssignmentId)
  }

  changeShowFinishModal = (selectAssignmentId) => {
    this.props.showFinishModal()
    this.props.setSelectAssignmentId(selectAssignmentId)
  }

  calcDuringDate = (startTime, endTime) => {
    if (startTime && endTime) {
      const start = new Date(startTime)
      const end = new Date(endTime)
      // 作业完成时间最多精确到月
      const during = end - start

      const days = Math.floor(during / (24 * 60 * 60 * 1000))
      const leave1 = during % (24 * 60 * 60 * 1000)
      const hours = Math.floor(leave1 / (60 * 60 * 1000))
      const leave2 = leave1 % (60 * 60 * 1000)
      const minutes = Math.floor(leave2 / (60 * 1000))
      const leave3 = leave2 % (60 * 1000)
      const senconds = Math.round(leave3 / 1000)
      const duringString = `${days}天${hours}小时${minutes}分${senconds}秒`
      window.console.log(duringString)
      return duringString
    }
    return ''
  }

  changeShowEditModal = (selectAssignmentId) => {
    this.props.showEditModal()
    this.props.setSelectAssignmentId(selectAssignmentId)
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
        <div className='table-column'>{assignment.interviewer_name}</div>
        <div className='table-column'>{assignment.candidate}</div>
        <div className='table-column'>{assignment.job_role}</div>
        <div className='table-column'>{dateFormat(assignment.assigned_date)}</div>
        <div className='table-column'>{dateFormat(assignment.deadline_date)}</div>
        <div className='table-column'>{dateFormat(assignment.finished_date)}</div>
        <div className='table-column'>{this.calcDuringDate(assignment.assigned_date, assignment.finished_date)}</div>
        <div className='table-column'>{assignmentStatus[assignment.status]}</div>
        <div className='table-column'>
          <i className='fa fa-check table-editIcon' role='presentation' onClick={() => this.changeShowFinishModal(assignment.id)} />
          <i className='fa fa-edit table-editIcon' role='presentation' onClick={() => this.changeShowEditModal(assignment.id)} />
          <i className='fa fa-trash table-editIcon' role='presentation' onClick={() => this.changeShowDeleteModal(assignment.id)} />
          <i className='fa fa-eye table-logIcon' role='presentation' onClick={() => this.changeShowLogModal(assignment.id)} />
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
  showEditModal: PropTypes.func.isRequired,
  showLogModal: PropTypes.func.isRequired,
  setSelectAssignmentId: PropTypes.func.isRequired,
}

Assignments.defaultProps = {
  assignments: [],
}

const mapStateToProps = state => ({
  assignments: state.assignment.assignments,
})

export default connect(mapStateToProps,
  { fetchAssignments,
    setSelectAssignmentId,
    showFinishModal,
    showDeleteModal,
    showEditModal,
    showLogModal,
  })(Assignments)
