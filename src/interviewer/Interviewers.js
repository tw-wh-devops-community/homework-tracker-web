import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import 'font-awesome/css/font-awesome.min.css'
import { InterviewerShape } from '../shared/shape'
import { fetchInterviewers, setSelectInterviewerId, showEditModal } from './actions'
import './Interviewers.css'

const tableHeader = ['姓名', 'id', 'Role', 'openId']

export class Interviewers extends Component {
  componentWillMount() {
    this.props.fetchInterviewers()
  }

  changeShowEditModal = (selectInterviewerId) => {
    this.props.showEditModal()
    this.props.setSelectInterviewerId(selectInterviewerId)
  }

  renderItem = (interviewer, index) => {
    const tableValue = classNames(`table-row ${interviewer.status}`, {
      'highlight-item': index % 2 === 0,
    })
    return (
      <div
        key={interviewer.id}
        className={tableValue}
      >
        <div className='table-column'>{interviewer.name}</div>
        <div className='table-column'>{interviewer.employee_id}</div>
        <div className='table-column'>{interviewer.role}</div>
        <div className='table-column'>{interviewer.openId}</div>
        <div className='table-column'>
          <i className='fa fa-edit table-editIcon' role='presentation' onClick={() => this.changeShowEditModal(interviewer.id)} />
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
  interviewers: PropTypes.arrayOf(InterviewerShape),
  fetchInterviewers: PropTypes.func.isRequired,
  showEditModal: PropTypes.func.isRequired,
  setSelectInterviewerId: PropTypes.func.isRequired,
}

Interviewers.defaultProps = {
  interviewers: [],
}

const mapStateToProps = state => ({
  interviewers: state.interviewer.interviewers,
})

export default connect(mapStateToProps,
  { fetchInterviewers,
    setSelectInterviewerId,
    showEditModal,
  })(Interviewers)
