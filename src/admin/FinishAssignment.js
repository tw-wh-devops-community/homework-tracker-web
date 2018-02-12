import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { DatePicker } from 'antd'
import moment from 'moment'
import 'antd/dist/antd.css'
import { showFinishModal, finishAssignment } from './actions'
import './NewAssignment.css'
import dateFormat from '../utilities/dateFormat'

class FinishAssignment extends Component {
  state = { showReminder: false }

  setFinishTime = (time) => { this.finishTime = dateFormat(time) }

  finish = () => {
    if (this.finishTime === null || this.finishTime === '') {
      this.setState({ showReminder: true })
    } else {
      this.props.finishAssignment(this.props.assignmentId, this.finishTime)
      this.props.showFinishModal()
    }
  }

  finishTime = moment().format()

  render() {
    return (
      <div className='container'>
        <div className='modal-container modal-finish'>
          <div className='new-title'>设置完成时间</div>
          <div className='row'>
            <div className='field'>完成时间</div>
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="Select Time"
              defaultValue={moment()}
              onChange={time => this.setFinishTime(time)}
              onOk={time => this.setFinishTime(time)}
            />
          </div>
          {this.state.showReminder && <span className='reminder'>输入不能为空</span>}
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

