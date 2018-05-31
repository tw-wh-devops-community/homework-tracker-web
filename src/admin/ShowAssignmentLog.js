import { Popover } from 'antd'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import classNames from 'classnames'
import 'antd/dist/antd.css'
import { showLogModal, fetchAssignmentLogs } from './actions'
import './ShowAssignmentLog.css'
import dateFormat from '../utilities/dateFormat'
import { AssignmentLogShape } from '../shared/shape'


const tableHeader = ['操作时间', '动作', '操作内容']
const actionNames = ['', '修改', '新增', '删除']
const QA = '...'

class ShowLogAssignment extends Component {
  componentWillMount() {
    this.props.fetchAssignmentLogs(this.props.assignmentId)
  }

  setFinishTime = (time) => { this.finishTime = dateFormat(time) }

  finishTime = moment().format()


  renderContextItem(line, index) {
    this.contextItemindex = index
    return (
      <p key={this.contextItemindex} >{line}</p>
    )
  }

  renderPopoverContext(context) {
    return (
      <div>
        {context.split('|').map((line, index) => this.renderContextItem(line, index))}
      </div>
    )
  }

  renderContext(context) {
    if (context.length <= 6) {
      return context
    }

    const showContext = context.substring(0, 5) + QA
    return (
      <Popover placement="right" content={this.renderPopoverContext(context)} title="条目" trigger="hover">
        {showContext}
      </Popover>
    )
  }

  renderItem = (assignmentLog, index) => {
    const tableValue = classNames('table-row', {
      'highlight-item': index % 2 === 0,
    })
    return (
      <div
        key={assignmentLog.id}
        className={tableValue}
      >
        <div className='table-column'>{dateFormat(assignmentLog.operate_time)}</div>
        <div className='table-column'>{actionNames[assignmentLog.operate_action]}</div>
        <div className='table-column'>{this.renderContext(assignmentLog.operate_context)}</div>
      </div>
    )
  }


  render() {
    const assignmentLogs = this.props.assignmentLogs
    return (
      <div className='container'>
        <div className='modal-container'>
          <div className='title backgroud-color-ACACAC'>
            <div>作业log</div>
            <div className='close' role="presentation" onClick={() => this.props.showLogModal()}>x</div>
          </div>
          <div className='modal-body scrollbar backgroud-color-write'>
            <div className='table margin-top-16px'>
              <div className='table-header'>
                {tableHeader.map(tableTitle => (
                  <div key={tableTitle} className='table-column'>{tableTitle}</div>
                ))}
              </div>
              <div className='table-value'>
                {assignmentLogs.length <= 0 ? <div className='text-center'>无日志记录</div>
                : assignmentLogs.map(
                  (assignmentLog, index) => this.renderItem(assignmentLog, index))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ShowLogAssignment.propTypes = {
  assignmentId: PropTypes.string.isRequired,
  showLogModal: PropTypes.func.isRequired,
  fetchAssignmentLogs: PropTypes.func.isRequired,
  assignmentLogs: PropTypes.arrayOf(AssignmentLogShape),
}

ShowLogAssignment.defaultProps = {
  assignmentLogs: [],
}

const mapStateToProps = state => ({
  assignmentId: state.assignment.setAssignmentId.selectAssignmentId,
  assignmentLogs: state.assignment.assignmentLogs,
})

export default connect(mapStateToProps, { showLogModal, fetchAssignmentLogs })(ShowLogAssignment)

