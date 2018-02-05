import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import { InterviewerOptionShape } from '../shared/shape'
import { createAssignment, fetchInterviewers } from './actions'
import './NewAssignment.css'

class NewAssignment extends Component {
  state = {
    candidateName: '',
    jobRole: '',
    value: [],
    selectedOption: '',
  }

  componentWillMount() {
    this.props.fetchInterviewers()
  }
  handleSelectChange =(value) => {
    this.setState({ value })
  }

  handleOnChange = field => (event) => {
      this.setState({
        [field]: event.target.value,
      })
    }

  create = () => {
    const { value, candidateName, jobRole } = this.state
    const interviewerIds = value.split(',')
    this.props.createAssignment({
      interviewerIds,
      candidateName,
      jobRole,
      assignedDate: new Date(),
      deadlineDate: new Date(),
    })
    this.props.onCancel()
  }

  render() {
    const { onCancel, interviewers } = this.props
    const { value } = this.state

    return (
      <div className='container'>
        <div className='modal-container'>
          <div className='new-title'>信息录入</div>
          <div className='row'><span className='field'>候选者</span>
            <input className='input' type="text" onChange={this.handleOnChange('candidateName')} /></div>
          <div className='row'><span className='field'>面试岗位</span>
            <input className='input' type="text" onChange={this.handleOnChange('jobRole')} /></div>
          <div className='row'><span className='field'>面试官</span>
            <Select
              className='input'
              options={interviewers}
              multi
              removeSelected
              closeOnSelect={false}
              simpleValue
              onChange={this.handleSelectChange}
              placeholder="Select the interviewers"
              value={value}
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
  interviewers: PropTypes.arrayOf(InterviewerOptionShape),
  onCancel: PropTypes.func.isRequired,
  createAssignment: PropTypes.func.isRequired,
  fetchInterviewers: PropTypes.func.isRequired,
}

NewAssignment.defaultProps = {
  interviewers: [],
}
const mapStateToProps = state => ({
    interviewers: state.assignment.interviewers,
  })


export default connect(mapStateToProps, { fetchInterviewers, createAssignment })(NewAssignment)

