import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createAssignment } from './actions'
import './NewAssignment.css'

class NewAssignment extends Component {
  create = () => {
    this.props.createAssignment()
  }

  render() {
    const { onCancel } = this.props
    return (
      <div className='container'>
        <div className='modal-container'>
          <div className='new-title'>信息录入</div>
          <div className='row'><span className='field'>候选者</span><input className='input' /></div>
          <div className='row'><span className='field'>面试岗位</span><input className='input' /></div>
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
  onCancel: PropTypes.func.isRequired,
  createAssignment: PropTypes.func.isRequired,
}

export default connect(null, { createAssignment })(NewAssignment)

