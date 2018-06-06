import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import 'antd/dist/antd.css'
import { RoleOptionShape, InterviewerObjShape } from '../shared/shape'
import { updateInterviewer, fetchRoles, showErrorMsg } from './actions'
import './NewInterviewer.css'

export class EditInterviewer extends Component {
  state = {
    validateFailed: false,
    name: this.props.interviewer.name,
    jobRole: this.props.interviewer.role,
    employeeId: this.props.interviewer.employee_id,
    id: this.props.interviewer.id,
  }

  componentWillMount() {
    this.props.fetchRoles()
  }

  handleRoleChange = (jobRole) => {
    this.setState({ jobRole })
  }

  handleOnChange = field => (event) => {
    this.setState({
      [field]: event.target.value,
    })
  }

  validate = () => {
    const { name, employeeId, jobRole } = this.state
    return !!name && !!employeeId && !!jobRole
  }

  create = () => {
    if (!this.validate()) {
      this.setState({ validateFailed: true })
      return
    }
    this.setState({ validateFailed: false })
    // const { name, employeeId, jobRole, id } = this.state
    // console.log({ name, employeeId, jobRole, id })
    // this.props.createInterviewer({
    //   name,
    //   employeeId,
    //   jobRole,
    // })
  }

  render() {
    const { roleOptions, onCancel, errorMsg } = this.props
    const { name, jobRole, employeeId } = this.state
    return (
      <div className='container'>
        <div className='modal-container'>
          <div className='new-title'>信息修改</div>
          <div className='row'><span className='field'>姓名</span>
            <input className='input' type="text" onChange={this.handleOnChange('name')} value={name} />
          </div>
          <div className='row'><span className='field'>员工编号</span>
            <input className='input' type="text" onChange={this.handleOnChange('employeeId')} value={employeeId} />
          </div>
          <div className='row'><span className='field'>岗位</span>
            <Select
              className='input'
              options={roleOptions}
              onChange={this.handleRoleChange}
              placeholder="请选择岗位"
              simpleValue
              value={jobRole}
            />
          </div>
          {this.state.validateFailed &&
            <p className="reminder">请完成所有项的输入</p>}

          <p className="reminder">{errorMsg}</p>
          <div className='button-container'>
            <button className='button cancel' onClick={onCancel}>取消</button>
            <button className='button confirm' onClick={this.create}>确认</button>
          </div>
        </div>
      </div>
    )
  }
}

EditInterviewer.propTypes = {
  interviewer: InterviewerObjShape.isRequired,
  // updateInterviewer: PropTypes.func.isRequired,
  roleOptions: PropTypes.arrayOf(RoleOptionShape),
  onCancel: PropTypes.func.isRequired,
  fetchRoles: PropTypes.func.isRequired,
  errorMsg: PropTypes.string.isRequired,
}

EditInterviewer.defaultProps = {
  roleOptions: [],
  errorMsg: '',
}
const mapStateToProps = state => ({
  interviewer: state.interviewer.interviewers
    .find(data => data.id === state.interviewer.setInterviewerId.selectInterviewerId),
    roleOptions: state.interviewer.roleOptions,
    errorMsg: state.interviewer.errorMsg,
})


export default connect(mapStateToProps,
  { fetchRoles, updateInterviewer, showErrorMsg })(EditInterviewer)

