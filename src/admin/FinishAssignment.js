import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { DatePicker } from 'antd'
import moment from 'moment'
import 'antd/dist/antd.css'
import { showFinishModal, finishAssignment } from './actions'
import './NewAssignment.css'

class FinishAssignment extends Component {
  setFinishTime = (time) => {
    this.finishTime = moment(time).format()
  }

  finish = () => {
    this.props.finishAssignment(this.props.assignmentId, this.finishTime)
    this.props.showFinishModal()
  }

  finishTime = moment().format()

  render() {
    return (
      <div className='container'>
        <div className='modal-container modal-finish'>
          <div className='new-title'>设置完成时间</div>
          <div className='row'>
            <span className='field'>完成时间</span>
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="Select Time"
              defaultValue={moment()}
              onChange={time => this.setFinishTime(time)}
              onOk={time => this.setFinishTime(time)}
            />
          </div>
          <div className='button-container'>
            <button className='button cancel' onClick={() => this.props.showFinishModal()}>取消</button>
            <button className='button confirm' onClick={this.finish}>确认</button>
          </div>
        </div>
      </div>
    )
  }
}

FinishAssignment.propTypes = {
  assignmentId: PropTypes.string.isRequired,
  showFinishModal: PropTypes.func.isRequired,
  finishAssignment: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  assignmentId: state.assignment.setAssignmentId.selectAssignmentId,
})

export default connect(mapStateToProps, { showFinishModal, finishAssignment })(FinishAssignment)

