import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import 'font-awesome/css/font-awesome.min.css'
import { InterviewerObjShape } from '../shared/shape'
import { fetchInterviewers, setSelectInterviewerId, showModalE, unbindInterviews } from './actions'
import './Interviewers.css'

const tableHeader = ['面试官姓名', '面试官id', 'role', 'openid']

export class Interviewers extends Component {
  componentWillMount() {
    this.props.fetchInterviewers('')
  }

  changeShowEditModal = (selectInterviewerId) => {
    this.props.showModalE()
    this.props.setSelectInterviewerId(selectInterviewerId)
  }

  unBindEditModal = (id) => {
    const unbinds = window.confirm('确定要解除绑定的操作？')
    if (unbinds) {
      // 发送解绑操作
      this.props.unbindInterviews(id)
    }
  }

  renderItem = (interviewer, index) => {
    const tableValue = classNames(`table-row ${interviewer.openId === null ? 'bind' : 'unbind'}`, {
      'highlight-item': index % 2 === 0,
    })
    let unbind = null
    if (interviewer.open_id) {
      unbind = <i className='fa fa-unlock table-unbindIcon' role='presentation' onClick={() => this.unBindEditModal(interviewer._openids_id)} />
    }
    return (
      <div
        key={interviewer.id}
        className={tableValue}
      >
        <div className='table-column'>{interviewer.name}</div>
        <div className='table-column'>{interviewer.employee_id}</div>
        <div className='table-column'>{interviewer.role}</div>
        <div className='table-column'>{interviewer.open_id}</div>
        <div className='table-column'>
          <i className='fa fa-edit table-editIcon' role='presentation' onClick={() => this.changeShowEditModal(interviewer.id)} />
          {unbind}
        </div>
      </div>
    )
  }

  render() {
    const interviewers = this.props.interviewers
    return (
      <div className='table'>
        <div className='table-header'>
          {tableHeader.map(tableTitle => (
            <div key={tableTitle} className='table-column'>{tableTitle}</div>
          ))}
          <div className='table-column' />
        </div>
        <div className='table-value'>
          {interviewers.map((interviewer, index) => this.renderItem(interviewer, index))}
        </div>
      </div>

    )
  }
}

Interviewers.propTypes = {
  interviewers: PropTypes.arrayOf(InterviewerObjShape),
  fetchInterviewers: PropTypes.func.isRequired,
  showModalE: PropTypes.func.isRequired,
  setSelectInterviewerId: PropTypes.func.isRequired,
  unbindInterviews: PropTypes.func.isRequired,
}

Interviewers.defaultProps = {
  interviewers: [],
}

const mapStateToProps = state => ({
  interviewers: state.interviewer.interviewers,
})

export default connect(mapStateToProps,
  {
    fetchInterviewers,
    setSelectInterviewerId,
    showModalE,
    unbindInterviews,
  })(Interviewers)
