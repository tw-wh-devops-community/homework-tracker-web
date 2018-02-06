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
    value: [],
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

  handleInterviewersChange = (value) => {
    this.setState({ value })
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
    const { value, candidateName, jobRole, assignedDate, deadlineDate } = this.state
    const interviewerIds = value.split(',')
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
    const { onCancel, interviewers, roles } = this.props
    const { value, jobRole, assignedDate, deadlineDate } = this.state

    return (
      <div className='container'>
        <div className='modal-container'>
          <div className='new-title'>信息录入</div>
          <div className='row'><span className='field'>候选者</span>
            <input className='input' type="text" onChange={this.handleOnChange('candidateName')} /></div>
          <div className='row'><span className='field'>面试岗位</span>
            <Select
              className='input'
              options={roles}
              onChange={this.handleRoleChange}
              placeholder="job role"
              simpleValue
              value={jobRole}
            />
          </div>
          <div className='row'><span className='field'>面试官</span>
            <Select
              className='input'
              options={interviewers}
              multi
              removeSelected
              closeOnSelect={false}
              simpleValue
              onChange={this.handleInterviewersChange}
              placeholder="Select the interviewers"
              value={value}
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
  roles: PropTypes.arrayOf(RoleOptionShape),
  interviewers: PropTypes.arrayOf(InterviewerOptionShape),
  onCancel: PropTypes.func.isRequired,
  createAssignment: PropTypes.func.isRequired,
  fetchInterviewers: PropTypes.func.isRequired,
  fetchRoles: PropTypes.func.isRequired,
}

NewAssignment.defaultProps = {
  interviewers: [],
  roles: [],
}
const mapStateToProps = state => ({
    interviewers: state.assignment.interviewers,
  roles: state.assignment.roles,
  })


export default connect(mapStateToProps,
{ fetchInterviewers, fetchRoles, createAssignment })(NewAssignment)

