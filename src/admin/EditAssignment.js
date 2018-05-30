import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Select from 'react-select'
import { DatePicker } from 'antd'
import moment from 'moment'
import 'react-select/dist/react-select.css'
import 'antd/dist/antd.css'
import { InterviewerOptionShape, AssignmentShape } from '../shared/shape'
import { updateAssignment, fetchInterviewers, showEditModal } from './actions'
import './NewAssignment.css'

class EditAssignment extends Component {
  state = {
    validateFailed: false,
    candidateName: this.props.assignment.candidate,
    jobRole: this.props.assignment.job_role,
    interviewerIdValue: this.props.assignment.interviewer_employee_id,
    deadlineDate: moment(this.props.assignment.deadline_date),
    assignedDate: moment(this.props.assignment.assigned_date),
  }

  componentWillMount() {
    this.props.fetchInterviewers()
  }

  componentDidMount() {
    this.oldState = {}
    this.oldState.oldInterviewerIdValue = this.state.interviewerIdValue
    this.oldState.oldAssignedDate = this.state.assignedDate
    this.oldState.oldDeadlineDate = this.state.deadlineDate
  }

  setAssignedDate = (time) => {
    if (time) {
      this.setState({ assignedDate: moment(time), deadlineDate: moment(time).add(3, 'days') })
    } else {
      this.setState({ assignedDate: null })
    }
  }

  setDeadlineDate = (time) => {
    this.setState({ deadlineDate: time ? moment(time) : null })
  }

  handleInterviewersChange = (interviewerIdValue) => {
    this.setState({ interviewerIdValue })
  }

  validate = () => {
    const { interviewerIdValue, assignedDate, deadlineDate } = this.state
    return !!interviewerIdValue && !!assignedDate && !!deadlineDate
  }

  create = () => {
    const oldInterviewerIdValue = this.oldState.oldInterviewerIdValue
    const oldAssignedDate = this.oldState.oldAssignedDate
    const oldDeadlineDate = this.oldState.oldDeadlineDate
    if (!this.validate()) {
      this.setState({ validateFailed: true })
      return
    }
    const { interviewerIdValue, assignedDate, deadlineDate } = this.state
    const data = {}
    if (assignedDate.toLocaleString()!== oldAssignedDate.toLocaleString()) {
      console.log(`分配日期 旧的日期：${oldAssignedDate.toLocaleString()},新的日期:${assignedDate.toLocaleString()}`)
      data.assigned_date = assignedDate
    }
    if (deadlineDate.toLocaleString() !== oldDeadlineDate.toLocaleString()) {
      console.log(`截止日期 旧的日期：${oldDeadlineDate.toLocaleString()},新的日期:${deadlineDate.toLocaleString()}`)
      data.deadline_date = deadlineDate
    }
    if (interviewerIdValue !== oldInterviewerIdValue) {
      data.interviewer_employee_id = interviewerIdValue
    }
    console.log(data)
    if (Object.keys(data).length === 0) {
      this.props.showEditModal()
      return
    }
    data.id = this.props.assignment.id
    this.props.updateAssignment(data)
    this.props.showEditModal()
  }

  render() {
    const { interviewerOptions } = this.props
    const { interviewerIdValue, assignedDate, deadlineDate, candidateName, jobRole } = this.state
    return (
      <div className='container'>
        <div className='modal-container'>
          <div className='new-title'>信息修改</div>
          <div className='row'><span className='field'>候选者</span>
            <span className='input'>{candidateName}</span>
          </div>
          <div className='row'><span className='field'>面试岗位</span>
            <span className='input'>{jobRole}</span>
          </div>
          <div className='row'><span className='field'>面试官</span>
            <Select
              className='input'
              options={interviewerOptions}
              removeSelected
              simpleValue
              onChange={this.handleInterviewersChange}
              placeholder="请选择面试官"
              value={interviewerIdValue}
            />
          </div>
          <div className='row'><span className='field'>分配日期</span>
            <DatePicker
              className='input'
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="请设定分配日期"
              value={assignedDate}
              onChange={time => this.setAssignedDate(time)}
              onOk={time => this.setAssignedDate(time)}
            />
          </div>
          <div className='row'><span className='field'>截止日期</span>
            <DatePicker
              className='input'
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="请设定截止日期"
              value={deadlineDate}
              onChange={time => this.setDeadlineDate(time)}
              onOk={time => this.setDeadlineDate(time)}
            />
          </div>
          { this.state.validateFailed &&
          <p className="reminder">请完成所有项的输入</p>}
          <div className='button-container'>
            <button className='button cancel' onClick={() => this.props.showEditModal()}>取消</button>
            <button className='button confirm' onClick={this.create}>确认</button>
          </div>
        </div>
      </div>
    )
  }
}

EditAssignment.propTypes = {
  assignment: PropTypes.objectOf(AssignmentShape).isRequired,
  showEditModal: PropTypes.func.isRequired,
  updateAssignment: PropTypes.func.isRequired,
  interviewerOptions: PropTypes.arrayOf(InterviewerOptionShape),
  fetchInterviewers: PropTypes.func.isRequired,
}

EditAssignment.defaultProps = {
  interviewerOptions: [],
}
const mapStateToProps = state => ({
  interviewerOptions: state.assignment.interviewerOptions,
  assignment: state.assignment.assignments
  .find(data => data.id === state.assignment.setAssignmentId.selectAssignmentId),
})


export default connect(mapStateToProps,
  { showEditModal, fetchInterviewers, updateAssignment })(EditAssignment)

