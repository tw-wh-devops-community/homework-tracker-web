import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Select from 'react-select'
import { DatePicker } from 'antd'
import moment from 'moment'
import 'react-select/dist/react-select.css'
import 'antd/dist/antd.css'
import { InterviewerOptionShape, RoleOptionShape } from '../shared/shape'
import { createAssignment, fetchInterviewers, fetchRoles } from './actions'
import './NewAssignment.css'

class NewAssignment extends Component {
  state = {
    candidateName: '',
    jobRole: '',
    interviewerIdsValue: '',
    selectedOption: '',
    assignedDate: moment(),
    deadlineDate: moment().add(3, 'days'),
  }

  componentWillMount() {
    this.props.fetchInterviewers()
    this.props.fetchRoles()
  }

  setAssignedDate = (time) => {
    this.setState({ assignedDate: moment(time), deadlineDate: moment(time).add(3, 'days') })
  }

  setDeadlineDate = (time) => {
    this.setState({ deadlineDate: moment(time) })
  }

  handleInterviewersChange = (interviewerIdsValue) => {
    this.setState({ interviewerIdsValue })
  }

  handleRoleChange = (jobRole) => {
    this.setState({ jobRole })
  }

  handleOnChange = field => (event) => {
    this.setState({
      [field]: event.target.value,
    })
  }

  create = () => {
    const { interviewerIdsValue, candidateName, jobRole, assignedDate, deadlineDate } = this.state
    const interviewerIds = interviewerIdsValue.split(',')
    this.props.createAssignment({
      interviewerIds,
      candidateName,
      jobRole,
      assignedDate,
      deadlineDate,
    })
    this.props.onCancel()
  }

  render() {
    const { onCancel, interviewerOptions, roleOptions } = this.props
    const { interviewerIdsValue, jobRole, assignedDate, deadlineDate } = this.state

    return (
      <div className='container'>
        <div className='modal-container'>
          <div className='new-title'>信息录入</div>
          <div className='row'><span className='field'>候选者</span>
            <input className='input' type="text" onChange={this.handleOnChange('candidateName')} /></div>
          <div className='row'><span className='field'>面试岗位</span>
            <Select
              className='input'
              options={roleOptions}
              onChange={this.handleRoleChange}
              placeholder="job role"
              simpleValue
              value={jobRole}
            />
          </div>
          <div className='row'><span className='field'>面试官</span>
            <Select
              className='input'
              options={interviewerOptions}
              multi
              removeSelected
              closeOnSelect={false}
              simpleValue
              onChange={this.handleInterviewersChange}
              placeholder="Select the interviewers"
              value={interviewerIdsValue}
            />
          </div>
          <div className='row'><span className='field'>分配日期</span>
            <DatePicker
              className='input'
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="Select Time"
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
              placeholder="Select Time"
              value={deadlineDate}
              onChange={time => this.setDeadlineDate(time)}
              onOk={time => this.setDeadlineDate(time)}
            />
          </div>
          <div className='button-container'>
            <button className='button cancel' onClick={onCancel}>取消</button>
            <button className='button confirm' onClick={this.create}>确认</button>
          </div>
        </div>
      </div>
    )
  }
}

NewAssignment.propTypes = {
  roleOptions: PropTypes.arrayOf(RoleOptionShape),
  interviewerOptions: PropTypes.arrayOf(InterviewerOptionShape),
  onCancel: PropTypes.func.isRequired,
  createAssignment: PropTypes.func.isRequired,
  fetchInterviewers: PropTypes.func.isRequired,
  fetchRoles: PropTypes.func.isRequired,
}

NewAssignment.defaultProps = {
  interviewerOptions: [],
  roleOptions: [],
}
const mapStateToProps = state => ({
  interviewerOptions: state.assignment.interviewerOptions,
  roleOptions: state.assignment.roleOptions,
  })


export default connect(mapStateToProps,
{ fetchInterviewers, fetchRoles, createAssignment })(NewAssignment)

