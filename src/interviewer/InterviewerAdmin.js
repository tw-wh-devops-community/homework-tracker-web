import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './InterviewerAdmin.css'
// import EditAssignment from './EditAssignment'
import { showModal } from './actions'

import NewInterviewer from './NewInterviewer'
import Interviewers from './Interviewers'

export class InterviewerAdmin extends Component {
  changeShowModal = () => {
    this.props.showModal()
  }

  render() {
    return (
      <div className='homepage'>
        <div className="header">
          <div className="homepage-logo">HOMEWORK 管理平台</div>
          <div className="button-new">
            <button onClick={() => this.changeShowModal()}>New</button>
          </div>
        </div>
        <Interviewers />
        {this.props.showNewModal && <NewInterviewer onCancel={() => this.changeShowModal()} />}
        {this.props.showEditModal && <NewInterviewer />}
      </div>
    )
  }
}

InterviewerAdmin.propTypes = {
  showEditModal: PropTypes.bool,
  showNewModal: PropTypes.bool,
  showModal: PropTypes.func.isRequired,
}

InterviewerAdmin.defaultProps = {
  showEditModal: false,
  showNewModal: false,
}

const mapStateToProps = state => ({
  showEditModal: state.interviewer.changeModal.showEditModal,
  showNewModal: state.interviewer.changeModal.showNewModal,
})

export default connect(mapStateToProps,
  {
    showModal,
  })(InterviewerAdmin)
