import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import 'antd/dist/antd.css'
import { RoleOptionShape } from '../shared/shape'
import { createInterviewer, fetchRoles } from './actions'
import './NewInterviewer.css'

class NewInterviewer extends Component {
  state = {
    validateFailed: false,
    name: '',
    jobRole: '',
    employeeId: '',
    selectedOptions: '',
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
    const { name, employeeId, jobRole } = this.state
    this.props.createInterviewer({
      name,
      employeeId,
      jobRole,
    })
      // this.props.onCancel()
  }

  render() {
    const { onCancel, roleOptions, errorMsg } = this.props
    const { name, jobRole, employeeId } = this.state

    return (
      <div className='container'>

        <div className='modal-container'>
          <div className='new-title'>信息录入</div>
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

NewInterviewer.propTypes = {
  roleOptions: PropTypes.arrayOf(RoleOptionShape),
  onCancel: PropTypes.func.isRequired,
  createInterviewer: PropTypes.func.isRequired,
  fetchRoles: PropTypes.func.isRequired,
  errorMsg: PropTypes.string.isRequired,
}

NewInterviewer.defaultProps = {
  roleOptions: [],
  errorMsg: '',
}

const mapStateToProps = state => ({
  roleOptions: state.interviewer.roleOptions,
  errorMsg: state.interviewer.errorMsg,
})


export default connect(mapStateToProps,
  { fetchRoles, createInterviewer })(NewInterviewer)

